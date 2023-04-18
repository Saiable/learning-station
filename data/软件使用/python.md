---
title: 'python模块'
date: 2023-02-16 09:03:02
cover: false
tags:
- python
categories: python
typora-root-url: python
---

# 基本概念

[Python 教程 — Python 3.11.3 文档](https://docs.python.org/zh-cn/3/tutorial/index.html)

## 数据类型

### 基本数据类型

#### 字符串

避免转义

在Python的string前面加上‘r’， 是为了告诉编译器这个string是个raw string，不要转意backslash ‘\’ 。 例如，\n 在raw string中，是两个字符，\和n， 而不会转意为换行符。由于正则表达式和 \ 会有冲突，因此，当一个字符串使用了正则表达式后，最好在前面加上’r’。

```python
s=r'\tt'
print(s)
Output:
'\tt'
 
s='\tt'
print(s)
Output:
'        t'
```



## 流程控制

## 包与模块

## 文件读写

## 编码

### 常见的编码格式

- utf-8
- url编码

### 解码

#### url解码

常用的python url解码代码 ：

1. 使用urllib库的unquote方法进行url解码：
```python
import urllib
url = "https://www.example.com/?q=%E6%9D%8E%E5%9B%9B"
decoded_url = urllib.parse.unquote(url)
print(decoded_url)
```
输出结果为：`https://www.example.com/?q=李四`
2. 使用requests库的unquote方法进行url解码：
```python
import requests
url = "https://www.example.com/?q=%E6%9D%8E%E5%9B%9B"
decoded_url = requests.utils.unquote(url)
print(decoded_url)
```
输出结果为：`https://www.example.com/?q=李四`
3. 使用urllib.parse.unquote_plus方法进行url解码，该方法会将空格解码为加号：
```python
import urllib.parse
url = "https://www.example.com/?q=%E6%9D%8E%E5%9B%9B+%E5%8A%A0%E5%8A%A0"
decoded_url = urllib.parse.unquote_plus(url)
print(decoded_url)
```



# 进阶概念

## 默认概念

### `if name main`的作用

```python
if __name__ == "__main__":
```

一个python文件通常有两种使用方法

- 第一是作为脚本直接执行
- 第二是 import 到其他的 python 脚本中被调用（模块重用）执行。

因此`if __name__ == "__main__":` 的作用就是控制这两种情况执行代码的过程，在`if __name__ == "__main__":` 下的代码只有在第一种情况下（即文件作为脚本直接执行）才会被执行，而 import 到其他脚本中是不会被执行的。

举例说明如下：

**直接执行**

在 test.py 中写入如下代码：

```python
print('this is one')
if __name__ == "__main__":
    print('this is two')
```

直接执行`python3  test.py`，结果如下图，可以成功 print 两行字符串。即，`if __name__ == "__main__":`语句之前和之后的代码都被执行。

![image-20230418093555629](image-20230418093555629.png)

**import 执行**

然后在同一文件夹新建名称为 import_test.py 的脚本，输入如下代码：

```python
import test

```

执行`python3 import_test.py` 脚本，输出结果如下：

![image-20230418093951722](image-20230418093951722.png)

作为模块import执行，只输出了第一行字符串。即，`if __name__ == "__main__":`外部的语句被执行，内部的没有被执行。

**运行原理**

每个python模块（python文件，也就是此处的 test.py 和 import_test.py）都包含内置的变量 name，当该模块被直接执行的时候，name 等于文件名（包含后缀 .py ）；如果该模块 import 到其他模块中，则该模块的 name 等于模块名称（不包含后缀.py）。

而“main” 始终指当前执行模块的名称（包含后缀.py）。进而当模块被直接执行时，name == ‘main’ 结果为真。

为了进一步说明，我们在 test.py 脚本的 if name==“main”: 之前加入 print(name)，即将 name 打印出来。文件内容和结果如下：


## 上下文管理器

Context Manager指的是python在执行一段代码前后，做的一些预处理和后处理，使得代码块运行处于一个小的环境（surrounding），出了这个小环境之后，资源释放，环境中的各种配置也失效。

例如在打开文件需要关闭，连接数据库后需要关闭连接。很多优雅第三方库也会利用上下文使得对象进入特定的某种状态。

###  with关键字

with的基本用法如下：

```python
with EXPR as VAR:
  BLOCK
```

其中发生了一系列过程：

1. EXPR语句被执行，得到ContextManager
2. 调用ContextManager.__enter__方法
3. 如果有as VAR，则ContextManager.__enter__的返回值赋给VAR，否则就不管返回值
4. 执行BLOCK，如果有VAR被用到，就和普通变量一样
5. 调用ContextManager.__exit__方法
   - __exit__有三个参数：type, value, traceback，BLOCK出异常时会得到对应值，正常情况就都为None
   - __exit__返回值为True表示BLOCK中出现的异常可以忽略，False表示需要raise

###  例子

####  资源操作：

```python
class CustomOpen:
    def __init__(self, filename: str):
        self.__filename = filename
        self.__handler = None
    
    def __enter__(self):
        print("enter......")
        self.__handler = open(self.__filename)
        return self.__handler
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("exit...", exc_type, exc_val, exc_tb)
        if self.__handler is not None:
            self.__handler.close()
        return True


with CustomOpen("hello.txt") as f:
    print(f.read())
```

运行结果：

```bash
enter......
hello world
exit... None None None
```

#### 状态维护

```python
class CustomBrain:
    def __init__(self):
        self.__status = "normal"
    
    def say(self):
        if self.__status == "normal":
            print("You're a great man")
        elif self.__status == "special":
            print("You are a very outstanding person ")

    def __enter__(self):
        self.__status = "special"

    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.__status = "normal"


brain = CustomBrain()
brain.say() # 普通状态

# 可以通过上下文维护一些状态
with brain:
    brain.say() # 特殊状态

brain.say() # 普通状态
```

运行结果：

```bash
You're a great man
You are a very outstanding person
You're a great man
```

###  使用contextlib简化编写

python内置的标准库contextlib可以使得代码书写更加简洁，本质是一样的。比较有用的是`contextlib.contextmanager`这个装饰器，被装饰的函数在`yield`的前面相当于__enter__，yield的后面相当于__exit__，`yield`本身的返回值赋给`as`后的变量

所以第一个示例可以这么写：

```python
from contextlib import contextmanager

@contextmanager
def custom_open(filename: str):
    print("enter......")
    handler = open(filename)

    yield handler

    print("exit...")
    handler.close()


with custom_open("hello.txt") as f:
    print(f.read())
```

还是优雅了许多~

# 模块专题

## numpy



## pandas

# 数据处理

> 存在key-value的数据，无论是啥格式，第一步优先处理成json格式

## txt



## docx



## json

常见json格式

```
[{}, {}]
```

```python
import json

infile = 'filename.txt'
with open(infile, 'r', encoding='utf-8') as fr:
        context = fr.read()
        json_context = json.loads(context)
        print(json_context[0])
```

## xls

## xlsx

如果我们只是要 `读取` Excel文件里面的数据进行处理，可以使用 `xlrd` 这个库。

首先我们安装xlrd库，执行下面的命令，必须指定版本号

```bash
pip install xlrd==1.2.0
```

注意：xlrd 新版本只支持 xls 格式，所以我们这里指定安装 1.2.0 老版本，可以支持xlsx格式。[点击这里，下载 Excel文件 income.xlsx](https://cdn2.byhy.net/files/py/income.xlsx)



**使用pandas**

```python
# 处理模型提取的结果
def deal_al_res():
    # 打开表
    df = pd.read_excel('./xdiwfjH98xxone (1).xlsx')
    row, col = df.shape
    # print(row, col)
    for i in range(row):
        tmp = df.iloc[i]
        print(tmp['file_name'])
        with open('res.txt', 'a', encoding='utf-8') as fw:
            fw.write(tmp['file_name'] + '\n' + str(tmp['合同名称']) + '\n')
        # break
```



## csv

https://www.cnblogs.com/junpengwang/p/10803339.html



## pdf



> su rhino
>
> conda activate zkq_py36
>
> python ...

```python
# pdf分页

from pdf2image import convert_from_path
import tempfile
import numpy as np
import os
from PIL import Image
from paddleocr import PaddleOCR, draw_ocr
ocr=PaddleOCR(use_angle_cls=True, lang='ch')



def pdf2img(filename,outputDir=None):
    print('filename=', filename)

    with tempfile.TemporaryDirectory() as path:
        images = convert_from_path(filename)
    return images


def pdfs2img(pdf_dir, save_dir):
    for rt, folders, files in os.walk(pdf_dir):
        for f in files:
            if not f.endswith("pdf"):
                continue
            pdf_path = os.path.join(rt, f)
            try:
                images = pdf2img(filename=pdf_path)
            except Exception as e:
                print(f"f:{pdf_path},error_msg:{e}")
                continue
            for index, img in enumerate(images):
                img.save(save_dir + f"{f.strip('.pdf')}_{index}.png")
    print("Compeleted.")


if __name__ == "__main__":
    # pdf_dir = "/data/data01/ztp/苏粮/data/"
    pdf_dir = "/data/data02/wj/PythonWorkspace/YuHuaPdfScan/code/ocr/data/stamp/I/"
    # save_dir = "/data/data02/wj/PythonWorkspace/YuHuaPdfScan/code/ocr/src/suliang_pdf2imgs/"
    save_dir = "/data/data02/wj/PythonWorkspace/YuHuaPdfScan/code/ocr/data/stamp/res/I/"
    pdfs2img(pdf_dir=pdf_dir, save_dir=save_dir)


```

