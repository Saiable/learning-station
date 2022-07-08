[TOC]



# JavaScript基础

## ECMAScript

## BOM

## DOM

# jQuery

## jQuery - AJAX

### jQuery - AJAX 简介

简短地说，在不重载整个网页的情况下，AJAX 通过后台加载数据，并在网页上进行显示。

 **如果没有 jQuery，AJAX 编程还是有些难度的。**

编写常规的 AJAX 代码并不容易，因为不同的浏览器对 AJAX 的实现并不相同。这意味着您必须编写额外的代码对浏览器进行测试。不过，jQuery 团队为我们解决了这个难题，我们只需要一行简单的代码，就可以实现 AJAX 功能。

 [jQuery AJAX 简介](https://www.runoob.com/jquery/jquery-ajax-intro.html)

[jQuery – AJAX get() 和 post() 方法](https://www.runoob.com/jquery/jquery-ajax-get-post.html) 

### jQuery - AJAX load() 方法

load() 方法从服务器加载数据，并把返回的数据放入被选元素中。

`$(selector).load(URL,data,callback);`

必需的 *URL* 参数规定您希望加载的 URL。

可选的 *data* 参数规定与请求一同发送的查询字符串键/值对集合。

可选的 *callback* 参数是 load() 方法完成后所执行的函数名称。

```javascript
$(document).ready(function(){
	$("button").click(function(){
		$("#div1").load("/try/ajax/demo_test.txt");
	});
});
```

下面的例子把 "demo_test.txt" 文件中 id="p1" 的元素的内容，加载到指定的` <div> `元素中：

```javascript
$("#div1").load("demo_test.txt #p1");
```

回调函数可以设置不同的参数：

- *responseTxt* - 包含调用成功时的结果内容
- *statusTXT* - 包含调用的状态
- *xhr* - 包含 XMLHttpRequest 对象

```javascript
$("button").click(function(){
  $("#div1").load("demo_test.txt",function(responseTxt,statusTxt,xhr){
    if(statusTxt=="success")
      alert("外部内容加载成功!");
    if(statusTxt=="error")
      alert("Error: "+xhr.status+": "+xhr.statusText);
  });
});
```

为了避免多页面情形下的代码重复，可以利用 load() 方法，将重复的部分（例如导航栏）放入单独的文件，使用下列方法进行导入：

```javascript
//1.当前文件中要插入的地方使用此结构：
<div class="include" file="***.html"></div>

//2.***.html中放入内容，用html格式仅仅因为会有编辑器的书写辅助。。

//3.代码：
$(".include").each(function() {
    if (!!$(this).attr("file")) {
        var $includeObj = $(this);
        $(this).load($(this).attr("file"), function(html) {
            $includeObj.after(html).remove(); //加载的文件内容写入到当前标签后面并移除当前标签
        })
    }
});
或者在index文件里只写重复部分，剩下的一股脑放各自单独文件 load() 进来~
```

### jQuery - AJAX get() 和 post() 方法

两种在客户端和服务器端进行请求-响应的常用方法是：GET 和 POST。

- *GET* - 从指定的资源请求数据
- *POST* - 向指定的资源提交要处理的数据

GET 基本上用于从服务器获得（取回）数据。注释：GET 方法可能返回缓存数据。

POST 也可用于从服务器获取数据。不过，POST 方法不会缓存数据，并且常用于连同请求一起发送数据。

$.get() 方法通过 HTTP GET 请求从服务器上请求数据。

`$.get(URL,callback);`

```javascript
$("button").click(function(){
  $.get("demo_test.php",function(data,status){
    alert("数据: " + data + "\n状态: " + status);
  });
});
```

$.get() 的第一个参数是我们希望请求的 URL（"demo_test.php"）。

第二个参数是回调函数。第一个回调参数存有被请求页面的内容，第二个回调参数存有请求的状态。

$.post() 方法通过 HTTP POST 请求向服务器提交数据。

`$.post(URL,data,callback);`

```javascript
$("button").click(function(){
    $.post("/try/ajax/demo_test_post.php",
    {
        name:"菜鸟教程",
        url:"http://www.runoob.com"
    },
    function(data,status){
        alert("数据: \n" + data + "\n状态: " + status);
    });
});
```

$.post() 的第一个参数是我们希望请求的 URL ("demo_test_post.php")。

然后我们连同请求（name 和 url）一起发送数据。

"demo_test_post.php" 中的 PHP 脚本读取这些参数，对它们进行处理，然后返回结果。

第三个参数是回调函数。第一个回调参数存有被请求页面的内容，而第二个参数存有请求的状态。

**提示：** 这个 PHP 文件 ("demo_test_post.php") 类似这样：

```php
<?php
$name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
$url = isset($_POST['url']) ? htmlspecialchars($_POST['url']) : '';
echo '网站名: ' . $name;
echo "\n";
echo 'URL 地址: ' .$url;
?>
```

### GET 和 POST 方法的区别：

**1、发送的数据数量**

在 GET 中，只能发送有限数量的数据，因为数据是在 URL 中发送的。

在 POST 中，可以发送大量的数据，因为数据是在正文主体中发送的。

**2、安全性**

GET 方法发送的数据不受保护，因为数据在 URL 栏中公开，这增加了漏洞和黑客攻击的风险。

POST 方法发送的数据是安全的，因为数据未在 URL 栏中公开，还可以在其中使用多种编码技术，这使其具有弹性。

**3、加入书签中**

GET 查询的结果可以加入书签中，因为它以 URL 的形式存在；而 POST 查询的结果无法加入书签中。

**4、编码**

在表单中使用 GET 方法时，数据类型中只接受 ASCII 字符。

在表单提交时，POST 方法不绑定表单数据类型，并允许二进制和 ASCII 字符。

**5、可变大小**

GET 方法中的可变大小约为 2000 个字符。

POST 方法最多允许 8 Mb 的可变大小。

**6、缓存**

GET 方法的数据是可缓存的，而 POST 方法的数据是无法缓存的。

**7、主要作用**

GET 方法主要用于获取信息。而 POST 方法主要用于更新数据。

[get方法与post方法对比](

# ES6~11

[GitHub - lukehoban/es6features: Overview of ECMAScript 6 features](https://github.com/lukehoban/es6features)

教程来源：

## 变量及作用域

### let变量声明及其作用域[¶](#let)

1.变量不能重复声明

2.块级作用域 全局，函数，eval

3.不存在变量提升

4.不影响作用域链

### let实践练习[¶](#let_1)

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style type="text/css">
        .item{
            width: 100px;
            height: 50px;
            border: solid 1px #0077AA;
            float: left;
            margin-left: 10px;
        }
    </style>
</head>
<body>
<div class="container">
    <h2 class="page-header">点击切换颜色</h2>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <script>
        //获取item对象
        let items = document.getElementsByClassName("item");
        //遍历并绑定事件
        for(let i=0;i<items.length;i++){
            items[i].onclick=function(){
                items[i].style.background = 'pink';
            }
        }
    </script>
</div>
</body>
</html>
```

### const常量声明

1.一定要赋初始值

2.一般常量使用大写（潜规则）

3.常量的值不能修改

4.块级作用域

5.对于数组和对象的元素的修改，不算做对常量的修改，不会报错

### 变量的解构赋值

`ES6`允许按照一定的模式从数组中提取值，对变量进行赋值，这被称为解构赋值

#### 数组的解构

```js
// 数组的解构
const F4 = ['a','b','c','d'];
let [a1,a2,a3,a4] = F4;

```

#### 对象的解构

```js
// 对象的解构
const person = {
    name : '小明',
    age : 10,
    run : function() {
       console.log("我可以跑步");
    }
};
let {name,age,run} = person;
run();
```

解构赋值的连续写法

```js
let obj = {
    a: {
        b: {
            c: 1
        }
    }
}

let $oute = {
    query: {
        id: 0001,
        title: 'hello'
    }
}

const {a} = obj
console.log('a', a) // {b: {c: 1}}

const {a: {b}} = obj
console.log('b', b) // {c: 1}

const {a: {b: {c}}} = obj
console.log('c', c) // 1
```

连续结构赋值的同时，重命名属性值

```js
const {a: {b: data}} = obj
console.log('data', data) // {c: 1}
```

通过连续结构赋值的写法，是无法获取到外层属性值的，比如此时a是无法获取到的：

```js
const {a: {b: data}} = obj
console.log('a', a)
```



### 模板字符串

ES6引入新的声明字符串的方式

```
` `, ' ', " "
```

1.声明

2.内容中可以直接出现换行符

3.变量拼接

```
//${}
let name = 'xiaoming'
let result = `${name} is running`
```

### 对象的简化写法[¶](#_3)

ES6允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

```
let name = 'xiaoming';
let change = function() {
  console.log('we can change you~');
}
const school = {
    name,
    change,
    improve(){
        console.log('we can improve you~');
    }
}
```

## 箭头函数

### 箭头函数以及声明特点[¶](#_4)

ES6允许使用箭头`=>`定义函数

```
let fn = (a,b) => {
    return a + b;
}
let result = fn(1,2);
```

1.this是静态的，this始终指向函数声明时所在作用域下的this的值

```
function getName() {
  console.log(this.name);
}
let getName2 = () => {
  console.log(this.name)
}
//设置window对象的name属性
window.name = '小明';
const person = {
    name:'xiaoming'
}

//直接调用
getName();//小明
getName2();//小明

//call方法调用
getName.call(person)//xiaoming
getName2.call(person)//小明  this始终指向函数声明时所在作用域下的this的值
```

call方法补充

```
var person = {
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
}
var person1 = {
    firstName:"Bill",
    lastName: "Gates",
}
var person2 = {
    firstName:"Steve",
    lastName: "Jobs",
}
person.fullName.call(person1);  // 将返回 "Bill Gates"
```

2.不能作为构造函数实例化对象

3.不能使用arguments变量

4.箭头函数的简写

```
1.省略小括号，当形参有且只有一个的时候

2.省略花括号，当代码体只有一条语句的时候，此时return必须省略，而且语句的执行结果就是函数的返回值
```

### 箭头函数的实践和应用场景[¶](#_5)

### 函数参数的默认值[¶](#_6)

ES6允许给函数参数赋值初始值

1.形参初始值 具有默认值的参数，一般要靠后（潜规则）

```
function add(a,b,c=10) {
  return a+b+c;
}
let result = add(1,2)
console.log(result)//13
```

2.与解构赋值相结合

```
function connect({host="127.0.0.1",username,password,port}) {
  console.log(host,username,password,port);
}
connect({
    username:'root',
    password:'root',
    port:3306
})
```

## rest参数

ES6引入rest参数，用户获取函数的实参，用来代替arguments

```
//ES5获取实参的方式
function date() {
  console.log(arguments);
}
date('a','b','c');//[Arguments] { '0': 'a', '1': 'b', '2': 'c' }

//rest参数
function date02(...args) {
    console.log(args);//结果是数组，可以使用数组的一些api，filer some every map等
}
date02('d','e','f');//[ 'd', 'e', 'f' ]
```

rest参数必须要放到参数的最后

```
function fn(a,b,...args) {
    console.log(a,b,args)
}
fn(1,2,3,4,5);//1 2 [ 3, 4, 5 ]
```

## 扩展运算符

```
...`扩展运算符能将`数组`转化为逗号分隔的`参数序列
//声明一个数组
const boys = ['aa','bb','cc'];
// => 'aa','bb','cc'

//声明一个函数
function chunwan(){
    console.log(arguments);
}
chunwan(boys);//Arguments [Array(3), callee: ƒ, Symbol(Symbol.iterator): ƒ]
chunwan(...boys);//Arguments(3) ["aa", "bb", "cc", callee: ƒ, Symbol(Symbol.iterator): ƒ]     chunwan('aa','bb','cc);
```

### 扩展运算符的运用

1.数组的合并

```
//普通的数组合并
const array1 = ['aa','bb'];
const array2 = ['cc','dd'];
const array3 = array1.concat(array2);
console.log(array3);// (4) ["aa", "bb", "cc", "dd"]

const array4 = [...array1,...array2];
console.log(array4);//(4) ["aa", "bb", "cc", "dd"]
```

2.数组的克隆

```
const testa = ['A','B','C'];
const testCopy = [...testa];

console.log(testa,testCopy,testa === testCopy); //(3) ["A", "B", "C"] (3) ["A", "B", "C"] false
```

3.将伪数组转为真正的数组

```
const divs = document.querySelectorAll("div");
console.log(divs);/deList(3) [div, div, div]

const divArr = [...divs];
console.log(divArr);//(3) [div, div, div]
```

## Symbol的介绍与 应用[¶](#symbol)

1.Symbol的值是唯一的，用来解决命名冲突的问题

2.Symbol值不能与其他数据进行运算

3.Symbol定义的对象属性不能使用for...in循环遍历，但是可以使用Reflect.ownKeys来获取对象的所键名

```
//创建Symbol
let s = Symbol();
console.log(s, typeof s); //Symbol() "symbol"

let s2 = Symbol('aa');
let s3 = Symbol('aa');
console.log(s2,s3,s2 == s3);//Symbol(aa) Symbol(aa) false

//Symbole.for创建
let s4 = Symbol.for('aa');
console.log(s4,typeof s4);//Symbol(aa) "symbol"
let s5 = Symbol.for('aa');
console.log(s4 == s5);// true

//不能与其他数据进行运算
let result = s + 100;//test.js:17 Uncaught TypeError: Cannot convert a Symbol value to a number
```

JS数据类型记忆：USONB

```
U:undefined
S:String Symbol
O:object
N:number null
B:boolean
```

### 对象添加Symbol类型的属性[¶](#symbol_1)

添加方式一：

```
//向对象添加方法 up down
let game = {
    down:function () {
        console.log('aa');
    },
    up:function(){
        console.log('cc');
    },
    name : 'bb'
}
//不能直接给对象添加up或down，因为不确定game对象中是否已经存在相同值
// game.up =function () {
//
// }
//声明一个对象
let methods = {
    up:Symbol(),
    down:Symbol()
};
//给game扩展方法
game[methods.up] = function () {
    console.log('我可以改变形状');
}
game[methods.down] = function () {
    console.log('我可以快速下降');
}
console.log(game)
// {
//     down: [Function: down],
//     up: [Function: up],
//     name: 'bb',
//     [Symbol()]: [Function],
//     [Symbol()]: [Function]
// }
```

添加方式二：

```
let youxi = {
    name:'狼人杀',
    [Symbol('say')]:function () {
        console.log('我可以发言');
    },
    [Symbol('zibao')]:function () {
        console.log('我可以自爆');
    }
}
console.log(youxi);
//{
//   name: '狼人杀',
//   [Symbol(say)]: [Function: [say]],
//   [Symbol(zibao)]: [Function: [zibao]]
// }
```

### Symbol的内置属性[¶](#symbol_2)

除了定义自己使用的Symbol值意外，ES6还提供了11个内置的Symbol值，指向语言内部使用的方法 这些属性都是Symbol的属性，而Symbol又是对象的属性，都是用来控制，对象在`特定场景`下的表现

Symbol.hasInstance|当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法 Symbol.isConcatSpreadable|对象的Symbol.isConcatSpreadable属性等于的是一个布尔值，表示该对象用于Array.prototype.concat(),是否可以展开

```
//hasInstance
class Person{
    static [Symbol.hasInstance](param){
        console.log(param)//会把参数传递进来
        console.log('我被用来检测类型了');
        return true;//可以自定义返回值
    }
}
let o ={
    name:'test'
};
console.log(o instanceof Person);
//{name: "test"}name: "test"__proto__: Object
//test.js:4 我被用来检测类型了
//test.js:11 true
const arr = [1,2,3];
const arr2 = [4,5,6];

console.log(arr.concat(arr2));//(6) [1, 2, 3, 4, 5, 6]

arr2[Symbol.isConcatSpreadable] = false;
console.log(arr.concat(arr2));(4) [1, 2, 3, Array(3)]
```

### 迭代器介绍[¶](#_9)

迭代器是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作。 （Iterator接口本质就是对象的一个属性，就是Symbol.Iterator)

1) ES6创造了一种新的遍历命令for...of循环，Iterator接口主要提供for...of消费

2) 原生具有iterator接口的数据（可用for of遍历）

```
a) Array

b) Arguments

c) Set

d) Map

e) String

f) TypedArray

g) NodeList
```

3) 工作原理

a) 创建一个指针对象，指向当前数据结构的起始位置

b) 第一次调用对象的next方法，指针自动指向数据结构的第一个成员

c) 接下来不断调用next方法，指针一直往后移动，直到指向最后一个成员

```
（Iterator接口本质就是对象的一个属性，就是Symbol.Iterator)
```

`注意`需要自定义遍历数据的时候，要想到迭代器

### 自定义迭代器[¶](#_10)

```
const banji = {
    name:"终极一班",
    stus:[
        'xiaoing',
        'xiaoning',
        'xiaotian',
        'knigth'
    ],
    [Symbol.iterator](){
        //索引变量
        let index = 0;

        let _this = this;
        return {
            next:function () {
                if(index < _this.stus.length){
                    const result = {value:_this.stus[index],done:false};
                    index++;
                    return result;
                }else{
                    return {value: undefined,done: true};
                }
            }
        }
    }
}
//遍历这个对象
for(let v of banji){
    console.log(v);
}
// xiaoing
// xiaoning
// xiaotian
// knigth
```

### 生成器函数声明与调用[¶](#_11)

```
//定义生成器函数
function * gen() {
    // console.log(111);
    yield 'aaa';
    // console.log(222);
    yield 'bbb';
    // console.log(333);
    yield 'ccc';
    // console.log(444);
}

let iterator = gen();
//生成器函数通过next()调用
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

// { value: 'aaa', done: false }
// { value: 'bbb', done: false }
// { value: 'ccc', done: false }
// { value: undefined, done: true }


//遍历
for(let v of gen()){
    console.log(v);
}
```

### 生成器函数的参数传递[¶](#_12)

```
function * gen(arg) {
    console.log(arg);
    let one = yield 111;
    console.log(one);
    let two = yield 222;
    console.log(two);
    let three = yield 333;
    console.log(three);
}
//执行获取迭代器对象
let iterator = gen('AAA');
console.log(iterator.next())
//next()方法可以传入实参
console.log(iterator.next('BBB'));
console.log(iterator.next('CCC'));
console.log(iterator.next('DDD'));
```

### 生成器函数实例[¶](#_13)

常见的异步操作有：

异步编程 文件操作 网络操作（ajax,request） 数据库操作

```
//1s后控制台输出111,2s后控制台输出222,3s后控制台输出333
//回调地狱
setTimeout(() =>{
    console.log(111);
    setTimeout(() => {
        console.log(222);
        setTimeout(() => {
            console.log(333);
        },3000)
    },2000)
},1000)
```

使用生成器函数解决

```
// 异步编程  文件操作  网络操作（ajax,request）  数据库操作

//1s后控制台输出111,2s后控制台输出222,3s后控制台输出333
//回调地狱
// setTimeout(() =>{
//     console.log(111);
//     setTimeout(() => {
//         console.log(222);
//         setTimeout(() => {
//             console.log(333);
//         },3000)
//     },2000)
// },1000)

function one() {
    setTimeout(() =>{
        console.log(111);
        iterator.next();
    },1000)
}

function two() {
    setTimeout(() => {
        console.log(222);
        iterator.next();
    },2000)
}

function three() {
    setTimeout(() => {
        console.log(333);
        iterator.next();
    },3000)
}

function * gen() {
    yield one();
    yield two();
    yield three();
}

//调用生成器函数
let iterator = gen();
iterator.next();
```

### 生成器函数实例2[¶](#2)

```
//模拟获取  用户数据  订单数据  商品数据
function getUsers(){
    setTimeout(() => {
        let data = '用户数据';
        iterator.next(data);
    },1000)
}
function getOrders() {
    setTimeout(() => {
        let data = '订单数据';
        iterator.next(data);

    },1000)
}
function getGoods() {
    setTimeout(() => {
        let data = '商品数据';
        iterator.next(data);
    },1000)
}

function * gen() {
    let users = yield getUsers();
    console.log(users);

    let orders = yield getOrders();
    console.log(orders);

    let goods = yield getGoods();
    console.log(goods);
}

let iterator = gen();
iterator.next();
```

## Promise



### Promise介绍与基本使用

Promise是ES6引入的异步编程的新解决方案。

语法上Promise是一个构造函数，用来封装异步操作并且可以获取其成功或者失败的结果

```
//实例化Promise对象
const p = new Promise(function (resolve,reject) {
    setTimeout(() =>{
        // let data = '数据库中的用户数据';
        // resolve(data);

        let err = '数据读取失败';
        reject(err);
    },1000);
})
//调用Promise对象的then方法
p.then(function (value) {
    console.log(value);
},function (reason) {
    console.log(reason);//数据读取失败
})
```

### Promise封装读取文件[¶](#promise_1)

普通方法调用

```
//引入fs模块
const fs = require('fs');

//调用方法读取文件
fs.readFile('为学.md',(err,data) => {
    if(err) throw err;
    console.log(data.toString())
});
// 为学
// 天下事有难易乎？
// 为之，则难者亦易矣，
// 不为，则易者亦难矣
```

使用Promise封装调用

```
const p = new Promise(function (resolve,reject) {
    fs.readFile('为学.mdaa',(err,data) => {
        if(err) reject(err);
        resolve(data);
    })
});

p.then(function (value) {
    console.log(value.toString());
},function (reason) {
    console.log('读取失败');
})
//读取失败
```

### 使用Promise封装ajax请求[¶](#promiseajax)

需要放在html里面

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<script>
    const p = new Promise(function (resolve,reject) {
        //1.创建对象
        const xhr = new XMLHttpRequest();
        //2.初始化
        xhr.open('GET','https://api.apiopen.top/getJoke');
        //3.发送
        xhr.send();
        //4.绑定事件，处理响应结果
        xhr.onreadystatechange = function () {
            //判断
            if(xhr.readyState === 4){
                //判断响应状态码 200 ~ 299
                if(xhr.status >= 200 && xhr.status < 300){
                    //表示成功
                    resolve(xhr.response);
                }else {
                    //如果失败
                    reject(xhr.status);
                }

            }
        }
    });
    p.then(function (value) {
        console.log(value);
    },function (reason) {
        console.error(reason);
    })
</script>
</body>
</html>
```

### Promise.prototype.then方法[¶](#promiseprototypethen)

then方法的返回值

```
//创建Proise对象
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('用户数据')
        // reject('出错啦');
    },1000);
});

//调用then方法 then方法  then方法的返回结果是Promise对象，对象状态是由回调函数的执行结果决定的
//1.如果回调函数中，返回的结果是非Promise类型的属性，状态为成功，返回值为对象的成功的值（undefined）
const result = p.then((value)=> {
    console.log(value);
    //1.非promise类型的属性
    // return 'iloveyou';
    //2.是Promise对象
    // return new Promise((resolve,reject) => {
    //     // resolve('ok');
    //     reject('error');
    // });
    //3.抛出错误
    // throw '出错啦';
},(reason)=>{
    console.warn(reason);
});

console.log(result)
```

链式调用

```
p.then(value => {

}).then(value => {

})
```

### Promise实践练习[¶](#promise_2)

```
//引入fs模块
const fs = require('fs');

fs.readFile('为学.md',(err,data1 )=> {
    fs.readFile('插秧诗.md',(err,data2) => {
        fs.readFile('观书有感.md',(err,data3) => {
            let result = data1 + '\r\n' + data2 + '\r\n' + data3 + '\r\n';
            // console.log(result);
        })
    })
})

//使用Promise实现
const p = new Promise((resolve,reject) => {
    fs.readFile('为学.md',(err,data) => {
        resolve(data);
    });
});

p.then(value => {
    // console.log(value.toString())
    return new Promise((resolve,reject) => {
        fs.readFile('插秧诗.md',(err,data) => {
            resolve([value,data]);
        });
    })
}).then(value => {
    return new Promise((resolve,reject) => {
        fs.readFile('观书有感.md',(err,data) => {
            //压入
            value.push(data);
            resolve(value.join('\r\n'));
        });
    })
}).then(value => {
    console.log(value);
})
/*
为学
天下事有难易乎？
为之，则难者亦易矣，
不为，则易者亦难矣
插秧诗
手把青秧插满田，低头便见水中天。
六清净方为道，退步原来是向前。
观书有感二首
其一
半亩方塘一鉴开，天光云影共徘徊。
问渠那得清如许？为有源头活水来。
其二
昨夜江边春水生，艨艟巨舰一毛轻。
向来枉费推移力，此日中流自在行。*/
```

### Promise对象catch方法[¶](#promisecatch)

```
const p = new Promise((resolve,reject) => {
    setTimeout(() => {
        //设置p对象的状态为失败
        reject('出错啦');
    },1000);
});

//p.then((value) => {
//
//},(reason) => {
//    console.error(reason);
//});

//相当于是一种语法糖
p.catch((reason) => {
    console.warn(reason)
});
```



## await

## 集合

### 集合介绍与API[¶](#api)

```
//声明一个集合
let s = new Set();
console.log(s);//Set {}

let s1 = new Set(['a','b','c','b','d','e','a']);
console.log(s1);//Set {"a", "b", "c", "d", "e"}

//元素个数
console.log(s1.size);//5

//添加新元素
s1.add('f');
console.log(s1);

//删除元素
s1.delete('a');
console.log(s1);//Set {"b", "c", "d", "e", "f"}

//检测
console.log(s1.has('a'));//false
console.log(s1.has('b'));//true

//循环遍历集合元素
for(let v of s1){
    console.log(v);
}
```

### 集合实践[¶](#_14)

```
let arr1 = [1,2,3,4,5,4,3,2,1];

//1.数组去重
//let result = [...new Set(arr)];
//console.log(result);//[1, 2, 3, 4, 5]

//2.交集
let arr2 = [4,5,6,5,6];
//let result2 = [...new Set(arr)].filter(item => {
//    let s2 = new Set(arr2);//4 5 6
//    if(s2.has(item)){
//        return true;//如果为真，表示既在数组一，也在数组二；
//    }else{
//        return false;
//    }
//});

//简写
//let result2 = [...new Set(arr)].filter(item => new Set(arr2).has(item));
//console.log(result2)//4 5

//3.并集
//let union = [...new Set([...arr,...arr2])];
//console.log(union);//[1, 2, 3, 4, 5, 6]

//4.差集，谁是主体，求出来的结果是不一样的
let diff = [...new Set(arr1)].filter(item => !(new Set(arr2).has(item)));
console.log(diff);//[1, 2, 3]  这里是1对2求差集，表示1里面有，而2里面没有的
```

### Map的介绍与API[¶](#mapapi)

ES提供了Map数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。Map也实现了iterator接口，所以可以使用`扩展运算符`和`for of`进行遍历。

Map的属性和方法：

```
1)size 返回Map的元素的个数

2)set 增加一个新元素，返回当前Map

3)get 返回键名对象的键值

4)has 检测Map中是否包含某个元素，返回boolean值

5)clear 清空集合，返回undefined
//声明Map
let m = new Map();

console.log(m);//Map {}

//添加元素
m.set('name','xiaoming');
m.set('change',function () {
    console.log('我可以改变你');
});

console.log(m);//Map { 'name' => 'xiaoming', 'change' => [Function] }
```

### class类[¶](#class)

ES6提供了更接近传语言的写法，引入了Class（类）这个概念，作为对象的模板；

通过class关键字，可以定义类。基本上，ES6的class可以看做只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已

```
1) class声明类

2） constructor定义构造函数初始化

3) extends继承父类

4) super调用父级构造方法

5) static定义静态方法和属性

6)父类方法可以重写
```

ES5 实例化对象的写法

```
//手机
function Phone(brand, price){
    this.brand = brand;
    this.price = price;
}

//添加方法
Phone.prototype.call = function() {
  console.log('我可以打电话');
};

//实例化对象
let HUAWEI = new Phone('HUAWEI','2999');
HUAWEI.call();
console.log(HUAWEI);
​```1
ES6的写法
​```javascript
class Phone{
    //构造方法 名字不能修改
    constructor(brand, price){
        this.brand = brand;
        this.price = price;
    }


    //方法必须使用该语法，不能使用ES5的对象完整形式
    call(){
        console.log('我可以打电话');
    }
}

let onePlus = new Phone("1+", 1999);
console.log(onePlus);
```

### class静态成员[¶](#class_1)

函数对象的属性，是属于类的，并不属于实例对象的属性，这样的属性称为`静态成员`

```
function Phone(){

}
Phone.name = '手机';
Phone.change = function () {
    console.log('我可以改变世界');
}

let nokia = new Phone();
//console.log(nokia.name);//undefined
//nokia.change();//Uncaught TypeError: nokia.change is not a function

Phone.prototype.size = '5.5inch';
console.log(nokia.size);//5.5inch
class Phone{
    //静态属性
    static name = '手机';
    static change(){
        console.log('我可以改变世界');
    }
}

let nokia = new Phone();
console.log(nokia.name);//undefined
console.log(Phone.change);
//ƒ change(){
//        console.log('我可以改变世界');
//}
```

### ES6-ES5构造函数继承[¶](#es6-es5)

ES5构造函数继承

```
//手机
function Phone(brand, price) {
    this.brand = brand;
    this.price = price;
}
Phone.prototype.call = function () {
    console.log('我可以打电话');
}

//智能手机
function SmartPhone(brand,price,color,size){
    Phone.call(this,brand,price);
    this.color = color;
    this.size = size;
}

//设置子级构造函数的原型
SmartPhone.prototype = new Phone;
//做一下校正
SmartPhone.prototype.constructor = SmartPhone;

//声明子类的方法
SmartPhone.prototype.photo = function () {
    console.log('我可以拍照片');
}
SmartPhone.prototype.playGame = function () {
    console.log('我可以打游戏');
}
const chuizi = new SmartPhone('锤子',2499,'黑色','5.5inch');
console.log(chuizi)
// SmartPhone
//     brand: "锤子"
//     color: "黑色"
//     price: 2499
//     size: "5.5inch"
//     __proto__: Phone
```

### ES6-class的类继承[¶](#es6-class)

ES6继承

```
class Phone{
    //构造方法
    constructor(brand,price) {
        this.brand = brand;
        this.price = price;
    }
    //父类的成员属性
    call(){
        console.log('我可以打电话！')
    }
}
class SmartPhone extends Phone{
    //构造方法
    constructor(brand,price,color,size) {
        super(brand,price);//Phone.call(this,brand,price);
        this.color = color;
        this.size = size;
    }

    photo(){
        console.log('拍照片');
    }
    playGame(){
        console.log('玩游戏')
    }
}

const xiaomi = new SmartPhone('小米',799,'黑色','4.7inch');
console.log(xiaomi)
// SmartPhone {brand: "小米", price: 799, color: "黑色", size: "4.7inch"}
//     brand: "小米"
//     color: "黑色"
//     price: 799
//     size: "4.7inch"
//     __proto__: Phone
```

### 子类对父类方法的重写[¶](#_15)

```
class Phone{
    //构造方法
    constructor(brand,price) {
        this.brand = brand;
        this.price = price;
    }
    //父类的成员属性
    call(){
        console.log('我可以打电话！')
    }
}
class SmartPhone extends Phone{
    //构造方法
    constructor(brand,price,color,size) {
        super(brand,price);//Phone.call(this,brand,price);
        this.color = color;
        this.size = size;
    }

    photo(){
        console.log('拍照片');
    }
    playGame(){
        console.log('玩游戏')
    }
    call() {
        // super() 子类中不能直接调用父类的同名方法，只能重写
        console.log('我可以视频通话');
    }
}

const xiaomi = new SmartPhone('小米',799,'黑色','4.7inch');
console.log(xiaomi)
// SmartPhone {brand: "小米", price: 799, color: "黑色", size: "4.7inch"}
//     brand: "小米"
//     color: "黑色"
//     price: 799
//     size: "4.7inch"
//     __proto__: Phone
xiaomi.call();//我可以视频通话+
```

### class中getter和setter的设置[¶](#classgettersetter)

```
//get 和 set
class Phone {

    //对属性进行读取时，将会调用该方法
    //通常是对动态的属性进行封装
    get price(){
        console.log('价格属性被读取了');
        return 'iloveyou';
    }

    //对属性进行设置时，将会调用该方法
    //可以添加更多的控制和判断
    set price(newVal){
        console.log('价格属性被修改了');
    }
}

//实例化对象
let s = new Phone();
console.log(s.price);
//价格属性被读取了
//iloveyou  get中的返回值，将会被读取到


s.price = 'free';//价格属性被修改了
```

### ES6的数值扩展[¶](#es6)

### ES6的对象方法扩展[¶](#es6_1)

### 模块化介绍、优势及产品[¶](#_16)

CommonJs => NodeJs、Browserify

### 浏览器使用ES6模块化引入模块[¶](#es6_2)

m1.js

```
export let school = 'sgg';

export function teach() {
    console.log('we can teach you');
}
```

test.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<script type="module">
    //引入m1.js
    import * as m1 from './m1.js';
    console.log(m1)
    // Module
    // school: (...)
    // teach: (...)
    // Symbol(Symbol.toStringTag): "Module"
    // get school: ƒ ()
    // set school: ƒ ()
    // get teach: ƒ ()
    // set teach: ƒ ()
</script>
</body>

</html>
```

### ES6模块暴露数据语法汇总[¶](#es6_3)

```
//分别暴露
export let school = 'sgg';

export function teach() {
    console.log('we can teach you');
}
//统一暴露
let school = 'sgg';

function teach() {
    console.log('we can teach you');
}

export {school,teach};
//默认暴露
export default {
    school: 'sgg',
    teach: function () {
        console.log('we can teach you');
    }
}
```

这种暴露数据的方法，在调用时需要多加一层default

```
m1.default.change();
```

### ES6引入模块数据语法汇总[¶](#es6_4)

```
<script type="module">
    //1.通用的导入方式
    import * as m1 from './m1.js';

    //2.解构赋值
    import {school,teach} from './m1.js';
    import {school as school2,teach as teach2} from './m2.js';

    //3.简便形式，针对默认暴露
    import m1 from'./m1.js';
    console.log(m1)
</script>
```

### 浏览器使用ES6模块二[¶](#es6_5)

入口文件app.js

```
//入口文件

//模块引入
import * as m1 from './m1.js';
import * as m2 from './m2.js';
import * as m3 from './m3.js';
```

引入入口文件

```
<script src="app.js" type="module"></script>
```

### babel对ES6模块化代码转化[¶](#babeles6)

### ES6模块化引入NPM包



# 
