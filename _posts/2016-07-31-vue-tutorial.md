---
layout: post
title:  "vue tutorial"
date:   2016-07-31 11:10:00
category: vue
---

# Vue构建单页应用

一个学习笔记，参考地址在 [vue-tutorial](https://github.com/MeCKodo/vue-tutorial)


## 使用vue-cli

[https://github.com/vuejs/vue-cli](https://github.com/vuejs/vue-cli)

我们使用 vue-cli 开始我们的项目，他是vue的一个脚手架。我使用的是 [webpack](https://github.com/vuejs-templates/webpack) 模板。具体使用参考上面的地址。

    $ npm install -g vue-cli
    $ vue init webpack my-project
    $ cd my-project
    $ npm install
    $ npm run dev

<img src="{{site.baseurl}}/source/2016.07.31/1.png">

然后我们再把 vue-resource vue-router 下载安装。分别是路由器和XHR请求

    $npm install --save vue-resource vue-router
