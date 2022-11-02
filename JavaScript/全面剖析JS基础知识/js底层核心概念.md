---
title: js底层核心概念
date: 2022-10-14 05:58:44
cover: false
tags:
- javascript
categories: 'javascript'
typora-root-url: js底层核心概念
---

# 数据结构

## 栈

一种遵从先进后出（LIFO）原则的有序集合；

新添加的或待删除的都保存在栈的末尾，称作栈顶，另一端为栈底。

在栈里，新元素都靠近栈顶，旧元素都接近栈底。

栈知识对原有数据的一次封装而已。

而封装的结果是：并不关心其内部的元素是什么，只是去操作栈顶元素，这样的话，在编码中会更可控一些。

定义一个栈

```js
```

## 队列

与上相反，一种遵循先进先出（FIFO）原则的一组有序的项；

队列在尾部添加新元素，并从头部移除元素。

最新添加的元素必须排在队列的末尾。例如日常生活中的购物排队。

与栈类比，栈仅能操作其头部，队列则首尾均能操作，但仅能在头部出尾部进

定义一个队列

```js
```

## 链表

存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的；

每个元素有一个存储本身的节点和一个指向下一个元素的引用（指针/链接）组成

## 集合

由一组无序且唯一（即不能重复）的项组成；

这个数据结构使用了与有限集合相同的数学概念，但引用在计算机科学的数据结构中。

## 字典

以[键，值]对为数据形态的数据结构，其中键名用来查询特定元素，类似于JS中的Object

## 散列

根据关键码（Key Value）直接进行访问的数据结构；

它通过把关键码值映射到表中的一个位置来访问记录，以加快查找的速度；

这个映射函数叫做散列函数，存放记录的数组叫做散列表

## 树

表示一对多关系

由n（n>=1）个有限节点组成一个具有层次关系的集合；

把它叫做“树”是因为它看起来像一颗倒挂的树，基本呈一对多关系，树也可以看做是图的特殊形式

## 图

表示多对多关系

图是网络结构的抽象模型；

图是一组由边连接的节点（顶点）

任何二元关系都可以用图来表示，常见的比如：道路图、关系图、呈现多对多关系

# 堆栈内存

浏览器想要执行JS代码:

1.从电脑内存中分配出一块内存，用来执行代码(栈内存=>Stack)

- 执行代码、存储变量和基本类型值
- js中的赋值，是关联引用模式，而不是拷贝模式

2.分配一个主线程用来自上而下执行js代码

## 栈内存

栈（stack）中主要存放一些基本类型的变量和对象的引用，（包含池，池存放常量）；

其优势是存取速度比堆要快，并且栈内的数据可以共享；

但缺点是存在栈中的数据大小与生存期必须是确定的，缺乏灵活性；

先进后出，后进先出原则，所以push优于unshift

## 堆内存

堆（heap）用于复杂数据类型（引用类型）分配空间，例如数组对象、object对象;

它是运行时动态分配内存的，因此存取速度较慢

# 数据类型内存机制

js的数据类型主要分为两种：基本类型值和引用类型值

## 基本数据类型

基本类型值有6种：undefined、null、boolean、number、string、symbol。

这六种数据类型是按值访问的，是存放在栈内存中的简单数据段，数据大小确定，内存空间大小可以分配。

基本类型值的复制是值的传递，赋值以后二者再无关联，修改其中一个不会影响另一个。

## 引用数据类型

引用类型值：6中基本类型值以外的数据类型，都可以看作是引用类型值；

比如array，object等，是保存在堆内存中对象。

js不允许直接访问堆内存中的位置，也就是说不能直接操作对象的内存空间。

在操作对象时，实际是在操作对象的引用而不是实际的对象，是按地址访问的。

直接传递引用类型值的时候，传递的知识引用，二者指向同一块内存，所以修改其中一个，必然会引起另一个变量的变化。

在日常的使用中，我们把对象赋值给一个变量时，通常希望得到的是一个跟原对象无关的的副本，修改新的变量不影响原对象，因此就有了浅拷贝和深拷贝



## 内存角度分析变量声明及定义

`let a = 12;`

1. 创建变量a，放到当前栈内存变量存储区域中

2. 创建一个值12 ,把它存储到当前栈内存值区域中（简单的基本类型值是这样存储的,复杂的引用类型值不是这样做的）

   复杂值(引用类型值)的存储,又分成了三个步骤，`let obj = {name: 'sai'}`:	

   1. 在内存中分配出一块新内存,用来存储引用类型值(堆内存=>heap) =>内存有一个16进制地址
   2. 把对象中的键值对(属性名:属性值)依次存储到堆内存中
   3. 把堆内存地址和变量关联起来

3. =为赋值，其实赋值是让变量和值相互关联的过程

# 作用域与作用域链

对于几乎所有的编程语言来说，最基本的功能之一，就是储存变量当中的值并且能在之后对这个值进行访问和修改。这种能力的引入，是程序的状态存在的基础。

但是，能力的引入需要我们解决几个问题，例如：变量存储在哪里？以何种形式存储？需要读取和修改变量的时候，以什么方式获取到这个变量？

很明显，为了解决这些问题，我们需要一套设计良好的规则来存储变量，并且之后可以方便的找到这些变量。与此同时，整套完整规则的设计就会衍生出额外规则概念。而作用域，就是这套规则下衍生出来的概念。

## 作用域

链接：https://juejin.cn/post/7152863269353422855

我们可以把作用域理解为上面讲到的这套规则下的限定范围。作用域的职责是，在这段限定范围中根据这套设计好的规则存储所声明的变量，并且提供修改该变量的支持。在变量的访问权限安全上，作用域还承担着保护当前作用域内的变量不被外部作用域访问的权限保护作用。

通过类比，我们可以把作用域想象成一个气泡。在这个气泡里所声明的变量成员被包含在其中。每个气泡都配备有一位有原则的管家，将所有的成员管理起来，并针对他们声明的位置和要求对它们提供保护。当气泡中代码语句想要访问和修改变量成员时，管家会结合变量成员的要求关联对应访问和修改操作。

随着ECMAScript标准的不断发展和完善，JavaScript目前存在着四种作用域类型：

- 全局作用域（Global Scope）: JavaScript语言环境的最顶级作用域，在语言环境初始化时创建。
- 模块作用域（Module Scope）: 由ECMAScript模块标准（ES Module）引入，在解析ECMAScript模块时创建。
- 函数作用域（Function Scope）: 在函数声明`function() {}`或者`() => {}`时创建。
  - 可人为创建
- 块级作用域（Block Scope）: 由ECMAScript2015的变量声明标识符`let`和`const`引入，在使用这两者进行变量声明时，根据最近的一对花括号`{}`创建。
  - 可人为创建

```js
/* 全局作用域 start，JavaScript语言环境初始化时就被创建 */
/* 模块作用域 start，作为ES Module解析和执行时被创建 */
let name = 'Wu';

{
  /* 块级作用域 start，const进行变量声明在最近的花括号{}内创建 */
  const prefix = Hardy;
  name = prefix + name;
  /* 块级作用域 end */
}

export function sayMyName(myName) {
  /* 函数作用域 start，函数声明时自动创建，初始化默认包含函数的形参变量 */
  if (!myName) {
    /* 块级作用域 start */
    const noNameAnswer = 'Sorry!';
    console.log(noNameAnswer);
    return;
    /* 块级作用域 end */
  }
  const wordPrifix = 'Hi! My Name is ';
  const answer = wordPrifix + myName + '.';
  console.log(answer);
  /* 函数作用域 end */
}
/* 模块作用域 end */
/* 全局作用域 end */

```

## 作用域的嵌套

作用域在使用上具有嵌套特征。一个作用域能够在自身内部创建一个新作用域从而形成内部和外部作用域的嵌套关系。

全局作用域作为JavaScript的初始作用域，是所有其他作用域最外层的作用域。另外，每一个ES Module都具有模块自己的顶级作用域（top-level scope），模块中的顶级作用域变量和函数都包含在这个模块顶级作用域中，而模块作用域的外部作用域是全局作用域。而函数作用域和块级作用域则相对比较灵活，可以相互嵌套。

## 作用域的一些实现细节

在JavaScript中，每一个函数、代码块`{...}`以及`script`脚本被运行前，都会有一个相对应的称为**词法环境（Lexical Environment）** 的内部关联对象被创建。

词法环境由两部分组成：

- **环境记录（Environment Record）**：一个存储所有局部变量作为其属性（包括一些执行上下文信息，例如`this`的值）的对象。
- **外部词法环境引用（Outer）**：对外部词法环境的引用，以此关联外部词法环境。

代码执行的过程中，每一个局部变量和局部函数的声明，都会作为一个属性字段被添加到环境记录中，后续对变量和函数的读取则通过对应标识符在环境记录中进行查找。	

根据上面的概念，我们可以通过下面的对象结构理解词法环境：

```js
  lexicalEnvironment = {
    environmentRecord: {
      <identifier>: <value>,
      <identifier>: <value>,
    },
    outer: <Reference to the parent lexical environment>,
  }

```

再来通过下面的代码例子来理解词法环境：

```js
/*  当前模块运行时，模块的词法环境被创建，  
moduleLexicalEnvironment = {    
	environmentRecord: {      
		name: <uninitialized>,      
		sayName: <reference to function object>,    
	},    
	outer: <globalLexicalEnvironment>,  
	}
    */

let name = 'Hardy';
/*  变量声明和赋值，修改环境记录的字段属性值，  
moduleLexicalEnvironment = {    
	environmentRecord: {      
        name: 'Hardy',      
        sayName: <reference to function object>,    
	},    
	outer: <globalLexicalEnvironment>,  
    }
    */

function sayName(myName) {
  /*    执行函数时，函数的词法环境被创建，    
  functionLexicalEnvironment = {      
  	environmentRecord = {        
  		myName: 'Hardy',      
    },      
    outer: <moduleLexicalEnvironment>,    
    }  
    */
  /* 通过读取环境记录的对应标识符字段属性值获取myName的变量值 */
  console.log(myName);
}

sayName(); // Hardy

```

我们来分析下上面的代码例子。

根据声明提前的特性，变量`name`和函数`sayName`都会在模块的词法环境创建时被添加在环境记录中。但是，由于`let`的暂时性死区特性，变量`name`在自身声明和初始化赋值之前处于不可引用和未初始化状态。函数的声明则不同，除了声明提前外还会初始化函数的引用。这就是我们可以在函数执行声明语句前调用函数的原因。另外，函数的词法环境在被创建时，对应函数的参数会被初始化在环境记录中，并且会被赋值上调用函数时的所传值或者函数参数的默认值。

在`outer`引用方面，模块词法环境`moduleLexicalEnvironment`的`outer`引用指向JavaScript最外部的全局词法环境`globalLexicalEnvironment`，而函数词法环境`functionLexicalEnvironment`的`outer`引用指向外部的模块词法环境`moduleLexicalEnvironment`。

我们可以看出，词法环境是JavaScript对作用域概念的内部技术实现。它是JavaScript引擎创建一个执行上下文时，创建用来存储变量和函数声明的环境。代码执行过程中，通过它访问到存储在其内部的变量和函数。在代码执行完毕后，执行上下文会从堆栈中被销毁回收，而词法环境也会根据情况的被销毁（如果词法环境被其他外部的词法环境所引用，则不会被销毁回收，例如闭包）。

## 作用域链

作用域可以嵌套，嵌套在内部的作用域可以访问外部的作用域所声明的变量和函数。通过上面词法环境的介绍，我们大概清楚，作用域的这种嵌套关系是通过词法环境的外部词法环境引用`outer`来关联实现的。这种词法环境的外部引用的关联关系，构建了一条单向的词法环境的链条。这就是我们常说的作用域链。

本质上，作用域链是JavaScript引擎给所执行代码维护的一条词法环境链条。代码执行中对外部作用域的变量的引用，通过这一条链条进行变量的查找、读取、修改。

代码执行中对某个变量的访问大致如下：

- 当代码要访问一个变量时，首先会搜索当前内部词法环境。如果搜索成功，就返回对一个变量值或变量引用，结束搜索。如果搜索不到，则通过`outer`引用继续搜索外部词法环境，以此类推，直到全局词法环境。
- 如果在任何地方都找不到这个变量，那么在严格模式下就会报错。

根据上面的概念，我们来看看下面的例子：

```js
let phrase = 'Hello';

function sayHello(name) {
  /*    函数的作用域链,    functionLexicalEnvironment{ name: 'Hardy' } ==outer==>    moduleLexicalEnvironment{ phrase: 'Hello' } ==outer==>    globalLexicalEnvironment        变量name从当前functionLexicalEnvironment中查找到并获取，    变量phrase沿作用域链查找，从moduleLexicalEnvironment中查找到并获取  */
  console.log(`${phrase}, ${name}!`);
}

sayHello('Hardy'); // Hello, Hardy!

```

上面例子中，函数`sayHello`在内部引用了`name`和`phrase`两个变量，函数被调用的执行时会创建`functionLexicalEnvironment > moduleLexicalEnvironment > globalLexicalEnvironment`的作用域链。

其中，变量`name`作为函数参数属于当前函数作用域的局部变量，变量可以直接从当前函数的词法环境`functionLexicalEnvironment`中查找到并返回相关信息。而变量`phrase`属于外部作用域中声明的变量，存储在外部的模块词法环境`moduleLexicalEnvironment`中。函数`sayHello`引用变量`phrase`，会首先从在自身函数词法环境`functionLexicalEnvironment`中进行查找，查找不到后，会沿外部词法环境引用`outer`找到模块词法环境`moduleLexicalEnvironment`，并从中继续进行变量的查找，查找到了并返回变量的相关信息。

值得注意的是`console.log()`是全局内置对象`console`上的方法，对该方法的调用需要引用`console`。这个变量的引用会沿作用域链一直查找到全局词法环境`globalLexicalEnvironment`中，从中查找到并返回相关变量信息。

变量标识符解析和引用的过程就是沿作用域链迭代查找变量是否在作用域链节点中并返回变量相关信息的过程。



## 相关优化

综合上面的标识符的解析过程和作用域以及作用域链的关系，我们可以了解到，变量标识符解析的性能是和变量标识符所处在作用域链中的位置是息息相关的。变量标识符所出的作用域节点越靠近整个作用域链的前端，则需要沿作用域链迭代查找的次数就越少，变量标识符解析的速度就会越快，性能就越好。

这种标识符解析性能的规律，让我们可以得出以下使用变量的优化点：

- 对于频繁引用的外部作用域的变量，可以根据情况在当前作用域内声明赋值为局部变量后使用。
- 减少作用域增强`with`语句的使用。

外部作用域变量标识符的多次引用，会造成执行过程中的标识符解析沿作用域链查找的频繁执行，这种查找在第一次解析引用时是必须的，但是后续解析引用却是重复的。将外部作用域变量通过在当前作用域内声明赋值为局部变量，可以优化后续查找的需要经过的作用域链节点个数，得到一定的性能提升。

`with`语句可以在当前作用域链前端临时添加一个词法环境，从而在位置构建和使用新的作用域链。但是这方式问题也很显而易见：作用域链被加长了，除了被添加到前端的词法环境中的存储的变量外，其他变量的标识符解析性能都会变差。因此，我们应该减少`with`语句的使用。

## 总结

随着JavaScript语言的发展，语言中的作用域的种类也变得丰富起来，不再局限于函数作用域作为最小变量声明范围来使用，而是可以基于更小范围的跨级作用域来管理我们的变量引用范围。变量的管理变得更加的灵活、安全。

作用域链是作用域链嵌套的结构产物，所有变量标识符的解析和引用会沿着作用域链进行查找。而词法环境，是JavaScript对于作用域的内部技术实现。深入了解词法环境后，也让我们更清楚代码在解析变量标识符时的内部执行过程。也根据这个过程，我们大概总结出了两点关于作用域和变量使用的性能优化点。

作用域的使用作为每一位JavaScript开发人员的必修课，了解得深入才能在使用它的时候不再迷茫。它就像空气，存在于JavaScript的许多地方，值得我们去好好了解。



# 变量生命周期



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



























