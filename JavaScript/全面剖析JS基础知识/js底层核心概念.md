---
title: js底层核心概念
date: 2022-10-14 05:58:44
cover: false
tags:
- javascript
categories: 'javascript'
typora-root-url: js底层核心概念
---



# 堆栈

# 变量

定义一个变量到这个变量被回收发生了什么
变量和内存之间的关系，是由三个部分组成：变量名、内存绑定和内存地址

# 上下文

	执行上下文
		- 代码执行时，创建上下文
		- 所有代码执行完成后，销毁上下文
		- 每一个上下文，都有一个相关联的变量对象（VO：Variable Object）
		- 当前上下文中，定义的变量和对象都存储在VO上
	
	全局上下文
		- GO(Global Object)，浏览器环境下，就是window对象，GO是特殊的VO
		- var关键字声明变量，存储在GO上，即
		```js
		var a;
		console.log(window.a) // undefined
		```
		
		- function关键字声明函数，存储在GO上
		```js
		var a;
		console.log(window.a)
		function aFunc() {
			console.log(a)
		}
		aFunc()		
		```
		- js代码执行之前，浏览器首先会默认把所有带var和function关键字的变量，进行提前声明或定义(存储在GO上)
		- 关联this到GO(window)
	函数上下文
		- 见函数底层执行机制>函数的执行

# 作用域

上下文和作用域是两个不同的概念

- 我们知道函数每次调用，都会有与之紧密相连的作用域和上下文
- 作用域其实是基于函数的，而上下文是基于对象的
- 作用域涉及到它所被调用函数的变量的访问，而调用方法和访问属性又存在着不同的调用场景（4种调用场景：函数调用、方法调用、构造器函数调用、call()和apply()间接调用），而上下文始终是this所代表的值，它是拥有控制当前执行代码的对象的引用
- 全局作用域（全局上下文）
- 函数作用域（函数上下文）
- 作用域链
  JS查找变量关联的值时，会遵循一定的规则：从当前作用域沿着作用域链逐级向上查找（按索引0开始查找），直到顶层全局作用域结束
  作用域代表着变量与函数的可访问范围，

# 变量提升，函数提升、浏览器解析变量的机制

# JS预解析

1.当浏览器加载html页面的时候，首先会提供一个全局JS代码执行的环境
	- 开启栈空间，占空间中开辟全局执行上下文
2.预解析（变量提升，浏览器的加载机制）
	- 在当前的作用域（上下文）中，js代码执行之前，浏览器首先会默认把所有带var和function关键字的变量，进行提前声明或定义
		- 对于变量只是进行了变量的提前声明
		```js
		var num = 1;
		// 理解声明和定义
		// 声明（declare）： var num ==> 告诉浏览器，在全局作用域中有一个num的变量了（在GO上，新增属性num，默认属性值为undefined），声明：对于变量，就是把变量添加到当前上下文的变量对象上
		// 定义（defined）：num = 1; ==>给变量赋值（进行值关联），定义：定于变量，就是把当前上下文的变量对象对应的属性，关联值或者内存地址
		```
		

		```js
		// console.log(number) // Uncaught ReferenceError: number is not defined
		console.log(num) // undefined，这里打断点，会看到全局window对象上，已经有num属性了，值为undefined
		var num = 1;
		console.log(num) // 1
		```
		- 对于函数是提前声明并且定义（将函数代码以字段串的形式存储起来）
		```js
		console.log(fn) // 打印出函数体，由于函数提升机制，此时GO（window)对象上，已经有fn属性了，值为代码块字符串
		function fn() {
			console.log('fn')
		}
		console.log(fn) // 打印出函数体（实际打印的就是window.fn，值为代码块字符串）
	
		```
	- 变量和函数重名时
	提升阶段：变量只是提前声明了，函数是声明并且定义了
	执行阶段：变量开始定义赋值，函数不进行赋值
	```js
	console.log(afn) // afn(){console.log(4)}
	function afn() {
		console.log(2)
	}
	console.log(afn) // afn(){console.log(4)}  
	
	var afn;
	console.log(afn) // afn(){console.log(4)}
	
	var afn = 3 
	console.log(afn) // 3
	
	function afn() {
		console.log(4)
	}
	
	console.log(afn) // 3
	```
	- 函数表达式的调用，必须写到函数表达式的下面
	```js
	fun() // 声明定义函数之前调用， Uncaught TypeError: fun is not a function
	
	var fun = function() {
		console.log(22)
	}
	```
	相当于
	```js
	var fun;
	fun(); // Uncaught TypeError: fun is not a function
	fun = function() {
		console.log(22)
	}
	```
	- 预解析（变量提升和函数提升）只会发生在当前上下文中。
		例如：开始只会对全局上下文中的变量和函数进行预解析，因为一开始就创建了全局上下文；只有函数执行的时候，才会创建函数上下文，才会对函数上下文中的变量和函数进行预解析
		```js
		var a = 10;
		function afn() {
			console.log(a) // undefined
			var a = 11
			console.log(a) // 11
		}
		afn()
		console.log(a) // 10
		```
		相当于
		```js
		var a = 10 // GO全局对象window上的属性
		function fn() {
			var a; // 私有上下文对象AO上的属性，属性值为undefined
			console.log(a) // undefined
			var a = 11
			console.log(a) // 11
		} // 出栈后，私有上下文销毁
		fn() // 进栈
		console.log(a) // 10
		```

# 函数底层执行机制

	1.函数的创建
		- 创建对象时，会在堆内存中开辟一块空间来存储对象的键值对。
		- 函数对象被创建时，存储的键值对有
			- this
			- prototype
		- 函数对象除了在堆内存中存储键值对，还会存储两部分东西
			- 创建函数时的声明作用域[[Scopes]]：
			  - 函数在哪个上下文中创建，其[[Scopes]]就关联谁
			  - 函数定义中使用到了哪个变量或对象，[[Scopes]]就会把该变量或者对象所有的VO添加到[[Scopes]]中，这个机制也是let关键字形成块级作用域的根本原因
				- [[Scopes]]中存储的应该是，实际用到的变量所在的上下文对应的变量对象
			```js
			function aFunc() {
				var a = 1
				console.log(a)
				console.log(this)
			}
			aFunc()
			console.dir(aFunc) // [[Scopes]]有一个值，指向当前上下文的GO，即window对象


			function bFunc() {
				var b = 1, c =2;
				function bInnnerFunc() {
					// return b // [[Scopes]]只有一个值，指向window对象
					return b // [[Scopes]][0]为bFunc私有上下文的AO对象，{b: 1}，[[Scopes]][1]指向window对象
					// return b + c // [[Scopes]][0]为bFunc私有上下文的AO对象，{b: 1, c: 2}，[[Scopes]][1]指向window对象
				}
				console.dir(bInnnerFunc) // [[Scopes]]有两个值，[[Scopes]][0]指向bFunc执行上下文的VO对象（更准确点，是bFunc私有上下文的AO对象，见下一部分），这是一个闭包;[[Scopes]][1]指向window
			}
	
			bFunc()
			```
			- 函数字符串：把函数体中的代码，以字符串的形式存储起来
				- 如果是循环4个标签，for循环是以var声明的i，按照直观上，每次click的回调函数打印的值应该不一样。事实上都是4，代码首先会循环4次，然后每次都讲i加1，for方法体的函数，仅执行了创建的过程，onclick关联的函数，此时是以字符串的形式保存在堆内存中（保存了4份），并且循环结束时，i的值已经变成了4。当我们点击元素时，onclick关联的回调函数，进栈开始执行，沿着[[Scopes]]作用域链找到GO（window）上的i值为4。
				```js
				var myBtn = document.querySelectorAll('.myBtn')
				for(var i = 0; i < myBtn.length; i++) {
					myBtn[i].onclick = function() {
						console.log(i)
					}
				}
				console.log(i)
				```
				将回调函数定义成具名函数，方便查看作用域链（设置断点查看）
				```js
				var myBtn = document.querySelectorAll('.myBtn')
				for(var a = 0; a < myBtn.length; a++) { //定义成a，查看是在window属性的第一个
					let innerFunc = function innerFunc() {
						console.log(a, window.a, a === window.a)
						console.dir(innerFunc)
					}
					myBtn[a].onclick = innerFunc // 不能加括号，否则就直接执行了
				}
				```
	2.函数的执行
		2.1.创建私有上下文
			- 进栈：函数一旦执行，就会创建一个全新的私有上下文（函数上下文）
				- 函数的每次执行，都是重新形成一个私有的上下文，和之前产生的上下文没有必然的联系
				- 函数的代码都是在私有上下文中执行的
			- 函数进栈执行时，会创建一个全新私有变量对象（AO: Active Object）
				- 这里区分开VO，AO是VO的一个分支
				- 在私有上下文中创建的变量和对象，都会存储在AO中，例如形参、变量提升和函数中定义的变量
				- 私有变量对象不能被外部访问，但可以通过return语句返回
		2.2.完成初始化操作
		函数进栈后，正式开始执行前，会进行5步的初始化操作
			- 初始化作用域链([[Scopes]])
				- 根据函数代码中实际使用到的变量，关联变量所在上下文的变量对象，作为作用域链中的每一个值
			- 初始化this
				- this的基本概念
					在js中，this是一个关键字，它会被自动定义在js所有函数的作用域中，《JS高程》在函数一章中指出：定义一个函数会获得this和prototype两个属性，而this很特殊在于this可以用作声明指向某个对象？？
				this在运行时绑定的，并不是在编写时绑定的，她的上下文取决于函数调用时的各种条件。this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式
				- this到底是什么 
					当一个函数被调用时，会创建一个活动记录（私有上下文）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方式、传入的参数等信息。this就是这个记录的一个属性，会在函数执行的过程中用到
				- 函数绑定方式
					this的绑定规则和函数的调用方式有着重大联系
					- 普通函数调用
					```js
					function foo () {
						console.log(this.a)
					}
	
					var a = 2
					foo() // 2，相当于window.foo()
					```
					- new方式调用
					```js
					
					```
				- 箭头函数没有这一步
				js采用的是词法作用域（静态作用域），也就是说函数的作用域（可以访问到的变量），在函数定义的时候就确定了
				与之相反的是动态作用域，即函数的作用域在函数调用时才确定
				下面的例子，很好的说明JS是一个静态作用域的语言，如果函数的作用域是在运行时确定的，运行aFoo函数是，从aFoo函数内部没有找到局部变量value后，会从调用函数的作用域，也就是aBar函数内部查找value变量，那么应该会打印2
				JS引擎底层的实现为：函数在定义时，会把其所属环境（全局环境）的变量生成一个变量对象，放入函数的scope属性中。调用函数时，会生成执行环境（上下文）并创建一个作用域链，即先把函数scope属性中的变量对象放到作用域链中，再利用函数参数和内部变量，生成一个活动对象，并放入作用域链的前端。
				```js
				var aValue = 1
				function aFoo() {
					console.log(aValue)
				}
				function aBar() {
					var aValue = 2
					aFoo()
				}
	
				aBar() // 1
				```
				this关键字是JS中的动态作用域机制，是为了在JS中加入动态作用域而做的努力，因为this指向的对象实在函数调用时绑定的。
				在任何函数中，this的指向都不是静态的。它总是在你调用一个函数，但尚未执行函数内部代码前被指定。即this的指向与函数被调用的方式（语法）有关
				
				```js
				var o = {
					a: 10,
					b: {
						fn: function() {
							console.log(this)
						}
					}
				}
	
				o.b.fn() // this指向对象b，{fn: f}
	
				var j = o.b.fn
				j() // this指向window
				```
				可以看到，函数内部的this指向，和其调用方式有关，和函数本身的定义方式无关
				绑定规则
				- 1.构造绑定：通过new关键字调用构造函数。此时会生成一个实例对象，并且this指向这个实例对象。这种方式实际上是new的底层实现修改了this指向
				```js
				var savedThis;
				function Constr() {
					savedThis = this;
				}
	
				var inst = new Constr()
	
				console.log(savedThis === inst) // true
				```
				2.显示绑定：apply()、call()、bind()三个方法改变函数的调用对象（this对象）
				3.隐式绑定：某个上下文对象中调用函数。比如使用obj.foo()这样的语法来调用函数，函数foo中的this绑定到obj对象
				```js
				var o = {
					a: 10,
					b: {
						fn: function() {
							console.log(this.a) // undefined，this指向b对象
						}
					}
				}
	
				o.b.fn()
	
				// 事件处理函数
				function doPrint() {
					console.log(this)
				}
				doPrint() // 全局对象 window
				var myBtn = document.querySelector('.myBtn')
				myBtn.onclick = doPrint
				myBtn.onclick() // 元素对象button
				```
				4.默认绑定：不符合上述三种情况，在一个函数中使用了this，但是没有为this绑定对象。这种情况下，严格模式this绑定到undefined，非严格模式下this绑定到全局对象（GO）（Node环境中的global，浏览器环境的window）
				```js
				var o = {
					a: 10,
					b: {
						fn: function() {
							console.log(this.a) // undefined
							console.log(this) // window
						}
					}
				}
	
				var j = o.b.fn
				j() // window
				```
				对于3、4两点，可以用一个简单的规则去判断：当一个函数被调用时，应该立马看()左边的部分
					- 如果()左边是一个引用，那么函数的this指向这个引用所属的对象（隐式绑定）
					- 否则this指向的就是全局对象或者undefined（默认绑定）
					- 上面的代码中，fn是一个引用，属于b这个对象，所以this指向b；j不是引用，所以this指向window
			- 初始化arguments？？
				- 箭头函数没有这一步
			- 形参赋值
			- 变量提升：var关键字声明的变量会提前声明，function关键字声明的函数会提前
	3.代码执行
		将堆内存中存储的代码字符串，从上往下顺序执行
		- 变量按作用域链查找
	4.出栈释放或保留
		- 正常情况下，代码执行完成后，私有上下文出栈被回收
		- 特殊情况
			- 如果当前私有上下文执行完成之后的某个东西（变量或对象），被执行上下文以外的东西占用，则当前私有上下文就不会出栈释放，也就是形成了不被销毁的上下文（闭包）
		- 还有一种情况：上下文没被占用，但是要紧接着被用一次，这样没有用完之前是不能释放的，用完再释放。这样就形成了一个临时不被释放的上下文
		- 函数每次执行都是重新形成给全新的私有上下文，正常情况下，函数执行完就会出栈私有上下文被释放，但是如果不能被释放（闭包），就会一直被保存在内存中，当到达栈内存的极限时就会出现栈内存溢出

理清上述概念的先后顺序




# let、const和块级作用域

块级作用域
	- JS中没有块级作用域

let定义变量

 - let关键字定义的变量，在代码执行时，会在栈内存再形成一个块级上下文，这个块级上下文也有一个与之关联的VO对象，当代码执行到函数定义时，由于用到了变量a，就会把变量对象{a: 0}，添加到innerFunc的[[Scopes]]

   ```js
   var amyBtn = document.querySelectorAll('.myBtn')
   for(let a = 0; a < amyBtn.length; a++) {
   	let innerFunc = function innerFunc() {
   		console.dir(innerFunc)
   		console.log(a)
   	}
   	amyBtn[a].onclick = innerFunc // 不能加括号，否则就直接执行了
   }
   ```

   - let关键字声明的变量，在谷歌浏览器断点调试的作用域中，被称为“代码块”
     const定义常量
     const关键字声明的变量，在谷歌浏览器断点调试的作用域中，被称为“脚本”
     const关键字声明的变量，绑定了第一次定义的值的内存地址与该变量的关联关系，当尝试绑定其他内存地址时无法生效
     对于由若干内存片段组成的非连续内存数据（对象、数组），只有第一处是有变量与内存的强绑定关系，对象内部属性值仍然可以修改
     Object.freeze()

箭头函数



























