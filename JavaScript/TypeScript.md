---
title: TypeScript基础
cover: false
date: 2022-7-19 19:38:20
tags:
  - TypeScript
typora-root-url: TypeScript
---



[TOC]



# 环境配置和搭建

## 什么是`TypeScript`

`TypeScript`是`JavaScript`的超集，遵循最新的`ES5/ES6`规范。`TypeScript`扩展了`JavaScript`语法

为什么要有`TS`

- `TS`更像后端语言，如`JAVA`，可以开发大型企业应用
- `TS`提供的类型系统，可以帮助我们在写代码时提供丰富的语法提示
- 在编写代码时，会对代码进行类型检查从而避免很多线上错误

> `TypeScript`不会取代`js`，两者是相互共存的
>
> 尤雨溪：我认为将类型添加到`js`本身是一个漫长的过程。让委员会设计一个类型系统是（根据`TC39`的经历来判断）不切实际的
>
> 我也是这么认为的



## 环境配置

### 全局编译`TS`文件

全局安装`typescript`对`ts`进行编译

```bash
npm i typescript -g
tsc --init # 生成tsconfig.json
```

```bash
tsc # 可以将ts文件编译成js文件
tsc --watch # 监控ts文件变化生成js文件
```

本地安装

```bash
npm i typescript -D
npx tsc --init
```

创建`tsconfig.json`，以下是默认生成的配置

```bash
npx tsc --init

Created a new tsconfig.json with:                                                                                       
                                                                                                                     TS 
  target: es2016
  module: commonjs
  strict: true
  esModuleInterop: true
  skipLibCheck: true
  forceConsistentCasingInFileNames: true


You can learn more at https://aka.ms/tsconfig

```

新建`src/1.ts`

```ts
let string:String = 'hello'
```

会根据配置文件，将其转为`js`语法

使用`tsc`指令，将文件转化为`js`语法，默认不添加文件名，会将当前目录及子目录下，所有的`ts`文件全部转为`js`文件，如果是局部安装，则使用`npx tsc`指令

![image-20220719224055435](image-20220719224055435.png)

`1.js`

```js
"use strict";
let string = 'hello';

```

但我们希望的是实时编译，使用`npx tsc --watch`指令

```bash
D:\workspace\github\code\project-workshop\code-prac\typescript>npx tsc --watch
[下午10:44:16] File change detected. Starting incremental compilation...

[下午10:44:16] Found 0 errors. Watching for file changes.

```

修改`1.ts`，是会实时编译的

```ts
let string:String = 'hello1'
let hello:String = 'hello'
```

`1.js`

```js
"use strict";
let string = 'hello1';
let hello = 'hello';

```

### `code runner + ts-node`

现在我们还希望，直接运行`ts`文件，比如打印下`string`变量，目前可行的办法是，编译成`js`后，运行`js`文件

但很麻烦，借助于`code runner`插件（需要在`vscode`插件市场搜索安装），并安装`npm install ts-node -g`，必须装在全局

`1.ts`

```ts
let string:String = 'hello1'

let hello:String = 'hello' // 选中
console.log(hello) // 选中
```

然后选择`1.ts`中的代码，右键运行`Run Code`，控制台会打印输出`hello`

同级目录下，会生成`tempCodeRunnerFile.js`，内容是选中的内容，然后借助了`ts-node`环境执行了该文件

![image-20220719225649559](image-20220719225649559.png)

无论是全局编译还是使用code runner + ts-code`来处理`ts`文件，在我们真正写代码时，还是不能满足需求的，所以要借助构建工具

可以使用`webpack`或`rollup`

### 构建工具来处理`ts`

由于学习`ts`的过程中，并不会处理图片等资源，这里的构建工具暂不选取`webpack`，而使用`rollup`

拓展：解析`ts`的方式有两种

- `ts`插件来解析
- 通过`babel`来解析

在`rollup`中，会采用`rollup-plugin-typescript2`包，配合当前配置文件来解析`ts`

在`webpack`中，会采用`ts-loader`或者`babel-plugin-typescript`包来解析

#### `rollup`来处理`ts`

新建`rollup.config.js`

本地安装

- `rollup`
- `typescript`
- `rollup-plugin-typescript2`：连接`rollup`和`typescript`的桥梁
- `@rollup/plugin-node-resolve`：以`node`的方式导入第三方包
- `rollup-plugin-serve`：起服务相关

在根路径下，`npm init -y`初始化`package.json`

根目录下安装

```bash
npm i rollup typescript rollup-plugin-typescript2 @rollup/plugin-node-resolve rollup-plugin-serve -D
```

安装后的`package.json`

```json
{
  "name": "typescript",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@rollup/plugin-node-resolve": "^13.3.0",
    "rollup": "^2.77.0",
    "rollup-plugin-serve": "^2.0.0",
    "rollup-plugin-typescript2": "^0.32.1",
    "typescript": "^4.7.4"
  }
}

```

新建`src/index.ts`文件

配置`rollup.config.js`

```js
import {nodeResolve} from "@rollup/plugin-node-resolve"

import ts from "rollup-plugin-typescript2"
import serve from "rollup-plugin-serve"
import path from "path"

export default {
    input:'src/index.ts',
    output: {
        file: path.resolve(__dirname, 'dist/bundle.js'),
        format: 'iife', // 告诉rollup，打包后的代码是可以执行的，所以打包成立即执行函数
        // 常见的有global(弄个全局变量来接受)
        // cjs（会变成module.exports）
        // esm（会变成 import export的es6语法）
        // umd（兼容amd + commonjs，不支持es6导入）
        // rollup的配置文件，支持es6语法，它就是根据es6的语法来解析的
        sourcemap: true // ts的配置文件也得配，ts配置文件中，搜索sourceMap，取消注释即可
    },
    plugins: [
        // 1.先拿到ts文件
        nodeResolve({
            extensions: ['.js', '.ts'] // 默认解析ts文件
        }),
        // 2.根据配置文件解析
        ts({
            // 指定好ts的配置文件
            tsconfig: path.resolve(__dirname, 'tsconfig.json')
        }),
        // 3.最后提供服务
        serve({
            port: 3000, // 指定服务的端口号
            contentBase: '', // 指定根目录
            openPage: '/public/index.html' // 需要新建该目录和文件，并在index.html中引入`dist/bundle.js`
        })
    ]

}
```

备注：`ts`的配置文件也得配`sourceMap`，搜索`sourceMap`，取消注释即可

`package.json`中新增`script`

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "rollup -cw"
  },
```

执行`npm run dev`

报错：

```bash
[!] Error: Incompatible tsconfig option. Module resolves to 'CommonJS'. This is incompatible with rollup, please use 'module: "ES2015"' or 'module: "ESNext"'.
Error: Incompatible tsconfig option. Module resolves to 'CommonJS'. This is incompatible with rollup, please use 'module: "ES2015"' or 'module: "ESNext"'.

```

将`ts`的配置文件的`module`字段的值，改为`ESNext`（默认的是`commonjs`）

再次执行`npm run dev`

成功：

```bash
bundles src/index.ts → dist/bundle.js...
rpt2: options error TS6053: File 'D:/workspace/github/code/project-workshop/code-prac/typescript/src/index.ts' not found.
  The file is in the program because:
    Root file specified for compilation
http://localhost:3000 -> D:\workspace\github\code\project-workshop\code-prac\typescript
(!) Generated an empty chunk
index
created dist/bundle.js in 4.5s

```

目前我们是没有写任何`ts`代码的，所以会有如上提示

在`src/index.ts`中写点内容

```ts
let str:String = "hello"
console.log(str)

```

注意要打印该变量（使用该变量），因为`rollup`默认开启了`tree-shaking`

保存后查看`dist/bundle.js`

```js
(function () {
	'use strict';

	let str = "hello";
	console.log(str);

})();
//# sourceMappingURL=bundle.js.map

```



























































































































