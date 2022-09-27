---
title: 'webpack核心基础知识'
date: 2022/8/9 09:03:02
cover: false
tags:
- webpack
typora-root-url: webpack核心基础知识
---



# 包管理工具

## Npm



## Yarn

# 构建工具

## Webpack

本章环境参数：

```
Node：10版本以上
Webpack：4.26版本以上

webpack-cli@3.3.11
webpack@4.41.6
style-loader@1.1.3
css-loader@3.4.1
less-loader@5.0.0
html-webpack-plugin@3.2.0
url-loader@3.0.0
file-loader@5.0.2
html-loader@0.5.5
webpack-dev-server@3.10.3
mini-css-extract-plugin@0.9.0
postcss-loader@3.0.0
postcss-preset-env@6.7.0
optimize-css-assets-webpack-plugin@5.0.3
eslint@6.8.0
eslint-loader@3.0.3
eslint-plugin-import@2.20.1
eslint-config-airbnb-base@14.0.0
babel-loader@8.0.6
@babel/preset-env@7.8.4
@babel/core@7.8.4
@babel/polyfill@7.8.3
core-js@3.6.4

若有如下报错：
Could not find plugin "proposal-class-static-block". Ensure there is an entry in ./available-plugins.js for it. 
解决方法是修改版本如下：
@babel/core@7.14.6
@babel/preset-env@7.14.7
```

### 1.Webpack简介

创建目录结构

```
|----index.html
|----index.less
|----index.js
```

index.html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="./index.less">
</head>
<body>
  <h1>Hello Webpack</h1>
</body>
</html>
```

index.less

```less
h2 {
  color: pink;
}
```

样式未生效：

![image-20220317164323216](image-20220317164323216.png)

浏览器不认识less文件，需要转成css文件。类比于浏览器不支持es6、模块化语法，需要babel、browserify进行转化

当我们使用css预处理器来写样式代码时，需要一个工具将less代码，转换成css代码



做些其他操作：

`npm init`初始化一个包

`npm install jquery`下载jquery

index.js

```javascript
import $ form 'jquery'

$('#title').click(() => {
    $('body').css('backgroundColor', 'deepPink')
})
```

index.html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="./index.less">
</head>
<body>
  <h1 id="title">Hello Webpack</h1>
  <script src="./index.js"></script>
</body>
</html>
```

同样的，引入js文件，由于使用了es6的模块化语法，并不能被浏览器解析，也没有生效

![image-20220317165839570](image-20220317165839570.png)

同理，我们也需要一个工具，将es6的模块化语法转化成浏览器识别的。（前面已经学过了，可以用babel和browserify来处理）

将来还有很多这样的情况，如vue文件，也需要转化处理等等

问提：

- 一个个小工具，自己维护起来将会非常的麻烦
- 由此引出一个概念：**构建工具**
  - 构建工具包含了上述的所有的小工具
  - webpack就是构建工具的一种，同时也是一种静态资源打包器

#### 1.1.Webpack是什么

Webpack是一种前端资源构建器，一个静态资源打包器（module bundle）。

在Webpack看来，前端的所有资源文件（js/json/css/img/less/...）都会作为模块处理。

它将根据模块的依赖关系进行静态分析，打包生成对应的静态资源（bundle）



我们告诉`webpack`入口文件的位置，`wepack`会以入口文件作为起点开始打包，它会将入口文件中的每一个依赖记录好，形成依赖关系树状结构图，然后根据依赖关系，依此将资源全部引进来，形成一个chunk（代码块）。

然后再对`chunk`进行各项处理，比如说将`less`编译成`css`，`jsES6`语法编译成`ES5`语法等等，这些操作统一概括一下，称为`打包`。

处理好的资源，输出出去，称为`bundle`。整体大概就是这样一个流程

![image-20220222160601799](image-20220222160601799.png)

相关概念

- 构建工具
- chunk
- 打包
- bundle

#### 1.2.Webpack五个核心概念

##### 1.2.1.Entry

入口（`Entry`）指示`Webpack`以哪个文件为入口起点开始打包，分析构建内部依赖图。

**webpack.config.js**

```js
module.exports = {
  entry: './path/to/my/entry/file.js',
};
```

##### 1.2.2.Output

输出（`Output`）指示`Webpack`打包后的资源`bundles`输出到哪里去，以及如何命名。

**webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  },
};
```



##### 1.2.3.Loader

`Loader`让`Webpack`能够去处理那些非`Javascript`文件（Webpack自身只理解`Javascript`）

**webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
};
```



##### 1.2.4.Plugins

插件（`Plugin`）可以用于执行范围更广的任务，插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等。

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
```



##### 1.2.5.Mode

模式（`Mode`）指示`Webpack`使用相应模式的配置

| 选项        | 描述                                                         | 特点                       |
| ----------- | ------------------------------------------------------------ | -------------------------- |
| development | 会将 `process.env.NODE_ENV`的值设为`development`。<br />启用`NamedChunksPlugin`和`NamedModulesPlugin`。 | 能让代码本地调试运行的环境 |
| production  | 会将 `process.env.NODE_ENV`的值设为`production`。<br />启用`FlagDependencyUsagePlugin`，`FlagIncludedChunksPlugin`，`ModuleConcatentionPlugin`，`NoEmitOnErrorPlugin`，`OccurenceOrderPlugin`，`SideEffectFlagPlugin`和`UglifyJsPlugin` | 能让代码优化上线运行的环境 |



```javascript
module.exports = {
  mode: 'production',
};
```



 

### 2.Webpack初体验

新建目录，项目目录结构

```
|----build // 打包后的输出目录
|----src // 开发目录
	|----index.js // 入口文件
```

- 工具准备

全局安装webpack4：`npm i webpack@4.41.6 webpack-cli@3.3.11 -g`

再本地安装，并添加到开发依赖：`npm i webpack@4.41.6 webpack-cli@3.3.11 -D`

![image-20220406071704272](image-20220406071704272.png)

#### 验证JS文件（支持）

- 测试代码

  ```javascript
  // index.js
  /*
      index.js: webpack入口文件
   */
  
  function add(x, y) {
      return x + y
  }
  
  console.log(add(1, 2))
  ```

- 运行指令

  - 开发环境：`webpack ./src/index.js -o ./build/built.js --mode=development`

  - 上述表示webpack会以`./src/index.js`为入口文件进行打包，打包后输出到`./buid/built.js`，整体打包环境是开发环境

    - 可以使用`webpack --help`，查看支持哪些参数，`-o`表示` --output-path `，指定输出目录
    - 实操中输出的是./build/built.js目录下，有个main.js文件，可能是webpack版本的问题

  - 执行命令后，结果如下：

    ```
    Hash: dae31a30deff8bcefbb6
    Version: webpack 4.46.0
    Time: 123ms
    Built at: 2022/03/18 上午7:06:32
      Asset      Size  Chunks             Chunk Names
    main.js  4.22 KiB    main  [emitted]  main
    Entrypoint main = main.js
    [0] multi ./src/index.js 28 bytes {main} [built]
    [./src/index.js] 113 bytes {main} [built]
    	
    ```

  - 执行生产环境打包命令：``webpack ./src/index.js -o ./build --mode=production`，webpack4中， 打包后的bundle是进行压缩过的

    - 可以直接通过node指令执行
    - 可以通过html引入

#### 验证JSON文件（支持）

src目录下，新建`data.json`

```json
{
  "name": "jack",
  "age": "18"
}
```

入口文件中引入：

```javascript
/*
    index.js: webpack入口文件
 */
import data from "./data.json"
console.log(data)
function add(x, y) {
    return x + y
}

console.log(add(1, 2))
```

运行开发环境命令，重新打包，经测试在node环境和浏览器环境，都可以正常显示

![image-20220321070232800](image-20220321070232800.png)



能够支持json文件，是因为javascript本身就有json文件解析的api，打包后的文件有这么一行语句：

```javascript
e.exports = JSON.parse('{"name":"jack","age":"18"}')
```

解析json文件的过程，就是读取`data.json`的内容，然后使用parse方法解析。

#### 验证CSS文件（不支持）

src目录下，新建index.css

```css
body {
    background-color: #BBFFAA;
}

```

入口文件中引入，并打包

报了异常：

![image-20220321070757944](image-20220321070757944.png)

webpack将index.css的内容复制到chunk中，准备解析的时候，发现css的这种语法是不支持的。

#### 小结

webpack支持js/json资源，不支持css/img等其他资源。

打包命令将es6模块化语法，编译成浏览器能识别的模块化。

生产环境打包命令，比开发环境打包命令多了一个压缩js代码的过程。

### 3.开发环境配置

#### 打包样式资源

要支持样式文件的模块化，需要定义`webpack.config.js`配置文件

- 作用：以配置的形式，指示`webpack`干哪些活
  - 当运行`webpack`指令时，`webpack`会加载配置文件的信息，以里面的配置来干活

那么配置怎么写呢？

- 所有的构建工具，都是基于Node平台运行的

  - 采用CommonJS模块化规范

    ```javascript
    const { resolve } = require('path')
    
    module.exports = {
        // webpack配置
        // 入口起点
        entry: './src/index.js',
        // 输出
        output: {
            // 输出文件名
            filename: 'built.js',
            // 输出路径，一般是绝对路径
            path: resolve(__dirname, 'build') // __dirname是nodejs的变量，代表当前文件所在目录的绝对路径
        },
        // loader的配置
        module: {
            rules: [
                // 详细loader配置
            ]
        },
        // plugins的配置
        plugin: [
            //详细plugins配置
        ],
        // 模式
        mode: 'development' // 也可以是mode: 'production'
    }
    ```

    

- 而`src`是写项目的代码，采用ES6吗，模块化规范



#### 处理css文件

使用`css-loader`、`style-loader`

`webpack.config.js`

```javascript
const { resolve } = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // 详细loader配置
            {
                // 匹配哪些文件
                test: /\.css$/, //遍历所有的文件，使用正则去匹配以.css结尾的文件名
                use :[ // 匹配成功后，使用use中配置的loader去处理，执行顺序是从下往上，从后往前
                    'style-loader', // 2.创建<style></style>标签，将js中的css样式资源插入进去，添加到<head></head>中生效。
                    'css-loader' // 1.将css文件以字符串的形式，变成commonjs的模块，加载到js中，
                ]
            }
        ]
    },
    plugins: [
    ],
    mode: 'development'
}
```

为了避免将来重复下载，我们在上级目录下载包，如下：

![image-20220324071832160](image-20220324071832160.png)



下载`webpack`、`webpack-cli`： `npm i webpack webpack-cli -D`

下载`css-loader`、`style-loader`： `npm i css-loader@3.4.2 style-loader@1.1.3 -D`

输入`webpack`命令进行打包

- 如果打包不通过，把配置文件的`plugin`注释掉

打包后的文件中，可以看到css文件以字符串的形式，变成了commonjs模块：

![image-20220325065251536](image-20220325065251536.png)

新建`index.html`并引入js文件，可以看到样式已经生效了。

![image-20220325065501603](image-20220325065501603.png)



#### 配置文件流程分析

`webpack`首先解析`entry`字段，加载`index.js`，然后分析入口文件内部的依赖图，发现里面有一个`index.css资源`，至此已经有了两个资源`index.js`、`index.css`。

每一个资源会经过`rules`里面的`loader`进行处理，`js`资源先进来，发现`test`的规则不匹配，于是跳过。然后进来`css`资源，与`test`规则命中后，使用`use`中的`loader`进行处理，处理的顺序是`从下往上，从后往前`。

先用`css-loader`进行处理，将`css`资源以`commonjs`的方式，加载到`js`中，然后用`style-loader`进行处理，创建`style`标签，将`js`中的样式资源插入，并添加到`head`中生效。

最后的输出路径，是由`output`来指定的。

#### 处理less文件

`src`目录下，新建`index.less`

```less
h2 {
  color: pink;
}
```

在`index.js`中引入并打包，毫无疑问，`webpack`会报错：

![image-20220325070825102](image-20220325070825102.png)



我们之前配置的`loader`只针对`css`资源，不同的资源需要使用不同的`loader`来处理

所以我们需要再写一个`loader`配置

```javascript
const { resolve } = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // 详细loader配置
            {
                // 匹配哪些文件
                test: /\.css$/, //遍历所有的文件，使用正则去匹配以.css结尾的文件名
                use :[ // 匹配成功后，使用use中配置的loader去处理，执行顺序是从下往上，从后往前
                    'style-loader', // 2.创建<style></style>标签，将js中的css样式资源插入进去，添加到<head></head>中生效
                    'css-loader' // 1.将css文件以字符串的形式，变成commonjs的模块，加载到js中，
                ]
            },
            {
                test:/\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader', // 1.将less文件，编译成css文件
                ]
            }
        ]
    },
    // plugins: [
    // ],
    mode: 'development'
}
```

然后下载`less-loader`和`less`，`npm i less-loader@5.0.0 less@3.11.1 -D`

然后打包并引入看效果：

![image-20220325071546871](image-20220325071546871.png)

两个样式的`loader`最后各自插入了`style`标签

#### 打包html文件

新建04/src目录，新建`index.html`和`index.js`

`index.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1 id="title">hello html</h1>
</body>
</html>
```

`index.js`

```javascript
function add(x, y) {
    return x + y
}

console.log(add(2,3))
```



- 下载：`npm i html-webpack-plugin@3.2.0 -D`

- 引入

  ```
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  ```

- 调用

  ```javascript
  // ...
  plugins: [
      new HtmlWebpackPlugin()
  ]
  ```

`webpack.config.js`

```javascript
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: []
    },
    plugins: [
        // plugins配置
        // html-webpack-plugin使用
        new HtmlWebpackPlugin()
    ],
    mode: 'development'

}
```

打包看下效果：

![image-20220328065112315](image-20220328065112315.png)



会连`html`一起打包，并在`index.html`中引入`built.js`，还删除了我们之前写的`id`名

小结1：

- 默认会创建一个空的`HTML`，自动引入打包输出的所有资源（`JS/CSS`）
- 需求：我们需要有结构的`HTML`文件

需要加一个选项：

```javascript
// ...
plugins: [
    new HtmlWebpackPlugin({
        // 复制该文件，并自动引入打包输出所有资源
        template: './src/index.html'
    })
]
```

添加后重新打包，效果：

![image-20220328065727975](image-20220328065727975.png)

loader：

- 1.下载、2.使用（配置Loader）
- loader是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中
  - 处理一个文件可以使用多个loader，loader的执行顺序和配置中的顺序是相反的，即最后一个loader最先执行，第一个loader最后执行
  - 第一个执行的loader接收源文件内容作为参数，其它loader接收前一个执行的loader的返回值作为参数，最后执行的loader会返回此模块的JavaScript源码
- loader，是一个转换器
  - 将A文件进行编译形成B文件，这里操作的是文件，比如将 A.scss 转换为 A.css，是单纯的文件转换过程。

plugin:

- 1.下载、2.引入、3.使用
- 在webpack运行的生命周期中会广播出许多事件，plugin可以监听这些事件，在合适的时机通过webpack提供的API改变输出果。
- plugin 是插件扩展器
  - 针对webpack打包的过程，它不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些事件钩子，执行任务。plugin 比loader 强大，通过plugin 可以访问 compliler和compilation过程，通过钩子拦截 webpack 的执行。

我的理解：

- loader的处理，更偏向句法词法分析这种，如less转css等。
- plugin的处理，更偏向将人工的新建、引入等操作自动化这种，如复制文件、引入标签等
- 更多：
  - https://blog.csdn.net/jiang7701037/article/details/98887179
  - https://cloud.tencent.com/developer/article/1772916

#### 打包图片文件

目录结构如下：

![image-20220406065006227](image-20220406065006227.png)

准备3张图片

index.less

```less
#box1 {
  width: 100px;
  height: 100px;
  background-image: url('../imgs/vue.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

#box2 {
  width: 200px;
  height: 200px;
  background-image: url('../imgs/react.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

#box3 {
  width: 300px;
  height: 300px;
  background-image: url('../imgs/angular.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

```

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="box1"></div>
<div id="box2"></div>
<div id="box3"></div>
</body>
</html>
```

main.js

```javascript
import './css/index.less'
```

webpack.config.js

```javascript
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/main.js',
    output: {
        filename: './src/main.js',
        path: resolve(__dirname, './build')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'

}
```

打包后的效果如下：

![image-20220406065204589](image-20220406065204589.png)

![image-20220406065211094](image-20220406065211094.png)

我这里用的webpack版本变成了5,，和教程里的不太一样，没有配置图片的loader也能转换图片，应该默认就有配置了

后面重新删除了node_modules文件夹，下载所有的包指定版本号重新过了一遍

配置图片相关的Loader：

```javascript
            {
                test: /\.(jpg|png|gif)$/, // 匹配图片资源
                loader: 'url-loader', // 如果只要使用一个loader，就可以这样写，不用写use
                options: { // loader的配置
                    limit: 8 * 1024 // 图片大小小于8kb，就会被base64处理
                    // 优点：减少请求数量（减轻服务器压力）
                    // 缺点：图片体积会更大（文件请求速度变慢）
                    // 一般不会对大图片进行base64处理，一般对8~12kb以下的图片，进行base64处理，都是没有问题的
                    // 根据实际情况设置
                }
            }
```

下载包的时候，要下载`url-loader`和`file-loader`，因为`url-loader`依赖于`file-loader`

`npm i url-loader@3.0.0 file-loader@5.0.2 -D`

可以看到，limit的设置，将会对vue图片进行base64处理：

![image-20220406070304508](image-20220406070304508.png)

我们还会在`html`标签中，通过`img`引入图片，上述方式默认是解析不到的

还需要加一个`html-loader`，这个`loader`是处理`html`中的`img`图片的（负责引入img），从而被`url-loader`进行处理

`npm i html-loader@0.5.5 -D`

在`index.html`中新增

```html
<img src="./imgs/angular.png" alt="">
```

如果不配置`html-loader`重新打包后的`img`的路径，是不会变的

`webpack.config.js`中配置`html-loader`：

```javascript
            {
                test: /\.html$/,
                // 处理html文件中的img图片路径（负责引入img，从而被url-loader进行处理）
                loader: 'html-loader'
            }
```

重新打包后看`index.html`的内容

```html
<img src="[object Module]" alt="">
```

出现上述结果，是因为`url-loader`使用的是ES6模块化规范来处理各个模块，而`html-loader`使用的是CommonJS模块化规范，用ES6来解析CommonJS是解析不了的

解决办法：在`url-loader`的配置中，关闭ES6模块解析方式，使用CommonJS方式去解析

```javascript
         {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: { // loader的配置
                    limit: 8 * 1024,
                    esModule: false // 关闭ES6模块解析方式，使用CommonJS方式去解析
                }
            },
```

结果解析出来的，是一个正确的图片路径：

![image-20220419062922005](image-20220419062922005.png)

备注：如果引入的图片小于limit设置，也会被处理成base64

如果不想图片那么长的话，可以配置命名规则：

```javascript
             {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: { // loader的配置
                    limit: 8 * 1024,
                    esModule: false,
                    name: '[hash:10].[ext]' // [hash:10]取图片的前10位，[ext]取文件原来的扩展名
                }
            },

```

#### 打包其他资源

阿里图标库上，先下载几个图标，并通过类名引入，先看下效果

index.html

```html
<html>
<head>
<title></title>
</head>
<link rel="stylesheet" href="./font/iconfont.css">
<body>
    <span class="iconfont icon-rili3"></span>
    <span class="iconfont icon-shoucang"></span>
    <span class="iconfont icon-qiehuan"></span>
    <span class="iconfont icon-normal1"></span>
</body>
</html>

```

![image-20220421153752507](image-20220421153752507.png)



iconfont.css中，引入了字体文件

```css
@font-face {
  font-family: "iconfont"; /* Project id  */
  src: url('iconfont.ttf?t=1650525200949') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-rili3:before {
  content: "\e89e";
}

.icon-shoucang:before {
  content: "\e61e";
}

.icon-qiehuan:before {
  content: "\e688";
}

.icon-normal1:before {
  content: "\e7dc";
}

```

取消`index.html`中的`link`引入，新建入口文件，通过入口文件引入：

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>webpack</title>
</head>
<body>
    <span class="iconfont icon-rili3"></span>
    <span class="iconfont icon-shoucang"></span>
    <span class="iconfont icon-qiehuan"></span>
    <span class="iconfont icon-normal1"></span>
</body>
</html>

```



index.js

```js
import './font/iconfont.css'
```



最终我们要打包的有html资源、css资源和字体图标资源

编写`webpack.config.js`

```js
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        // 打包其他资源（除了css/js/html资源以外的资源）
        exclude: /\.(css|js|html)$/,
        loader: 'file-loader', // 其他资源都通过file-loader进行处理
        options: { // 文件名长度的配置
          name: '[hash:10].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
                                       
```

#### devServer

开发服务器`devServer`，用来自动化（自动编译、打开浏览器、刷新浏览器）

配置与上面的五个配置同级：

```js
devServer: {
    host: "0.0.0.0", // 如果是linux系统，要配置ip，否则会以localhost运行
    contentBase: resolve(__dirname, 'build'), // 构建后的目录
    compress: true, // 启动gzip压缩，让代码更小，运行更快
    port: 8082, // 指定端口号，如果是云服务器，需要先开启防火墙
    open: true
}
```

更多配置：[webpack-devServer的详细配置 - keyeking - 博客园 (cnblogs.com)](https://www.cnblogs.com/keyeking/p/15471047.html)

特点：只会在内存中编译打包，不会有任何输出

启动`devServer`指令为：`webpack-dev-server`

安装：`npm i webpack-dev-server@3.10.3 -D`

启动：`npx webpack-dev-server`，因为没有全局安装，所以用`npx`，也没必要全局安装

编译信息：

```
[root@VM-4-12-centos 07.devServer]# npx webpack-dev-server
ℹ ｢wds｣: Project is running at http://0.0.0.0:8081/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wds｣: Content not from webpack is served from /root/hh_git/md/web/code/webpack/07.devServer/build
ℹ ｢wdm｣: Hash: 19f6a0a0ae89773263f1
Version: webpack 4.41.6
Time: 642ms
Built at: 04/21/2022 6:46:52 PM
         Asset       Size  Chunks             Chunk Names
5ea7b72be6.ttf    2.5 KiB          [emitted]  
      built.js    384 KiB    main  [emitted]  main
    index.html  440 bytes          [emitted]  
Entrypoint main = built.js
[0] multi ../node_modules/webpack-dev-server/client?http://0.0.0.0:8081 ./src/index.js 40 bytes {main} [built]
[../node_modules/ansi-html/index.js] 4.16 KiB {main} [built]
[../node_modules/ansi-regex/index.js] 135 bytes {main} [built]
[../node_modules/css-loader/dist/cjs.js!./src/font/iconfont.css] 1.04 KiB {main} [built]
[../node_modules/strip-ansi/index.js] 161 bytes {main} [built]
[../node_modules/webpack-dev-server/client/index.js?http://0.0.0.0:8081] ../node_modules/webpack-dev-server/client?http://0.0.0.0:8081 4.29 KiB {main} [built]
[../node_modules/webpack-dev-server/client/overlay.js] 3.51 KiB {main} [built]
[../node_modules/webpack-dev-server/client/socket.js] 1.53 KiB {main} [built]
[../node_modules/webpack-dev-server/client/utils/createSocketUrl.js] 2.91 KiB {main} [built]
[../node_modules/webpack-dev-server/client/utils/log.js] 964 bytes {main} [built]
[../node_modules/webpack-dev-server/client/utils/reloadApp.js] 1.59 KiB {main} [built]
[../node_modules/webpack-dev-server/client/utils/sendMessage.js] 402 bytes {main} [built]
[../node_modules/webpack/hot sync ^\.\/log$] ../node_modules/webpack/hot sync nonrecursive ^\.\/log$ 170 bytes {main} [built]
[./src/font/iconfont.css] 576 bytes {main} [built]
[./src/index.js] 52 bytes {main} [built]
    + 25 hidden modules
Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = index.html
    [../node_modules/html-webpack-plugin/lib/loader.js!./src/index.html] 597 bytes {0} [built]
    [../node_modules/lodash/lodash.js] 531 KiB {0} [built]
    [../node_modules/webpack/buildin/global.js] 472 bytes {0} [built]
    [../node_modules/webpack/buildin/module.js] 497 bytes {0} [built]
ℹ ｢wdm｣: Compiled successfully.

```



效果如下：

![image-20220421184839164](image-20220421184839164.png)

更改文件内容：

index.js

```
import './font/iconfont.css'

console.log('new vlaue')

```

效果：

![image-20220421190421353](image-20220421190421353.png)



验证只在内存中编译，我们删掉`build`目录重新启动，目录如下：

![image-20220421190607972](image-20220421190607972.png)

仍可正常运行。

备注：如果有如下警告信息：

![image-20220421191053066](image-20220421191053066.png)

`devServer`同级新增`devtool`配置相关：

```js
devtool: 'inline-source-map'
```

重新启动即可，警告消失：

![image-20220421191329811](image-20220421191329811.png)

#### 开发环境基本配置

项目目录

![image-20220504134224810](image-20220504134224810.png)

`webpack.config.js`

```json
/*
 *开发环境配置
 * */

const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    esModule: false
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                exclude: /\.(html|js|css|less|jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 8002,
        open: true
    }
}

```

项目指令

- `webpack`：会将打包结果输出出去
- `npx webpack-dev-server`：只会在内存中编译打包，没有输出

我们希望js文件输出到js目录，应该怎么做呢？

```json
filename: 'js/built.js',
```

输出路径增加前缀即可，打包后效果如下：

![image-20220504134647159](image-20220504134647159.png)

类似的，图片资源在`options`下增加`outputPath`字段：

```json
options: {
    limit: 8 * 1024,
    name: '[hash:10].[ext]',
    esModule: false,
    outputPath: 'imgs' // 指定图片资源输出路径
}
```

打包后效果如下：

![image-20220504134853785](image-20220504134853785.png)

其他资源，也是同样的配置：

```json
{
    exclude: /\.(html|js|css|less|jpg|png|gif)$/,
    loader: 'file-loader',
    options: {
        name: '[hash:10].[ext]',
        outputPath: 'assets' // 其他资源路径
    }
}
```

打包后效果如下：

![image-20220504135218696](image-20220504135218696.png)

而`css`文件，经过`css-loade`被打包在了`js`文件中去了

开发环境最终配置：

```js
/*
 *开发环境配置
 * */

const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
		filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    esModule: false,
                    outputPath: 'imgs' // 指定图片资源输出路径
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                exclude: /\.(html|js|css|less|jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'assets' // 其他资源路径

                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 8002,
        open: true
    }
}

```



### 4.生产环境配置

#### 生产环境配置

- 将`css`从`js`中抽离出来
- 代码压缩
  - html
  - css
  - js

- 兼容性处理
  - css
  - js


#### 提取css成单独文件

基本配置：

```json
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}
```

效果如下：

![image-20220504203203060](image-20220504203203060.png)

下载插件：`npm i mini-css-extract-plugin@0.9.0 -D`

```json
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin =require('mini-css-extract-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 这个loader取代style-loader，作用：提取js中的css成单独的文件
                    MiniCssExtractPlugin.loader,
                    // 'style-loader', // 创建style标签，将样式放入
                    'css-loader' // 将css文件整合到js文件中
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'	
        }),
        new MiniCssExtractPlugin({

        })
    ],
    mode: 'development'
}
```

重新打包后的效果如下：

```html
<link href="main.css" rel="stylesheet"></head>
```

![image-20220504203905558](image-20220504203905558.png)



在输出的`index.html`中，会自动引入抽取出来的`css`文件

对输出的文件进行路径配置：

```json
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        })
```

效果如下：

![image-20220504204358659](image-20220504204358659.png)

#### css兼容性处理

> `css`兼容性处理：
>
> 用到`postcss`，要在`webpack`中使用，要用到`postcss-loader`
>
> 还需要使用 `postcss-preset-env`，可以让`postcss`识别指定环境，加载指定配置，能够让我们的兼容性做到，精确到某一个浏览器的版本。帮助`postcss`找到`package.json`中的`browserlist`里面的配置，通过配置加载指定`css`兼容性样式

下载：`npm i postcss-loader@3.0.0 postcss-preset-env@6.7.0 -D`

配置信息：

```json
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 设置nodejs环境变量
// process.env.NODE_ENV = 'development';

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 这个loader取代style-loader，作用：提取js中的css成单独的文件
                    MiniCssExtractPlugin.loader,
                    // 'style-loader', // 创建style标签，将样式放入
                    'css-loader', // 将css文件整合到js文件中
                    /*
                        css兼容性处理：用到postcss，要在webpack中使用，要用到postcss-loader
                        还需要使用 postcss-preset-env,可以让postcss识别指定环境，加载指定配置，能够让我们的兼容性做到，精确到某一个浏览器的版本
                            帮助postcss找到package.json中的browserlist里面的配置，通过配置加载指定css兼容性样式
                     */
                    // 使用loader的默认配置，只需要写个名称即可
                    // 'postcss-loader'
                    {
                        loader: 'postcss-loader',
                        // 写成对象形式，可以自定义配置
                        options: {
                            ident: 'postcss', // 固定写法
                            plugins: () => [ // 这里是方括号，不是花括号
                                // postcss的插件，可以看官网，有很多postcss插件
                                require('postcss-preset-env')()
                            ]
                        }
                    }
                ]
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        })
    ],
    mode: 'development'
}
```

在`package.json`中写`browserlist`：

```json
  "browserslist": {
    // 开发环境
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
    // 生产环境（默认），和mode里的配置是没有关系的
    // 需要设置node环境变量才可更改：process.env.NODE_ENV = 'development'
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ]
  }
```

更多配置见`github`

样式文件中，加入一些存在兼容性问题的样式

```css
.box1 {
    width: 100px;
    height: 100px;
    background-color: #5daf34;

    /*新增*/
    display: flex;
    backface-visibility: hidden;
}
```

保持node环境变量为默认开发环境，打包后查看`css`文件：

```css
.box1 {
    width: 100px;
    height: 100px;
    background-color: #5daf34;

    /*新增*/
    display: flex;
    -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
}

```

#### 压缩css

下载：`npm i optimize-css-assets-webpack-plugin@5.0.3 -D`

配置：

```json
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-preset-env')()
                            ]
                        }
                    }
                ]
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        }),
        // 压缩css
        new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: 'development'
}
```

未启用压缩：

![image-20220504215623408](image-20220504215623408.png)

启用压缩：

![image-20220504215754866](image-20220504215754866.png)

`css`体积减少了35%

![image-20220504215853809](image-20220504215853809.png)

体积越小，网络请求的速度越快，用户体验就越好



#### js语法检查eslint

> 一般使用`eslint`进行语法检查，`webpack`中使用`eslint-loader`，其依赖于`eslint`库
>
> 在`package.json`中`eslintConfig`中设置，推荐使用`airbnb`规则 ，其对应的库是`eslint-config-airbnb-base`，这个库依赖于`eslint`和`eslint-plugin-import`

下载：`npm i eslint-loader@3.0.3 eslint@6.8.0 eslint-config-airbnb-base@14.0.0 eslint-plugin-import@2.20.1 -D`

`package.json`中新增：

```json
  "eslintConfig": {
    "extends": "airbnb-base"
  }
```

添加代码：

`index.js`

```js
// 代码风格故意写的不规范
function add(x,y) {
    return x+y
}

console.log(add(2,3))
```

配置信息：

```json
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')

    },
    module:{
        rules: [
            // 语法检查
            //
            {
                test: /\.js$/,
                exclude: /node_modules/, // 只检查用户自己写的源代码，第三方库是不需要的
                loader: 'eslint-loader',
                options: {

                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}
```



输入`webpack`测试效果：

![image-20220505071753088](image-20220505071753088.png)

也就是说，我们自己写的`index.js`有这么多的代码风格错误

这么多规则不可能一个一个修复，我们可以新增配置选项，自动修复有问题的代码风格

```json
            {
                test: /\.js$/,
                exclude: /node_modules/, // 只检查用户自己写的源代码，第三方库是不需要的
                loader: 'eslint-loader',
                options: {
					fix: true //自动修复eslint提示的错误
                }
            }
```

重新输入`webpack`后，错误会自动修复，我们的`index.js`中的代码风格自己改变了：

![image-20220505072407868](image-20220505072407868.png)

但仍提示了一个`警告`：

![image-20220505072335426](image-20220505072335426.png)

可以在`console`语句上，添加注释`// eslint-disable-next-line`，表示下一行忽略`eslint`检查

#### js兼容性处理eslint

##### babel-loader

**问题描述：**

如果在源代码中写了箭头函数，如果不处理，会原样输出，而有些浏览器是根本不认识的

**问题验证：**

index.js

```js
const add =  (x, y) => {
  return x + y
}
console.log(add(1, 3))

```

打包后查看`built.js`

![image-20220505144226925](image-20220505144226925.png)

ie浏览器是不认识的

**解决方案：**

使用`babel`进行语法兼容性处理，在`webpack`中对应`babel-loader`

下载：`npm i babel-loader@8.0.6 @babel/core@7.14.6 @babel/preset-env@7.14.7 -D`

配置：

```json
{
    loader: 'babel-loader',
    options: {
        // 预设：指示babel做怎么样的兼容性处理
        presets: ['@babel/preset-env']
    }
}
```

重新打包，查看打包文件，箭头函数已经变成了正常的函数：

![image-20220505151943532](image-20220505151943532.png)

##### @babel/polyfill

**问题验证：**

在`index.js`中写入`Promise`相关语法，是不能够被`@babel/preset-env`所处理的：

```js
const add = (x, y) => {
	return x + y
}
console.log(add(2, 3))

const promise = new Promise(resolve => {
	setTimeout(() => {
		console.log('定时器执行完了')		
	}, 1000)
})
console.log(promise)
```

打包后输出结果：

![image-20220505153012005](image-20220505153012005.png)

**解决方案：**

在`index.js`中引入`@babel/polyfill`即可

```js
import '@babel/polyfill'

const add = (x, y) => {
	return x + y
}
console.log(add(2, 3))

const promise = new Promise(resolve => {
	setTimeout(() => {
		console.log('定时器执行完了')		
	}, 1000)
})
console.log(promise)
```

打包后输出结果：

![image-20220505153336502](image-20220505153336502.png)

##### core-js

**问题描述：**

`@babel/polyfill`将所有的兼容性代码都引入，代码体积太大了

使用`@babel/polyfill`进行兼容性处理的打包js文件大小：

![image-20220505161837963](image-20220505161837963.png)

我希望按需加载

使用`core-js`

配置：

先注释掉`@babel/polyfill`的`import`语句

在`babel-loader`下添加额外的配置

```
{
    loader: 'babel-loader',
    options: {
        presets: [
        	[
        		'@babel/preset-env',
        		{
        			// 按需加载
        			useBuiltIns: 'usage',
        			// 指定core-js版本
        			corejs: {
        				version: 3
        			},
        			// 指定兼容性做到那个浏览器版本
        			targets: {
        				chrome: '60',
        				firefox: '60',
        				ie: '9',
        				safari: '10',
        				edge: '17'
        			}
        		}
        	]
        ]
    }
}
```

重新打包后的js文件大小：

![image-20220505162036838](image-20220505162036838.png)

按需加载后，打包体积由`514kb`减少至`104kb`，体积减少了80%



##### 小结

- 基本`js`兼容性处理
  - `@babel/preset-env`
  - 下载：`npm i babel-loader@8.0.6 @babel/core@7.14.6 @babel/preset-env@7.14.7 -D`
  - 问题：只能转换基本的语法，如`Promise`高级语法就不能转换
- 全部`js`兼容性处理
  - `@babel/polyfill`
  - 下载：`npm i @babel/polyfill@7.8.3 -D`
  - 原理
    - 将所有的方法，自己定义好，直接挂在到对应的对象上，是`Array`的方法就挂载到`Array`上
    - 问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，代码体积太大了
- 需要做兼容性处理的就做：按需加载
  - `core-js`
  - 下载：`npm i core-js@3.6.4 -D`

#### js / html压缩

`js`压缩

只需要将`mode`设置为`production`即可压缩`js`，`webpack`默认使用的是`UglifyJsPlugin`插件

`html`压缩

`html`不需要做兼容性处理，不认识就是不认识

在`HtmlWebpackPlugin`的配置对象中，新增配置：

```
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        // 折叠空行
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    }),
```

压缩前大小：

![image-20220505164813899](image-20220505164813899.png)

压缩后大小：

![image-20220505164924620](image-20220505164924620.png)

#### 生产环境基本配置

正常来讲，一种文件只能被一个`loader`处理，当一种文件被多个`loader`处理，那么一定要注意执行的先后顺序

先执行`eslint`，再执行`babel`，优先执行使用`enforce: pre`配置项

```js
const {resolve} = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        loader: 'postcss',
        options: {
            ident: 'postcss-loader',
            plugins: () => [
                require('postcss-preset-env')()
            ]
        }
    }
]
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [...commonCssLoader]
            },
            {
              test: /\.less$/,
              use: [...commonCssLoader, 'less-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage',
                                corejs: {
                                    version: 3
                                },
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    outputPath: 'imgs',
                    esModule: false
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                exclude: /\.(js|css|less|html|jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets',
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
    ],
    mode: 'production'
}
```

### 5.优化性能介绍

- 开发环境性能优化

  - 优化构建打包速度

  - 优化代码调试

- 生产环境性能优化

  - 优化构建打包速度
  - 优化代码运行性能

#### 开发环境优化

##### `HMR`热模块替换

拿到开发环境的最终配置

```js
/*
 *开发环境配置
 * */

const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
		filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    esModule: false,
                    outputPath: 'imgs' // 指定图片资源输出路径
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                exclude: /\.(html|js|css|less|jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'assets' // 其他资源路径

                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    devServer: {
        host: '0.0.0.0', // 如果是linux环境，可以这样配置
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 8002,
        open: true
    }
}

```

问题：现在我只要修改其中某一个模板，其他所有的模块都会被重新打包，（修改`css`时，`js`文件也会被重新打包）

`index.js`

```js
import '../assets/font/iconfont.css'
import '../css/index.less'
function add(x, y) {
  return x + y
}

console.log(add(1, 2))

let localstorage = localStorage.getItem('reload')
if(!localstorage) {
  console.log('第一次加载')
  localStorage.setItem('reload', 'first')
} else {
  console.log('重新加载')
  localStorage.setItem('reload', 'reload')
}

```

![image-20220512150648685](image-20220512150648685.png)

![image-20220512150711600](image-20220512150711600.png)

修改可以生效的样式文件后：

![image-20220512151005219](image-20220512151005219.png)

![image-20220512151031062](image-20220512151031062.png)

解决方案：

- `HMR`：`hot module replacement`，热模块替换

  - 作用：一个模块发生变化，只会重新打包这个模块（而不是打包所有模块）

  - 添加新配置：`hot: true`

    ```js
        devServer: {
            contentBase: resolve(__dirname, 'build'),
            compress: true,
            port: 8081,
            open: true,
            hot: true // 开启HMR
        }
    ```

  - 配置`HMR`后，再次更新的效果如下：

    ![image-20220512151419873](image-20220512151419873.png)

  - 小结：

    - 样式文件：可以使用`HMR`功能，因为`style-loader`内部实现了

    - `js`文件：默认不能使用`HMR`功能

      - 解决方案：

        - 需要修改`js`代码，添加支持`HMR`功能的代码

        - 先额外新增一个`js`文件，路径为`src/print.js`

          `print.js`

          ```js
          console.log('print.js被加载了~')
          function print() {
              const content = 'hello world'
              console.log(content)
          }
          
          export default print
          ```

          `index.js`

          ```js
          import '../assets/font/iconfont.css'
          import '../css/index.less'
          import print from './print'
          function add(x, y) {
            return x + y
          }
          print()
          console.log(add(1, 2))
          
          let localstorage = localStorage.getItem('reload')
          if(!localstorage) {
            console.log('第一次加载')
            localStorage.setItem('reload', 'first')
          } else {
            console.log('重新加载')
            localStorage.setItem('reload', 'reload')
          }
          
          
          if(module.hot) { // 一旦module对象上有了hot属性，说明开启了HMR功能，接下来我们要让HMR代码生效
            module.hot.accept('./print.js', function () { //会监听依赖的print.js文件的变化，一旦该文件发生变化，其他模块不会重新打包构建，会执行后面的回调函数
              print() // 重新调用依赖模块的方法
            })
          }
          ```

        - 更改`print.js`后的效果：

          ![image-20220512154014176](image-20220512154014176.png)

      - 注意：`HMR`功能只能处理非入口`js`文件的其他文件

      - 感觉会存在的问题

        - 如果有很多个`js`依赖，那么处理`HMR`的代码就会变得很冗余

    - `html`：默认不能使用`HMR`功能，并且会导致`html`文件不能热更新了

      - 更改`entry`的写法，写成数组的形式引入`html`文件（解决热更新的问题）

        ```js
        ...
        entry: ['./src/js/index.js', './src/index.html']
        ...
        ```

      - 开发时，`html`只有一个文件，根本用不着做`HMR`功能

##### `sourceMap`

- `sourceMap`是一种提供源代码到构建后代码映射技术

  - 如果构建后代码出错了，通过映射可以追踪到源代码错误

- 配置文件最外层新增：`devtool: 'source-map'`

  - 执行`webpack`后，打包后的`build/js`目录下，会新增一个`.map`文件：

    ![image-20220512154906655](image-20220512154906655.png)

























### webpack版本一览

