---
title: 'docker基础'
date: 2022/7/8 07:15:24
cover: false
tags:
- docker
categories: 'Linux'
---



# 使用`docker`安装应用软件

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



