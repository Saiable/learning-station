---
title: '使用hexo搭建博客'
date: 2022/7/8 07:15:24
cover: false
typora-root-url: 使用hexo搭建博客
---



# 使用`hexo`搭建博客

教程来源：

https://www.bilibili.com/read/cv12633102

https://blog.csdn.net/qq_41356250/article/details/125148095

https://tzy1997.com/articles/hexo1610/

# 环境准备



# 项目结构搭建



# `Butterfly`主题美化

链接：https://tzy1997.com/articles/hexo1606

## 生成文章唯一链接（未生效）

`Hexo`的默认文章链接格式是年，月，日，标题这种格式来生成的。如果你的标题是中文的话，那你的URL链接就会包含中文。

```yml
permalink: :year/:month/:day/:title
```

前往你的`Hexo`博客根目录，打开cmd命令窗口执行`npm install hexo-abbrlink --save`。

修改站点配置文件`_config.yml`中`permalink`属性。

```diff
- permalink: :year/:month/:day/:title/
#修改为
+ permalink: post/:abbrlink.html # post为自定义前缀
+ abbrlink:
+   alg: crc32   #算法： crc16(default) and crc32
+   rep: hex     #进制： dec(default) and hex

```

## 页面底部 footer 跳动的心

编辑`BlogRoot/node_modules/hexo-theme-butterfly/layout/includes/footer.pug`文件

将以下内容

```pug
&copy;${theme.footer.owner.since} - ${nowYear} By ${config.author}
```

改为

```pug
&copy;${theme.footer.owner.since} - ${nowYear + ' '} <i id="heartbeat" class="fa fas fa-heartbeat"></i> ${config.author}
```

将以下内容

```pug
&copy;${nowYear} By ${config.author} 
```

改为

```pug
&copy;${nowYear + ' '} <i id="heartbeat" class="fa fas fa-heartbeat"></i> ${config.author}
```

将以下内容添加到` <head></head>`标签内：

```yml
<link rel="stylesheet" href="https://fastly.jsdelivr.net/gh/HCLonely/images@master/others/heartbeat.min.css">

```

未防止资源失效，内容如下：

```css
/**
 * Minified by jsDelivr using clean-css v5.3.0.
 * Original file: /gh/HCLonely/images@master/others/heartbeat.css
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
#heartbeat{color:red;animation:iconAnimate 1.33s ease-in-out infinite}@-moz-keyframes iconAnimate{0%,100%{transform:scale(1)}10%,30%{transform:scale(.9)}20%,40%,60%,80%{transform:scale(1.1)}50%,70%{transform:scale(1.1)}}@-webkit-keyframes iconAnimate{0%,100%{transform:scale(1)}10%,30%{transform:scale(.9)}20%,40%,60%,80%{transform:scale(1.1)}50%,70%{transform:scale(1.1)}}@-o-keyframes iconAnimate{0%,100%{transform:scale(1)}10%,30%{transform:scale(.9)}20%,40%,60%,80%{transform:scale(1.1)}50%,70%{transform:scale(1.1)}}@keyframes iconAnimate{0%,100%{transform:scale(1)}10%,30%{transform:scale(.9)}20%,40%,60%,80%{transform:scale(1.1)}50%,70%{transform:scale(1.1)}}
/*# sourceMappingURL=/sm/7c97f3456d34ee6c17ca4a9141bef0f29c52d1ce9d85298b17f398a0de252965.map */
```

具体位置如下：

![image-20220810224105821](image-20220810224105821.png)



## 修改标题样式

在`BlogRoot/node_modules/hexo-theme-butterfly/source/css`文件下新建 `css` 文件，并命名为 `custom.css`( 命名按照自己喜好去命名，只需在主题配置文件`_config.butterfly.yml`中引入对应的`css`文件即可)，将以下代码复制到新建的`custom.css`中。

如果想自行修改标题样式的话，将`content: '\f0c1';`中的内容换成自己想要的即可，如要添加动画，参考`animation: avatar_turn_around 1s linear infinite;`。

```css
/* 标题样式开始 */
#article-container h1:before,
#article-container h2:before,
#article-container h3:before,
#article-container h4:before,
#article-container h5:before,
#article-container h6:before,
#post .post-outdate-notice:before,
.fontawesomeIcon,
.note:not(.no-icon)::before,
hr:before {
    display: inline-block;
    font-weight: 600;
    font-style: normal;
    font-variant: normal;
    font-family: 'Font Awesome 5 Free';
    text-rendering: auto;
    -webkit-font-smoothing: antialiased
}
#article-container h1:before,
#article-container h2:before,
#article-container h3:before,
#article-container h4:before,
#article-container h5:before,
#article-container h6:before {
    position: absolute;
    color: #f47466;
    /* 回形针 */
    content: '\f0c1';  
    line-height: 1;
    -webkit-transition: all .2s ease-out;
    -moz-transition: all .2s ease-out;
    -o-transition: all .2s ease-out;
    -ms-transition: all .2s ease-out;
    transition: all .2s ease-out;
    /* 若要使用风车效果，请去掉下面的注释 */
    /* content: '\f863'; 
    animation: avatar_turn_around 1s linear infinite; */
}
#article-container h1 {
    padding-left: 1.4rem
}

#article-container h1 code {
    font-size: 1rem
}

#article-container h1:before {
    margin-left: -1.3rem;
    top: calc(50% - .5rem);
    font-size: 1rem
}

#article-container h1:hover {
    padding-left: 1.6rem
}

#article-container h2 {
    padding-left: 1.3rem
}

#article-container h2 code {
    font-size: .9rem
}

#article-container h2:before {
    margin-left: -1.4rem;
    top: calc(50% - .45rem);
    font-size: .9rem
}

#article-container h2:hover {
    padding-left: 1.5rem
}

#article-container h3 {
    padding-left: 1.2rem
}

#article-container h3 code {
    font-size: .8rem;
    top: calc(50% - .4rem);

}

#article-container h3:before {
    margin-left: -1.2rem;
    top: calc(50% - .4rem);
    font-size: .8rem
}

#article-container h3:hover {
    padding-left: 1.4rem
}

#article-container h4 {
    padding-left: 1.1rem
}

#article-container h4 code {
    font-size: .7rem
}

#article-container h4:before {
    margin-left: -1rem;
    top: calc(50% - .35rem);
    font-size: .7rem
}

#article-container h4:hover {
    padding-left: 1.3rem
}

#article-container h5 {
    padding-left: 1rem
}

#article-container h5 code {
    font-size: .6rem
}

#article-container h5:before {
    margin-left: -.8rem;
    top: calc(50% - .3rem);
    font-size: .6rem
}

#article-container h5:hover {
    padding-left: 1.2rem
}

#article-container h6 {
    padding-left: 1rem
}

#article-container h6 code {
    font-size: .6rem
}

#article-container h6:before {
    margin-left: -.8rem;
    top: calc(50% - .3rem);
    font-size: .6rem
}

#article-container h6:hover {
    padding-left: 1.2rem
}

/* 标题样式结束 */
```

`_config.butterfly.yml`中引入

在 博客根目录的主题配置文件 `_config.butterfly.yml` 中找到` inject` 并修改，引入 css 文件即可

```yml
inject:
  head:
  - <link rel="stylesheet" href="/css/custom.css">
  bottom:
  # - <script src="xxxx"></script>

```



## 鼠标样式

复制一下内容到`custom.css`

图片可以自己上传，

![image-20220810225621101](image-20220810225621101.png)

像素30*30

```css
body {
    cursor: url(https://bu.dusays.com/2022/05/17/6283c365d20dd.png), auto;
}

.hide-block>.hide-button.open,
.hide-inline>.hide-button.open {
    display: block
}

a,
button,
img {
    cursor: url(https://bu.dusays.com/2022/05/17/6283c376afcfc.png), auto
}

```

## 滚动条

透明效果

复制以下内容到`custom.css`

```css
::-webkit-scrollbar {
    width: 8px;
    height: 8px
}

::-webkit-scrollbar-track {
    border-radius: 2em;
    /* background-color: rgba(73, 177, 245, .2); */
}

::-webkit-scrollbar-thumb {
    background-color: rgb(255 255 255 / .3);
    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent);
    border-radius: 2em
}

::-webkit-scrollbar-corner {
    background-color: transparent
}

```



## 更换字体

`custom.css`

```css
@font-face {
    font-family: 'mindcons';
    /* 字体名自定义即可 */
    src: url('https://fastly.jsdelivr.net/gh/tzy13755126023/BLOG_SOURCE/font/ZhuZiAWan.woff2');
    /* 字体文件路径 */
    font-display: swap;
}

body,
.gitcalendar {
    font-family: mindcons !important;
}

```

## 搜索

### 标题搜索

```bash
npm install hexo-generator-search --save
```

修改站点配置文件`_config.yml`，添加如下代码

```yml
search:
  path: search.xml
  field: post
  content: true

```

主题中开启搜索。
在主题配置文件`_config.butterfly.yml`中修改以下内容：

```diff
local_search:
-  enable: false
+  enable: true
```

重新编译运行，即可看到效果。
前往博客根目录，打开cmd命令窗口依次执行如下命令：

```bash
hexo cl && hexo generate
hexo s -p 8000
```

实际部署时注意`CNAME`文件

经测试，现在这个插件直接就可以支持搜索文章内容了

![image-20220811195825913](image-20220811195825913.png)

### 内容搜索

https://tzy1997.com/articles/hexo1607/

获取 `Algolia` 账号

注册 `Algolia`。https://www.algolia.com/
进入官网地址 注册，也可以直接用Github授权登录。

![image-20220811194142680](image-20220811194142680.png)



![image-20220811194210278](image-20220811194210278.png)



![image-20220811194246448](image-20220811194246448.png)



![image-20220811194312469](image-20220811194312469.png)

```bash
npm install hexo-algoliasearch --save
```

修改站点配置文件`_config.yml`，添加如下代码：

```yaml
algolia:
  appId: "your applicationID"
  apiKey: "your Search-Only API Key"
  adminApiKey: "your Admin API Key"
  chunkSize: 5000
  indexName: "your indexName"
  fields:
    - content:strip:truncate,0,500
    - excerpt:strip
    - gallery
    - permalink
    - photos
    - slug
    - tags
    - title
```

![image-20220811194420778](image-20220811194420778.png)
