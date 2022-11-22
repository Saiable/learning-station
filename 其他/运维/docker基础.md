---
title: 'docker基础'
date: 2022-07-08 07:15:24
cover: false
tags:
- docker
categories: 'Linux'
typora-root-url: docker基础
---

# Docker简介

## 为什么会有docker出现？

假定您在开发一个尚硅谷的谷粒商城，您使用的是一台笔记本电脑而且您的开发环境具有特定的配置。其他开发人员身处的环境配置也各有不同。您正在开发的应用依赖于您当前的配置且还要依赖于某些配置文件。此外，您的企业还拥有标准化的测试和生产环境，且具有自身的配置和一系列支持文件。您希望尽可能多在本地模拟这些环境而不产生重新创建服务器环境的开销。请问？

您要如何确保应用能够在这些环境中运行和通过质量检测？并且在部署过程中不出现令人头疼的版本、配置问题，也无需重新编写代码和进行故障修复？



答案就是使用容器。Docker之所以发展如此迅速，也是因为它对此给出了一个标准化的解决方案-----**系统平滑移植，容器虚拟化技术**。

 

环境配置相当麻烦，换一台机器，就要重来一次，费力费时。很多人想到，能不能从根本上解决问题，**软件可以带环境安装？**也就是说，**安装的时候，把原始环境一模一样地复制过来。开发人员利用 Docker 可以消除协作编码时“在我的机器上可正常工作”的问题。**

![image-20221122145627095](image-20221122145627095.png)

之前在服务器配置一个应用的运行环境，要安装各种软件，就拿尚硅谷电商项目的环境来说，Java/RabbitMQ/MySQL/JDBC驱动包等。安装和配置这些东西有多麻烦就不说了，它还不能跨平台。假如我们是在 Windows 上安装的这些环境，到了 Linux 又得重新装。况且就算不跨操作系统，换另一台同样操作系统的服务器，要***\*移植\****应用也是非常麻烦的。

传统上认为，软件编码开发/测试结束后，所产出的成果即是程序或是能够编译执行的二进制字节码等(java为例)。而为了让这些程序可以顺利执行，开发团队也得准备完整的部署文件，让维运团队得以部署应用程式，开发需要清楚的告诉运维部署团队，用的全部配置文件+所有软件环境。不过，即便如此，仍然常常发生部署失败的状况。Docker的出现使得Docker得以打破过去「程序即应用」的观念。透过镜像(images)将作业系统核心除外，运作应用程式所需要的系统环境，由下而上打包，达到应用程式跨平台间的无缝接轨运作。

## docker理念

Docker是基于Go语言实现的云开源项目。

Docker的主要目标是“Build，Ship and Run Any App,Anywhere”，也就是通过对应用组件的封装、分发、部署、运行等生命周期的管理，使用户的APP（可以是一个WEB应用或数据库应用等等）及其运行环境能够做到“一次镜像，处处运行”。

![image-20221122150504495](image-20221122150504495.png)

Linux容器技术的出现就解决了这样一个问题，而 Docker 就是在它的基础上发展过来的。将应用打成镜像，通过镜像成为运行在Docker容器上面的实例，而 Docker容器在任何操作系统上都是一致的，这就实现了跨平台、跨服务器。只需要一次配置好环境，换到别的机子上就可以一键部署好，大大简化了操作。

一句话：

**解决了运行环境和配置问题的软件容器， 方便做持续集成并有助于整体发布的容器虚拟化技术。**

## 容器与虚拟机比较

# Docker安装

# Docker常用命令

## 帮助启动类命令

- 启动docker： `systemctl start docker`

- 停止docker： `systemctl stop docker`

- 重启docker：`systemctl restart docker`

- 查看docker状态： `systemctl status docker`

- 开机启动： `systemctl enable docker`

- 查看docker概要信息： `docker info`

- 查看docker总体帮助文档： `docker --help`

- 查看docker命令帮助文档：` docker 具体命令 --help`

## 镜像命令

### `docker images`

列出本地主机上的镜像

![image-20221122151039507](image-20221122151039507.png)

各个选项说明：

- `REPOSITORY`：表示镜像的仓库源

- `TAG`：镜像的标签版本号

  - 一仓库源可以有多个 TAG版本，代表这个仓库源的不同个版本，我们使用 ``REPOSITORY:TAG` 来定义不同的镜像。

  - 如果你不指定一个镜像的版本标签，例如你只使用 `ubuntu`，docker 将默认使用 `ubuntu:latest` 镜像

- `IMAGE ID`：镜像ID

- `CREATED`：镜像创建时间

- `SIZE`：镜像大小



`docker images [OPTIONS]`

- `OPTIONS`说明：
  - `-a` :列出本地所有的镜像（含历史映像层）
    - 镜像是有层层堆叠的，后面讲容器卷的时候再详细讲
  - `-q` :只显示镜像ID。

### `docker search `

在`https://hub.docker.com`网站上，搜索某个XXX镜像名字

![image-20221122152334757](image-20221122152334757.png)

各个选项说明：

- `NAME`：镜像名称
- `DESCRIPTION`：描述
- `STARTS`：点赞数
- `OFFICIAL`：是否为官方认证
- `AUTOMATED`：是否为自动构建编译的

![image-20221122152446782](image-20221122152446782.png)

一般选官方认证的



`docker search [OPTIONS] 镜像名称`

- `OPTIONS`说明：

  - `--limit` : 只列出N个镜像，默认25个：`docker search --limit 5 redis`

    ![image-20221122152713323](image-20221122152713323.png)



### `docker pull`

拉取（下载）某个XXX镜像

- `docker pull 镜像名字[:TAG]`
- `docker pull 镜像名字`
  - 没有`TAG`就是最新版
  - 等价于`docker pull 镜像名字:latest`

- 建议指定版本号，不然今年下一次，隔了段时间人家镜像更新了，再`docker images`查看时，显示的版本是`latest`，但实际上应该不是最新了

![image-20221122153236173](image-20221122153236173.png)

### `docker system df`

查看镜像/容器/数据卷所占的空间

![image-20221122153606402](image-20221122153606402.png)

### `docker rmi`

`docker rmi `，删除镜像

- 删除单个

  - `docker rmi 某个XXX镜像名字`

  - `docker rmi -f 某个XXX镜像名字ID`，强制删除

- 删除多个
  - `docker rmi -f 镜像名1:TAG 镜像名2:TAG`
- 删除全部
  - `docker rmi -f $(docker images -qa)`



面试题：谈谈docker虚悬镜像是什么？

- 是什么
  - 仓库名、标签都是`<none>`的镜像，俗称虚悬镜像`dangling image`
  - 建议删除，有时候`docker`在构建时会出问题

















# 使用`docker`安装应用软件

## 安装`vscode`



## 安装`mysql`

1.docker拉取mysql版本：

```bash
sudo docker pull mysql:5.7
```

2.创建挂载目录：

可以看看是否已经存在了

```bash
mkdir /usr/local/mysql
```

用于挂载mysql数据文件

```bash
mkdir /usr/local/mysql/data
```

用于挂载mysql配置文件

```bash
mkdir /usr/local/mysql/conf.d
```

3 启动容器

```bash
docker run --name mysql5.7 -p 3306:3306 -v /usr/local/mysql/data:/var/lib/mysql -v /usr/local/mysql/conf.d:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=jkjk@qaz12 -d mysql:5.7
```



处理mysql 1045报错

1 在 /usr/local/mysql/conf.d目录下增加文件： my.cnf

文件内容为：

```
[mysqld]
skip-grant-tables
```

2 重启mysql：

```
docker restart mysql
```

3进入docker的bash：

```
docker exec -it mysql bash
```

4登录mysql：

```
mysql -u root -p
```

复制粘贴之前设置的密码

5设置root密码为空，注意root密码是加密的，设置其它值不好找到对应的明文。

命令是分开的

```
use mysql;

select user,authentication_string,host from user;

```

//更新为空

```
update user set authentication_string='' where user='root';

flush privileges;

```

6 退出mysql，把第一步的skip-grant-tables注释。再重启mysql

```
exit
```

7 使用 root用户，密码 回车键登录；

直接回车

```
mysql -u root -p
```

8 修改root密码：

```
alter user 'root'@'localhost' IDENTIFIED BY 'jkjk@qaz12';

alter user 'root'@'%' IDENTIFIED BY 'jkjk@qaz12';

flush privileges;

```

修改root密码完成。

9 可附加一步授权：

（报语法错误，跳过）

```
GRANT all ON . TO 'root'@'%' IDENTIFIED BY 'jkjk@qaz12' ;

flush privileges;

```

至此，可以用数据库连接工具连接





### 其他

```bash
 sudo docker run -d -p 3306:3306 -v /usr/local/mysql/conf:/etc/mysql/conf.d -v /usr/local/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=jkjk@qaz12 --name  mysql mysql:5.7
```



```
配置端口映射：
-p 3306:3306 --name mysql
将容器的3306端口映射到主机的3306端口
配置mysql数据卷挂载
1.-v /mydata/mysql/log:/var/log/mysql(日志文件挂载)
将容器中的日志文件夹挂载到主机对应的/var/log/mysql文件夹中
2.-v /mydata/mysql/data:/var/lib/mysql(数据文件挂载)
将容器中的数据文件夹挂载到主机对应的/var/lib/mysql文件夹中
3.-v /mydata/mysql/conf:/etc/mysql(配置文件挂载)
将容器的配置文件夹挂载到主机对应的/etc/mysql文件夹中
注(这里所提的主机指的是当前的linux主机)
配置用户
-e MYSQL_ROOT_PASSWORD=root
设置初始化root用户的密码
指定镜像资源
-d mysql:5.7
-d：以后台方式运行实例
mysql:5.7：指定用这个镜像来创建运行实例

```



测试

```bash
docker exec -it mysql bash
```

```bash
mysql -h localhost -u root -p
```

## 安装`doccano`



## 安装`Label Studio`

拉取镜像

```bash
docker pull heartexlabs/label-studio:latest
```

新建一个目录并进入

```bash
cd /data/labelstudio

docker run -it -p 8083:8080 -v `pwd`/mydata:/label-studio/data heartexlabs/label-studio:latest
```



