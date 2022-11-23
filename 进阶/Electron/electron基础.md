---
title: 'electron基础'
date: 2022-11-23 09:03:02
cover: false
tags:
- electron
categories: electron
typora-root-url: electron基础
---



# 什么是`Electron`



# 第一个`Electron`程序

`npm i --save-dev electron`

`npm i nodemon`

`package.json`

```json
{
  "name": "01",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon --exec electron ."
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "nodemon": "^2.0.20"
  },
  "devDependencies": {
    "electron": "^21.3.0"
  }
}

```

`main.js`

```js
const {app, BrowserWindow} = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 800
    })
    // win.loadURL('https://www.mindcons.cn')
    win.loadFile('index.html')

    // 允许打开调试
    win.webContents.openDevTools()
    
}

app.whenReady().then(createWindow)
```

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./renderer/index.js"></script>
</head>
<body>
    <div>Hello</div>
</body>
</html>
```

`renderer/index.js`

```js
console.log(100)
```

![image-20221123201614720](image-20221123201614720.png)

关闭所有的安全警告，不推荐

```js
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
```

这个警告是关于`CSP`的，可以在`index.html`中配置`CSP`策略，该策略允许导入本地资源

```html
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline'">

```

这个策略不一定涵盖所有的`csp`警告，但至少我们可以知道忽略了什么警告

# 核心概念

## `Electron`主进程与渲染进程

主进程：启动项目时运行的`main.js`就是我们所说的主进程，在主进程运行的脚本可以创建`Web`页面的形式展示`GUI`。主进程只有一个。

渲染进程：每个`Electron`页面都在运行着自己的进程，这样的进程称之为渲染进程（基于`Chromium`的多进程结构）

![image-20221123200637342](image-20221123200637342.png)

主进程使用`BrowserWindow`创建实例，主进程销毁后，对应的渲染进程被终止，主进程与渲染进程通过`IPC`方式（事件驱动）进行通信

早期`Electron`中的渲染进程和主进程并没有隔离，渲染进程可以直接访问到主进程，有安全问题

```js
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true, // 集成node
            contextIsolation: false // 不隔离主进程和渲染进程了
        }
    })
```

此时可以在`index.js`的渲染进程中，调用`node`模块了

我们在桌面创建一个文本文件，里面内容是`abc`

`renderer/index.js`

```js
const fs = require('fs')
console.log(fs)

fs.writeFile('C:/Users/Administrator/Desktop/example.txt', 'abc', () => {
    console.log('done')
})
```

![image-20221123203329171](image-20221123203329171.png)

我们关闭了隔离选项，用户可以在`js`代码中直接操作`node`的文件，这个就很危险了，现在不会这么做了

上述的配置项不要使用

那么应该怎么做呢？

就是接下来要学习的，关于主进程和渲染进程的方方面面

## 主进程事件生命周期

在Windows和Linux上，关闭所有窗口通常会完全退出一个应用程序。

为了实现这一点，你需要监听 `app` 模块的 [`'window-all-closed'`](https://www.electronjs.org/zh/docs/latest/api/app#event-window-all-closed) 事件。如果用户不是在 macOS(`darwin`) 上运行程序，则调用 [`app.quit()`](https://www.electronjs.org/zh/docs/latest/api/app#appquit)。

关闭窗口

```js
app.on('window-all-closed', () => {
    console.log('close')
    // 对于mac系统，关闭窗口时，不能直接退出应用
    if(process.platform !== 'darwin') { // mac系统的名字
        app.quit()
    }
})
```

当 Linux 和 Windows 应用在没有窗口打开时退出了，macOS 应用通常即使在没有打开任何窗口的情况下也继续运行，并且在没有窗口可用的情况下激活应用时会打开新的窗口。

为了实现这一特性，监听 `app` 模块的 [`activate`](https://www.electronjs.org/zh/docs/latest/api/app#event-activate-macos) 事件。如果没有任何浏览器窗口是打开的，则调用 `createWindow()` 方法。

因为窗口无法在 `ready` 事件前创建，你应当在你的应用初始化后仅监听 `activate` 事件。 通过在您现有的 `whenReady()` 回调中附上您的事件监听器来完成这个操作。

```js
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
```

> 注意：此时，您的窗口控件应功能齐全！



## 渲染进程如何使用`Node`模块

在渲染进程开始之前，给了一个机会，去调用`Node`

```js
const path = require('path')
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true, // 高版本要开启nodeIntegration配置项
            // contextIsolation: false
            preload: path.resolve(__dirname, './preload.js')
        },
    })
    // win.loadURL('https://www.mindcons.cn')
    win.loadFile('index.html')

    // 允许打开调试
    win.webContents.openDevTools()

    // process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
}
```

任何去请求`index.html`文件之前，先做一个预加载

将之前写文件的代码，放在`preload.js`中

```js
const fs = require('fs')
console.log(fs)

fs.writeFile('C:/Users/Administrator/Desktop/example.txt', 'abc', () => {
    console.log('done')
})
```

可以正确执行

![image-20221124071624388](image-20221124071624388.png)



`preload.js`变量，想在`index.html`里面用怎么办呢

透支一个概念，桥的概念，`contextBridge`

`preload.js`

```js
const {contextBridge} = require('electron')
console.log(contextBridge)
```

可以看到这是一个对象，以及它的作用域链情况

![image-20221124072426782](image-20221124072426782.png)

## 主进程与渲染进程通信



