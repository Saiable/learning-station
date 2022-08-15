---
title: 'CSS选择器汇总'
date: 2022-7-9 07:28:42
cover: false
tags:
- CSS选择器
categories: 'CSS'
---



# 选择器

## 常用选择器：

- 元素选择器
- 类选择器
- id选择器

## 交集选择器：

```css
div.red{	
    color:red;
}
```

## 并集选择器：

```css
h1, span{	
    color:red;
}
```

## 关系选择器：

- 父元素：直接包含子元素的元素
- 子元素：直接被父元素包含的元素
- 祖先元素：直接或间接包含后代元素的元素
- 后代元素：直接或间接被祖先元素包含的元素
- 兄弟元素：拥有相同父元素的元素

### 子元素选择器：

```css
div.box > span{	
    color:red;
}
```

### 后代元素选择器：

```css
div.box span{	
    color:red;
}
```

### 兄弟选择器：

```css
p + span{	
    color:red;
}
```

### 选择下面所有的兄弟：

```css
p ~ span{	
    color:red;
}
```

## 属性选择器：

```css
p[title]{	
    color:red;
}
[title=abc]{	
    color:red;
}
/*以abc开头*/
[title^=abc]{	
    color:red;
}
/*以abc结尾*/
[title$=abc]{	
    color:red;
}
/*包含abc即可*/
[title*=abc]{	
    color:red;
}
```

## 伪类选择器：

```css
:root {
  --global-color: #666;
  --pane-padding: 5px 42px;
}

ul > li:first-child{	
    color:red;
}
ul > li:last-child{	
    color:red;
}
ul > li:nth-child(1){	
    color:red;
}	
ul > li:nth-child(2n){	
    color:red;
}
```

```css
ul > li:first-of-type{	
    color:red;
}
ul > li:last-of-type{	
    color:red;
}
ul > li:nth-of-type(1){	
    color:red;
}
ul > li:nth-of-type(2n){	
    color:red;
}
```

### 否定伪类：

```css
ul > li:not(:nth-child(5)){	
    color:red;
}
```

### 超链接伪类：

```css
a:link{	
    color:red;
}

a:visited{	
    color:red;
}

a:hover{	
    color:red;
}

a:active{	
    color:red;
}
```

## 伪元素选择器：

```css
/*表示第一个字母*/
p::first-letter{	
    color:red;
}

/*表示第一行*/
p::first-line{	
    color:red;
}

/*表示选中的内容*/
p::selection{	
    olor:red;}
/*元素的开始*/

p::before{	
    color:red;
}

/*元素的结束*/
p::after{	
    color:red;
}
```

## 餐厅练习（选择器练习）

[https://flukeout.github.io/](https://flukeout.github.io/)