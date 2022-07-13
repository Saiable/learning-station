---
title:《JavaScript高级程序设计（第4版）》
date:2022-7-9 07:31:58
tags:
  - js书籍
cover:false
typora-root-url: 《JS高级程序设计》
---



# `JavaScript高级程序设计（第4版）`

> 关于第四版出版的若干问题：https://www.zhihu.com/question/20825869
>
> 正如权威指南作者所说，最新的参考现在在网上可以轻易查到，还实时更新，不存在时效问题。他推荐的是 Mozilla 的 [MDN Web Docs](https://link.zhihu.com/?target=https%3A//wiki.developer.mozilla.org/zh-CN/) 和 Node 的 [Node.js参考文档](https://link.zhihu.com/?target=http%3A//nodejs.org/api)。

# 语言基础

## 语法

- 区分大小写
- 标识符
- 注释
- 严格模式
- 语句

## 关键字、保留字

这些词汇不能用作标识符，但现在还可以用作对象的属性名。一般来说，最好还是不要使用关键字和保留字作为标识符和属性名，以确保兼容过去和未来的 `ECMAScript` 版本。

## 变量

- `var`

  - `var`声明作用域

    - 局部变量

      ```js
      function test() { 
       var message = "hi"; // 局部变量
      } 
      test(); 
      console.log(message); // 出错！
      ```

    - 全局变量

      ```js
      function test() { 
       message = "hi"; // 全局变量
      } 
      test(); 
      console.log(message); // "hi"
      ```

      虽然可以通过省略 `var` 操作符定义全局变量，但不推荐这么做。

  - `var`声明提升

    ```js
    function foo() { 
     console.log(age); 
     var age = 26; 
    } 
    foo(); // undefined
    ```

    使用这个关键字声明的变量会自动提升到函数作用域顶部，等价于

    ```js
    function foo() { 
     var age; 
     console.log(age); 
     age = 26; 
    } 
    foo(); // undefined
    ```

    这就是所谓的“提升”（`hoist`），也就是把所有变量声明都拉到函数作用域的顶部。

    此外，反复多次使用` var` 声明同一个变量也没有问题：

    ```js
    function foo() { 
     var age = 16; 
     var age = 26; 
     var age = 36; 
     console.log(age); 
    } 
    foo(); // 36
    ```

    拓展阅读：[js变量声明底层原理分析](https://blog.csdn.net/brokenkay/article/details/107243640)

    > 等把数据结构和计算机组成原理肝完后，会整理成一个专题

## 数据类型

## 操作符

## 语句

## 函数

## 小结

# 变量、作用域与内存



# 对象、类与面向对象

## 理解对象

创建自定义对象的通常方式是创建 Object 的一个新实例

```js
let person = new Object();
console.dir(person)
```

这是一个没有任何属性和方法得空对象（默认有一个`[[Protoype]]`属性，可以通过`person.__proto__`获取到，指向`Object`）

![image-20220713162549927](image-20220713162549927-16577007533111.png)

- 问题：`person.__proto__`指向的`Object`，是始终指向`Object`，还是因为`Object`是构造函数呢？

  ```js
  function Person () {
      this.name = 'sai'
  }
  
  function Animal() {
      this.name = 'animal'
  }
  
  Person.prototype = Animal
  
  const p1 = new Person()
  console.dir(p1)
  ```

  ![image-20220713163207273](image-20220713163207273.png)

  上面提出问题角度就有问题，不能说`person`的`__proto__`属性，而是说成每个构造函数的实例，其默认的`__proto`属性值，是一个对象的引用，这个引用和构造函数的`prototype`属性值中保存的引用，是一致的。

  并且构造函数的`prototype`的引用，是可以被自定义修改的，以指向自定义对象

  而由于第一条的原则存在，即使`Person`的实例的隐式原型对象指向了`Animal`构造函数，在`Animal`函数对象中，也会有一个隐式原型对象指向`Object`构造函数

然后再给它添加属性和方法

```js
let person = new Object(); 
person.name = "Nicholas"; 
person.age = 29; 
person.job = "Software Engineer"; 
person.sayName = function() { 
 console.log(this.name); 
};
console.dir(person)
```

这个例子创建了一个名为 `person` 的对象，而且有三个属性（`name`、`age` 和 `job`）和一个方法（`sayName()`）。`sayName()`方法会显示 `this.name` 的值，这个属性会解析为 `person.name`。

![image-20220713164729421](image-20220713164729421.png)

### 属性的类型



### 定义多个属性



### 读取属性的特征



### 合并对象



### 对象标识及相等判断



### 增强的对象语法



### 对象解构



## 创建对象

### 概述

### 工厂模式