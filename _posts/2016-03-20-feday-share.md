---
layout: post
title:  "FEDAY share"
date:   2016-03-20 21:46:00
category: frontend
---

奉老板之命，参加了[第二届前端开发者大会](http://www.fequan.com/2016/) ~ 下面简单的记录下所见所想。

<img src="{{site.baseurl}}/source/2016.03.20/1.png">  

先看看演讲嘉宾，都是来自 FAT 的大牛人物~

<img src="{{site.baseurl}}/source/2016.03.20/2.jpg">  

然后是刚进大会现场（广州 嘉裕太阳城广场三楼金逸国际影城四号厅）的拍照~

想想一开始支主持人问了下有多少是外地过来的，70%以上的都举手了，还是很多人不远万里跑过来参加的~

### 09:45 演讲者：Stepan Parunashvili 使用React、Redux和Node.js构建通用应用

Stepan的演讲以08年的 rails 的常见项目目录作为了切入点，那个时候 javascript 只是放在 assets/javascripts 一个不明显的角落，简单用来做做动画而已。以及讲了09年以后相继出现的 Backbone.js ， Angular.JS ， React.js ， Vue.js等等一个大致的 javascript 发展过程

之后又回到 rails 的例子上面，发出了为我们可不可以前后端统一使用 javascript 来编写而不去依赖 rails？后面就开始安利 react.js了，前端使用 react , redux ，而后端使用 node.js 去构建应用程序， 使用 reactRouter 来搭建前端的路由， express 作为中间件等。 不过自己也只是简单学习过 react.js 而没有使用在项目中，上面也是参考别人的回答，这里就不说太多了。

前后端使用同一套语言的好处：

* 代码共享
* 使用 node.js 来把数据的处理都放在了服务器，前端只要把数据渲染出来，可以很大的优化性能
* SEO
* 也可以让那些想要学习后端语言而已经有 javascript 基础的人的学习曲线降低

### 10:50 演讲者：江剑锋 微信Web APP开发最佳实践

印象最深的一个主题，感觉没有展示太多的技术细节却都是平日 Web app 开发项目中经常遇到的问题，非常实用。

微信中很多时候的坑都会出现在 Android 机型上，他先给我们展示了下面一段数据：

<img src="{{site.baseurl}}/source/2016.03.20/3.jpg"> 

<img src="{{site.baseurl}}/source/2016.03.20/4.jpg"> 

<img src="{{site.baseurl}}/source/2016.03.20/5.jpg"> 