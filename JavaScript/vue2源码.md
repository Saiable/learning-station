---
title: Vue2源码
date: 2022-7-01 06:40:42
cover: false
tags:
  - Vue2
  - 源码
typora-root-url: vue2源码
---



[TOC]



# 教程一

## 大纲

**第一周**（从零手写`Vue2`部分）https://www.bilibili.com/video/BV1mR4y1w7cU

- `Vue2`响应式原理，模板编译原理，虚拟`Dom`原理，`Vue`初渲染流程
- `Vue2`中生命周期原理，`mixin`原理，依赖收集`Watcher`、`Dep`原理
- 手写`computed`及`watch`原理，异步更新原理
- 手写`Vue2`中组件渲染原理、`Vue.extend`原理，`Vue2diff`算法

> 目标：掌握`Vue2`**核心源码及核心设计思想**



**第二周**（从0手写`VueRouter`及`Vuex`）

- 掌握`HashHistory`、`BrowserHistory`及路由钩子实现原理，及`RouterView`、`RouterLink`组件实现
- 从0实现`Vuex`，彻底掌握`Vuex`设计思想

> 目标：掌握前端路由实现原理及状态管理实现原理



**第三周**

- 剖析`Vue2`源码，调试`Vue2`核心源码
- `Vue2`常见面试题解析

> 目标：掌握如何阅读框架源码，掌握`Vue`相关面试题



**第四周**（`TS`详解、掌握`TS`核心应用）

- `TS`环境搭建、基础类型、类型推导、类
- 接口、泛型、`TS`兼容性
- 类型保护、高级类型、模块命名空间等

> 目标：掌握`TS`的使用为学习`Vue3`做准备



**第五周**（`Vue3`核心讲解）

- 掌握`Vue3`核心语法及组件化开发，`Vue3`新特性和新增`API`
- `Vue3 + Vite`掌握`VueRouter4`及`Vuex4`应用，`element-plus`组件库使用
- `Vue3 + TS`后台管理系统项目实战（一）

> 目标：快速上手`Vue3`，利用`Vue3 + TS`开发项目



**第六周**（`Vue3`项目实战）

- `Vue3 + TS`后台管理系统项目实战（二）
- `Vue3 + TS`后台管理系统项目实战（三）
- 从零实现`Vite`，掌握`Vite`原理
- `Vue3`源码剖析，从零实现`Vue3`源码
- 从零搭建`Vue3`组件库

## **第一周**（从零手写`Vue2`部分）

### 使用`Rollup`搭建开发环境

不是重点，只会搭建最简单的环境方便编写`vue`代码

一般类库的打包，会用`rollup`，打包的体积相较`webpack`会更小，因为`rollup`更专注一些，主要用来打包`js`

新建文件夹`VUE2-STAGE`

```bash
npm init
# 一路回车

npm i rollup rollup-plugin-babel @babel/core @babel/preset-env -D

# 安装rollup
npm i rollup 

# 安装babel，将高级语法转换成低级语法
npm i rollup-plugin-babel

# 安装babel的核心模块
npm i @babel/core

# 安装预设(比如说怎么把let、const转换成var)
npm i @babel/preset-env

```

实操注意点：

提示`rollup-plugin-babel`不更新维护了

```bash
[root@VM-4-12-centos VUE2_STAGE]# npm i rollup rollup-plugin-babel @babel/core @babel/preset-env -D
npm WARN deprecated rollup-plugin-babel@4.4.0: This package has been deprecated and is no longer maintained. Please use @rollup/plugin-babel.
```

解决办法：

卸载`rollup-plugin-babel`：

```bash
npm uninstall rollup-plugin-babel
```

安装推荐的包

```bash
npm i @rollup/plugin-babel -D
```

安装完毕后的包信息：

```json
{
  "name": "vue2_stage",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.18.6",
    "@babel/preset-env": "^7.18.6",
    "@rollup/plugin-babel": "^5.3.1",
    "rollup": "^2.75.7"
  }
}

```

根目录`VUE2-STAGE`新建`rollup`配置文件`rollup.config.js`

```js
// rollup 默认可以导出一个对象，作为打包的配置文件

import babel from  '@rollup/plugin-babel'
export default {
    input: './src/index.js', // 入口
    output: {
        file: './dist/vue.js', // 出口
        name: 'Vue', // 在global全局上，增添一个Vue对象，我们就可以new Vue了（global.Vue）
        format: 'umd', // options: 1.esm es6模块，相当于没有打包了 2.commonjs node中使用 3.iife 自执行函数 4.umd 兼容amd和commonjs
        sourcemap: true // 可以调试源代码
    },
    plugins: [
        // 需要新建babel的配置文件，既可以是js文件，也可以是.rc文件,
        // 这里和视频的保持一致
        babel({
            exclude: 'node_modules/**', // 排除第三方模块 ，**表示任意文件夹
            babelHelpers: 'bundled' // https://www.npmjs.com/package/@rollup/plugin-babel  搜索babelHelpers 
        }) // 所有的插件都是函数
    ]
}
```



根目录新建`.babelrc`文件

```json
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

配置较少的话，也可以直接写在`rollup.config.js`中



在`package.json`中添加`npm run dev`脚本

`-c`：指定默认的配置文件

`-w`：监视文件变化

```json
// ...
  "scripts": {
    "dev": "rollup -cw"
  },
// ...
```



根目录新建打包入口文件`src/index.js`

```js
export const a = 100
export default {
    a: 1
}

```



测试能否打包

```bash
npm run dev
```

成功显示如下信息

```bash
[root@VM-4-12-centos VUE2_STAGE]# npm run dev

> vue2_stage@1.0.0 dev
> rollup -cw
rollup v2.75.7
bundles ./src/index.js → dist/vue.js...
created dist/vue.js in 304ms

[2022-06-30 17:36:35] waiting for changes...

```

根目录下会生成之前配置的目录及文件夹

```bash
[root@VM-4-12-centos VUE2_STAGE]# tree ./dist/
./dist/
|-- vue.js
`-- vue.js.map
```



`index.js`对应的打包文件

```js
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Vue = {}));
})(this, (function (exports) { 'use strict';

    var a = 100;
    var index = {
      a: 1
    };

    exports.a = a;
    exports["default"] = index;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=vue.js.map

```



可以新建`index.html`并引入该打包文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
<script src="vue.js"></script>
<script>
  console.log(Vue)
</script>
</body>
</html>
```

全局上多了一个`Vue`的对象，升上的属性就是我们导出的，效果如下：

![image-20220630185136069](image-20220630185136069.png)



`index.js`中也可以设置断点，进行调试

```js
export const a = 100
debuger
export default {
    a: 1
}
```

已完成：

- [x] 1.使用`Rollup`搭建开发环境

### 初始化数据

响应式数据的核心？数据变化了，我可以监控到

监控的是什么呢？是数据的**取值**和**更改值**

监控到然后干嘛呢？更新视图

满足上面要求的数据，就是响应式数据。简单点来说，响应式数据变化可以更新视图



不考虑工程化开发，当初在`html`中我们是这么写`Vue`代码的

把所有需要的数据，都放在配置对象里

```html
<script src='vue.js'></script>
<script>
	const vm = new Vue({
        data: {
            name: 'sai',
            age: 18
        }
    })
</script>
```



> Tips：`Vue2`中没有用类的写法，因为类的方法如果有很多，就都耦合在一起了，函数的写法直接`Vue.prototype`就可以了（虽然类也可以Vue.prototype这样写，但一般不会这样搞）
>
> ```js
> function Vue() {
>     
> }
> 
> Vue.prototype.a = function(){}
> Vue.prototype.b = function(){}
> Vue.prototype.c = function(){}
> 
> export default Vue
> ```
>
> 并且可以将扩展的功能单独放在一个文件中，方便管理



那么现在要干嘛呢？

模拟实现`Vue`的功能

`index.js`

`options`就是用户传入的选项，拿到`options`后，肯定要处理下的

我们给原型对象上添加个`_init`方法，专门用来做初始化

```js
function Vue(options) { // options就是用户的选项
    // 拿到用户的options，做一下初始化
    this._init(options)
}

// 用于初始化操作
Vue.prototype._init = function(options) {

}

export default Vue
```

但是不能都写在`index.js`里，不然代码一多就完犊子了

新建`src/init.js`

```js
// 用于初始化操作
Vue.prototype._init = function(options) {

}
```

问题来了，这个时候`Vue`就丢失了，咋整？

可以把初始化操作，封装成函数并导出，这个函数接收一个形参

`init.js`

```js
// 就是给Vue增加_init方法的
export function initMixin(Vue) {
    // 用于初始化操作
    Vue.prototype._init = function(options) {

    }
}
```

在`index.js`就可以传入实参`Vue`使用了

```js
function Vue(options) { // options就是用户的选项
    // 拿到用户的options，做一下初始化
    this._init(options)
}

// 给Vue增加init方法
initMixin(Vue) // 扩展了init方法

export default Vue
```

`initMixin`相当于扩展了`_init`方法，后续再有逻辑，可以再`initXXX(xxx)`，就可以原型方法，扩展成一个个函数，通过函数的形式在原型上扩展功能

靠谱！！！

需要把`options`扩展到`vm`实例上，为什么不直接用呢？

- 或许扩展的第二个方法，怎么拿到`options`呢，只有通过实例来传递

看下面的代码：

`init.js`

```js
export function initMixin(Vue) {
    Vue.prototype._init = function(options) {
    	this.$options = options // Vue中采取$作为自己的变量，如果传入了形如$name这样的以$开头的变量，是不会被Vue实例管理的（Vue给自己画了个界限，所有以$开头的，都认为是自己的属性）
        debugger
    }
    // Vue.prototype.xxx = function() {
        // 扩展的第二个方法，怎么拿到options呢，只有通过实例来传递
    // }
}

```

可以看到，此时`Vue`上多了`$options`属性

![image-20220702210913280](image-20220702210913280.png)



写法优化

```js
export function initMixin(Vue) {
    Vue.prototype._init = function(options) {
        const vm = this // 保留下this，不然后面一直写this，写法上有点恶心
        vm.$options = options // 将用户的选项挂载到实例上
      	debugger      

    }
}
```

`this`和`vm`都指向`Vue`实例

![image-20220702211212033](image-20220702211212033.png)



挂载完`options`之后，干嘛呢？

我们不是传入了`data`这些配置项嘛，要进行初始化状态，`Vue`中的状态有很多，如`props/data/computed/watch`等等配置项，这些都是要初始化的

```js
export function initMixin(Vue) {
    Vue.prototype._init = function(options) {
        const vm = this
        vm.$options = options
            
        // 初始化状态 data/computed/watch等等配置项
    	initState(vm)
        // 初始化状态之后，还要去编译模板、创建虚拟dom等
    }
}

function initState(vm) {
    const opts = vm.$options // 获取所有的选项
    // 拿到所有的选项之后，我们先处理`data`
    // 一项项的来处理
    // 在`data`之前处理`props`，但目前我们先只处理data
    //if(opts.props) {
    //    initProps()
    //}
    
    // 处理`data`
    if(opts.data) {
        initData(vm)
    }
}

function initData(vm) {
    // 代理数据
    let data = vm.$options.data // data有两种情况，对象或函数
    console.log(this) // 这里的this是undefined
    data = typeof data === 'function' ? data.call(this) : data // 对data类型进行判断后，拿到data
	debugger
}
```

![image-20220704063245372](image-20220704063245372.png)



将`initState`和`initData`这两个初始化数据的方法，单独抽出来，放到`state.js`中

```js
export function initState(vm) {
    const opts = vm.$options
    if(opts.data) {
        initData(vm)
    }
}

function initData(vm) {
    let data = vm.$options.data // data可能是函数或对象
    data = typeof data === 'function' ? data.call(vm) : data
    debugger
}
```

至此，状态初始化中的数据初始化，已经完成了第一步，拿到用户自定义配置

> 本小节技能点需完善的地方
>
> - 浏览器控制台调试大全
> - `js`中`this`的系列问题
> - `js`中的`call`方法

下一小节，实现对象的响应式原理

### `Vue`响应式原理实现

#### 对象属性劫持

对数据进行劫持

`vue2`中采用了`defineProperty`

我们定义一个方法`obeserve`观测数据，这是一个核心模块，我们单独新建observe文件夹进行处理

`state.js`

```js
import {observe} from "./observe/index"
// ...
function initData(vm) {
    let data = vm.$options.data
    data = typeof data === 'function' ? data.call(vm) : data
    // 对数据进行劫持,vue2中采用了defineProperty
    // 定义一个方法obeserve观测数据，这是一个核心模块，我们单独新建observe文件夹进行处理
    observe(data)
}
```

新建`src/observe/index.js`

```js
export function observe(data) {
    console.log(data)
    debugger
}
```

`observe`中可以拿到`data`数据

![image-20220710111903316](image-20220710111903316.png)



##### 实现对象属性劫持

在`observe`方法中对对象类型的数据进行劫持

- 先对传入的数据类型进行判断，只对对象进行劫持
- 如果一个对象被劫持过了，那就不需要再被劫持了
  - 要判断一个对象是否被劫持过
    - 可以添加一个实例，用实例来判断是否被劫持过。
    - 在`observe`函数中新建`Observer`类，这个类是专门用来观测数据的，如果数据被观测过，那么它的实例就是这个类？？
      - 这里看不明白，可以直接先往下看，到具体代码那儿就清楚了

`observe/index.js`

```js
class Observer {
    constructor(data) {

    }
}

export function observe(data) {
    console.log(data)
    // 对data类型进行判断
    if(typeof data !== 'object' || data == null) {
        return // 只对对象进行劫持
    }

    // 如要考虑到一个对象已经被劫持的情况
    // 如果一个对象已经被劫持过了，那么就不需要再被劫持
    // 可以添加一个实例，用实例来判断是否被劫持过（应该是用实例身上的属性）
    return new Observer(data)
}
```

问题：`Object.defineProperty`只能劫持已经存在的数据，后增的或者删除的属性，是劫持不到的（为此`Vue2`单独写了一些`api`，比如说`$set`、`$delete`）

- `Observer`类型中，要遍历对象
  - 可以专门写个`walk`方法来干这件事，循环对象，对属性依此劫持
  - 拿到所有的`key`后遍历，“重新”定义属性（重新定义的话，相当于每个`key`都要遍历，这也是`Vue2`性能较差的原因）
    - 定义`defineReactive`方法，实现将某个对象数据定义成响应式
    - 该方法需要后面可以单独使用，所以写在`Observer`同级，并导出

`observer/index.js`

```js
class Observer {
    constructor(data) {
        this.walk(data)
    }

    walk(data) { // 循环对象，对属性依此劫持
        // 重新定义属性 性能差
        Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
    }
}

// 向外导出该方法，供单独使用
export function defineReactive(target, key, value) { // 闭包
    Object.defineProperty(target, key, {
        get() { // 取值的时候，会执行get
            return value
        },
        set(newValue) { // 修改值的时候，会执行set
            if(value == newValue) return
            value = newValue
        }
    })
}
// ...
```

我们在使用的时候，打印下`vm`实例

`index.html`

```html
  <script src="./vue.js"></script>
  <script>
    const vm = new Vue({
        data() {
            return {
                name: 'sai',
                age: 11
            }
        }
    })
    console.log(vm)
  </script>
```

![image-20220711065304265](image-20220711065304265.png)

虽然定义了响应式，但此时`vm`实例上直接是拿不到`data`的

我们可以在`state.js`的`initData`中，在`vm`身上增加`_data`属性，将`data`赋值给`vm._data`（在观测属性之前）

`state.js`

```js
// ...
function initData(vm) {
    let data = vm.$options.data
    data = typeof data === 'function' ? data.call(vm) : data

    // 观测之前，把data放一份到vm._data身上
    vm._data = data
    observe(data)
}
```

此时`vm`身上就有了`_data`，存着`data`的响应式数据

![image-20220711065849648](image-20220711065849648.png)

思考：`vm._data=data`是在做观测数据之前存的，为啥`_data`也变成了响应式的呢？

- 直接赋值是浅拷贝，`_data`和`data`变量中存的是对象值在堆内存中的引用地址
- 原对象的值变了，但`_data`中存的引用地址没有变
- 所以即使是后做的响应式，`vm._data`自然也是响应式的了
- 观测数据之后，进行赋值也不是不可以

##### 用户用法简化

现在还有个小问题，就是取数的时候，要写成`vm._data.name`，每次都要加个`_data`，有点恶心

我们能不能直接`vm.name`去取值呢

- 当用户在`vm.name`上取值时，我们就代理到`vm._data.name`上
- 将`vm._data`用`vm`来代理
  - 依旧是做一个循环来处理
  - 自定义`proxy`方法：`proxy(vm, '_data')`，代理`vm`身上的`_data`

`state.js`

```js
// ...
function proxy(vm, target, key) {
    Object.defineProperty(vm, key, { // vm.name
        get() {
            return vm[target][key] // vm.name实际上是去vm._data.name上去取值了
        }
    })
}

function initData(vm) {
    let data = vm.$options.data
    data = typeof data === 'function' ? data.call(vm) : data
    
    vm._data = data
    
    observe(data)


    // 将vm._data用vm来代理
    for (let key in data) {
        proxy(vm, '_data', key)
    }
}
```

![image-20220711144219711](image-20220711144219711.png)

我们先写`get`方法，可以看到`vm`代理了`vm._data`，身上有了`name`和`age`属性

同样，在设置值时也要加个代理

`state.js`

```js
// ...

function proxy(vm, target, key) {
    Object.defineProperty(vm, key, { // vm.name
        get() {
            return vm[target][key] // vm.name实际上是去vm._data.name上去取值了
        },
        set(newValue) {
            vm[target][key] = newValue // 这性能的确不太好，每一个`key`都加了一层
        }
    })
}

// ...
```

![image-20220711145232926](image-20220711145232926.png)

此时写法上就可以更便捷的取值及修改值了

##### 嵌套对象属性劫持

还有个问题：上面的写法只会监测到对象的第一层，一旦传入的`data`是嵌套的，里面的属性并没有被监测到

如下所示，`address`内部属性并没有被劫持

`index.html`

```html
  <script src="./vue.js"></script>
  <script>
    const vm = new Vue({
        data() {
            return {
                name: 'sai',
                age: 11,
                address: {
                    street: 'RoadA',
                    room: 123
                }
            }
        }
    })
    console.log(vm.name)
  </script>
```

![image-20220711145822997](image-20220711145822997.png)

当初的`defineReactive`函数，入参的`value`可能是个对象

- 再次调用`observe`方法，如果`value`是个对象，会再次创建Observer实例，再次调用walk方法，劫持每个属性
- 这样就实现了对所有的对象，都进行了属性劫持
- 是个递归，性能消耗也是可以的

`observe/index.js`

```js
class Observer {
    constructor(data) {
        this.walk(data)
    }

    walk(data) {
        Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
    }
}

export function defineReactive(target, key, value) { // value可能是个对象
    observe(value) // observe内部对value进行判断了，是个对象，会再次创建Observer实例，再次调用walk方法，劫持每个属性
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            if(value == newValue) return
            value = newValue
        }
    })
}

export function observe(data) {

    if(typeof data !== 'object' || data == null) {
        return
    }

    return new Observer(data)
}
```

此时不管传入的是几层，对象属性都是被劫持过了的

![image-20220711151136480](image-20220711151136480.png)



至此，对象属性劫持的`define`核心逻辑就完成了

- 循环对象，给对象用`defineReactive`方法，把属性重新定义
  - 如果值还是对象的话，需要对这个对象进行递归操作
  - 这个用户在取值和修改值时，就可以监控到
- 对象被劫持完之后，为了方便用户获取，把`data`放在了`vm._data`上
  - 再用`vm`代理`vm._data`，这样用户在取值和修改值时，只要写成`vm.name`即可

已完成：

- [x] 1.使用`Rollup`搭建开发环境
- [x] 2.`Vue`响应式原理实现，对象属性劫持，深度属性劫持

#### 数组的方法劫持

如果`data`里面还有数组呢

`index.html`

```html
  <script src="./vue.js"></script>
  <script>
    const vm = new Vue({
        data() {
            return {
                name: 'sai',
                age: 11,
                address: {
                    street: 'RoadA',
                    room: 123
                },
                hobby: [ // data中含有数组
                    'eat',
                    'drink'
                ]
            }
        }
    })
    console.log(vm.name)
  </script>
```

我们看一下打印结果

![image-20220711161920103](image-20220711161920103.png)

`defineProperty`把数组里的每个属性，都增加了`get`、`set`，虽然通过`vm.hobby[0]`取值时，的确会被监测到，但是一旦数据量大了，就很消耗内存了

并且通过下标的方式来修改值，如修改第888个数组的值，`vm.hobby[888]=123`，一般也不会有这种操作

修改数组，很少用索引来修改数组，并且内部劫持数组，会浪费性能

用户一般都是都过方法来修改数组：`push`、`shift`等等

在`observe/index.js`里的`Observer`类的构造函数中

- 对数组类型进行判断
  - 如果是数组
    - 重写数组的方法，7个变异方法（可以修改数组本身的方法）
    - 如果数组内部，还嵌套有对象，如`hobby:['eat','drink',{a:1}]`也应该对对象属性进行劫持
      - 定义`observeArray`方法，实现该功能
        - 循环传入的`data`，递归调用`observe`方法
  - 如果不是数组
    - 继续之前的逻辑，添加代理

##### 数组中的对象属性劫持

定义`observeArray`方法，对数组中的对象进行属性劫持

`observe/index.js`

```js
class Observer {
    constructor(data) {
        if(Array.isArray(data)) {
            // 这里我们可以重写数组的7个变异方法（可以修改数组本身）
            this.observeArray(data) // 递归处理数组中的对象
        } else {
            this.walk(data)
        }
    }

    walk(data) {
        Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
    }
    
    observeArray(data) {
        data.forEach(item => observe(item)) 
    }
}

// ...
```

打印结果如下：

![image-20220711164236905](image-20220711164236905.png)

我们在`defineReactive`的函数的`get`中添加打印语句：`console.log('key', key)`

然后在样例中取数`vm.hobby[2].a`

打印结果如下：

![image-20220711165311701](image-20220711165311701.png)

表示先取了`hobby`，再取了`a`，说明数组中的对象，是可以被监控到的

##### 数组的方法劫持

如果是`vm.hobby.push['1']`，会打印了`hobby`，说明目前只能监控到`get`，无法监控到修改

所以就需要重写数组的方法

- 在传入的`data`对应的`__proto__`属性中，重写各个数组方法

  - 给当前数组的的原型链，重新指向新的原型（也会覆盖掉`forEach`方法，可以先注释掉`observeArray`方法的调用）

    `observe/index.js`

    ```js
    class Observer {
        constructor(data) {
            if(Array.isArray(data)) {
                // 这里我们可以重写数组的7个变异方法（可以修改数组本身）
                data.__proto__ = {
                    push() {
                        console.log('重写的push')
                    }
                }
                // this.observeArray(data) // 递归处理数组中的对象
            } else {
                this.walk(data)
            }
        }
    
        walk(data) {
            Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
        }
        observeArray(data) {
            data.forEach(item => observe(item))
        }
    }
    // ...
    ```

    打印如下：

    ![image-20220712054236080](image-20220712054236080.png)

当然我们不可能直接这样重写`__proto__`，我们需要保留数组原有的特性，并且可以重写部分方法，`observe`文件夹下新建`array.js`

`observe/array.js`



### 模板编译原理

#### 将模板转换成`ast`语法树



#### 代码生成，实现虚拟`DOM`



#### 通过虚拟`DOM`生成真实`DOM`















































# 教程二

地址：[blog/精通 Vue 技术栈的源码原理 at main · liyongning/blog (github.com)](https://github.com/liyongning/blog/tree/main/精通 Vue 技术栈的源码原理)

## 搭建vue开发环境

### 下载及安装配置

下载链接：https://github.com/vuejs/vue



下载后，执行`npm i`安装依赖



修改`package.json`如下依赖，`scripts` 中的 `dev` 命令中添加 `--sourcemap`，这样就可以在浏览器中调试源代码时，查看当前代码在源代码中的位置：

```json
{
  "scripts": {
    "dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev"
  }
}
```



### 概念扫盲

`npm run build`后的打包文件：

|                               | UMD                | CommonJS                   | ES Module          |
| ----------------------------- | ------------------ | -------------------------- | ------------------ |
| **Full**                      | vue.js             | vue.common.js              | vue.esm.js         |
| **Runtime-only**              | vue.runtime.js     | vue.runtime.common.js      | vue.runtime.esm.js |
| **Full (production)**         | vue.min.js         | vue.common.prod.js         |                    |
| **Runtime-only (production)** | vue.runtime.min.js | vue.runtime.common.prod.js |                    |

- **Full**：这是一个全量的包，包含编译器（`compiler`）和运行时（`runtime`）。
- **Compiler**：编译器，负责将模版字符串（即你编写的类 html 语法的模版代码）编译为 JavaScript 语法的 render 函数。
- **Runtime**：负责创建 Vue 实例、渲染函数、patch 虚拟 DOM 等代码，基本上除了编译器之外的代码都属于运行时代码。
- **UMD**：兼容 CommonJS 和 AMD 规范，通过 CDN 引入的 vue.js 就是 UMD 规范的代码，包含编译器和运行时。
- **CommonJS**：典型的应用比如 nodeJS，CommonsJS 规范的包是为了给 browserify 和 webpack 1 这样旧的打包器使用的。他们默认的入口文件为 `vue.runtime.common.js`。
- **ES Module**：现代 JavaScript 规范，ES Module 规范的包是给像 webpack 2 和 rollup 这样的现代打包器使用的。这些打包器默认使用仅包含运行时的 `vue.runtime.esm.js` 文件。



**运行时（Runtime）+ 编译器（Compiler） vs. 只包含运行时（Runtime-only）**

如果你需要动态编译模版（比如：将字符串模版传递给 `template` 选项，或者通过提供一个挂载元素的方式编写 html 模版），你将需要编译器，因此需要一个完整的构建包。

当你使用 `vue-loader` 或者 `vueify` 时，`*.vue` 文件中的模版在构建时会被编译为 JavaScript 的渲染函数。因此你不需要包含编译器的全量包，只需使用只包含运行时的包即可。

只包含运行时的包体积要比全量包的体积小 30%。因此尽量使用只包含运行时的包，如果你需要使用全量包，那么你需要进行如下配置：

**webpack**

```javascript
module.exports = {
  // ...
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}
```

**Rollup**

```javascript
const alias = require('rollup-plugin-alias')

rollup({
  // ...
  plugins: [
    alias({
      'vue': 'vue/dist/vue.esm.js'
    })
  ]
})
```

**Browserify**

Add to your project's `package.json`:

```json
{
  // ...
  "browser": {
    "vue": "vue/dist/vue.common.js"
  }
}
```



### 目录结构

```
├── benchmarks                  性能、基准测试
├── dist                        构建打包的输出目录
├── examples                    案例目录
├── flow                        flow 语法的类型声明
├── packages                    一些额外的包，比如：负责服务端渲染的包 vue-server-renderer、配合 vue-loader 使用的的 vue-template-compiler，还有 weex 相关的
│   ├── vue-server-renderer
│   ├── vue-template-compiler
│   ├── weex-template-compiler
│   └── weex-vue-framework
├── scripts                     所有的配置文件的存放位置，比如 rollup 的配置文件
├── src                         vue 源码目录
│   ├── compiler                编译器
│   ├── core                    运行时的核心包
│   │   ├── components          全局组件，比如 keep-alive
│   │   ├── config.js           一些默认配置项
│   │   ├── global-api          全局 API，比如熟悉的：Vue.use()、Vue.component() 等
│   │   ├── instance            Vue 实例相关的，比如 Vue 构造函数就在这个目录下
│   │   ├── observer            响应式原理
│   │   ├── util                工具方法
│   │   └── vdom                虚拟 DOM 相关，比如熟悉的 patch 算法就在这儿
│   ├── platforms               平台相关的编译器代码
│   │   ├── web
│   │   └── weex
│   ├── server                  服务端渲染相关
├── test                        测试目录
├── types                       TS 类型声明
```



## Vue初始化过程

### 目标

深入理解 Vue 的初始化过程，再也不怕 面试官 的那道面试题：`new Vue(options) `发生了什么？

### 找入口

想知道 `new Vue(options)` 都做了什么，就得先找到 Vue 的构造函数是在哪声明的，有两个办法：

- 从 rollup 配置文件中找到编译的入口，然后一步步找到 Vue 构造函数，这种方式 **费劲**
- 通过编写示例代码，然后打断点的方式，一步到位，**简单**

我们就采用第二种方式，写示例，打断点，一步到位。

- 在 `/examples` 目录下增加一个示例文件 —— `test.html`，在文件中添加如下内容：

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Vue 源码解读</title>
  </head>
  <body>
    <div id="app">
      {{ msg }}
    </div>
    <script src="../dist/vue.js"></script>
    <script>
      debugger
      new Vue({
        el: '#app',
        data: {
          msg: 'hello vue'
        }
      })
    </script>
  </body>
  </html>
  ```

- 在浏览器中打开控制台，然后打开 `test.html`，则会进入断点调试，然后找到 Vue 构造函数所在的文件

