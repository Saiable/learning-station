---
title: 'npm基础及常用工具包'
date: 2022-11-13 09:03:02
cover: false
tags:
- Node.js
categories: Node.js
---



# 常用工具包

## 加解密

### `jsonwebtoken`



- 安装

  ```js
  npm i jsonwebtoken
  ```

- 使用

  ```js
  // server.js - node.js
  
  // 1.引入
  const jwt = require('jsonwebtoken')
  
  // 2.服务端加密返回数据
  let person = {
      name: 'sai',
      age: 18, // 自定义字段
      openId // 第三方平台的字段，如小程序
  }
  let token = jwt.sign(person, 'myMiniProgram') // 自定义秘钥
  res.send(token)
  
  // 补充，别人即使拿到了数据，但没有秘钥，也是看不了数据的
  let reuslt = jwt.verify(token, 'myMiniProgram-wrong')
  
  ```

  ```js
  //  client.js - 小程序
  // 拿到token后存储本地，发送请求时header携带token
  const _token = JSON.stringify(token)
  wx.setStorageSync('jwt', _token)
  
  // 用的时候可以再用 JSON.parse 处理一下存储在 Storage 里的 Token 数据。
  const _jwt = wx.getStorageSync('jwt')
  const jwt = JSON.parse(_jwt)
  
  // 服务端签发过来的 Token ，除了 Token 本身，还有一些用户相关的信息，比如头像，名字，邮件等等。我们可以直接在小程序的页面上利用这些数据。
  wx.setJWT(response.data)
  wx.switchTab({
      url: '/pages/index/index'
  })
  
  ```











































