---
layout: post
title:  "build-online-blog-with-express-heroku-mlab"
date:   2016-12-05 18:01:00
category: frontend
---

# 编辑中

## 文章背景

[cody blog](http://cody1991.github.io/) 这个是我一直用来写博客的地方，基于 [Github Pages](https://pages.github.com/) 和 [Jekyll](https://jekyllrb.com/) 的默认模板修改而搭建而成的，纯前端无后台的博客。最近看了一个 [一起学 Node.js](https://github.com/nswbmw/N-blog) 系列教程，自己也打算来搭建由 [Express](http://expressjs.com/)，[MongoDB](https://docs.mongodb.com/) 构成的一个博客。

感觉自己不会讲太多 Node.js 的学习，更多的是一个搭建博客的过程，希望看这篇教程的同学可以先好好过一遍 [一起学 Node.js](https://github.com/nswbmw/N-blog)

# Heroku 简明教程

先在这里注册我们的 [Heroku](https://www.heroku.com/) 账号，注册成功会进入到我的面板，选择如下图的按钮

<img src="{{site.baseurl}}/source/2016.12.05/blog-1.png">

创建成功以后，会进入到这样一个页面：

<img src="{{site.baseurl}}/source/2016.12.05/blog-2.png">

有两种开发模式，一种是使用 Heroku CLI，需要下载 Heroku 的工具，另外一种就是使用和 Github 关联的方式。我们这里选择第一种方法，在这里下载工具 [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

接下来有一个官方的教程，我觉得是蛮不错的 [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction) 里面能带你很快得创建一个在线的 Heroku + Nodejs 的应用。最后我们能得到和教程中类似的 [codyblog](https://codyblog.herokuapp.com/) 网站，代表成功了。

这里给提个醒，在 [deploy-the-app](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app) 最上面提到了使用 `Heroku create` 指令，它会创建一个新的应用，我们通过上面官网创建应用的方式，这里不再需要输入这条指令了：

<img src="{{site.baseurl}}/source/2016.12.05/blog-3.png">

你可以继续使用官网教程给出的 [node-js-getting-started](https://github.com/heroku/node-js-getting-started) 模板来搭建自己的博客，我自己就选择新建了一个文件夹 cody1991，然后输入

    npm init

    npm install --save express

来安装最基本的依赖项，然后创建了 Procfile 文件，输入

    web: node index.js

Procfile 这个文件是 Heroku 应用必须要的

最后新建 index.js 入口文件，输入

    const express = require('express')
    const app = express()

    app.set('port', (process.env.PORT || 3000));

    app.get('/', (req, res) => {
        res.send('hello,express')
    })

    app.listen(app.get('port'), function() {
        console.log(`cody blog is running on port' ${app.get('port')}`)
    })

这个有个问题提醒下，平时我们可能习惯 `app.listen` 直接监听 3000 端口之类的，但是在 Heroku 上面，我们要从 `process.env.PORT` 获取它给出的端口才能正确运行

就完成了我们最基础的构建了，目录结构如下图：

<img src="{{site.baseurl}}/source/2016.12.05/blog-4.png">

在终端中输入

    heroku open

就可以打开我们的 [cody1991](https://cody1991.herokuapp.com/) 应用了，如下图（当然后面会改变～这个是雏形）

<img src="{{site.baseurl}}/source/2016.12.05/blog-5.png">

接下来就可以修改你自己的文件，上传更新了，是不是非常简单～

# 未完待续

接下来我就默默撸代码去了。搭建完博客再回来讲讲，中间遇到的坑也会指出来。

