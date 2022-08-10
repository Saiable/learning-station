---
title: 'CSS预处理器'
date: 2022-8-9 07:28:42
cover: false
---



# `CSS`预处理器

## `Less`

[Less 快速入门 | Less.js 中文文档 - Less 中文网 (bootcss.com)](https://less.bootcss.com/)

### 脚手架中安装

`vue3-cli`在配置项中可以直接选中less语言或者sass语言，2里面还得安装

- 一、安装开发依赖，安装如果有问题，可以指定版本的less-loader

  ```
  npm install less less-loader --save-dev
  ```

- 二、打开 ` build / webpack.base.conf.js` ，配置`rule`属性

  ```
       {
          test: /\.less$/,
          loader: "style-loader!css-loader!less-loader"
        }
  ```

- 三：在组件页面内部用` lang='less'`

  ```css
  <style scoped lang='less'>
  .a{
      .b{}
  }
   
  </style>
  ```



如果使用的是`vue-cli5`

- 此时自己下载的`vue-cli`，用到`webpack`的版本为`5`版本（`node_modules`文件夹找`webapck`文件夹，查看`package.json`文件），这个时候装`less-loader`是没有问题的，因为默认安装的是最新版的`less-loader`，新版本是为了迎合`webpakc5`
- 如果`vue-cli`用的`webpack`为`4`版本，则要`less-loader`版本降级以兼容`webpack4`
  - 查看所有版本：`npm view less-loader versions`
  - 试一下不那么新的版本：`npm i less-loader@7.0.0 -D` 
    - `8`及以上的版本就是为`webpack4`服务的了

### `Less`基础

- `less`是一种动态样式语言，属于`css`预处理器范围，它扩展了`css`语言

  - 增加了变量、`Mixin`、函数等特性，使`css`更易维护和扩展

  - `less`既可以在客户端上运行，也可以借助`node`在服务器上运行

    - 在 `Node.js` 环境中使用 `Less` ：

      ```
      npm install -g less
      > lessc styles.less styles.css
      ```

      在浏览器环境中使用 `Less` ：

      ```html
      <link rel="stylesheet/less" type="text/css" href="styles.less" />
      <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.11.1/less.min.js" ></script>
      ```

#### `less`中的注释

- 以`//`开头的注释，不会被编译到`css`中
- 以`/* */`包裹的注释会被编译到`css`中

#### `less`中的变量

- 使用`@`来声明一个变量：`@pink: pink`

- 作为普通属性值只来使用：直接使用`@pink`

  ```less
  // 定义变量
  @color-white: white;
  @color-danger: #bd362f;
  
  .btn-danger {
      color: @color-white;
      background-color: @color-danger; // 使用变量
  }
  ```

- 作为选择器和属性名：`@{变量名}`的形式，一般用的很少，不会把选择器和属性名定义成变量的

  ```less
  @display: display; // 定义属性名变量
  @selector: .btn; // 定义选择器变量
  @{selector} { //使用变量
      @{display}: inline-block;
  }
  ```

- 作为`url`：`@{url}`


##### 变量的延迟加载

```less
@height:300px;
@font_size:12px;
.textarea {
	width:@width;
	height:@height;
	font-size:@font_size;
}
@width:5000px; // 定义在最后，也可以被读取到
```

同一变量名称定义多次时，只会使用最后一次在作用域中定义的变量。

```less
@var: 0;
.class {
    @var: 1;
    .brass {
        @var: 2;
        three: @var; // 结果不是2，是3，要等当前作用域全部读取完才会加载
        @var: 3;
    }
    one: @var; // 1
}
```

#### `less`中的嵌套规则

- 基本嵌套使用

  ```less
  .outer {
      .inner {
          
      }
  }
  ```

- `&`的使用（伪类、伪元素）

  ```less
      .inner {
          &:hover {
              // .inner:hover，如果不加&，编译后会多一个空格
              // 添加了&表示选取当前元素
          } 
          &:focus {
              
          }
      }
  ```
  
  





## `Sass`





## `Stylus`









































