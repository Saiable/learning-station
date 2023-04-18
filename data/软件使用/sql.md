---
title: 'sql'
date: 2023-03-17 09:03:02
cover: false
toc_number: false
tags:
- sql
categories: sql
---

# SQL

## SQL查询语言概览

## SQL数据定义

### 基本类型

### 基本模式定义

## SQL查询的基本结构

### 单关系查询

去除重复项

算数表达式

### 多关系查询

### 自然连接

## 附加的基本运算

### 更名运算

字句`old-name as new-name`，可以用在`select`子句重命名字段，也可以用在`from`子句重命名关系

重命名关系，可以把一个关系跟它自身进行笛卡尔积运算，注意此时`select`子句中的字段要加上别名以表示所属

```sql
SELECT DISTINCT T.dual_class_name, T.level_name, T.nature_name, T.type_name 
from school_base_info_copyforqdp as T, school_base_info_copyforqdp as S 
WHERE T.dual_class_name = '双一流' and S.level_name = '普通本科'
```

### 字符串运算

`%`：匹配任意子串

`_`：匹配任意一个字符

`like`：表示匹配，`not like`表示不匹配

- `like '%ABC%'`

使用`escape`定义转义字符

- `like '\%ABC%'  escape '\'`

### `select`中的子句说明

`*`号在`select`字句中，表示所有属性

### 排列元组的显示顺序

`order by filed`，默认使用升序，可以用`desc`表示降序，`asc`表示升序

### `where`字句谓词

`between valueA and valueB`

`not between`

`(a1, a2) <= (b1, b2)`，当`a1 <= b1`，且`a2 <= b2`为真

## 集合运算

`union`、`intersect`、`except`对应书序集合论中的并集、交集和差集





# 应用

## postgres

[(12条消息) PostgreSQL 创建用户并赋予权限_postgresql 给用户赋权_qq_40760486的博客-CSDN博客](https://blog.csdn.net/qq_40760486/article/details/120842759)

### 1、创建一个test用户

```sql
CREATE USER test WITH PASSWORD 'password';
```

### 2、创建COMPANY表

```sql
CREATE TABLE COMPANY(
   ID INT PRIMARY KEY     NOT NULL,
   NAME           TEXT    NOT NULL,
   AGE            INT     NOT NULL,
   ADDRESS        CHAR(50),
   SALARY         REAL
);

```

### 3、设置权限

#### 3.1、postgresql权限说明

```bash
1、SELECT
2、INSERT
3、UPDATE
4、DELETE
5、TRUNCATE
6、REFERENCES
7、TRIGGER
8、CREATE
9、CONNECT
10、TEMPORARY
11、EXECUTE
12、USAGE
```

#### 3.2、设置权限语法

```sql
GRANT privilege [, ...]
ON object [, ...]
TO { PUBLIC | GROUP group | username }

# 说明：
# privilege − 值可以为：SELECT，INSERT，UPDATE，DELETE， RULE，ALL等
# object − 要授予访问权限的对象名称。可能的对象有： table， view，sequence。
# PUBLIC − 表示所有用户。
# GROUP group − 为用户组授予权限。
# username − 要授予权限的用户名。PUBLIC 是代表所有用户的简短形式。

```

#### 3.3、设置用户scheam的使用权限

必须要给用户设置对scheam的使用权限，否则会报错。

```sql
grant USAGE on SCHEMA public to test ;

```

#### 3.4、对表授权

##### 3.4.1、设置用户对表的所有权限

这里以COMPANY表为例，根据具体的要求进行设置权限。

```sql
GRANT ALL ON COMPANY TO test;

```

#### 3.5撤销权限

##### 3.5.1、撤销用户对COMPANY表的所有权限

```sql
REVOKE ALL ON COMPANY FROM test;

```

#### 3.5.2、撤销用户scheam的使用权限

```sql
REVOKE ALL ON SCHEMA public FROM test;

```

### 4、注意

使用schema 的时候注意：
1、需要用postgres 授权指定的schema 的使用（USAGE）权限给特定用户；
2、然后授权postgres 需要的权限到特定用户；
这两个缺一不可











































