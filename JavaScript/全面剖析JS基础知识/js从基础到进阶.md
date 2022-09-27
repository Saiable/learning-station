---
title: js从基础到进阶
date: 2022-9-14 05:58:44
cover: false
tags:
- javascript
categories: 'javascript'
typora-root-url: js从基础到进阶
---

# 了解前端与准备

## 前端发展史：全面拥抱大前端时代

### `web1.0`时代：静态网页

- 1989年，在欧洲粒子物理实验室`Tim Berners—Lee`（伯纳斯·李）提出：个人计算机上访问大量的科研文献，并建议在文档中链接其他文档=>“**WEB原型**”
- 1994年，万维网(`W3C`) 成立，网景推出了第一版`Navigator`浏览器, `HTML`也发布了第二代版本，`TIM`的好基友也设计了`CSS`...所以我们把1994年称为“**前端历史的起点**”
  - `H5C3`去官网看：[Tutorials and Courses - W3C](https://www.w3.org/2002/03/tutorials.html)
- 1995年，网景工程师`Brendan Eich`花 了10天时间设计了`JavaScript`语言, 1996年微软发布了`JScript` (和`JS`有一些差异)，同时拉开了`Navigator和Internet Explorer` 浏览器大战的序幕(到2002年`IE`完胜，占据全世界96%的市场份额)。
  - 后期浏览器兼容性问题的起源
- 为了让各大浏览器统一编程规范，1997年6月`ECMA` (欧洲计算机制造联合会)以`JavaScr ipt`语言为基础制定了`ECMAScript`标准规范`ECMA-262`，从此浏览器厂商都是按照这个规范来开发自己的浏览器产品。
- 1999年12月`ES3`发布，到2011年6月`ES5`发 布(2007年 的`ES4`夭折:改动太大)，`ES3`占据了10年历程， 也是`JS`语言的基础。2015年6月`ES6`发布 (但是由于之后规定每年发布一个新的版本，所以后改名`ES2015`: `let、 const、 Arrow function、 Class、 Module、Promise、Iterator、 Generator、 Set、 Map、 async、 Symbol、 Proxy`.... )，2016年6月对2015版本增强的2016版本发布，此后相继有`ES2017`、`ES2018`...
- 同样`HTML`也在2014年10月发布了第五代版本，2011年`CSS`也发布了第三代版本，此时前端基础的技术栈就稳固下来。

### `web2.0`时代：动态网页的崛起

1995年之前，`JS`只用来做一些简单的`DOM`修改，`WEB` 页面都是静态的(显示静态文本和图片)，为了让`WEB`页面更具备活力(例如:动态展示数据)，1995年`PHP`诞生， 1996年`JSP`诞生，1996 年`ASP`诞生，2002年`ASP. NET`诞生...这些服务器端页面技术实现了`WEB`页面的动态化，从此`WEB2.0`时代到来。



#### 服务端渲染

- 服务器接收到请求后
  - 1.找到需要访问的资源文件
  - 2.从数据库中基于`SQL`语句，查询出需要的数据
- 数据库存放的是数据
- 服务器渲染:把页面代码和数据结合在一起，生成有结构样式和数据的页面，把渲染完成的页面返回给客户端浏览器
- 前端开发：(网页制作)
  - 写页面和样式
- 后台开发:
  - 1.会写数据绑定的代码
  - 2.操作数据库
  - 3.操作服务器
  - 4.数据结构和算法
  - 5.服务器分布式(缓存和并发)
  - ..

- 弊端
  - 1.服务器承受压力过大
  - 2.同步非异步刷新
    - 页面中某一个数据想要更改，只能重新刷新整个页面(全局刷新)
  - 3.不利于团队协作开发
    - 后台开发的任务量过大(网页制作任务量少) ，代码过于臃肿，两种角色很难实现同时任务开发

### `AJAX`时代

[ `AJAX`时代: 前后端分离的雏形，异步渲染大显神通]

在Web最初发展的阶段，前端页面要想获取后台信息需要刷新整个页面，这是很糟糕的用户体验。`Google`分 别在`2004`年和`2005`年先后发布了两款重量级的Web产品: `Gmail`和`Google Map`。 
这两款`Web`产品都大量使用了`AJAX`技术，不需要刷新页面就可以使得前端与服务器进行网络通信，所以`AJAX`是一项革命性的技术，颠覆了用户体验。

到2013年/2014年，随着移动端`H5`的崛起，高性能的WEB体验是重中之重，国内大部分项目都已经改为“前后端分离”模式，这也奠定了前端开发二分天下的局面。导致到后期，跨域策略请求方案(`JSONP、 IFRAME、 CORS、DOMAIN、POXY、SCOKET`... )以及FETCH等 新通信方案不断的崛起。



#### 客户端渲染

- 服务器一般有多个
  - `WEB`服务器：
    - 接受客户端请求，把找到的静态资源文件返回给客户端
  - 数据服务器：
    - 客户端基于`AJAX ( JSONP、CROSS、 WEBPACK PROXY... )`或者`FETCH`，向数据服务器发送请求
    - 数据服务器操作数据库并向客户端返回数据
    - 客户端获取数据后，基于模板字符串等手段，把数据拼成需要展示的结构，放到容器中
  - 资源服务器
    - 一般放图片资源
- 前端工程师
  - 1.写页面`H5/CSS3`
  - 2.写人机交互`js`及框架插件
  - 3.数据请求和绑定`ajax`....
  - 4.操作系统`linux`
- 后台
  - 1.业务逻辑处理
  - 2.数据处理(数据库)
  - 3.数据结构和算法(服务器负载均衡)
  - 4.操作系统

### `App`

#### 原生`APP` ( `Native App` )

`object-c / java-native /swift`

优势:

- 1.性能好
- 2.功能强大(可以调用手机软件硬件)

弊端:

- 1.不能跨平台，成本大
- 2.不能同步



#### Web App ( H5页面)

响应式布局开发

> 浏览器
>
> > 网址
> >
> > > `HTML5`页面
> > >
> > > - 优势
> > >   - 1.跨平台
> > >   - 2.及时更新
> > > - 弊端:
> > >   - 1.性能相对不好
> > >   - 2.功能没有那么强大



#### `Hybrid`混合`APP`开发（99.99999%）

> `Native App`壳子（安卓/`IOS`写壳子）
>
> > `webview` (`webkit`内核)
> >
> > 通过`JSBridge`，可以调用壳子的方法
> >
> > > `H5`
> > >
> > > 壳子都不用原生（安卓/`IOS`）写了
> > >
> > > - `React-Native`
> > > - `Flutter`
> > >   - `Dart`语言
> > > - `uni-app`
> > >   - 一套代码，啥平台都有

#### `NODE`崛起

[ `NODE`崛起:` JS`成为最热门全栈开发技术] I

2009年，`Ryan`利 用`Chrome`的`V8`引擎打造了基于事件循环的异步I/0框架-`Node.js`诞生。

`NODE`特点：基于事件循环的异步I/0框架，能够提高1/0吞吐量;单线程运行，能够避免了多线程变量同步的问题；使得`JS`可以编写后台代码，前后端编程语言统一。
2010年1月，`NPM`作为`Node. js`的包管理系统首次发布。前`NPM` 具有40万左右的模块，是世界上最大的包模块管理系统。



#### 前端未来发展预估

- A：小程序是企业产品的重要组成部分
- B： `IOS`和安卓开发逐步被淘汰
- C： `VR/AI`最终转为B端(`JS`，尤其是`webGL`、`canvas`、`three. js`等是`3D`虚拟交互的主要实现技术)
- D：`H5`游戏/小游戏的热度会提高(白鹭`JS`引擎)
- E：`NODE.JS`还会迎来下一个高潮
- ...

大前端时代已经到来!



### 当下前端开发的技术体系

#### 第一阶段: `HTML (5) + CSS (3) `

技术要点：`HTML5`、`CSS3`、响应式布局(`rem/flex/@media`等)、`Hybrid`混合`APP`开发、微信二次开发、小程序开发、`ReactNative`开发、`Flutter`、`uni-app`...
特殊说明:	

- `Hybrid`、微信开发、小程序开发、`React Native`开发等，这些都需要有`JS`和框架编程的基础;	
- `H5`不仅仅是标签，还需要掌握常用的`API`以及`video`和`audio`等,例如：`locaIstorage`、`webscoket`、`getCurrentPosition`等;

书籍：

- 《`HTML5`》秘籍

- 《`CSS`权威指南》
- 《图解`CSS3`》
- 《`React Native`》入门与实战
- ...

#### 第二阶段: JS包括ES6核心原理

JS堆栈内存、闭包作用域、浏览器词法解析(v8渲染机制原理)、面向对象和THIS处理(主要是独立封装组件和插件，研究常用类库的源码) ;

ES6基础语法(包括class 类的继承封装和多态)、ES6中 的Promise (及Promise A+规范)、Generator生 成器函数等深入用法;

同步异步编程(包括运行机制和微任务、宏任务，以及实战应用)

常用的编程思想和设计模式:函数的防抖和节流、柯理化函数、惰性函数、单例设计模式、发布订阅模式、Promise设计模式等

DOM性能优化(重排和重绘的优化)、DOM事件

前端编程常规算法:去重、冒泡排序、插入排序、快速排序、递归等

书籍：

- 《JavaScript权威指南》
- 《你不知道的JavaScript》
- 《JavaScript高级程序设计》
- 《ES6标准入门》

#### 第三阶段: AJAX和HTTP

技术要点: ajax原理、ajax异 步解决方案(promise)、axios; (包括自己封装promise版ajax库)、fetch及封装处理、jquery中 的ajax操作和库的封装等

跨域解决方案及实现原理: jsonp、 cors、 webpack proxy (scoket.io)、document. domain、window. name+ iframe、postMessage 等

HTTP报文(常用的响应请求头实战应用技巧)、HTTP (TCP) 传输流程(包括三次握手四次挥手及TCP底层协议)、HTTP1和HTTP2的 区别、HTTP和HTTPS的区别等

特殊说明: HTTP是目前优秀公司重点考察的知识点，因为传统前端代码优化，性能上提高较小，HTTP相关优化手段是性能提高的重要方法(例如: 304缓 存、DNS缓存、减少HTTP传输次数和大小、HTTPS的加密等)，这块是一个重点!

书籍：

- 《图解HTTP》
- ...



#### 第四阶段:框架开发

技术要点:目前市场上的项目大部分都是框架开发的，所以框架学习非常的重要，目前主流框架是vue、react、 angular， angular现在 用的越来越少（国内），一般都是老项目使用这个技术在维护(angular1. 0版本居多)

vue全家桶: vue (MWVM实 现的原理以及一些语法实现的原理)、vue- router (HASH路由实现的原理)、vuex (掌握原理)、axios、 vue-cli (需要能够修改脚手架的webpack配置项)、iview/vux/vue element等常用框架的使用等

react全家桶: create-react-app (能够修改webpack的配置项)、react (掌握虚拟DOM渲染原理，掌握DOM-DIFF原理，掌握INDEX索引对比机制，掌握MVC实现的原理)、react-dom/react-nat ive、 react-router、 react-redux/dva/mobx (掌握原理， 自己可以基于原生JS写一套类似的插件、发现里面的一些不足点)、antd (最好可以自己封装一些基础的组件)等

书籍：

- 《React学习手册》
- 《深入浅出React Redux》
- ...

#### 第五阶段:辅助技能

技术要点

Webpack:掌握常用的脚手架使用和修改，会一些基础的webpack搭建

Git: 熟练掌握团队协作开发中代码版本管控技项，熟悉常用的操作命令

Node:掌握基础的API、掌握express/koa/egg等框架、可以编写伪API,可以基于node做跨域处理等，有精力的同学可以研究一下数据库操作等（使用Sequelize ORM框架）

Canvas:一些公司要求会可视化，需要掌握canvas/webGI/d3等,这个对于数学结构、算法等有一定的要求;这方面不好的，可以先掌握一些基础的操作,掌握echarts的用法等;

书籍：

- 《了不起的Node.js》
- 《HTML5游戏开发案例教程》
- 《精通Git》
- 《Linux基础学习篇》

## 推荐的学习方式

- 温故而知新,可以为师矣:笔记+复习
- 知其然而知其所以然:深挖底层原理
- 学而不思则罔 ,思而不学则殆
- 实战很重要:薪资和你敲过的代码成正比
- 多读书:致其知、 诚其意、正其心、修其身，然后家齐 ,国治,而后天下平

## 前端开发需要掌握的IDE

VSCODE

常用插件

- 汉化（看个人）
- 代码格式化：Beautify（shift + alt + F）
- Live Server

常见设置

- File > preference > Settigngs
  - Word Wrap

常用快捷键

- 感叹号!，生成HTML骨架
- EMMET语法
- 格式化代码：shift + alt + F

## 笔记工具

markdown格式，使用typora免费版

## 浏览器内核和控制台

### 常用浏览器

- webkit内核(V8引擎)

  - 谷歌Chrome

  + Safari
  + Opera >=V14
  + 国产浏览器
  + 手机浏览器
  + ...

- Gecko

  - 火狐Firefpx 

- Presto

  - Opera <V14

- Trident

  + IE

  + IE EDGE开始采用双内核(其中包含chrome迷你)



## 谷歌浏览器的控制台(F12/Fn+F12)

- Elements:查看结构样式，可以修改这些内容
- Console:查看输出结果和报错信息，是JS调试的利器
- Sources:查看项目源码
- Network:查看当前网站所有资源的请求信息(包括和服务器传输的HTTP报文信息)、加载时间等(根据加载时间进行项目优化)
- Application: 查看当前网站的数据存储和资源文件(可以盗图)



# JS概览
按照相关的JS语法，去操作页面中的元素，有时还要操作浏览器里面的一些功能
- ECMAScript3/5/6...: JS的语法规范(变量、数据类型、操作语句等等)
- DOM (document object model) :文档对象模型，提供- -些JS的属性和方法，用来操作页面中的DOM元素
- BOM (browser object model) !浏览器对象模型，提供一些JS的属性和方法，用来操作浏览器的

书籍推荐：https://www.aliyundrive.com/s/f8JS7ExEh7o

- 《JavaScript高级程序设计》
- 《JavaScript权威指南》
- 《你不知道的JavaScript》
- 《ES6标准入门》

## 变量和命名规范

> - 多种定义方式：var / let / const / function / import / class / Symbol()
> - 严谨的命名规范:区分大小写 / 驼峰命名 / 关键字保留字

### 变量

变量：可变的量，在编程语言中，变量其实就是 一个名字，用来存储和代表不同值的东西

变量本身是没有意义的，**有意义的是变量对应的那个值**

```js
// ES3
var a = 12
a = 13
console.log(a)

// ES6
let b = 100
b = 200 // 这两种声明方式有啥区别呢  后面讲完变量提升后，再说

const c = 1000
c = 2000 // 报错，const创建的变量存储的值，是不允许被修改的（可以理解为const创建的是常量）

// 创建函数，也相当于在创建变量
function fn() {}

// 创建类，也相当于创建变量
class A {}

// ES6的模块导入也可以创建变量
import B from './B.js'

// Symbol创建唯一值
let n = Symbol(100)

```

### 命名规范

- 严格区分大小写
- 使用数字、字母、下划线、$，数字不能作为开头
- 使用驼峰命名法:首字母小写，其余每-一个有意义单词的首字母都要大写(命名尽可能语义化明显，使用英文单词)
- 不能使用关键字和保留字，当下有特殊含义的是关键字，未来可能会成为关键字的叫做保留字

- [代码规范参考](https://juejin.cn/post/6844903714164047879)
- 免测产品的第一步，是良好的编码习惯

## 数据类型

> - 基本数据类型(值类型) ：数字number、字符串string、 布尔boolean、null、 undefined
>
> - 引用数据类型：object (数组、对象、正则... )、function
> - Symbol：唯一值

**基本数据类型**

- 数字number
  - 常规数字
  - NaN
-  字符串string
  - 所有用单引号、双引号、反引号包起来的，都是字符串
- 布尔boolean
  - true
  - false
- 空对象指针null
- 未定义undef ined

**引用数据类型**

- 对象数据类型object

  + {} 普通对象
  + [] 数组对象.

  + `/^[+-]?(\d|([1-9]\d+))(\.\d+)?$/` 正则对象

  + Math 数学函数对象
  + 日期对象
  + ...

- 函数数据类型function

### 数字number

- 常规数字

- NaN：not a number，不是一个数，但它属于数字类型

  ```js
  // isNaN([val])
  console.log(isNaN(10)) // false
  console.log(isNaN('AA')) // true, 1.Number('AA') => NaN, 2.isNaN(NaN) => true
  console.log(isNaN('10')) // false, 1.Number('10') => 10, 2.isNaN(10) => false
  console.log(isNaN(NaN)) // true
  ```

  - NaN和任何值(包括自己)都不相等: NaN!=NaN，所以我们不能用相等的方式判断是否是有效数字
  - isNaN：检测一个值是否为非有效数字，如果不是有效数字返回TRUE，反之是有效数字返回FALSE
  - 在使用isNaN进行检测的时候，首先会验证检测的值是否为数字类型，如果不是，**先基于Number()**这个方法，把值转换为数字类型，然后再检测

- 把其它类型值转换为数字类型

  > Number( [val] )
  >
  > parseInt([val]) / parseFloat([val],[进制])
  >
  > ==进行比较时比较时，可能要出现把其他类型值转换成数字

- 浏览器内置的V8引擎底层转换规则

  - 把字符串转换为数字，只要字符串中包含任意一个非有效数字字符(第一个点除外)结果都是NaN，空字符串会变为数字零

    ```js
    console.log(Number('12.5')) // 12.5
    console.log(Number('12.5px')) // NaN
    console.log(Number('12.4.5')) // NaN
    console.log(Number('')) // 0
    ```

  - 把布尔转换成数字

    ```js
    console.log(Number(true)) // 1
    console.log(Number(false)) // 0
    console.log(isNaN(true)) // false
    console.log(isNaN(false)) // false
    ```

  - null和undefined转为数字

    ```js
    console.log(Number(null)) // 0
    console.log(Number(undefined)) // NaN
    console.log(isNaN(null)) // false
    console.log(isNaN(undefined)) // true
    ```

  - 把引用数据类型转为数字

    - 是先把它基于toString方法转换为字符串，然后再将字符串转为数字

    ```js
    console.log(({name: 'sai'}).toString()) // [object Object]
    console.log(Number({name: 'sai'})) // NaN
    console.log(Number({})) // NaN
    
    console.log([].toString()) // '', 空字符串
    console.log(Number([])) // 0
    
    console.log([12].toString()) // '12',
    console.log(Number([12])) // 12
    
    console.log([12, 34].toString()) // '12,34'
    console.log(Number([12, 34])) // NaN
    ```

- parseInt和parseFloat是额外提供的，不同于V8引擎的转换规则

  - 字符串：对于字符串`12.5px`，如果仍然想获得其中的数字，可以使用parseInt和parseFloat方法，它是从左到右依次查找有效数字字符，直到遇到非有效数字字符，停止查找(不管后面是否还有数字，都不在找了)，把找到的当做数字返回

    ```js
    console.log(Number('12.5px')) // NaN
    console.log(parseInt('12.5px')) // 12
    console.log(parseFloat('12.5px')) // 12.5
    console.log(parseFloat('width:12.5px')) // NaN，一开始就是非有效数字字符，停止查找
    ```

  - 布尔

    ```js
    console.log(parseInt(true)) // NaN，会先转为字符串'true'
    console.log(parseInt(false)) // NaN
    console.log(parseFloat(false)) // NaN
    console.log(parseFloat(false)) // NaN
    ```

  - null和undefined

    ```js
    console.log(parseInt(null)) // NaN
    console.log(parseFloat(null)) // NaN
    console.log(parseInt(undefined)) // NaN
    console.log(parseFloat(undefined)) // NaN
    ```

  - 引用数据类型

    ```js
    console.log(parseInt({})) // NaN
    console.log(parseInt({name: 'sai'})) // NaN
    console.log(parseInt([])) // NaN
    console.log(parseInt([12])) // 12
    console.log(parseInt([12,34])) // 12
    
    console.log(parseFloat({})) // NaN
    console.log(parseFloat({name: 'sai'})) // NaN
    console.log(parseFloat([])) // NaN
    console.log(parseFloat([12])) // 12
    console.log(parseFloat([12,34])) // 12
    ```


### 字符串string

所有用单引号、双引号、反引号(撇 ES6模板字符串)包起来的都是字符串

- 把其它类型值转换为字符串类型

  > [val].toString()
  >
  > 字符串拼接
  
- toString()

  ```js
  // console.log(12.toString()) // An identifier or keyword cannot immediately follow a numeric literal.
  
  let a = 12
  console.log(a.toString()) // '12'
  
  console.log((NaN).toString()) // 'NaN'
  
  console.log((true).toString()) // 'true'
  
  // console.log((null).torString()) // 有toString方法，但是禁止使用   Uncaught TypeError: Cannot read properties of null (reading 'torString')
  // console.log((undefined).toString()) // 同上
  
  console.log([].toString()) // ''
  console.log([12, 34].toString()) // '12,34'
  
  console.log(/^$/.toString()) // '/^$/'
  
  console.log(({ name: 'sai' }).toString()) // '[object Object]' 因为Object.prototype.toString方法不是用来转换字符串的，而是用来转换数据类型的
  
  ```

- 字符串拼接

  四则运算法则中，除加法之外，其余都是数学计算，只有加法可能存在字符串拼接（一旦遇到字符串， 则不是数学运算，而是字符串拼接）

  ```js
  console.log('10' + 10) // 1010
  console.log('10' - 10) // Number('10') - 10 = 0
  console.log('10px' - 10) // Number('10px') - 10 = NaN
  ```

- 面试题

  ```js
  let a = 10 + null + true + [] + undefined + 'sai' + null + [] + 10 + false
  console.log(a) // 11undefinedsainull10false
  
  /*
  10 + null = 10 + Number(null) = 10 + 0 = 10
  10 + true = 10 + Number(true) = 10 + 1 = 11
  11 + [] = 11 + '' = '11' // 空数组变为数字，先要经历变为空字符串，遇到字符串，啥都别想了，直接变为字符串拼接
  '11' + undefined = '11undefined'
  '11undefined' + 'sai' = '11undefinedsai'
  '11undefinedsai' + null = '11undefinedsainull'
  '11undefinedsainull + [] = '11undefinedsainull'
  '11undefinedsainull' + 10 = '11undefinedsainull10'
  '11undefinedsainull10' + false = '11undefinedsainull10false'
  */
  
  
  ```



### 布尔boolean

只有两个值：true / false

- 把其它类型值转换为布尔类型：只有0、NaN、''、null、undefined 五个值转换为FALSE，其余都转换为TRUE（而且没有任何的特殊情况）

  > Boolean([val])
  >
  > ! / !!
  >
  > 条件判断

- Boolean([val])

  ```js
  console.log(Boolean(0)) // false
  console.log(Boolean(NaN)) // false
  console.log(Boolean(null)) // false
  console.log(Boolean(undefined)) // false
  console.log(Boolean('')) // false
  console.log(Boolean('sai')) // true
  console.log(Boolean(-1)) // true
  console.log(Boolean([]))  // true
  console.log(Boolean([12])) // true
  console.log(Boolean([12, 34])) // true
  console.log(Boolean({})) // true
  console.log(Boolean({ name: 'sai' })) // true
  ```

- !：取反(先转为布尔，然后取反)
  !!： 取反再取反，只相当于转换为布尔<=> Boolean

  ```js
  console.log(!1) // false
  console.log(!!1) // true
  ```

- 如果条件只是一个值，不是== / === /!= / >= 等这些比较，是要把这个值先转换为布尔类型，然后验证真假

  ```js
  if (1) { // Boolean(1)
      console.log('true') // true
  }
  
  if ('3px' + 3) {
      console.log('true') // true
  }
  
  if ('3px' - 3) { // NaN
      console.log('false') // 不会输出
  }
  ```




### null & undefined

null和undefined都代表的是没有



- null: 意料之中(一般都是开始不知道值，我们手动先设置为null, 后期再给予赋值操作)

  - 一 般最好用null 作为初始的空值，因为零不是空值，他在栈内存中有自己的存储空间(占了位置)

    ```js
    let num = null // null是不占据空间的
    // let num = 0 // 0是占据空间的
    
    // ...
    num = 12
    ```

- undefined: 意料之外(不是我能决定的)

  - 创建一一个变量没有赋值，默认值是undefined

    ```js
    let num
    ```



### 对象数据类型

#### 普通对象

> {[key]: [value], ...} 任何一个对象都是由零到多组键值对(属性名:属性值)组成的(并且属性名不能重复)

- 定义对象

  ```js
  let person = {
      name: 'sai',
      age: 18,
      height: '185CM',
      weight: '80KG',
      1: 100
  }
  ```

- 获取属性名对应的属性值

  ```js
  // 获取属性名对应的属性值
  // 对象.属性名
  // 对象[属性名] 属性名是数字或者字符串格式的
  // 如果当前属性名不存在，默认的属性值是undefined
  // 如果属性名是数字，则不能使用点的方式获取属性值
  
  console.log(person.name) // sai
  console.log(person['age']) // 18
  console.log(person.sex) // undefined
  console.log(person[1]) // 100
  // console.log(person.1) // Uncaught SyntaxError: missing ) after argument list 
  ```

- 设置属性名属性值

  ```js
  // 设置属性名属性值
  // 属性名不能重复，如果属性名已经存在，不属于新增属于修改属性值
  
  person.GF = 'igo'
  person.name = 'akira'
  console.log(person['GF']) // igo
  console.log(person['name']) // akira
  ```

- 删除属性

  ```js
  console.log(person) // {1: 100, name: 'akira', age: 18, height: '185CM', weight: '80KG', GF: 'igo'}
  // 删除属性
  // 真删除：把属性彻底干掉
  delete person[1]
  // 假删除：属性还在，值为空
  person.weight = null
  console.log(person) // {name: 'akira', age: 18, height: '185CM', weight: null, GF: 'igo'}
  ```

#### 特殊对象

##### 数组

数组是特殊的对象数据类型

- 属性名是数字，从0开始逐级递增（索引）
- 多了一个length属性

```js
let arr = [12, 'haha', true, 13]
console.log(arr)
```

![image-20220922053400732](image-20220922053400732.png)



- 我们中括号中设置的是属性值，它的属性名是默认生成的数字，从零开始递增，而且这个数字代表每一项的位置，我们把其成为“索引”=>从零开始，连续递
  增，代表每一-项位置的数字属性名

- 天生默认-一个属性名length ，存储数组的长度

  ```js
  let arr = [12, 'haha', true, 13]
  console.log(arr)
  console.log(arr.length) // 4
  console.log(arr['length']) // 4
  console.log(arr[1]) // haha
  console.log(arr[arr.length - 1]) // 13
  // 向数组末尾追加内容
  arr[arr.length] = 100
  console.log(arr) // [12, 'haha', true, 13, 100]
  ```



## 数据类型堆栈底层机制

```js

let a = 12;
let b = a;
b = 13;
console.log(a); // 12

let n = {
    name: 'sai'
};
let m = n;
m.name = 'sai2'
console.log(n.name); // sai2

```

浏览器想要执行JS代码:

1.从电脑内存中分配出一块内存，用来执行代码(栈内存=>Stack)

- 执行代码、存储变量和基本类型值
- js中的赋值，是关联引用模式，而不是拷贝模式

2.分配一个主线程用来自上而下执行JS代码



`let a = 12;`

1. 创建变量a，放到当前栈内存变量存储区域中

2. 创建一个值12 ,把它存储到当前栈内存值区域中（简单的基本类型值是这样存储的,复杂的引用类型值不是这样做的）

   复杂值(引用类型值)的存储,又分成了三个步骤:	

   1. 在内存中分配出一块新内存,用来存储引用类型值(堆内存=>heap) =>内存有一个16进制地址
   2. 把对象中的键值对(属性名:属性值)依次存储到堆内存中
   3. 把堆内存地址和变量关联起来

3. =为赋值，其实赋值是让变量和值相互关联的过程



基本类型：按值操作(直接操作的是值) ,所以也叫作值类型

引用类型：操作的是堆内存的地址(按引用地址操作的)

练习：

```js
let n = [10, 20]; // 0x100
let m = n; // 0x100
let x = m; // 0x100
m[0] = 100; // [100, 20] 0x100
x = [30, 40]; // 0x200
x[0] = 200; // [200, 40] 0x200
m = x; // 0x200
m[1] = 300; // [200, 300] 0x200
n[2] = 400; // [100, 20, 400]
console.log(n, m, x) // [100, 20, 400], [200, 300], [200, 300]
```

# 面试题

## 数据类型面试题

```js
let a = {
    n: 1
};
let b = a;
a.x = a = {
    n: 2
};
console.log(a.x); // undefined
console.log(b) // {n: 1, x: {n: 2}}
```

操作符的优先级：[js运算符优先级 ](https://www.cnblogs.com/liyongquan/p/9359523.html)

![堆栈内存图01](2022年9月24日.png)

- 成员访问的优先级为18，赋值的优先级为3

```js
var a = 'abc' + 123 + 456;
var b = '456' - '123';
var c = 100 + true + 21.2 + null + undefined + "Tencent" + [] + null + 9 + false;
console.log(a, b, c)
```



























































































































