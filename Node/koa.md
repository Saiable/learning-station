---
title: Koa2搭建通用API服务
cover: false
date: 2022/7/25 05:52:13
typora-root-url: koa
---

# Koa2入门

https://www.bilibili.com/video/BV18h411H7GE?spm_id_from=333.999.0.0

# Node+Koa2搭建通用API服务

教程来源：https://www.bilibili.com/video/BV13A411w79h?spm_id_from=333.999.0.0

## 初始化

- `npm init -y`
- `git init`，并新建`.gitignore`，添加`node_modules`
  - 提交版本后，并通过`git log`查看记录
- 新建`README.md`文档

## 项目初始化

- `npm i koa`

- 根目录新建`src/main.js`

  ```js
  const Koa = require('koa') // 导入Koa，由于导出的是类，一般大写
  
  const app = new Koa() // 实例化
  
  app.use((ctx, next) => { // 中间件
      ctx.body = 'hello world' // 测试代码
  })
  
  app.listen(3000, () => { // 开启服务
      console.log('server is running on http://localhost:3000 !');
  })
  ```

- 启动开发服务：

  - `node .\src\main.js`:`node`方式启动，是常驻内存，不是热加载的

## 开发优化

### 自动重启服务

- `npm i nodemon`

- 配置`dev`脚本：如果`nodemon`装在了全局，则不需要加`npx`

  `package.json`

  ```json
  {
    "name": "01",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "dev": "npx nodemon ./src/main.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "koa": "^2.13.4",
      "nodemon": "^2.0.19"
    }
  }
  
  ```

- `npm run dev`启动

  ```bash
  PS D:\workspace\github\code\project-workshop\code-prac\koa\01> npm run dev
  
  > 01@1.0.0 dev
  > npx nodemon ./src/main.js
  
  [nodemon] 2.0.19
  [nodemon] to restart at any time, enter `rs`
  [nodemon] watching path(s): *.*
  [nodemon] watching extensions: js,mjs,json // 监听这三种文件
  [nodemon] starting `node ./src/main.js` // 使用node启动
  server is running on http://localhost:3000 ! // 打印输出内容
  ```

### 读取配置文件

- 安装`dotenv`（可以去`npm`官网上查看介绍）：在根目录中加载`.env`的配置文件，将键值对加载到`process.env`的环境变量中

  - `npm i dotenv`

  - 项目根目录，新建`.env`配置文件并添加配置

    `.env`

    ```
    APP_PORT = 8000
    ```

- 读取配置

  - 新建`src/config/config.default.js`

    ```js
    require('dotenv').config() // 导入dotenv，调用config方法，读取配置并写入到`process.env`中
    
    module.export = process.env
    ```

  - 改写`main.js`，使用解构赋值的方式，获取到`APP_PORT`的配置

    ```js
    const Koa = require('koa')
    const {APP_PORT} = require('./config/config.default') // 导入process.env环境变量中的APP_PORT字段
    const app = new Koa()
    
    app.use((ctx, next) => {
        ctx.body = 'hello world'
    })
    
    app.listen(APP_PORT, () => {
        console.log(`server is running on http://localhost:${APP_PORT} !`); // 使用模板字符串
    })
    ```

  - 启动开发服务

## 添加路由

所谓的`api`，就是根据不同`url`返回不同的数据

目前`http://localhost:8000`和`http://localhost:8000/users`返回的内容都是一样的

需要使用路由，来根据不同的`url`，调用不同的处理函数



安装`koa-router`

- ``api官网：`[router/API.md at master · koajs/router (github.com)](https://github.com/koajs/router/blob/master/API.md)
- `npm install @koa/router`

官网案例：

```js
const Koa = require('koa');
const Router = require('@koa/router'); // 1.导入Router

const app = new Koa();
const router = new Router(); // 2.新建router实例对象

router.get('/', (ctx, next) => { // 3.编写路由
  // ctx.router available
});

app // 4.注册中间件
  .use(router.routes()) // use方法只能接受函数作为参数，通过router.routes()方法返回一个函数给中间件处理
  .use(router.allowedMethods());
```

配置多个路由

```js
const Koa = require('koa') // 导入Koa，由于导出的是类，一般大写
const Router = require('@koa/router') // 导入router

const {APP_PORT} = require('./config/config.default')
const app = new Koa() // 实例化


// app.use((ctx, next) => { // 中间件
//     ctx.body = 'hello world' // 测试代码
// })

const indexRouter = new Router()
indexRouter.get('/', (ctx, next) => {
    ctx.body = 'hello world'
})

const userRouter = new Router()
userRouter.get('/user', (ctx, next) => {
    ctx.body = 'user'
})


app.use(indexRouter.routes())
app.use(userRouter.routes())

app.listen(APP_PORT, () => { // 开启服务
    console.log(`server is running on http://localhost:${APP_PORT} !`);
})
```

但是代码都写在一起肯定不行，需要拆分一下路由

新建`src/router`文件夹

新建`user.routes.js`

```js
const Router = require('@koa/router')
const router = new Router({prefix: '/user'})


router.get('/', (ctx, next) => {
    ctx.body = 'user'
})

module.exports = router

```

修改`main.js`

```js
const Koa = require('koa') // 导入Koa，由于导出的是类，一般大写
const Router = require('@koa/router') // 导入router

const {APP_PORT} = require('./config/config.default')
const app = new Koa() // 实例化
const userRouter = require('./router/user.route')

const indexRouter = new Router()
indexRouter.get('/', (ctx, next) => {
    ctx.body = 'hello world'
})

app.use(indexRouter.routes()) // 后续这里也会继续优化，不然当路由很多时，写法也会很恶心
app.use(userRouter.routes())

app.listen(APP_PORT, () => { // 开启服务
    console.log(`server is running on http://localhost:${APP_PORT} !`);
})

```

## 目录结构优化

### 拆分`http`服务和业务代码

我们在`main.js`里面写了太多的功能

- 拆分`http`服务与业务相关代码

  - 新建`src/app/index.js`，专门放业务代码

  ```js
  const Koa = require('koa') // 导入Koa，由于导出的是类，一般大写
  const Router = require('@koa/router') // 导入router
  
  const userRouter = require('../router/user.route')
  
  const app = new Koa() // 实例化
  const indexRouter = new Router()
  indexRouter.get('/', (ctx, next) => {
      ctx.body = 'hello world'
  })
  
  app.use(indexRouter.routes())
  app.use(userRouter.routes())
  
  module.exports = app
  
  ```

  修改`man.js`

  ```js
  
  const {APP_PORT} = require('./config/config.default')
  
  const app = require('./app')
  
  app.listen(APP_PORT, () => { // 开启服务
      console.log(`server is running on http://localhost:${APP_PORT} !`);
  })
  
  
  ```

### 抽离控制层

将路由`router`中的处理函数，单独抽离成控制层`controller`

- 新建`src/controller`文件夹

- 新建`user.controller.js`

  ```js
  class UserController{
      async register(ctx, next) {
          ctx.body = '用户注册成功'
      }
  }
  
  module.exports = new UserController()
  ```

  修改`router/user.route.js`

  ```js
  const Router = require('@koa/router')
  const router =  new Router({prefix: '/user'})
  const {register} = require('../controller/user.conroller')
  
  // 注册接口
  router.post('/register', register)
  
  module.exports = router
  
  ```

- 测试接口

  这里我们写成了`post`请求，使用`postman`或者是`Apifox`（国内的）来测试`post`请求

  这里以`apifox`为例，下载后，新建项目 > 新建接口

  按图示配置

  ![image-20220725220620161](image-20220725220620161.png)

  ![image-20220725220748784](image-20220725220748784.png)

  配置好路由后，点击运行，可以拿到数据了：

  ![image-20220725220846437](image-20220725220846437.png)

- 我们再写一个登录的接口

  `user.router.js`

  ```js
  const Router = require('@koa/router')
  const router =  new Router({prefix: '/user'})
  const {register, login} = require('../controller/user.conroller')
  
  // 注册接口
  router.post('/register', register)
  // 登录接口
  router.post('/login', login)
  
  
  module.exports = router
  
  ```

  `user.controller.js`

  ```js
  class UserController{
      async register(ctx, next) {
          ctx.body = '用户注册成功'
      }
  
      async login(ctx, next) {
          ctx.body = '用户登录成功'
      }
  }
  
  module.exports = new UserController()
  ```


## 解析`body`，拆分`service`层

### 解析`body`

> 完整的注册接口

```
POST /user/register
```

> 请求参数

```
user_name, password
```

> 响应

成功：

```
{
	"code": 0,
	"message": "用户注册成功",
	"result": {
		id: 2,
		"user_name": "user"
	}
}
```

原型图：

<img src="image-20220725222952833.png" alt="image-20220725222952833" style="zoom:67%;" />

`koa`需要借助中间件，来解析参数

- `koa-body`：https://www.npmjs.com/package/koa-body

  ```
  A full-featured koa body parser middleware. Supports multipart, urlencoded, and json request bodies. Provides the same functionality as Express's bodyParser - multer.
  ```

  官方基础样例：

  ```js
  const Koa = require('koa');
  const koaBody = require('koa-body'); // 1.引入中间件
  
  const app = new Koa();
  
  app.use(koaBody()); // 在所有请求之前，注册这个中间件，就把所有的内容写到了ctx.request.body里面
  app.use(ctx => {
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`; // 3.看下request.body
  });
  
  app.listen(3000);
  ```

  - 更推荐，相比较于`koa-bodyparser`，还支持文件上传

- `koa-bodyparser`



将之前`apifox`的注册接口完善下，由于是`post`请求，我们在`body`里面，设置参数

![image-20220725225232579](image-20220725225232579.png)

 安装`koa-body`

```bash
npm i koa-body
```

补充，将`nodemon`安装到开发时依赖，先卸载：`npm uninstall nodemon`，再重新安装到开发依赖：`npm i nodemon -D`



在`app/index.js`中添加`koa-body`相关代码

`app/index.js`

```js
const Koa = require('koa')
const Router = require('@koa/router')
const koaBody = require('koa-body') // 1.导入koa-body
const userRouter = require('../router/user.route')

const app = new Koa()
app.use(koaBody()) // 2.在所有中间件之前，注册koa-body

const indexRouter = new Router()
indexRouter.get('/', (ctx, next) => {   
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`
})

app.use(indexRouter.routes())
app.use(userRouter.routes())

module.exports = app

```

控制层（处理函数）`user.config.js`

```js
class UserController{
    async register(ctx, next) {
        console.log(ctx.request.body)
        ctx.body = ctx.request.body // 我的理解：把请求的参数，放在响应的body里面，再返给客户端
    }

    async login(ctx, next) {
        ctx.body = '用户登录成功'
    }
}

module.exports = new UserController()
```

回到`apifox`中，我们生成下`body`请求体，发送下注册的请求

![image-20220725230641092](image-20220725230641092.png)

后台也打印结果了

![image-20220725230741773](image-20220725230741773.png)

控制器里一般做这些事

- 1.获取数据
- 2.操作数据库
  - 如果操作数据库的逻辑很复杂，也会单独抽出这一部分（`service`层）
- 3.返回结果



### 抽取`servcie`层

新建`src/service`目录

新建`user.service.js`

```js
class UserService {
    // 主要用来操作数据库
    // 处理函数对应数据库的操作，就是增删改查
    // 注册，就是往数据库里，增加一条记录
    async createUser(user_name, password) { // 当参数超过三个时，建议用一个对象
        //@TODO: 写入数据库
        return '写入数据库成功'
    }
}

module.exports = new UserService()
```

修改`user.controller.js`

```js
const {createUser} = require('../service/user.service')

class UserController{
    async register(ctx, next) {
        // 1. 获取数据
        // console.log(ctx.request.body)
        const {user_name, password} = ctx.request.body
        // 2.操作数据库
        const res = await createUser(user_name, password)

        // 3.返回结果
        ctx.body = ctx.request.body // 我的理解：把请求的参数，放在响应的body里面，再返给客户端
    }

    async login(ctx, next) {
        ctx.body = '用户登录成功'
    }
}

module.exports = new UserController()
```

后台打印结果：

![image-20220725232505667](image-20220725232505667.png)
