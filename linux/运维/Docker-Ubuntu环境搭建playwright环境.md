---
title: 'Docker-Ubuntu环境搭建开发'
date: 2023-01-13 14:15:24
cover: false
tags:
- docker
typora-root-url: Docker-Ubuntu环境搭建playwright环境
---

`author:zzh`



# 在Docker中运行一个Ubuntu20.04桌面并安装playwright搭建自动化获取html环境



## 第一次打包镜像---添加root权限



![image-20230118135616821](image-20230118135616821.png)



```shell
### https://hub.docker.com/r/kasmweb/ubuntu-focal-desktop
### docker build -t zzh/ubuntu-focal-desktop:1.12.0 .
### 启动镜像的命令：sudo docker run  -it --name=zzh_ubuntu-focal-desktop --shm-size=512m -p 26901:6901 -e VNC_PW=password zzh/ubuntu-focal-desktop:1.12.0
### 访问地址： https://IP_OF_SERVER:6901
### User : kasm_user
### Password: password

FROM kasmweb/ubuntu-focal-desktop:1.12.0

USER root
RUN sed -i "s/archive.ubuntu.com/mirrors.aliyun.com/g" /etc/apt/sources.list 

RUN apt-get update \
    && apt-get install -y sudo \
    && echo 'kasm-user ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers \
    && rm -rf /var/lib/apt/list/*

USER 1000
```

> Dockerfile  文件
>
> 该镜像是  kasmweb/ubuntu-focal-desktop:1.12.0   ubuntu20.04  不要用22.04,会启动不起来的



![image-20230118140014769](image-20230118140014769.png)



```shell
# 打包镜像
docker build -t zzh/ubuntu-focal-desktop:1.12.0 .
```



![image-20230118140108822](image-20230118140108822.png)



![image-20230118140210364](image-20230118140210364.png)



## 启动容器

```shell
sudo docker run  -it --name=zzh_ubuntu-focal-desktop2024 --shm-size=512m -p 26901:6901  -p 29878:9878 -p 29879:9879 -p 29880:9880 -e VNC_PW=password -v /home/rq/ubuntu2204/ubuntu-focal-desktop/:/app zzh/ubuntu-focal-desktop:1.12.0
```

>  这里不要使用docker-compose.yaml管理
>
>  --name=zzh_ubuntu-focal-desktop2024 是容器名 zzh_ubuntu-focal-desktop2024 
>
>  -p 映射了四个端口出来   26901 是 在浏览器中浏览的页面端口,29878,29879,29880 是为了在容器内起web服务调试用的端口
>
>  
>
>  -e VNC_PW=password 设置了一个环境变量 VNC_PW=password   就是远程登录的密码  这里的用户名是  kasm_user 固定的不要乱写
>
>  访问地址： https://IP_OF_SERVER:6901   # 注意是 https
>
>  User : kasm_user
>
>  Password: password
>
>  
>
>  -v /home/rq/ubuntu2204/ubuntu-focal-desktop/:/app 设置了一个 数据卷的映射   为了拷贝文件方便用的
>
>  使用的镜像是  刚刚打包的 zzh/ubuntu-focal-desktop:1.12.0



![image-20230118140420315](image-20230118140420315.png)

## 隧道搭建



![image-20230118140736541](image-20230118140736541.png)

> 远程用的



![image-20230118140823113](image-20230118140823113.png)

> python 服务用的



## 远程桌面

浏览器访问映射的隧道的 26901 端口

![image-20230118140847723](image-20230118140847723.png)



![image-20230118140914377](image-20230118140914377.png)

![image-20230118140932389](image-20230118140932389.png)



![image-20230118140945667](image-20230118140945667.png)

> 进来以后的界面, 已经安装了不少软件



## python 环境配置

> 系统自带的是 python3.8.10

![image-20230118141143524](image-20230118141143524.png)

```shell
# 切换 root 用户
sudo su


# 安装pip
apt-get install python3-pip


# 这里为了更好的环境使用 使用venv 虚拟环境
# 注意这里是 python3.8-venv  因为我们用过的是python3.8 版本, 不是用了软链接就可以互联版本的
apt install python3.8-venv


---------------------------------------------------------------------------------
# 切换回 user 用户


# 创建虚拟环境   --- 注意这里用的是user用户创建的, 千万不要加 sudo , 不然就会有权限问题, 需要用chmod解决  下面是一开始碰到的权限问题, 后面改成user创建了
# # 给 /headless/Desktop 目录改下权限  -前面我们用sudo 创建的虚拟环境, 要把权限给放开给普通用户, 不然后面就会出错了
# (CPU) user@cceca64648ff:/app/url_to_html_server$ sudo chmod -R 777 /headless/Desktop

default:~/Desktop$  python3 -m venv CPU




# 激活
default:~/Desktop$ source CPU/bin/activate



# 为了避免不必要的麻烦, 给/app目录改下权限
(CPU) default:~/Desktop$ sudo chmod -R 777 /app




# 切换目录
(CPU) default:~/Desktop$ cd /app
(CPU) default:/app$ cd url_to_html_server/
(CPU) default:/app/url_to_html_server$ 



# 更新pip--这里要用python3 -m 
(CPU) default:/app/url_to_html_server$ python3 -m pip install --upgrade pip -i https://pypi.tuna.tsinghua.edu.cn/simple --trusted-host pypi.tuna.tsinghua.edu.cn



# 这里要更新下 setuptools
(CPU) default:/app/url_to_html_server$ python3 -m pip install --upgrade setuptools -i https://pypi.tuna.tsinghua.edu.cn/simple --trusted-host pypi.tuna.tsinghua.edu.cn


# 看下pip3 列表  -- 已经更新了
(CPU) default:/app/url_to_html_server$ pip3 list
Package       Version
------------- -------
pip           22.3.1
pkg_resources 0.0.0
setuptools    66.0.0
(CPU) default:/app/url_to_html_server$ 


# 安装依赖包  -- 会安装到 虚拟环境CPU中
(CPU) default:/app/url_to_html_server$ python3 -m   pip install -r requestments.txt  -i https://pypi.tuna.tsinghua.edu.cn/simple --trusted-host pypi.tuna.tsinghua.edu.cn



```

![image-20230118141235918](image-20230118141235918.png)



![image-20230118143342502](image-20230118143342502.png)

> 把url_to_html_server 拷贝到服务器, 就可以共享到 容器中了
>
> 记得要改下权限

![image-20230118143723756](image-20230118143723756.png)

> 注意安装的时候不要用豆瓣的源,真的垃圾,清华镜像快多了



## 自动化获取网页html_web服务 部署及测试  

```shell
# 安装playwright 1.26 版本  -- 会安装到 虚拟环境CPU中
(CPU) default:/app/url_to_html_server$ python3 -m   pip install playwright==1.26 -i https://pypi.tuna.tsinghua.edu.cn/simple --trusted-host pypi.tuna.tsinghua.edu.cn



pyppeteer 0.2.6 requires websockets<10.0,>=9.1, but you have websockets 10.1 which is incompatible.
Successfully installed greenlet-1.1.3 playwright-1.26.0 pyee-8.1.0 websockets-10.1



# 一定要注意这个要在 user用户下, 千万不要切换到 root 用户下安装, 不然在启动服务的时候能折磨死你,会报错的 https://blog.csdn.net/u010168781/article/details/121344273
(CPU) default:/app/url_to_html_server$playwright install   

Chromium 106.0.5249.30 (playwright build v1024) downloaded to /headless/.cache/ms-playwright/chromium-1024
Downloading FFMPEG playwright build v1007 - 2.6 Mb [================] 100% 0.0s 
FFMPEG playwright build v1007 downloaded to /headless/.cache/ms-playwright/ffmpeg-1007
Downloading Firefox 104.0 (playwright build v1350) - 76.5 Mb [======] 100% 0.0s 
Firefox 104.0 (playwright build v1350) downloaded to /headless/.cache/ms-playwright/firefox-1350
Downloading Webkit 16.0 (playwright build v1715) - 111.3 Mb [=======] 100% 0.0s 
Webkit 16.0 (playwright build v1715) downloaded to /headless/.cache/ms-playwright/webkit-1715
(CPU) user@cceca64648ff:/app/url_to_html_server$ 


# 启动python服务
(CPU) default:/app/url_to_html_server$ ls
1.html				     request_test1.py
LICENSE.chromedriver		     request_test_custom.py
__pycache__			     requestments.txt
_automation_size.lock		     screenshot-chromium.png
automation_size.txt		     screenshot-firefox.png
chromedriver			     screenshot-webkit.png
config				     start.py
get_page_source_from_playwright.py   start.py.bak
get_page_source_from_playwright.py1  start.py.bak2
get_page_source_from_selenium.py     test1.py
log				     utils
request_test.py			     zlog
(CPU) default:/app/url_to_html_server$ python3 start.py
/headless/Desktop/CPU/lib/python3.8/site-packages/requests/__init__.py:102: RequestsDependencyWarning: urllib3 (1.26.7) or chardet (5.1.0)/charset_normalizer (2.0.9) doesn't match a supported version!
  warnings.warn("urllib3 ({}) or chardet ({})/charset_normalizer ({}) doesn't match a supported "
INFO:     Uvicorn running on http://0.0.0.0:9878 (Press CTRL+C to quit)
INFO:     Started parent process [11958]
/headless/Desktop/CPU/lib/python3.8/site-packages/requests/__init__.py:102: RequestsDependencyWarning: urllib3 (1.26.7) or chardet (5.1.0)/charset_normalizer (2.0.9) doesn't match a supported version!
  warnings.warn("urllib3 ({}) or chardet ({})/charset_normalizer ({}) doesn't match a supported "
/headless/Desktop/CPU/lib/python3.8/site-packages/requests/__init__.py:102: RequestsDependencyWarning: urllib3 (1.26.7) or chardet (5.1.0)/charset_normalizer (2.0.9) doesn't match a supported version!
  warnings.warn("urllib3 ({}) or chardet ({})/charset_normalizer ({}) doesn't match a supported "
/headless/Desktop/CPU/lib/python3.8/site-packages/requests/__init__.py:102: RequestsDependencyWarning: urllib3 (1.26.7) or chardet (5.1.0)/charset_normalizer (2.0.9) doesn't match a supported version!
  warnings.warn("urllib3 ({}) or chardet ({})/charset_normalizer ({}) doesn't match a supported "
INFO:     Started server process [11962]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Started server process [11961]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Started server process [11963]
INFO:     Waiting for application startup.
INFO:     Application startup complete.

```

## 测试



### 火狐



![image-20230118162104390](image-20230118162104390.png)



![image-20230118162054033](image-20230118162054033.png)

### chromium

![image-20230118162126348](image-20230118162126348.png)



![image-20230118162145146](image-20230118162145146.png)





### 测试webkit



![image-20230118162208055](image-20230118162208055.png)



![image-20230118162225100](image-20230118162225100.png)



## 时间校对

```shell
user@cceca64648ff:~/Desktop$ date -R
Mon, 16 Jan 2023 07:17:14 +0000
user@cceca64648ff:~/Desktop$ sudo su
root@cceca64648ff:/headless/Desktop# ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
root@cceca64648ff:/headless/Desktop# echo 'Asia/Shanghai' >/etc/timezone
root@cceca64648ff:/headless/Desktop# su user
user@cceca64648ff:~/Desktop$ date -R  
Mon, 16 Jan 2023 15:18:48 +0800
user@cceca64648ff:~/Desktop$ date -R

```



## 根据已有的容器重新打包一个镜像  --- 后面就不用那么繁琐喽

```shell
# 提交容器为新的镜像
docker commit -a "zzh" -m "自动化获取网页html_web服务 zzh/ubuntu-focal-desktop:1.12.0 镜像" 5ecf9067f2e7  zzh/ubuntu-focal-desktop-playwright:1.12.0

*   -a :提交的镜像作者；
*   -c :使用Dockerfile指令来创建镜像；
*   -m :提交时的说明文字；
*   -p :在commit时，将容器暂停。


```

```shell
# 导出镜像
docker save -o zzh_ubuntu-focal-desktop-playwright.tar zzh/ubuntu-focal-desktop-playwright:1.12.0

[root@rhino010 rq]# ls
bpytop                history                    mysql-8.0.28               test         zzh_ubuntu-focal-desktop-playwright.tar
```



```shell
# 拷贝镜像到别的服务器
scp zzh_ubuntu-focal-desktop-playwright.tar root@192.168.0.11:/home/rq 
```



![image-20230118162952575](image-20230118162952575.png)



```shell
# 加载镜像
docker load -i zzh_ubuntu-focal-desktop-playwright.tar
```



![image-20230118165011747](image-20230118165011747.png)



## 422 上测试 zzh/ubuntu-focal-desktop-playwright 镜像

```shell
[root@rhino011 rq]# mkdir ubuntu-focal-desktop
[root@rhino011 rq]# cd ubuntu-focal-desktop



sudo docker run  -it --name=zzh_ubuntu-focal-desktop2024_test --shm-size=512m -p 26901:6901  -p 29878:9878 -p 29879:9879 -p 29880:9880 -e VNC_PW=password -v /home/rq/ubuntu-focal-desktop/:/app zzh/ubuntu-focal-desktop-playwright:1.12.0

# 记得把代码拷贝到 /home/rq/ubuntu-focal-desktop/
# 还要对 /app 该权限
sudo chmod -R 777 /app

```



![image-20230118165201191](image-20230118165201191.png)



### 测试

> 后面都测试了, 完美运行
>



![image-20230118165245942](image-20230118165245942.png)





![image-20230118165412017](image-20230118165412017.png)



# 补充

![image-20231014085133858](image-20231014085133858.png)

# 二次部署
## 镜像云仓库
> docker那一篇文章，已经将平时用到的镜像，推送到了云仓库，如果使用·docker load -i image.tar`宝座，直接拉取云镜像即可
```bash
docker login --username=173****5732 registry.cn-hangzhou.aliyuncs.com
```
使用的时`root`账户，登录成功后，提示：
```
Your password will be stored unencrypted in /root/.docker/config.json
```
拉取镜像
```bash
docker pull registry.cn-hangzhou.aliyuncs.com/mindcons/ubuntu-focal-desktop:1.12.0
```
注意不能加应用层协议头`https`，同时必须要指定版本号
```bash
[root@localhost software]# docker images
REPOSITORY                                                        TAG       IMAGE ID       CREATED         SIZE
registry.cn-hangzhou.aliyuncs.com/mindcons/ubuntu-focal-desktop   1.12.0    fc203ef9489f   10 months ago   8.86GB
postgres                                                          12.3      b03968f50f0e   3 years ago     313MB
```
利用该镜像的id进行重命名：
```bash

```
