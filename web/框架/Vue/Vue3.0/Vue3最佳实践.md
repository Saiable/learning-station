---
title: 'Vue3最佳实践'
date: 2022-8-8 07:15:24
cover: false
toc_number:false
tags:
- Vue
categories: Vue
typora-root-url: Vue3最佳实践
---

> 未提及项，和vue2中最佳实践保持一致
>
> 本篇也可当作：vue2项目改写成vue3注意事项

# 使用`vite`

[开始 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/)

见`vite`相关文档

# `setup`语法糖

[Vue3.2 setup语法糖、Composition API、状态库Pinia归纳总结 - 掘金 (juejin.cn)](https://juejin.cn/post/7006108454028836895#heading-13)

## 一、文件结构

Vue2中，`<template>` 标签中只能有一个根元素，在Vue3中没有此限制

```vue
<template>
  // ...
</template>

<script setup>
  // ...
</script>

<style lang="scss" scoped>
  // 支持CSS变量注入v-bind(color)
</style>
```

## 二、data

> 自动导入见vite篇

使用toRefs解构，template可直接使用

```vue
<script setup>
  import { reactive, ref, toRefs } from 'vue'

  // ref声明响应式数据，用于声明基本数据类型
  const name = ref('Jerry')
  // 修改
  name.value = 'Tom'

  // reactive声明响应式数据，用于声明引用数据类型
  const state = reactive({
    name: 'Jerry',
    sex: '男'
  })
  // 修改
  state.name = 'Tom'
  
  // 使用toRefs解构
  const {name, sex} = toRefs(state)
  // template可直接使用{{name}}、{{sex}}
</script>
```

## 三、method

```vue
<template>
  // 调用方法
  <button @click='changeName'>按钮</button>  
？》</template>

<script setup>
  import { reactive } from 'vue'

  const state = reactive({
    name: 'Jery'
  })

  // 声明method方法
  const changeName = () => {
    state.name = 'Tom'
  }  
</script>
```

## 四、computed

```vue
<script setup>
  import { computed, ref } from 'vue'

  const count = ref(1)

  // 通过computed获得doubleCount
  const doubleCount = computed(() => {
    return count.value * 2
  })
  // 获取
  console.log(doubleCount.value)
</script>
```

## 五、watch

```vue
<script setup>
  import { watch, reactive } from 'vue'

  const state = reactive({
    count: 1
  })

  // 声明方法
  const changeCount = () => {
    state.count = state.count * 2
  }

  // 监听count
  watch(
    () => state.count,
    (newVal, oldVal) => {
      console.log(state.count)
      console.log(`watch监听变化前的数据：${oldVal}`)
      console.log(`watch监听变化后的数据：${newVal}`)
    },
    {
      immediate: true, // 立即执行
      deep: true // 深度监听
    }
  )
</script>
```

## 二十一、定义组件的name

> 见vite篇

用单独的`<script>`块来定义

```vue
<script>
  export default {
    name: 'ComponentName',
  }
</script>
```

更优雅的方式，安装插件：`vite-plugin-vue-setup-extend`，就可以按以下方式定义name了

配置 `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
export default defineConfig({
  plugins: [VueSetupExtend()]
})
```

使用

```vue
<script setup name="ComponentName">
  // todo
</script>
```

`vue-cli`中使用

```bash
npm i unplugin-vue-setup-extend --save-dev
```

`vue-cli`

```js
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require("unplugin-vue-setup-extend/webpack")({
        /* options */
      }),
    ],
  },
};
```

# `axios`最佳实践

## 抽离baseUrl

直接以文件的角度导入即可

`request.js`

```js
import serverConfig from "@/../public/serverConfig.js";
```

# vue3在原型上挂载(封装的方法）

## 方式一 app.config.globalProperties

在`main.js`中引入全局要使用的方法，通过`app.config.globalProperties`添加到全局中。

例一：

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'

// test 是外部引入的方法
const test = () => {
    console.log('ccccc')
    return '测试成功001'
}

const app = createApp(App)
// 添加到全局中
app.config.globalProperties.$Test = test
app.use(test)
app.use(store)
app.use(router)
app.mount('#app')

```

例二：

```ts
import session from './utlis/session'
const app = createApp(App)
/* 挂载原型 */
app.config.globalProperties.$session = session
```

根据官方文档描述
`app.config`是一个包含了 Vue 应用全局配置的对象。你可以在**应用挂载前**修改其属性，方法。
`main.js`

```
// 之前(Vue 2.x)
Vue.prototype.$http = () => { }

// 之后(Vue 3.x)
const app = Vue.createApp({ })
app.config.globalProperties.$http = () => { }
app.use(store).use(router).mount('#app');

```

在要使用的.vue文件中，

通过 getCurrentInstance 的 proxy 使用，不过 proxy 的 ts 类性中还有一个 undefined，所以使用 ts 时，类型就要自己处理了

通过 getCurrentInstance 的 appContext 使用，appContext 获取的即为 main.js 里创建的的 vue 对象.

ts写法

```js
// Home.vue
// ts写法中会使用 defineComponent，普通的写法不用在意
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
    name: 'Home',
    setup() {
        // ts proxy 使用
        const { proxy }: any = getCurrentInstance()
        // js
        /* const { proxy } = getCurrentInstance() */
        console.log(proxy, proxy.$Test())
        // ts appContext 使用
        const { $Test } = getCurrentInstance().appContext.config.globalProperties
        $Test()
        /* 
        但是这种写法不行，打包之后不能正常使用
        const { ctx } = getCurrentInstance()
        ctx.$test
        */
    }
})

```

js写法

```js

import {getCurrentInstance} from 'vue'
const {proxy}=getCurrentInstance()
//get获取
//current当前应用
//instancel实例
//在组合Api内使用getCurrentInstance()返回一个对象
console.log(getCurrentInstance())//相当于vue2的this
proxy.$axios()//就可以找到我们刚才挂载的方法了
proxy.BASEURL//就可以找到我们刚才挂载的属性了

//以上就是vue3原型上挂载公共属性及方法的配置

```



## 方式二 依赖和注入（provide 和 inject）

src 文件夹下新建 symbol 文件夹并新增index.ts (或 .js) 文件

```js
// src/symbol/index.ts
// 定义对应的 symbol 并暴露出去
export const TEST_SYMBOL = Symbol('Test 测试')

```

在 `main.js` 中引入，并使用 `project` 绑定依赖

```js
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { TEST_SYMBOL } from './symbol'
// test 是外部引入的方法
const test = () => {
    console.log('ccccc')
    return '测试成功001'
}
const app = createApp(App)
// 使用 symbol 方式
app.provide(TEST_SYMBOL, test)
// 使用自定义字符串方式
app.provide('$Test', test)
app.use(store)
app.use(router)
app.mount('#app')

```

在对应.vue文件中引入并使用

```js
import { defineComponent, inject } from 'vue'

import { TEST_SYMBOL } from '@/symbol'

export default defineComponent({
    setup() {
        // ts 中它的类型可能是个undefined
        // symbol 方式
        const $Test: (() => string) | undefined = inject(TEST_SYMBOL)
        $Test && $Test()
        // 自定义字符串方式
        const $Test2: (() => string) | undefined = inject('$Test')
        $Test2 && $Test2()
        // js
        /*
        const $Test = inject(TEST_SYMBOL)
        $Test()
        */
    }
})

```

Vue3 不推荐 方式一 在原型链上挂载一些东西这种方式，而是更建议使用 方式二 的 `provide` 和 `inject` 方式

# 格式化样式

[necolas/normalize.css: A modern alternative to CSS resets (github.com)](https://github.com/necolas/normalize.css)

```bash
npm install --save normalize.css
```

normalize.css 修复了 CSS reset 范围之外的常见桌面和移动浏览器错误。包括 HTML5 元素的显示设置、更正 font-size 预格式文本、IE9 中的 SVG 溢出以及跨浏览器和操作系统的许多与表单相关的错误。

您必须在加载任何其他CSS文件之前加载 Normalize.css文件。

`main.js`

```js
import 'normalize.css'
```

# rem适配





















