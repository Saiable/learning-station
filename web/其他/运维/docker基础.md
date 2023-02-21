---
title: 'docker基础与进阶'
date: 2022-07-08 07:15:24
cover: false
tags:
- docker
categories: 'docker'
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

**容器发展简史**

![image-20221202091946245](image-20221202091946245.png)

![image-20221202092001376](image-20221202092001376.png)

**传统虚拟机技术**

虚拟机（virtual machine）就是带环境安装的一种解决方案。

它可以在一种操作系统里面运行另一种操作系统，比如在Windows10系统里面运行Linux系统CentOS7。应用程序对此毫无感知，因为虚拟机看上去跟真实系统一模一样，而对于底层系统来说，虚拟机就是一个普通文件，不需要了就删掉，对其他部分毫无影响。这类虚拟机完美的运行了另一套系统，能够使应用程序，操作系统和硬件三者之间的逻辑不变。 

| Win10 | VMWare | Centos7 | 各种cpu、内存网络额配置+各种软件 | 虚拟机实例 |
| ----- | ------ | ------- | -------------------------------- | ---------- |
|       |        |         |                                  |            |

![image-20221202092832933](image-20221202092832933.png)

![image-20221202092930763](image-20221202092930763.png)

虚拟机的缺点：

- 资源占用多
- 冗余步骤多 
- 启动慢

**容器虚拟化技术**

由于前面虚拟机存在某些缺点，Linux发展出了另一种虚拟化技术：

Linux容器(Linux Containers，缩写为 LXC)

Linux容器是与系统其他部分隔离开的一系列进程，从另一个镜像运行，并由该镜像提供支持进程所需的全部文件。容器提供的镜像包含了应用的所有依赖项，因而在从开发到测试再到生产的整个过程中，它都具有可移植性和一致性。

**Linux 容器不是模拟一个完整的操作系统而是对进程进行隔离。**有了容器，就可以将软件运行所需的所有资源打包到一个隔离的容器中。容器与虚拟机不同，不需要捆绑一整套操作系统，只需要软件工作所需的库资源和设置。系统因此而变得高效轻量并保证部署在任何环境中的软件都能始终如一地运行。

![image-20221202093203114](image-20221202093203114.png)

![image-20221202093303220](image-20221202093303220.png)

对比

比较了 Docker 和传统虚拟化方式的不同之处：

- 传统虚拟机技术是虚拟出一套硬件后，在其上运行一个完整操作系统，在该系统上再运行所需应用进程；

- 容器内的应用进程直接运行于宿主的内核，容器内没有自己的内核且也没有进行硬件虚拟。因此容器要比传统虚拟机更为轻便。

- 每个容器之间互相隔离，每个容器有自己的文件系统 ，容器之间进程不会相互影响，能区分计算资源。



更多虚拟化介绍，可以，看《现代操作系统》的`1.7.5`小节：虚拟机，及第7章 虚拟化和云

## 能干嘛

- 技术职级变化
  - `coder`
  - `programmer`
  - `software engineer`
  - `DevOps engineer`

- 开发/运维（DevOps）新一代开发工程师

  - 一次构建、随处运行

  - 更快速的应用交付和部署

    传统的应用开发完成后，需要提供一堆安装程序和配置说明文档，安装部署后需根据配置文档进行繁杂的配置才能正常运行。Docker化之后只需要交付少量容器镜像文件，在正式生产环境加载镜像并运行即可，应用安装配置在镜像里已经内置好，大大节省部署配置和测试验证时间。

  - 更便捷的升级和扩缩容

    随着微服务架构和Docker的发展，大量的应用会通过微服务方式架构，应用的开发构建将变成搭乐高积木一样，每个Docker容器将变成一块“积木”，应用的升级将变得非常容易。当现有的容器不足以支撑业务处理时，可通过镜像运行新的容器进行快速扩容，使应用系统的扩容从原先的天级变成分钟级甚至秒级。

  - 更简单的系统运维

    应用容器化运行后，生产环境运行的应用可与开发、测试环境的应用高度一致，容器会将应用程序相关的环境和状态完全封装起来，不会因为底层基础架构和操作系统的不一致性给应用带来影响，产生新的BUG。当出现程序异常时，也可以通过测试环境的相同容器进行快速定位和修复。

  - 更高效的计算资源利用

    Docker是内核级虚拟化，其不像传统的虚拟化技术一样需要额外的Hypervisor支持，所以在一台物理机上可以运行很多个容器实例，可大大提升物理服务器的CPU和内存的利用率。

  - Docker应用场景

    ![image-20221202095722156](image-20221202095722156.png)

- 哪些企业在使用

  - 新浪

    ![image-20221202095748759](image-20221202095748759.png)

    ![image-20221202095805971](image-20221202095805971.png)

    ![image-20221202095837041](image-20221202095837041.png)

    ![image-20221202095845893](image-20221202095845893.png)

  - 美团

    ![image-20221202095920387](image-20221202095920387.png)

    ![image-20221202095939707](image-20221202095939707.png)

  - 蘑菇街

    ![image-20221202100019526](image-20221202100019526.png)

    ![image-20221202100027578](image-20221202100027578.png)

## 去哪下

- 官网
  - docker官网：http://www.docker.com
- 仓库
  - Docker Hub官网: https://hub.docker.com/

# Docker安装

## 前提说明

### CentOS Docker 安装

**前提条件**
目前，CentOS 仅发行版本中的内核支持 Docker。Docker 运行在CentOS 7 (64-bit)上，要求系统为64位、Linux系统内核版本为 3.8以上，这里选用Centos7.x

![image-20221202102610244](image-20221202102610244.png)

**查看自己的内核**
`uname`命令用于打印当前系统相关信息（内核版本号、硬件架构、主机名称和操作系统类型等）。

```bash
cat /etc/redhat-release
```

![image-20221202102745743](image-20221202102745743.png)

![image-20221202102849433](image-20221202102849433.png)

## Docker的基本组成

### 镜像(image)

Docker 镜像（Image）就是一个**只读**的模板。镜像可以用来创建 Docker 容器，**一个镜像可以创建很多容器**。
它也相当于是一个root文件系统。比如官方镜像 centos:7 就包含了完整的一套 centos:7 最小系统的 root 文件系统。
相当于容器的“源代码”，docker镜像文件类似于Java的类模板，而docker容器实例类似于java中new出来的实例对象。

![image-20221202103040538](image-20221202103040538.png)

### 容器(container)

- 从面向对象角度

  Docker 利用容器（Container）独立运行的一个或一组应用，应用程序或服务运行在容器里面，容器就类似于一个虚拟化的运行环境，容器是用镜像创建的运行实例。就像是Java中的类和实例对象一样，镜像是静态的定义，容器是镜像运行时的实体。容器为镜像提供了一个标准的和隔离的运行环境，它可以被启动、开始、停止、删除。每个容器都是相互隔离的、保证安全的平台

- 从镜像容器角度

  可以把容器看做是一个简易版的 Linux 环境（包括root用户权限、进程空间、用户空间和网络空间等）和运行在其中的应用程序。

- 仓库(repository)

  仓库（Repository）是集中存放镜像文件的场所。

  类似于Maven仓库，存放各种jar包的地方；
  github仓库，存放各种git项目的地方；
  Docker公司提供的官方registry被称为Docker Hub，存放各种镜像模板的地方。

  仓库分为公开仓库（Public）和私有仓库（Private）两种形式。
  最大的公开仓库是 Docker Hub(https://hub.docker.com/)，
  存放了数量庞大的镜像供用户下载。国内的公开仓库包括阿里云 、网易云等

### 小总结

需要正确的理解仓库/镜像/容器这几个概念:
Docker 本身是一个容器运行载体或称之为管理引擎。我们把应用程序和配置依赖打包好形成一个可交付的运行环境，这个打包好的运行环境就是image镜像文件。只有通过这个镜像文件才能生成Docker容器实例(类似Java中new出来一个对象)。

image文件可以看作是容器的模板。Docker 根据 image 文件生成容器的实例。同一个 image 文件，可以生成多个同时运行的容器实例。

- 镜像文件

  image 文件生成容器实例，本身也是一个文件，称为镜像文件。

- 容器实例

  一个容器运行一种服务，当我们需要的时候，就可以通过docker客户端创建一个对应的运行实例，也就是我们的容器

- 仓库

  就是放一堆镜像的地方，我们可以把镜像发布到仓库中，需要的时候再从仓库中拉下来就可以了。

## Docker平台架构图解(架构版)

首次懵逼正常，后续深入，先有大概轮廓，混个眼熟

整体架构及底层通信原理简述

Docker 是一个 C/S 模式的架构，后端是一个松耦合架构，众多模块各司其职。 

`Docker`运行的基本流程为：

1.用户是使用`Docker Client`与`Docker Daemon`建立通信，并发送请求给后者

2.`Docker Daemon`作为`Docker`架构中的主体部分，首先提供`Docker Server`的使其可以接受`Docker Client`的请求

3.`Docer Engine`执行`Docker`内部的一系列工作，每一项工作都是以一个`Job`的形式存在

4.`Job`的运行过程中，当需要容器镜像时，则从`Docker Registry`中下载镜像，并通过镜像管理驱动`Graph Driver`将下载镜像以`Graph`的形式存储

5.当需要为`Docker`创建网络环境时，通过网络管理驱动`Network Driver`创建配置`Docker`容器网络环境

6.当需要限制`Docker`容器运行资源或执行用户指令等操作时，则通过`Exec Driver`来完成

7.`LibContainer`是一项独立容器管理包，`Network Driver`以及`Exec Driver`都是通过`LibContainer`来实现具体对容器的操作

![image-20221202103521720](image-20221202103521720.png)

![image-20221202104404624](image-20221202104404624.png)

为什么Docker会比VM虚拟机快

- docker有着比虚拟机更少的抽象层

  由于docker不需要Hypervisor(虚拟机)实现硬件资源虚拟化,运行在docker容器上的程序直接使用的都是实际物理机的硬件资源。因此在CPU、内存利用率上docker将会在效率上有明显优势。

- docker利用的是宿主机的内核,而不需要加载操作系统OS内核

  当新建一个容器时,docker不需要和虚拟机一样重新加载一个操作系统内核。进而避免引寻、加载操作系统内核返回等比较费时费资源的过程,当新建一个虚拟机时,虚拟机软件需要加载OS,返回新建过程是分钟级别的。而docker由于直接利用宿主机的操作系统,则省略了返回过程,因此新建一个docker容器只需要几秒钟。

  ![image-20221202142222182](image-20221202142222182.png)

  ![image-20221202142231744](image-20221202142231744.png)

## 安装步骤

CentOS7安装Docker

官网安装手册：https://docs.docker.com/engine/install/centos/

如果之前安装过

```bash
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

It’s OK if `yum` reports that none of these packages are installed.

The contents of `/var/lib/docker/`, including images, containers, volumes, and networks, are preserved. The Docker Engine package is now called `docker-ce`.



`Install using the repository`

- yum安装gcc相关

  ```bash
  yum install -y gcc
  
  yum install -y gcc-c++
  ```

- 安装需要的软件包，`Set up the repository`

  Install the `yum-utils` package (which provides the `yum-config-manager` utility) and set up the repository.

  ```bash
  sudo yum install -y yum-utils
  
  sudo yum-config-manager \
      --add-repo \
      https://download.docker.com/linux/centos/docker-ce.repo
  ```

  官网上的第二条命令是可选的，注意这个仓库在国外，后面下载会很慢，会报各种网络错误。使用阿里云的库

  ```bash
  sudo yum-config-manager \
      --add-repo \
      http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
  ```

  [docker-ce-linux-centos安装包下载_开源镜像站-阿里云 (aliyun.com)](http://mirrors.aliyun.com/docker-ce/linux/centos/)

- 更新`yum`软件包索引（重建yum安装的索引）

  ```bash
  // centos 7
  yum makecache fast
  
  // centos 8
  yum makecache
  ```

  ![image-20221202111016744](image-20221202111016744.png)

- 正式安装`Docker Engine`

  ```bash
  sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
  ```

  If prompted to accept the GPG key, verify that the fingerprint matches `060A 61C5 1B55 8A7F 742B 77AA C52F EB6B 621E 9F35`, and if so, accept it.

  This command installs Docker, but it doesn’t start Docker. It also creates a `docker` group, however, it doesn’t add any users to the group by default.

- 启动`dokcer`

  ```bash
  sudo systemctl start docker
  
  ps -ef | grep docker
  ```

  ![image-20221202111611481](image-20221202111611481.png)

  查看`docker`的客户端和服务端版本

  ```bash
  docker version
  ```

  ![image-20221202111747663](image-20221202111747663.png)





卸载`Docker Engine`

停止`doker`服务

```bash
systemctl stop docker
```

卸载

1.Uninstall the Docker Engine, CLI, Containerd, and Docker Compose packages:

```bash
sudo yum remove docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

2.Images, containers, volumes, or customized configuration files on your host are not automatically removed. To delete all images, containers, and volumes:

```bash
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

You must delete any edited configuration files manually.



运行`helo world`

```bash
docker run hello-world
```



![image-20221202112346004](/image-20221202112346004.png)

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
  2. The Docker daemon pulled the "hello-world" image from the Docker Hub.(amd64)
  3. The Docker daemon created a new container from that image which runs the executable that produces the output you are currently reading.
  4. The Docker daemon streamed that output to the Docker client, which sent it to your terminal.

![image-20221202142012966](image-20221202142012966.png)

## 阿里云镜像加速

https://promotion.aliyun.com/ntms/act/kubernetes.html

- 注册一个属于自己的阿里云账户(可复用淘宝账号)

- 获得加速器地址连接

  - 登陆阿里云开发者平台
  - 点击控制台
  - 选择容器镜像服务
  - 镜像工具--镜像加速器

- 执行脚本

  ```bash
  sudo mkdir -p /etc/docker
  
  sudo tee /etc/docker/daemon.json <<-'EOF'
  {
    "registry-mirrors": ["https://ydav5e1h.mirror.aliyuncs.com"]
  }
  EOF
  
  sudo systemctl daemon-reload
  
  sudo systemctl restart docker
  ```

  





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



## 容器命令

> 每一个容器实例，都是一个简易版的Linux环境 + 运行在其中的应用程序
>
> 其中的Linux环境，包括root用户权限、进程空间、用户空间和网络空间

有镜像才能创建容器， 这是根本前提(下载一个CentOS或者ubuntu镜像演示)

![image-20221202142558870](image-20221202142558870.png)

### `docker run`

`docker run [OPTIONS] IMAGE [COMMAND] [ARG...]`

`OPTIONS`说明（常用）：有些是一个减号，有些是两个减号

- --name="容器新名字"，为容器指定一个名称；
- -d: 后台运行容器并返回容器ID，也即启动守护式容器(后台运行)；

- -i：以交互模式运行容器，通常与 -t 同时使用；
- -t：为容器重新分配一个伪输入终端，通常与 -i 同时使用；也即启动交互式容器(前台有伪终端，等待交互)；

- -P: 随机端口映射，大写P
- -p: 指定端口映射，小写p



使用镜像centos:latest以交互模式启动一个容器,在容器内执行/bin/bash命令。

```bash
docker pull centos

docker run -it centos /bin/bash 
```



### `docker ps`

`docker ps [OPTIONS]`

OPTIONS说明（常用）：

- -a :列出当前所有正在运行的容器+历史上运行过的
- -l :显示最近创建的容器。
- -n：显示最近n个创建的容器。
- -q :静默模式，只显示容器编号。

```bash
docker ps -a
```

![image-20221202143636295](image-20221202143636295.png)

### 退出容器

- run进去容器，exit退出，容器停止
- run进去容器，`ctrl+p+q`退出，容器不停止

### 启停容器

- 启动已停止运行的容器

  - docker start 容器ID或者容器名

- 重启容器

  - docker restart 容器ID或者容器名

- 停止容器

  - docker stop 容器ID或者容器名

- 强制停止容器

  - docker kill 容器ID或容器名

- 删除已停止的容器

  - docker rm 容器ID

- 一次性删除多个容器实例

  - `docker rm -f $(docker ps -aq)`

    ![image-20221202160308745](image-20221202160308745.png)

  - `docker ps -a -q | xargs docker rm`



**重要**

有镜像才能创建容器，这是根本前提(下载一个Redis6.0.8镜像演示)

启动守护式容器(后台服务器)

在大部分的场景下，我们希望 docker 的服务是在后台运行的， 我们可以过 -d 指定容器的后台运行模式。

`docker run -d 容器名`

使用镜像centos:latest以后台模式启动一个容器

`docker run -d centos`

 问题：然后docker ps -a 进行查看, 会发现容器已经退出

很重要的要说明的一点: Docker容器后台运行,就必须有一个前台进程.

容器运行的命令如果不是那些一直挂起的命令（比如运行top，tail），就是会自动退出的。

 

这个是docker的机制问题,比如你的web容器,我们以nginx为例，正常情况下,我们配置启动服务只需要启动响应的service即可。例如`service nginx start`。但是，这样做，nginx为后台进程模式运行，就导致docker前台没有运行的应用，这样的容器后台启动后,会立即自杀因为他觉得他没事可做了.

所以，最佳的解决方案是,将你要运行的程序以前台进程的形式运行，常见就是命令行模式，表示我还有交互操作



redis 前后台启动演示

- 前台交互式启动

  - `docker run -it redis:6.0.8`

    ![image-20221202150428060](image-20221202150428060.png)

- 后台守护式启动

  - `docker run -d redis:6.0.8`

    ![image-20221202150455979](image-20221202150455979.png)

    ![image-20221202150525275](image-20221202150525275.png)



### 查看容器

> 现代开发机制
>
> - 编码开发微服务
> - 上线部署容器化
> - 时时刻刻要监控

查看容器日志

- `docker logs 容器ID`

  ![image-20221202150929709](/image-20221202150929709.png)

查看容器内运行的进程

- `docker top 容器ID`

  ![image-20221202151401425](image-20221202151401425.png)

查看容器内部细节

- `docker inspect 容器ID`

  高级篇会经常用到

  ```bash
  docker inspect dd80d0e5ddb5
  ```

  ```bash
  [
      {
          "Id": "dd80d0e5ddb53e17f3dd17d31f757be4c0857a4e02f4916403e6d53c28132e15",
          "Created": "2022-12-02T07:04:41.211659046Z",
          "Path": "docker-entrypoint.sh",
          "Args": [
              "redis-server"
          ],
          "State": {
              "Status": "running",
              "Running": true,
              "Paused": false,
              "Restarting": false,
              "OOMKilled": false,
              "Dead": false,
              "Pid": 3370746,
              "ExitCode": 0,
              "Error": "",
              "StartedAt": "2022-12-02T07:04:41.66243713Z",
              "FinishedAt": "0001-01-01T00:00:00Z"
          },
          "Image": "sha256:7614ae9453d1d87e740a2056257a6de7135c84037c367e1fffa92ae922784631",
          "ResolvConfPath": "/var/lib/docker/containers/dd80d0e5ddb53e17f3dd17d31f757be4c0857a4e02f4916403e6d53c28132e15/resolv.conf",
          "HostnamePath": "/var/lib/docker/containers/dd80d0e5ddb53e17f3dd17d31f757be4c0857a4e02f4916403e6d53c28132e15/hostname",
          "HostsPath": "/var/lib/docker/containers/dd80d0e5ddb53e17f3dd17d31f757be4c0857a4e02f4916403e6d53c28132e15/hosts",
          "LogPath": "/var/lib/docker/containers/dd80d0e5ddb53e17f3dd17d31f757be4c0857a4e02f4916403e6d53c28132e15/dd80d0e5ddb53e17f3dd17d31f757be4c0857a4e02f4916403e6d53c28132e15-json.log",
          "Name": "/hardcore_yonath",
          "RestartCount": 0,
          "Driver": "overlay2",
          "Platform": "linux",
          "MountLabel": "",
          "ProcessLabel": "",
          "AppArmorProfile": "",
          "ExecIDs": null,
          "HostConfig": {
              "Binds": null,
              "ContainerIDFile": "",
              "LogConfig": {
                  "Type": "json-file",
                  "Config": {}
              },
              "NetworkMode": "default",
              "PortBindings": {},
              "RestartPolicy": {
                  "Name": "no",
                  "MaximumRetryCount": 0
              },
              "AutoRemove": false,
              "VolumeDriver": "",
              "VolumesFrom": null,
              "CapAdd": null,
              "CapDrop": null,
              "CgroupnsMode": "host",
              "Dns": [],
              "DnsOptions": [],
              "DnsSearch": [],
              "ExtraHosts": null,
              "GroupAdd": null,
              "IpcMode": "private",
              "Cgroup": "",
              "Links": null,
              "OomScoreAdj": 0,
              "PidMode": "",
              "Privileged": false,
              "PublishAllPorts": false,
              "ReadonlyRootfs": false,
              "SecurityOpt": null,
              "UTSMode": "",
              "UsernsMode": "",
              "ShmSize": 67108864,
              "Runtime": "runc",
              "ConsoleSize": [
                  0,
                  0
              ],
              "Isolation": "",
              "CpuShares": 0,
              "Memory": 0,
              "NanoCpus": 0,
              "CgroupParent": "",
              "BlkioWeight": 0,
              "BlkioWeightDevice": [],
              "BlkioDeviceReadBps": null,
              "BlkioDeviceWriteBps": null,
              "BlkioDeviceReadIOps": null,
              "BlkioDeviceWriteIOps": null,
              "CpuPeriod": 0,
              "CpuQuota": 0,
              "CpuRealtimePeriod": 0,
              "CpuRealtimeRuntime": 0,
              "CpusetCpus": "",
              "CpusetMems": "",
              "Devices": [],
              "DeviceCgroupRules": null,
              "DeviceRequests": null,
              "KernelMemory": 0,
              "KernelMemoryTCP": 0,
              "MemoryReservation": 0,
              "MemorySwap": 0,
              "MemorySwappiness": null,
              "OomKillDisable": false,
              "PidsLimit": null,
              "Ulimits": null,
              "CpuCount": 0,
              "CpuPercent": 0,
              "IOMaximumIOps": 0,
              "IOMaximumBandwidth": 0,
              "MaskedPaths": [
                  "/proc/asound",
                  "/proc/acpi",
                  "/proc/kcore",
                  "/proc/keys",
                  "/proc/latency_stats",
                  "/proc/timer_list",
                  "/proc/timer_stats",
                  "/proc/sched_debug",
                  "/proc/scsi",
                  "/sys/firmware"
              ],
              "ReadonlyPaths": [
                  "/proc/bus",
                  "/proc/fs",
                  "/proc/irq",
                  "/proc/sys",
                  "/proc/sysrq-trigger"
              ]
          },
          "GraphDriver": {
              "Data": {
                  "LowerDir": "/var/lib/docker/overlay2/f0dd8d56846af6f1e9e903e1bb2ad527f78bf9966b52c1b6ba77fbabecc4899e-init/diff:/var/lib/docker/overlay2/c70822f2ac680e33dc4081970b5df5a9f355d29d0d510547569c0b27c45418f9/diff:/var/lib/docker/overlay2/59ed6759fd2016b86a531e3f903d270242c064f7dce1a07abcef6e8132ebb2f7/diff:/var/lib/docker/overlay2/c2deb9acfb98c8e4fe4f658d6449aa9dfa13af154c915364f8d4a550b6a6f2fe/diff:/var/lib/docker/overlay2/fbb54e593e420265a153f51e39882bc066092c63342cbebd1f3ef22ea2c59e8f/diff:/var/lib/docker/overlay2/9860676cd7d185d3ea3472a7b1d5d03776659149cb5725875bc4a98651a75e5c/diff:/var/lib/docker/overlay2/002472f7da6df42c266b40d5bf3b36280b8c35c0e39c40d63618b5a48f3e632c/diff",
                  "MergedDir": "/var/lib/docker/overlay2/f0dd8d56846af6f1e9e903e1bb2ad527f78bf9966b52c1b6ba77fbabecc4899e/merged",
                  "UpperDir": "/var/lib/docker/overlay2/f0dd8d56846af6f1e9e903e1bb2ad527f78bf9966b52c1b6ba77fbabecc4899e/diff",
                  "WorkDir": "/var/lib/docker/overlay2/f0dd8d56846af6f1e9e903e1bb2ad527f78bf9966b52c1b6ba77fbabecc4899e/work"
              },
              "Name": "overlay2"
          },
          "Mounts": [
              {
                  "Type": "volume",
                  "Name": "2f5dc33229b460514ddc4e0fd1c6639c35e7b27726239ec68677a73b1fd3c128",
                  "Source": "/var/lib/docker/volumes/2f5dc33229b460514ddc4e0fd1c6639c35e7b27726239ec68677a73b1fd3c128/_data",
                  "Destination": "/data",
                  "Driver": "local",
                  "Mode": "",
                  "RW": true,
                  "Propagation": ""
              }
          ],
          "Config": {
              "Hostname": "dd80d0e5ddb5",
              "Domainname": "",
              "User": "",
              "AttachStdin": false,
              "AttachStdout": false,
              "AttachStderr": false,
              "ExposedPorts": {
                  "6379/tcp": {}
              },
              "Tty": false,
              "OpenStdin": false,
              "StdinOnce": false,
              "Env": [
                  "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                  "GOSU_VERSION=1.12",
                  "REDIS_VERSION=6.2.6",
                  "REDIS_DOWNLOAD_URL=http://download.redis.io/releases/redis-6.2.6.tar.gz",
                  "REDIS_DOWNLOAD_SHA=5b2b8b7a50111ef395bf1c1d5be11e6e167ac018125055daa8b5c2317ae131ab"
              ],
              "Cmd": [
                  "redis-server"
              ],
              "Image": "redis",
              "Volumes": {
                  "/data": {}
              },
              "WorkingDir": "/data",
              "Entrypoint": [
                  "docker-entrypoint.sh"
              ],
              "OnBuild": null,
              "Labels": {}
          },
          "NetworkSettings": {
              "Bridge": "",
              "SandboxID": "540012be4f1e21b45c9de1d84a9dfa19bf4ab68ed081cec5f63a77a44655193e",
              "HairpinMode": false,
              "LinkLocalIPv6Address": "",
              "LinkLocalIPv6PrefixLen": 0,
              "Ports": {
                  "6379/tcp": null
              },
              "SandboxKey": "/var/run/docker/netns/540012be4f1e",
              "SecondaryIPAddresses": null,
              "SecondaryIPv6Addresses": null,
              "EndpointID": "36b386081d51afe1b4600c10f8e7278d6f5f97f2e3347270da975d049f73c1c5",
              "Gateway": "172.17.0.1",
              "GlobalIPv6Address": "",
              "GlobalIPv6PrefixLen": 0,
              "IPAddress": "172.17.0.2",
              "IPPrefixLen": 16,
              "IPv6Gateway": "",
              "MacAddress": "02:42:ac:11:00:02",
              "Networks": {
                  "bridge": {
                      "IPAMConfig": null,
                      "Links": null,
                      "Aliases": null,
                      "NetworkID": "206a95977e775861ab70848d41370db1feb303bdfed0337ad0403c5835691668",
                      "EndpointID": "36b386081d51afe1b4600c10f8e7278d6f5f97f2e3347270da975d049f73c1c5",
                      "Gateway": "172.17.0.1",
                      "IPAddress": "172.17.0.2",
                      "IPPrefixLen": 16,
                      "IPv6Gateway": "",
                      "GlobalIPv6Address": "",
                      "GlobalIPv6PrefixLen": 0,
                      "MacAddress": "02:42:ac:11:00:02",
                      "DriverOpts": null
                  }
              }
          }
      }
  ]
  
  ```

  

### 进入容器

进入正在运行的容器并以命令行交互

前提：容器是在运行着的，可以以后启动的形式，创建容器，或者重新启动容器

- `docker exec -it 容器ID bashShell`

  ```bash
  docker exec -it centos /bin/bash
  
  docker exec --help
  
  exit // 退出
  ```

重新进入

- `docker attach 容器ID`

- 不推荐使用



上述两个区别

- attach 直接进入容器启动命令的终端，不会启动新的进程，用exit退出，**会导致**容器的**停止**。
- exec 是在容器中打开新的终端，并且可以启动新的进程 用exit退出，**不会导致**容器的**停止**。



用之前的redis容器实例进入试试

```bash
[root@VM-4-12-centos ~]# docker start dd80d0e5ddb5 
dd80d0e5ddb5
[root@VM-4-12-centos ~]# docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS         PORTS      NAMES
dd80d0e5ddb5   redis     "docker-entrypoint.s…"   26 minutes ago   Up 2 seconds   6379/tcp   hardcore_yonath
[root@VM-4-12-centos ~]# docker exec -it dd80d0e5ddb5 /bin/bash
root@dd80d0e5ddb5:/data# redis-cli -p 6379
127.0.0.1:6379> ping
PONG
127.0.0.1:6379> set k1 v1
OK
127.0.0.1:6379> get k1
"v1"
127.0.0.1:6379> 
```

云原生和容器化下的入职新流程：

- 先装个`docker`
- 给个项目需要的所有镜像列表，拉一下，跑通



### 从容器内拷贝文件到主机

`docker cp  容器ID:容器内路径 目的主机路径`

在宿主机上操作

```bash
docker cp 96d12932d737:/root/a.txt /home
```

### 导入/导出容器

- `export` 

  - 导出容器的内容留作为一个tar归档文件

    ```bash
     docker export dd80d0e5ddb5 > docker_redis_export.tar
    ```

    导出的目录为当前目录

    ![image-20221202154741037](image-20221202154741037.png)

- `import` 

  - 从tar包中的内容创建一个新的文件系统再导入为**镜像**

  - `cat 文件名.tar | docker import - 镜像用户/镜像名:镜像版本号`

  - 测试前，可以先把redis的容器停止再删掉

    ```bash
    cat docker_redis_export.tar | docker import - sai/my-redis:1.0.0
    ```

    ![image-20221202155026813](image-20221202155026813.png)

  - 再以这个镜像，恢复成容器实例

    ```bash
    docker run -it 5c50e17b0f8e /bin/bash
    
    docker ps -a
    ```

    注意：这里的镜像名并不是自定义的镜像名，而是用的镜像ID

    ![image-20221202155558752](image-20221202155558752.png)

## 小总结

![image-20221202155702051](image-20221202155702051.png)

```bash
attach    Attach to a running container                 # 当前 shell 下 attach 连接指定运行镜像
build     Build an image from a Dockerfile              # 通过 Dockerfile 定制镜像
commit    Create a new image from a container changes   # 提交当前容器为新的镜像
cp        Copy files/folders from the containers filesystem to the host path   #从容器中拷贝指定文件或者目录到宿主机中
create    Create a new container                        # 创建一个新的容器，同 run，但不启动容器
diff      Inspect changes on a container's filesystem   # 查看 docker 容器变化
events    Get real time events from the server          # 从 docker 服务获取容器实时事件
exec      Run a command in an existing container        # 在已存在的容器上运行命令
export    Stream the contents of a container as a tar archive   # 导出容器的内容流作为一个 tar 归档文件[对应 import ]
history   Show the history of an image                  # 展示一个镜像形成历史
images    List images                                   # 列出系统当前镜像
import    Create a new filesystem image from the contents of a tarball # 从tar包中的内容创建一个新的文件系统映像[对应export]
info      Display system-wide information               # 显示系统相关信息
inspect   Return low-level information on a container   # 查看容器详细信息
kill      Kill a running container                      # kill 指定 docker 容器
load      Load an image from a tar archive              # 从一个 tar 包中加载一个镜像[对应 save]
login     Register or Login to the docker registry server    # 注册或者登陆一个 docker 源服务器
logout    Log out from a Docker registry server          # 从当前 Docker registry 退出
logs      Fetch the logs of a container                 # 输出当前容器日志信息
port      Lookup the public-facing port which is NAT-ed to PRIVATE_PORT    # 查看映射端口对应的容器内部源端口
pause     Pause all processes within a container        # 暂停容器
ps        List containers                               # 列出容器列表
pull      Pull an image or a repository from the docker registry server   # 从docker镜像源服务器拉取指定镜像或者库镜像
push      Push an image or a repository to the docker registry server    # 推送指定镜像或者库镜像至docker源服务器
restart   Restart a running container                   # 重启运行的容器
rm        Remove one or more containers                 # 移除一个或者多个容器
rmi       Remove one or more images       # 移除一个或多个镜像[无容器使用该镜像才可删除，否则需删除相关容器才可继续或 -f 强制删除]
run       Run a command in a new container              # 创建一个新的容器并运行一个命令
save      Save an image to a tar archive                # 保存一个镜像为一个 tar 包[对应 load]
search    Search for an image on the Docker Hub         # 在 docker hub 中搜索镜像
start     Start a stopped containers                    # 启动容器
stop      Stop a running containers                     # 停止容器
tag       Tag an image into a repository                # 给源中镜像打标签
top       Lookup the running processes of a container   # 查看容器中运行的进程信息
unpause   Unpause a paused container                    # 取消暂停容器
version   Show the docker version information           # 查看 docker 版本号
wait      Block until a container stops, then print its exit code   # 截取容器停止时的退出状态值
```



# `Docker`镜像

## 镜像

是一种轻量级、可执行的独立软件包，它包含运行某个软件所需的所有内容，我们把应用程序和配置依赖打包好形成一个可交付的运行环境(包括代码、运行时需要的库、环境变量和配置文件等)，这个打包好的运行环境就是image镜像文件。

只有通过这个镜像文件才能生成Docker容器实例(类似Java中new出来一个对象)。

## 分层的镜像

以我们的pull为例，在下载的过程中我们可以看到docker的镜像好像是在一层一层的在下载

![image-20221203110710682](image-20221203110710682.png)



## UnionFS（联合文件系统）

> 可以看下《现代操作系统》的第四章，了解下文件系统

UnionFS（联合文件系统）：Union文件系统（UnionFS）是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下(unite several directories into a single virtual filesystem)。Union 文件系统是 Docker 镜像的基础。镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像。

特性：一次同时加载多个文件系统，但从外面看起来，只能看到一个文件系统，联合加载会把各层文件系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录

## Docker镜像加载原理

docker的镜像实际上由一层一层的文件系统组成，这种层级的文件系统UnionFS。

bootfs(boot file system)主要包含bootloader和kernel，bootloader主要是引导加载kernel，Linux刚启动时会加载bootfs文件系统，在Docker镜像的最底层是引导文件系统bootfs。这一层与我们典型的Linux/Unix系统是一样的，包含boot加载器和内核。当boot加载完成之后整个内核就都在内存中了，此时内存的使用权已由bootfs转交给内核，此时系统也会卸载bootfs。

 

rootfs (root file system) ，在bootfs之上。包含的就是典型 Linux 系统中的 /dev, /proc, /bin, /etc 等标准目录和文件。rootfs就是各种不同的操作系统发行版，比如Ubuntu，Centos等等。 

![image-20221203111530786](image-20221203111530786.png)

 平时我们安装进虚拟机的CentOS都是好几个G，为什么docker这里才200多M？？

![image-20221203111859992](/image-20221203111859992.png)

对于一个精简的OS，rootfs可以很小，只需要包括最基本的命令、工具和程序库就可以了，因为底层直接用Host宿主机的kernel，自己只需要提供 rootfs 就行了。由此可见对于不同的linux发行版, bootfs基本是一致的, rootfs会有差别, 因此不同的发行版可以公用bootfs。



**为什么 Docker 镜像要采用这种分层结构呢**

镜像分层最大的一个好处就是共享资源，方便复制迁移，就是为了复用。

 

比如说有多个镜像都从相同的 base 镜像构建而来，那么 Docker Host 只需在磁盘上保存一份 base 镜像；

同时内存中也只需加载一份 base 镜像，就可以为所有容器服务了。而且镜像的每一层都可以被共享。



**重点理解**

Docker镜像层都是只读的，容器层是可写的

当容器启动时，一个新的可写层被加载到镜像的顶部。这一层通常被称作“容器层”，“容器层”之下的都叫“镜像层”。

所有对容器的改动 - 无论添加、删除、还是修改文件都只会发生在容器层中。只有容器层是可写的，容器层下面的所有镜像层都是只读的。

![image-20221203112434225](image-20221203112434225.png)

## `commit`命令

> docker commit提交容器副本使之成为一个新的镜像

```bash
docker commit -m="提交的描述信息" -a="作者" 容器ID 要创建的目标镜像名:[标签名]
```

案例演示ubuntu安装vim

- 从Hub上下载ubuntu镜像到本地并成功运行

- 原始的默认Ubuntu镜像是不带着vim命令的

  ![image-20221203113245284](image-20221203113245284.png)

- 外网连通的情况下，安装vim

  ```bash
  # 先更新包管理工具
  apt-get update
  
  # 安装vim
  apt-get -y install vim
  ```

- 安装完成后，commit我们自己的新镜像

  ```bash
  docker commit -m="提交的描述信息" -a="作者" 容器ID 要创建的目标镜像名:[标签名]
  
  docker commit -m="ubuntu-with-vim" -a="author" ce4f0c9dd8f2 sai/ubuntu-with-vim:1.3
  ```

- 启动我们的新镜像并和原来的对比

  ![image-20221203115023524](image-20221203115023524.png)

  ![image-20221203114523128](image-20221203114523128.png)

## 小总结

Docker中的镜像分层，支持通过扩展现有镜像，创建新的镜像。类似Java继承于一个Base基础类，自己再按需扩展。
新镜像是从 base 镜像一层一层叠加生成的。每安装一个软件，就在现有镜像的基础上增加一层

![image-20221203153504212](image-20221203153504212.png)

# 本地镜像发布到阿里云

## 本地镜像发布到阿里云流程

![image-20221203153745123](image-20221203153745123.png)

## 镜像的生成方法

```bash
# 基于当前容器创建一个新的镜像，新功能增强 

docker commit [OPTIONS] 容器ID [REPOSITORY[:TAG]]
```

OPTIONS说明：

- a :提交的镜像作者；

- m :提交时的说明文字；

[容器镜像服务 (aliyun.com)](https://cr.console.aliyun.com/cn-hangzhou/instance/namespaces)

- 开通个人版（个人免费版，试用，不建议用在生产环境）

- 创建命名空间

  ![image-20221203155248684](image-20221203155248684.png)

- 选择命名空间，创建镜像仓库

  <img src="image-20221203155336645.png" alt="image-20221203155336645" style="zoom:80%;" />

  

  ![image-20221203155447256](image-20221203155447256.png)

- 此时阿里云会生成一系列的脚本命名，执行第三条的，将镜像推送到仓库的命令

  ```bash
  $ docker login --username=17*****21 registry.cn-hangzhou.aliyuncs.com
  $ docker tag [ImageId] registry.cn-hangzhou.aliyuncs.com/mindcons/ubuntu:[镜像版本号]
  $ docker push registry.cn-hangzhou.aliyuncs.com/mindcons/ubuntu:[镜像版本号]
  ```

  ```bash
  docker login --username=17*****21 registry.cn-hangzhou.aliyuncs.com
  
  docker tag f109f4e4ab55 registry.cn-hangzhou.aliyuncs.com/mindcons/ubuntu:1.3
  
  docker push registry.cn-hangzhou.aliyuncs.com/mindcons/ubuntu:1.3
  ```

  刚好有两层

  ![image-20221203160359005](image-20221203160359005.png)

  

将阿里云上的镜像拉取下来使用

- 先把本地对应的容器和镜像删除，复合镜像需强制删除

  ![image-20221203161015231](image-20221203161015231.png)

- 从阿里云上拉取镜像

  ```bash
  docker pull registry.cn-hangzhou.aliyuncs.com/mindcons/ubuntu:[镜像版本号]
  
  docker pull registry.cn-hangzhou.aliyuncs.com/mindcons/ubuntu:1.3
  ```

后面的DockerFile章节，是第2种方法

# 本地镜像发布到私有库

1.官方Docker Hub地址：https://hub.docker.com/，中国大陆访问太慢了且准备被阿里云取代的趋势，不太主流。

2.Dockerhub、阿里云这样的公共镜像仓库可能不太方便，涉及机密的公司不可能提供镜像给公网，所以需要创建一个本地私人仓库供给团队使用，基于公司内部项目构建镜像。

Docker Registry是官方提供的工具，可以用于构建私有镜像仓库

- 下载镜像Docker Registry

  ```bash
  docker pull registry
  ```

- 运行私有库Registry，相当于本地有个私有Docker hub

  ```bash
  docker run -d -p 5000:5000 -v /data/registry/:/tmp/registry --privileged=true registry
  
  # 默认情况，仓库被创建在容器的/var/lib/registry目录下，建议自行用容器卷映射，方便于宿主机联调
  # 如果报端口号错误，最好手敲一遍
  # 端口号别自己改
  ```

- 案例演示创建一个新镜像，ubuntu安装ifconfig命令

  - 从Hub上下载ubuntu镜像到本地并成功运行

  - 原始的Ubuntu镜像是不带着ifconfig命令的

  - 外网连通的情况下，安装ifconfig命令并测试通过

    ```bash
    docker pull ubuntu
    docker run -it ubuntu /bin/bash
    
    # docker容器内执行上述两条命令：
    apt-get update
     #安装ifconfig命令工具
    apt-get install net-tools
    
    
    root@88495d96990a:/# ifconfig
    eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
            inet 172.17.0.4  netmask 255.255.0.0  broadcast 172.17.255.255
            ether 02:42:ac:11:00:04  txqueuelen 0  (Ethernet)
            RX packets 6197  bytes 25261154 (25.2 MB)
            RX errors 0  dropped 0  overruns 0  frame 0
            TX packets 3887  bytes 336314 (336.3 KB)
            TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
    
    lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
            inet 127.0.0.1  netmask 255.0.0.0
            loop  txqueuelen 1000  (Local Loopback)
            RX packets 0  bytes 0 (0.0 B)
            RX errors 0  dropped 0  overruns 0  frame 0
            TX packets 0  bytes 0 (0.0 B)
            TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
            
    # 容器外执行commit命令
     docker commit -m="ubuntu-with-ifconfig" -a="mindcons" 88495d96990a sai/ubuntu-with-ifconfig:1.3
     
    # 关闭之前的容器
    docker stop 88495d96990a
    
    # curl验证私服库上有什么镜像
    curl -XGET http://ip:5000/v2/_catalog
    # {"repositories":[]}
    
    
    # 将新镜像修改符合私服规范的Tag
    按照公式： docker   tag   镜像:Tag   Host:Port/Repository:Tag
    # ip地址填自己的
    docker tag  zzyyubuntu:1.2  192.168.111.162:5000/zzyyubuntu:1.2
    docker tag sai/ubuntu-with-ifconfig:1.3 192.168.111.162:5000/sai/ubuntu-with-ifconfig:1.3
    
    # 修改配置文件使之支持http
    vim /etc/docker/daemon.json
    {
      "registry-mirrors": ["https://aa25jngu.mirror.aliyuncs.com"],
      "insecure-registries": ["192.168.111.162:5000"]
    }
    
    #docker默认不允许http方式推送镜像，通过配置选项来取消这个限制。====> 修改完后如果不生效，建议重启docker（实际生产环境慎用）
    {
      "registry-mirrors": ["https://aa25jngu.mirror.aliyuncs.com"],
      "insecure-registries": ["192.168.111.162:5000"]
    }
    # 重启下之前关掉的容器
    
    # push推送到私服库
    docker push 192.168.111.162:5000/zzyyubuntu:1.2
    
    # 再次 curl验证私服库上有什么镜像
    curl -XGET http://ip:5000/v2/_catalog
    {"repositories":["sai/ubuntu-with-ifconfig"]}
    
    # 删除正在运行的测试容器和镜像，然后从私服库上拉取镜像，注意要带上版本号
    docker pull 192.168.111.162:5000/zzyyubuntu:1.2
     
    ```
    
    



# `Docker`容器数据卷

## 坑：容器卷记得加入

`--privileged=true`

Docker挂载主机目录访问如果出现`cannot open directory .: Permission denied`

解决办法：在挂载目录后多加一个`--privileged=true`参数即可

如果是CentOS7，安全模块会比之前系统版本加强，不安全的会先禁止，目录挂载的情况被默认为不安全的行为，

在SELinux里面挂载目录被禁止掉了，如果要开启，我们一般使用`--privileged=true`命令，扩大容器的权限解决挂载目录没有权限的问题，也即使用该参数，container内的root拥有真正的root权限，否则，container内的root只是外部的一个普通用户权限。

## 回顾下上一讲的知识点，参数V

实际工作中，如果遇到没用过的，别卡着，先用，走通了再说！！！

```bash
docker run -d -p 5000:5000 -v /data/registry/:/tmp/registry --privileged=true registry
```

-v参数，冒号左边表示宿主机的路径，冒号右边表示容器内的路径



卷就是目录或文件，存在于一个或多个容器中，由docker挂载到容器，但不属于联合文件系统，因此能够绕过`Union File System`提供一些用于持续存储或共享数据的特性：

卷的设计**目的就是数据的持久化**，完全独立于容器的生存周期，因此Docker不会在容器删除时删除其挂载的数据卷

有点类似Redis里面的rdb和aof文件



将docker容器内的数据保存进宿主机的磁盘中

运行一个带有容器卷存储功能的容器实例

```bash
 docker run -it --privileged=true -v /宿主机绝对路径目录:/容器内目录  镜像名
```



能干嘛

- 将应用与运行的环境打包镜像，run后形成容器实例运行 ，但是我们对数据的要求希望是持久化的

- Docker容器产生的数据，如果不备份，那么当容器实例删除后，容器内的数据自然也就没有了。

  为了能保存数据在docker中我们使用卷。

特点：

1：数据卷可在容器之间共享或重用数据

2：卷中的更改可以直接实时生效，爽

3：数据卷中的更改不会包含在镜像的更新中

4：数据卷的生命周期一直持续到没有容器使用它为止 

## 容器卷案例

### 宿主vs容器之间映射添加容器卷

直接命令添加

```bash
公式：docker run -it -v /宿主机目录:/容器内目录 ubuntu /bin/bash

docker run -it --name myu3 --privileged=true -v /tmp/myHostData:/tmp/myDockerData ubuntu /bin/bash
```



查看数据卷是否挂载成功

```bash
docker inspect 容器ID
```

<img src="image-20221204170845088.png" alt="image-20221204170845088" style="zoom:80%;" />





 **容器和宿主机之间数据共享**

1 docker修改，主机同步获得 

2 主机修改，docker同步获得

3 docker容器stop，主机修改，docker容器重启看数据是否同步。

- 同步的

### 读写规则映射添加说明

- 读写（默认），`:rw`

  ```bash
  docker run -it --name myu3 --privileged=true -v /tmp/myHostData:/tmp/myDockerData:rw ubuntu /bin/bash
  ```

- 只读（容器内部被限制，只能读取，不能写），`ro`(`read only`)

  ```bash
  docker run -it --name myu3 --privileged=true -v /tmp/myHostData:/tmp/myDockerData:ro ubuntu /bin/bash
  ```

  此时如果宿主机写入内容，可以同步给容器内，容器可以读取到。

### 卷的继承和共享

- 容器1完成和宿主机的映射

  ```bash
  docker run -it  --privileged=true -v /mydocker/u:/tmp --name u1 ubuntu
  ```

- 容器2继承容器1的卷规则

  ```bash
  # docker run -it  --privileged=true --volumes-from 父类  --name u2 ubuntu
  
  docker run -it  --privileged=true --volumes-from u1  --name u2 ubuntu
  ```

  继承的只是容器卷挂载的规则，父类挂了不影响子类

# Docker常规安装简介

云原生的基础

![image-20221204172952013](image-20221204172952013.png)

**总体步骤**

搜索镜像

拉取镜像

查看镜像

启动镜像

服务端口映射

停止容器

移除容器

## 安装`tomcat`

- docker hub上面查找tomcat镜像

  ```bash
  docker search tomcat
  ```

- 从docker hub上拉取tomcat镜像到本地

  ```bash
  docker pull tomcat
  ```

- docker images查看是否有拉取到的tomcat

- 使用tomcat镜像创建容器实例(也叫运行镜像)

  ```bash
  docker run -it -p 8080:8080 tomcat
  ```

- 访问tomcat首页

  - 问题

    ![image-20230221110155571](image-20230221110155571.png)

  - 解决

    - 可能没有映射端口或者没有关闭防火墙、云服务器可能需要开放安全组

    - 把webapps.dist目录换成webapps

      ```bash
      # 拿到容器ID
      docker ps
      
      # 进入容器
      docker exec -it 92be0dabefc5 /bin/bash
      
      # 把空目录webapps删除，将webapps.dist目录重命名为webapps
      # 或者直接复制
      cp -r webapps.dist/* webapps
      ```

    - 可成功访问

      ![image-20230221111709178](image-20230221111709178.png)

- 免修改版说明

  ```bash
  docker pull billygoo/tomcat8-jdk8
  
  docker run -d -p 8080:8080 --name mytomcat8 billygoo/tomcat8-jdk8
  ```



## 安装`redis`

从docker hub上(阿里云加速器)拉取redis镜像到本地标签为6.0.8

```bash
新建目录
mkdir -p /app/redis
将一个redis.conf文件模板拷贝进/app/redis目录下（要到装过redis的机器上拷贝），注意版本
```

修改redis.conf文件

```bash
1 开启redis验证    可选
requirepass 123

2 允许redis外地连接  必须
注释掉 # bind 127.0.0.1


3   daemonize no
将daemonize yes注释起来或者 daemonize no设置，因为该配置和docker run中-d参数冲突，会导致容器一直启动失败

4 开启redis数据持久化  appendonly yes  可选

```

使用redis6.0.8镜像创建容器(也叫运行镜像)

```bash
docker run  -p 6379:6379 --name myredis3 --privileged=true -v /app/redis/redis.conf:/etc/redis/redis.conf -v /app/redis/data:/data -d redis:6.0.8 redis-server /etc/redis/redis.conf
```

测试redis-cli连接上来

![image-20230221153733078](image-20230221153733078.png)

## 安装`vscode`

拉取镜像

```bash
docker pull codercom/code-server
```

创建并启动容器

```bash
docker run -id \
-u root \
-p 5500:5500 \
-p 8443:8080 \
--name=code_server \
-e PASSWORD=...... \
-h code_server \
-v $PWD/coder:/home/coder \
codercom/code-server
```

参数说明:

- **-u root 表示启用root用户权限 这一步很关键 不然很多文件无法操作**
- **-p 8443：8080 将容器的8080端口映射到主机的8443端口 用于浏览器访问**
  - 左边表示宿主机的端口
  - 右边表示容器的端口
  - 需要开启端口，放开防火墙
- **-p 5500:5500 将容器的5500端口映射到主机的5500端口 用于开发过程中代码修改后实时更新查看**
  - `vscode`的`live serve`插件，默认的是5500端口
- **-e PASSWORD=...... 设置远程登录密码**
  - 密码可以自定义
- **-v $PWD/coder:/home/coder将主机中当前目录挂载到容器**
  - 到需要开发的目录下执行命令
  - 也可以指定绝对路径
- **-h 设置容器的hostname**
- **–name=code_server 给容器取个名称**
- **$PWD表示当前所在目录**



创建容器后，访问`ip:8443`

![image-20221202161426682](image-20221202161426682.png)



安装`liveServe`插件，会有点慢，稍作等待即可

![image-20221202162033203](image-20221202162033203.png)

其他插件，看情况安装

- https://blog.csdn.net/qq_44848480/article/details/126504394

- https://blog.csdn.net/u011262253/article/details/113879997

## 安装`mysql`

[mysql - Official Image | Docker Hub](https://hub.docker.com/_/mysql)

### 方案一

- docker hub上面查找mysql镜像

  ```bash
  docker search mysql
  ```

- 从docker hub上(阿里云加速器)拉取mysql镜像到本地标签为5.7

  ```bash
  docker pull mysql:5.7
  ```

- 使用mysql5.7镜像创建容器(也叫运行镜像)

  - 简单版

    ```bash
    docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7
    docker ps
    docker exec -it 容器ID /bin/bash
    mysql -uroot -p
    ```

    **问题**

    docker上默认字符集编码隐患，docker里面的mysql容器实例查看，内容如下：

    ```sql
     SHOW VARIABLES LIKE 'character%'
    ```

    ![image-20230221135331069](image-20230221135331069.png)

    注意不要用连接工具查看，连接工具会在客户端更改字符显示，但服务器上的字符编码不是utf-8。

    新版本的mysql不存在这个问题（mysql8默认编码是utf-8）

    删除容器后，里面的mysql数据怎么办？

  - 实战版

    新建mysql容器实例

    ```bash
    # -e 表示环境变量
    # 挂三个卷，分别放日志、数据、配置
    # /zzyyuse 换成自己的工作目录
    # 注意端口号占用情况、--name是否重名
    docker run -d -p 3306:3306 --privileged=true -v /zzyyuse/mysql/log:/var/log/mysql -v /zzyyuse/mysql/data:/var/lib/mysql -v /zzyyuse/mysql/conf:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=123456  --name mysql mysql:5.7
    ```

    新建my.cnf，通过容器卷同步给mysql容器实例

    ![image-20230221141908284](image-20230221141908284.png)

    复制如下配置

    ```
    [client]
    default_character_set=utf8
    [mysqld]
    collation_server = utf8_general_ci
    character_set_server = utf8
    ```

    重新启动mysql容器实例再重新进入并查看字符编码

    ![image-20230221142314124](image-20230221142314124.png)

    ![image-20230221142322916](image-20230221142322916.png)

    这时进去输入密码，会报1045错，见方案二

    

    docker安装完MySQL并run出容器后，建议请先修改完字符集编码后再新建mysql库-表-插数据

    如果不小心把容器删除了，用相同的挂载路径新建容器，数据都还是在的

     

    

### 方案二

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

# `Docker`复杂安装详说

## 安装mysql主从复制

主从复制原理：默认你懂



**新建主服务器容器实例3307**

```bash
docker run -p 3307:3306 --name mysql-master \
-v /mydata/mysql-master/log:/var/log/mysql \
-v /mydata/mysql-master/data:/var/lib/mysql \
-v /mydata/mysql-master/conf:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=root  \
-d mysql:5.7
```

进入`/mydata/mysql-master/conf`目录下新建my.cnf

`vim my.cnf`

```bash
[mysqld]
## 设置server_id，同一局域网中需要唯一
server_id=101 
## 指定不需要同步的数据库名称
binlog-ignore-db=mysql  
## 开启二进制日志功能
log-bin=mall-mysql-bin  
## 设置二进制日志使用内存大小（事务）
binlog_cache_size=1M  
## 设置使用的二进制日志格式（mixed,statement,row）
binlog_format=mixed  
## 二进制日志过期清理时间。默认值为0，表示不自动清理。
expire_logs_days=7  
## 跳过主从复制中遇到的所有错误或指定类型的错误，避免slave端复制中断。
## 如：1062错误是指一些主键重复，1032错误是因为主从数据库数据不一致
slave_skip_errors=1062
```

修改完配置后重启master实例

```bash
docker restart mysql-master
```

进入mysql-master容器

```bash
docker exec -it mysql-master /bin/bash

mysql -uroot -proot
```

master容器实例内创建数据同步用户

```sql
CREATE USER 'slave'@'%' IDENTIFIED BY '123456';

GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'slave'@'%';
```



**新建从服务器容器实例3308**

```bash
docker run -p 3308:3306 --name mysql-slave \
-v /mydata/mysql-slave/log:/var/log/mysql \
-v /mydata/mysql-slave/data:/var/lib/mysql \
-v /mydata/mysql-slave/conf:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=root  \
-d mysql:5.7
```

进入`/mydata/mysql-slave/conf`目录下新建my.cnf

vim my.cnf

```bash
[mysqld]
## 设置server_id，同一局域网中需要唯一
server_id=102
## 指定不需要同步的数据库名称
binlog-ignore-db=mysql  
## 开启二进制日志功能，以备Slave作为其它数据库实例的Master时使用
log-bin=mall-mysql-slave1-bin  
## 设置二进制日志使用内存大小（事务）
binlog_cache_size=1M  
## 设置使用的二进制日志格式（mixed,statement,row）
binlog_format=mixed  
## 二进制日志过期清理时间。默认值为0，表示不自动清理。
expire_logs_days=7  
## 跳过主从复制中遇到的所有错误或指定类型的错误，避免slave端复制中断。
## 如：1062错误是指一些主键重复，1032错误是因为主从数据库数据不一致
slave_skip_errors=1062  
## relay_log配置中继日志
relay_log=mall-mysql-relay-bin  
## log_slave_updates表示slave将复制事件写进自己的二进制日志
log_slave_updates=1  
## slave设置为只读（具有super权限的用户除外）
read_only=1
```

修改完配置后重启slave实例

```bash
docker restart mysql-slave
```

在主数据库中查看主从同步状态

```sql
show master status;
```

进入mysql-slave容器

```
docker exec -it mysql-slave /bin/bash
mysql -uroot -proot
```

在从数据库中配置主从复制

```sql
change master to master_host='宿主机ip', master_user='slave', master_password='123456', master_port=3307, master_log_file='mall-mysql-bin.000001', master_log_pos=617, master_connect_retry=30;
```

![image-20230221163200529](image-20230221163200529.png)

主从复制命令参数说明

```
master_host：主数据库的IP地址；
master_port：主数据库的运行端口；
master_user：在主数据库创建的用于同步数据的用户账号；
master_password：在主数据库创建的用于同步数据的用户密码；
master_log_file：指定从数据库要复制数据的日志文件，通过查看主数据的状态，获取File参数；
master_log_pos：指定从数据库从哪个位置开始复制数据，通过查看主数据的状态，获取Position参数；
master_connect_retry：连接失败重试的时间间隔，单位为秒。
```

在从数据库中查看主从同步状态

```sql
show slave status \G;
```

![image-20230221163107367](image-20230221163107367.png)

在从数据库中开启主从同步

![image-20230221163504285](image-20230221163504285.png)

查看从数据库状态发现已经同步

![image-20230221165041005](image-20230221165041005.png)

主从复制测试

- 主机新建库-使用库-新建表-插入数据，ok

- 从机使用库-查看记录，ok

## 安装redis集群

大厂面试题第4季-分布式存储案例真题



# `DockerFile`解析



# `Docker`微服务实践



# `Docker`网络





# `Docker-compose`容器编排



# `Docker`轻量级可视化工具`Portainer`

Portainer 是一款轻量级的应用，它提供了图形化界面，用于方便地管理Docker环境，包括单机环境和集群环境。

官网

- https://www.portainer.io/
- https://docs.portainer.io/v/ce-2.9/start/install/server/docker/linux

步骤

- `docker`命令安装

  ```bash
  docker run -d -p 5001:8000 -p 5002:9000 --name portainer \
  --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce
  ```

- 第一次登录需创建admin，访问地址：`xxx.xxx.xxx.xxx:5002`（容器内9000对应的宿主机端口）

  ![image-20221204174843511](image-20221204174843511.png)

- 

# `Docker`容器监控之`CAdvisor + InfluxDB + Granfana`



# 总结













