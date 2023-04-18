---
title: 'vue-cli脚手架的应用、配置和性能优化'
date: 2022/8/9 09:03:02
cover: false
tags:
- vue-cli
typora-root-url: vue-cli脚手架的应用、配置和性能优化
---

# vue-cli中自定义配置webpack

## 加入自己的配置

![img](a6ad7a93589d4d4e8ac8f4392be971f7.png)

## 说明

[配置参考 | Vue CLI](https://cli.vuejs.org/zh/config/#devserver-proxy)

 `configureWebpack` ： 如果是对象则会合并到 `webpack` 中（相同的会覆盖），如果是函数则可以通过参数直接修改添加配置，其他配置直接写在 `module.exports` 最外层即可