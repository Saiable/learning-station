---
title: 'mock'
date: 2023-01-06 07:15:24
cover: false
typora-root-url: mock
---

# 常用的MOCK方案说明

https://juejin.cn/post/7026165301255340045

## 方案①：代码侵入

 (实际开发中最常用，但不推荐)

特点：直接在代码中写死 Mock 数据，或者请求本地的 JSON 文件
优点：无
缺点：

1. 和其他方案比 Mock 效果不好
2. 与真实 Server 环境的切换非常麻烦，一切需要侵入代码切换环境的行为都是不好的



定义json文件，填充需要的字段：https://blog.csdn.net/qq_41138191/article/details/126856929

在代码汇总引入即可

