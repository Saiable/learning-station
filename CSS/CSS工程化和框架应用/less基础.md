---
title: 'less基础'
date: 2022-8-9 07:28:42
cover: false
typora-root-url: less基础
---

# `Less`

[Less 快速入门 | Less.js 中文文档 - Less 中文网 (bootcss.com)](https://less.bootcss.com/)

## 安装

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

### 浏览器环境安装

去`github`上，下载，然后`html`文件中导入`dist`目录下的`less.min.js`，引入的`less`文件的`rel`属性为`stylesheet/less`，并使用`liveServer`打开即可

```html
    <!-- 导入less -->
    <link rel="stylesheet/less" href="css/index.less"></link>
    <script src="css/less.min.js"></script>
```

### vscode插件

可以在vscode中，安装less插件

## 基本使用

- 使用态样式语言，属于`css`预处理器范围，它扩展了`css`语言

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

### `less`中的注释

- 以`//`开头的注释，不会被编译到`css`中
- 以`/* */`包裹的注释会被编译到`css`中

### `less`中的变量

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


#### 变量的延迟加载

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

### `less`中的嵌套规则

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

- 媒体查询

  ```less
  // 定义变量为一个字符串
  @min-1024: ~"(min-width: 1024px)";
  
  .element {
  
      // 在媒体查询处使用该变量
      @media @min-1024 {
          color: skyblue;
      }
  }
  ```

### `less`中的混合

混合就是将一系列属性，从一个规则集中引入到另一个规则集的方法

#### 普通混合

可以直接写类名

`.sp-comm`也会被编译

```less
.sp-comm {
    background: url("../images/comm-spr.png") no-repeat;
    background-size: 393px 200px;
}
//更多按钮箭头处理
.comm-more-arrow {
    display: inline-block;
    margin-left: 5px;
    width: 15px;
    height: 15px;
    .sp-comm; // 这里直接写类名即可
    background-position: -213px -126px;

}
```

#### 带参数的混合



```less
.sp-comm(@w, @h) {
    background: url("../images/comm-spr.png") no-repeat;
    background-size: @w @h;
}

//更多按钮箭头处理
.comm-more-arrow {
    display: inline-block;
    margin-left: 5px;
    width: 15px;
    height: 15px;
    background-position: -213px -126px;

    .common1 {
        .sp-comm(100px, 200px);
    }

    .common2 {
        .sp-comm(200px, 300px)
    }
}
```

#### 带参数并且有默认值的混合

```less
.sp-comm(@w:10px, @h:20px) {
    background: url("../images/comm-spr.png") no-repeat;
    background-size: @w @h;
}
```

#### 命名参数

```less
.sp-comm(@w:10px, @h:20px) {
    background: url("../images/comm-spr.png") no-repeat;
    background-size: @w @h;
}


.common1 {
    .sp-comm(@w:100px); // 指定实参
}
```

#### 匹配模式

画三角形

`index.less`

```less
@import url('./triangle.less');

#wrap{
    .arrow {
        .triangle(red, 40px);
    }
}
```

`triangle.less`

```less
.triangle(@color, @width) {
    width: 0px;
    height: 0px;
    border-width: @width;
    border-style: dashed solid dashed dashed;
    border-color: transparent @color transparent transparent;
    overflow: hidden;
}

```

如果还想抽离箭头的指向，如果还是加参数，就有点拉了，

可以用匹配模式

```less
.triangle(Bottom, @color, @width) {
    width: 0px;
    height: 0px;
    border-width: @width;
    border-style: solid dashed dashed dashed;
    border-color: @color transparent transparent transparent;
    overflow: hidden;
}

.triangle(Left, @color, @width) {
    width: 0px;
    height: 0px;
    border-width: @width;
    border-style: dashed solid dashed dashed;
    border-color: transparent @color transparent transparent;
    overflow: hidden;
}

.triangle(Top, @color, @width) {
    width: 0px;
    height: 0px;
    border-width: @width;
    border-style: dashed dashed solid dashed;
    border-color: transparent transparent @color transparent;
    overflow: hidden;
}

.triangle(Right, @color, @width) {
    width: 0px;
    height: 0px;
    border-width: @width;
    border-style: dashed dashed dashed solid;
    border-color: transparent transparent transparent @color;
    overflow: hidden;
}
```

可以进一步抽离公共样式

定义一个同名混合，使用`@_`来实现默认调用

除了`@_`参数，其它参数要对应上

```less
.triangle(@_, @color, @width) {
    width: 0px;
    height: 0px;
    overflow: hidden;
}

.triangle(Bottom, @color, @width) {
    border-width: @width;
    border-style: solid dashed dashed dashed;
    border-color: @color transparent transparent transparent;
}

.triangle(Left, @color, @width) {
    border-width: @width;
    border-style: dashed solid dashed dashed;
    border-color: transparent @color transparent transparent;
}

.triangle(Top, @color, @width) {
    border-width: @width;
    border-style: dashed dashed solid dashed;
    border-color: transparent transparent @color transparent;
}

.triangle(Right, @color, @width) {
    border-width: @width;
    border-style: dashed dashed dashed solid;
    border-color: transparent transparent transparent @color;
}
```

使用

```less
    .arrow {
        .triangle(Top, red, 40px);
    }
```



#### `arguments`变量



### `less`运算

在`less`中可以进行加减乘除的运算

## 使用技巧



- `&`符号加类名，就相当于并集选择器

  ```less
  .comm-more-arrow {
      &.move{
          
      }
  }
  
  .comm-more-arrow {
      &:hover{
          
      }
  }
  ```

  相当于

  ```css
  .comm-more-arrow.move {
      
  }
  ```

# rem适配

前提，已经使用js动态设置了html的`font-size`大小

`px2rem.less`

```less
// 定义一个变量和mixin
@baseFontSize: 80; // 根据实际情况，算出的1rem=实际的px，这里是80
.px2rem(@name, @px) {
    @{name}: @px / @baseFontSize * 1rem;
}
```

使用

```less
.wrap {
    .px2rem(width, 600);
}
```

**问题**
直接在vue-cli中写这串代码，只会原样输出，并不会输出计算后的值

需要借助`postcss-px2rem-exclude`插件：[postcss-px2rem-exclude - npm (npmjs.com)](https://www.npmjs.com/package/postcss-px2rem-exclude)

安装：`npm i postcss-px2rem-exclude`

配置：根目录新建`.postcssrc.js`

```js
module.exports = {
  'plugins': {
    'postcss-px2rem-exclude': {
      remUnit: 80,
      exclude: /node_modules|folder_name/i
    }
  }
}
```

使用：

```css
header {
    height: 100px;
}
```

结果：

![image-20221201101601683](image-20221201101601683.png)

**问题**，`postcss-px2rem-exclude`库会导致一些问题

使用`postcss-pxtorem`这个库，对应的需要安装下`autoprefixer`

根目录新建`postcssrc.js`

```js
// https://www.npmjs.com/package/postcss-pxtorem

const autoprefixer = require('autoprefixer');
const px2rem = require('postcss-pxtorem');
 
module.exports = {
  plugins: [autoprefixer(), px2rem({ rootValue: 80, unitPrecision: 5, propList: ['*'] })], 
};
```



 
