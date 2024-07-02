---
title: '《Excel图表之道》_笔记'
date: 2024-5-7 09:03:02
cover: false
tags:
- 数据分析
- EXCEL
categories: 数据分析
typora-root-url: 《Excel图表之道》_笔记
---

# 配色

![image-20240507110358586](image-20240507110358586.png)

```vb
Sub SetMyColor()
	Activeworkbook.Colors(1)=RGB(0，56,115)
	Activeworkbook.Colors(53)=RGB(247,0,0)
	Activeworkbook.Colors(52)=RGB(206，219，231)
	Activeworkbook.Colors(51)=RGB(231,239,247)
End Sub
```

