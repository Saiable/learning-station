---
title: 'vite最佳实践'
date: 2023-03-16 07:15:24
cover: false
toc_number:false
tags:
- vite
categories: vite
typora-root-url: vite最佳实践
---



[功能 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/features.html#build-optimizations)

[vite+vue3+ts 手把手教你创建一个vue3项目](https://blog.csdn.net/weixin_59916662/article/details/127331094)

# 初始化项目

[使用Vite快速创建vue3项目](https://blog.csdn.net/z1093541823/article/details/124348035)

在想要的目录执行

```
npm create vite@latest
```

然后

```bash
cd projectname
npm install
npm run dev
```

备注：这种方式是个很简单的壳子，啥都没装

# 安装less/scss

由于是使用vite,vite它提供了对 `.scss`, `.sass`, `.less`, `.styl` 和 `.stylus` 文件的内置支持,但必须安装相应的预处理器依赖;

国内一般只使用 less 或 scss,所以我只写这两个安装

安装less依赖

```bash
 npm add -D less 
```

安装scss and sass 依赖

```bash
 npm add -D sass 
```

> 安装后可以直接使用less了 ,当然，也可以使用scss,一般只下一个就够了,我比较推荐scss

# 自动导入

使用之后,不用导入vue中hook reactive ref

```bash
npm install -D unplugin-vue-components unplugin-auto-import
```

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite";
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite';
 
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			//安装两行后你会发现在组件中不用再导入ref，reactive等
			imports: ['vue', 'vue-router'],
            //存放的位置
			dts: "src/auto-import.d.ts",
		}),
		Components({
			// 引入组件的,包括自定义组件
            // 存放的位置
            dts: "src/components.d.ts",
		}),
	],
 
})
```

# 安装 router

```bash
 npm install vue-router
```

新建`src/router/index.js`

```js
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    // path: '',
    // redirect: '/home',
  },
  {
    // path: '/home',
    // component: () => import("@/views/home/index"),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

```

`main.js`中引入

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App);
app.use(store).use(router).mount('#app');

```

# 安装状态管理库

## vuex



## pinia



## xstate



# 数据持久化插件

## Pinia Plugin Persist

如果你想要数据持久化可以试下这个插件，简单使用

[数据持久化插件](https://seb-l.github.io/pinia-plugin-persist/)

免去了手动存到storage里

# **vue-devtools**插件

[下载、编译、安装、使用 vue-devtools_vue.js devtools](https://blog.csdn.net/weixin_59916662/article/details/127358896)



# 安装axios

## axios+vue3+ts

想要方便使用axios，想要封装统一的请求头处理，便于接口的统一管理，以及解决出现回调地狱。

可以通过下面的链接去实现

[(12条消息) vue3 +ts 安装并封装axios_vue3+ts封装axios_相见一月的博客-CSDN博客](https://blog.csdn.net/weixin_59916662/article/details/127336840)

# vite配置@别名

[vite配置@别名，以及如何让vscode智能提示路经](https://blog.csdn.net/weixin_59916662/article/details/127351858)

`vite.config.js`

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
 // 配置@别名
 import { resolve } from "path"; 
 
 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
      // ↓解析配置
  resolve: {
      // ↓路径别名
      alias: {
        "@": resolve(__dirname, "./src")
      }
    }
})
```

`vscode`插件名称：Path-intellisense



# 自定义组件名

> **TIP：在 3.2.34 或以上的版本中，使用 `<script setup>` 的单文件组件会自动根据文件名生成对应的 `name` 选项，无需再手动声明。**
>
> 但是如果开启了eslint，向index.vue这种组件名就会报错
>
> 也就是说，除非你想换名，并且又不想写两个 **script 标签**，就可以通过下面的链接去做。

[Vue3 setup 语法糖下如何定义组件名称_相见一月的博客-CSDN博客](https://blog.csdn.net/weixin_59916662/article/details/127336651)

```bash
npm i vite-plugin-vue-setup-extend -D
```

配置`vite.config.js`

```js
import { defineConfig } from 'vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
export default defineConfig({
  plugins: [ 
    vue(),
    VueSetupExtend(),
 ]
})
```

使用

```vue
<script setup name="HomeIndex">
const a = ref('1')
</script>


<template>
    <div>HelloWorld {{ a }}</div>
</template>
```

注意，如下单独写模板的话，`vue-devtools`不会生效的，需要在`script`标签中写内容才可

```vue
<script setup name="HomeIndex">
</script>
```



# 安装组件库

## element-plus

[vite + vue + ts 自动按需导入 Element Plus组件，与按需导入后的ElMessage与ElLoading 的问题](https://blog.csdn.net/weixin_59916662/article/details/127334196)

```bash
 npm install element-plus --save
```

自动导入（官方推荐)

首先你需要安装`unplugin-vue-components` 和 `unplugin-auto-import`这两款插件

```bash
npm install -D unplugin-vue-components unplugin-auto-import
```

`vite.config.js`

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
 
// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite"
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite';
//element
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
 
 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
 
    //element按需导入
    AutoImport({
      //安装两行后你会发现在组件中不用再导入ref，reactive等
      imports: ['vue', 'vue-router'],
      dts: "src/auto-import.d.ts",
      //element
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      //element
      resolvers: [ElementPlusResolver()],
      //默认存放位置
      //dts: "src/components.d.ts",
    }),
  ],
 
})
```

值得注意的是，在`components`文件夹下的组件，作为`GlobalComponents`也可以直接使用

`src/components.d.ts`

```js
/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-components
// Read more: https://github.com/vuejs/core/pull/3399
import '@vue/runtime-core'

export {}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    HelloWorld: typeof import('./components/HelloWorld.vue')['default']
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
  }
}

```

### 按需引入后ElMessage与ElLoading 的问题

**创建一个 element-plus.d.ts 的文件**（如果觉得名字不好，可以改，但要以**.d.ts**结束就行）

```ts
export {}
declare global {
  const ElMessage:typeof import('element-plus')['ElMessage'] 
  const ElLoading:typeof import('element-plus')['ElLoading'] 
}
```

**然后在 tsconfig.json 文件添加一行代码**

```json
{
    .......
	"include": [
		"src/**/*.ts",
		"src/**/*.d.ts",
		"src/**/*.tsx",
		"src/**/*.vue",
        //添加这行
		"Element-puls.d.ts"
		],
}
```

如果不是用的ts，直接在之前的`components.d.ts`中新增即可

```ts
import '@vue/runtime-core'

export {}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ElLoading: typeof import('element-plus')['ElLoading'] 
    ElMessage: typeof import('element-plus')['ElMessage'] 
    HelloWorld: typeof import('./components/HelloWorld.vue')['default']
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
  }
}
```

> **原因：**它们与普通的标签组件不同，它们两都是可以运行在script上的API,而这个文件也是引入的API放到全局，然后可以在script使用的，在这文件里的是自动按需导入的，
>
> 可以看下源码的导出,node_modules >element-plus>global.d.ts
>
> 注释的忽略,是为是能看到全部内容
>
> 可以看到这是分两个类型的,
>
> 一个是GlobalComponents(全局组件),
>
> 一个是 ComponentCustomProperties(组件自定义属性)
>
> ![image-20230318151023983](image-20230318151023983.png)
>
> 然而自动导入会在你的components.d.ts 文件 只导入 GlobalComponents(全局组件) ,
>
> 但不会导入 ComponentCustomProperties(组件自定义属性)
>
> 而我也是突然觉得,为啥不也导入组件自定义属性
>
> 那为什么不与一起呢？
>
> 这是因为vite.config.ts里的配置，每次解析imports内的内容，放到dts里，会自动刷新src/auto-import.d.ts内的代码。
>
> 

### 图标字体

下载element-icon（也可以用其他的）

```bash
npm install @element-plus/icons-vue
```

 element-icon也有自动导入的,但我感觉更麻烦,所有还是手动导入吧

手动导入方式:

```bash
import { Grid, RefreshRight } from "@element-plus/icons-vue";
```



##  Ant Design Vue

[vite + vue3 + ts 自动按需导入ant-design-vue组件](https://blog.csdn.net/weixin_59916662/article/details/127334327)



# 安装与使用Echarts

这个看你的项目要不要使用Echarts，如果不用可以忽略。

安装与使用Echarts，这个链接的方法是在vite+vue3，而且是**固定的宽高，不是响应式**的可视化。

[vue3 + ts 在 setup 下使用Echarts](https://blog.csdn.net/weixin_59916662/article/details/127334269)

更多请参考官网



# 配置移动端适配

[vue3-vite下配置postcss-pxtorem进行移动端适配 - 小呀小恐龙 - 博客园 (cnblogs.com)](https://www.cnblogs.com/littleDinosaurs/p/16934871.html)

```bash
//npm方式
// 它能根据设备的宽高来设置页面body元素的字体大小，将1rem设置为设备宽度/10以及在页面大小转换时可以重新计算这些数值
npm install amfe-flexible --save-dev


npm install postcss-pxtorem --save-dev

```

```js
import 'amfe-flexible'
```

在**`vite.config.js`**中配置**`postcss-pxtorem`**：

```js
import postCssPxToRem from "postcss-pxtorem"
...

export default defineConfig({
  ...
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 75, // 1rem的大小
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
        })
      ]
    }
  },
...
})
```

































