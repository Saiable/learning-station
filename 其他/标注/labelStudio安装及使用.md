---
title: 'labelStudio安装及使用'
cover: false
typora-root-url: labelStudio安装及使用
---



# 配置

- txt文本设置不按行读取

  data导入选择第三个，tag修改配置项

  ```diff
  - <Text name="text" value="$text"/>
  + <Text name="text" value="$text" valueType="url"/>
  ```



