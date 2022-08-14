---
title: 'CSS常见属性解析'
date: 2022-8-9 07:28:42
cover: false
typora-root-url: CSS常见属性解析
---



[TOC]

# 搜索输入框

## 静态实现

- 搜索按钮一般通过`a`标签实现

## 组件实现



# 常用自定义样式

## 初始化样式

`normalize.css`

```css
/*normalize*/
html, body {
    margin: 0;
    padding: 0;
}
a {
    text-decoration: none;
}
```

## 水平排列多个元素

- `float`
- `inline-block`
- `flex`

# 常用标签属性

## `width`

**`width`** 属性用于设置元素的宽度。`width` 默认设置[内容区域](https://developer.mozilla.org/en-US/docs/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model#content-area)的宽度，但如果 [`box-sizing`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing) 属性被设置为 `border-box`，就转而设置[边框区域](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model#border-area)的宽度。

[`min-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/min-width) 和 [`max-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/max-width) 属性的优先级高于 [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width)。

### 语法

```css
/* <length> values */
width: 300px;
width: 25em;

/* <percentage> value */
width: 75%;

/* Keyword values */
width: max-content;
width: min-content;
width: fit-content(20em);
width: auto;

/* Global values */
width: inherit;
width: initial;
width: unset;

```

`width` 属性也指定为：

- 下面关键字值之一：`min-content`，`max-content`，`fit-content`，`auto`。
- 一个长度值 `<length>` 或者百分比值 `<percentage>`。

### 取值

- `px`
  - 使用绝对值定义宽度
- `em`
  - 子高
- `%`
  - 使用外层元素的容纳区块宽度（`the containing block's width`）的百分比定义宽度
- `auto`



最后，请注意，除[可替换元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element)外，对于行内元素来说，尽管内容周围存在内边距与边框，但其占用空间（每一行文字的高度）则由 [`line-height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height) 属性决定，即使边框和内边距仍会显示在内容周围。

## `height`

父子元素嵌套的场景下

- 父元素不指定高度，可以子元素指定高度撑开父元素
- 子元素不指定高度，父元素指定高度，而子元素高度设置`100%`



## `margin`



- [外边距重叠 - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/web/css/css_box_model/mastering_margin_collapsing)



## `lineheight`

**`line-height`** [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) 属性用于设置多行元素的空间量，如多行文本的间距。对于块级元素，它指定元素行盒（line boxes）的最小高度。对于非[替代](https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element)的 `inline` 元素，它用于计算行盒（line box）的高度。

### 语法

```css
/* Keyword value */
line-height: normal;

/* Unitless values: use this number multiplied
by the element's font size */
line-height: 3.5;

/* <length> values */
line-height: 3em;

/* <percentage> values */
line-height: 34%;

/* Global values */
line-height: inherit;
line-height: initial;
line-height: unset;
```

`line-height` 属性被指定为以下任何一个：

- 一个 `<数字>`
- 一个 `<长度>`
- 一个 `<百分比>`
- 关键词 `normal`。

### 取值

- normal
  - 取决于用户端。桌面浏览器（包括Firefox）使用默认值，约为`1.2`，这取决于元素的 `font-family`。

- <数字>
  - 该属性的应用值是这个无单位数字[`<数字>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/number)乘以该元素的字体大小。计算值与指定值相同。大多数情况下，这是设置`line-height`的**推荐方法**，不会在继承时产生不确定的结果。

- <长度>
  - 指定[`<长度>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length)用于计算 line box 的高度。参考[`<长度>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length)了解可使用的单位。以 **em** 为单位的值可能会产生不确定的结果（见下面的例子）。

- <百分比>
  - 与元素自身的字体大小有关。计算值是给定的百分比值乘以元素计算出的字体大小。**百分比**值可能会带来不确定的结果（见下面第二个例子）。

### 示例

```
/* 理论上，以下所有规则拥有相同的行高 */

div { line-height: 1.2;   font-size: 10pt; }   /* 无单位数值 number/unitless */
div { line-height: 1.2em; font-size: 10pt; }   /* 长度 length */
div { line-height: 120%;  font-size: 10pt; }   /* 百分比 percentage */
div { font: 10pt/1.2  Georgia,"Bitstream Charter",serif; } /* font 简写属性 font shorthand */
```

为了简便，可以通过 [`font`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font) 简写来设置 `line-height`，但这要求在使用该简写属性时同时设置 `font-family` 属性



**推荐在设置 line-height 时使用无单位数值**

这个示例说明了为什么给 `line-height` 赋值时使用 [`<数字>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/number) 值比使用 [`<长度>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length) 更好。我们会到用两个`div`元素。第一个 `div` 为绿色边框，使用无单位的 `line-height`值。第二个 `div` 带红色边框，使用 `em` 定义 `line-height` 的值。

```css
.green {
  line-height: 1.1;
  border: solid limegreen;
}

.red {
  line-height: 1.1em;
  border: solid red;
}

h1 {
  font-size: 30px;
}

.box {
  width: 18em;
  display: inline-block;
  vertical-align: top;
  font-size: 15px;
}
```

```html
<div class="box green">
 <h1>Avoid unexpected results by using unitless line-height.</h1>
  length and percentage line-heights have poor inheritance behavior ...
</div>

<div class="box red">
 <h1>Avoid unexpected results by using unitless line-height.</h1>
  length and percentage line-heights have poor inheritance behavior ...
</div>

<!-- The first <h1> line-height is calculated from its own font-size   (30px × 1.1) = 33px  -->
<!-- The second <h1> line-height results from the red div's font-size  (15px × 1.1) = 16.5px,  probably not what you want -->
```

![image-20220528102720036](image-20220528102720036.png)

## `background`

- **`background`** 是一种 [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) 简写属性，用于一次性集中定义各种背景属性，包括 `color`,` image`, `origin` 与` size`, `repeat `方式等等。

- 此属性是一个 [简写属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Shorthand_properties)，可以在一次声明中定义一个或多个属性：
  - [`background-clip`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip)
    - `background-clip` 设置元素的背景（背景图片或颜色）是否延伸到边框、内边距盒子、内容盒子下面。
    
  - [`background-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-color)
  
  - [`background-image`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-image)
  
  - [`background-origin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-origin)
  
  - [`background-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position)
  
  - [`background-repeat`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-repeat)
  
  - [`background-size`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size)
  
    `background-size` 设置背景图片大小。图片可以保有其原有的尺寸，或者拉伸到新的尺寸，或者在保持其原有比例的同时缩放到元素的可用空间的尺寸。
  
    单张图片的背景大小可以使用以下三种方法中的一种来规定：
  
    - 使用关键词 `contain`
    - 使用关键词 `cover`
    - 设定宽度和高度值
  
    当通过宽度和高度值来设定尺寸时，你可以提供一或者两个数值：
  
    - 如果仅有一个数值被给定，这个数值将作为宽度值大小，高度值将被设定为`auto。`
    - 如果有两个数值被给定，第一个将作为宽度值大小，第二个作为高度值大小。
  
    `每个值可以是<length>`, 是 `<percentage>`, 或者 `auto`.
  
  - [`background-attachment`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-attachment)

### 语法

```css
/* 使用 <background-color> */
background: green;

/* 使用 <bg-image> 和 <repeat-style> */
background: url("test.jpg") repeat-y;

/* 使用 <box> 和 <background-color> */
background: border-box red;

/* 将背景设为一张居中放大的图片 */
background: no-repeat center/80% url("../img/image.png");

```

`background` 属性被指定多个背景层时，使用逗号分隔每个背景层。

每一层的语法如下：

- 在每一层中，下列的值可以出现 0 次或 1 次：
  - `<attachment>`
  - `<bg-image>`
  - `<position>`
  - `<bg-size>`
  - `<repeat-style>`
- `<bg-size>` 只能紧接着 `<position>` 出现，以"/"分割，如： "`center/80%`".
- `<box>` 可能出现 0 次、1 次或 2 次。如果出现 1 次，它同时设定 [`background-origin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-origin) 和 [`background-clip`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip)。如果出现 2 次，第一次的出现设置 [`background-origin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-origin)，第二次的出现设置 [`background-clip`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip)。
- `<background-color>` 只能被包含在最后一层。

**注意:** [`background-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-color) 只能在`background`的最后一个属性上定义，因为整个元素只有一种背景颜色。

## `transform`

CSS**`transform`**属性允许你旋转，缩放，倾斜或平移给定元素。这是通过修改`CSS`视觉格式化模型的坐标空间来实现的。

> 只能转换由盒模型定位的元素。根据经验，如果元素具有`display: block`，则由盒模型定位元素。

### 语法

```css
/* Keyword values */
transform: none;

/* Function values */
transform: matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0);
transform: translate(12px, 50%);
transform: translateX(2em);
transform: translateY(3in);
transform: scale(2, 0.5);
transform: scaleX(2);
transform: scaleY(0.5);
transform: rotate(0.5turn);
transform: skew(30deg, 20deg);
transform: skewX(30deg);
transform: skewY(1.07rad);
transform: matrix3d(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0);
transform: translate3d(12px, 50%, 3em);
transform: translateZ(2px);
transform: scale3d(2.5, 1.2, 0.3);
transform: scaleZ(0.3);
transform: rotate3d(1, 2.0, 3.0, 10deg);
transform: rotateX(10deg);
transform: rotateY(10deg);
transform: rotateZ(10deg);
transform: perspective(17px);

/* Multiple function values */
transform: translateX(10px) rotate(10deg) translateY(5px);

/* Global values */
transform: inherit;
transform: initial;
transform: unset;

```

`transform`属性可以指定为关键字值`none` 或一个或多个`<transform-function>`值。

### 值

- `transform function`
  - 要应用的一个或多个`CSS`变换函数。 变换函数按从左到右的顺序相乘，这意味着复合变换按从右到左的顺序有效地应用。

- `none`
  - 不应用任何变换。

### 示例

```html
<div>Transformed element</div>
```

```css
div {
  border: solid red;
  transform: translate(30px, 20px) rotate(20deg);
  width: 140px;
  height: 60px;
}
```

![image-20220528145658653](image-20220528145658653.png)

## `z-index`

https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index

https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Positioning/Understanding_z_index
