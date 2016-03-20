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

在APP里面打开网页，其实是打开了一个 webview ，而各种不同的手机机型，使用的浏览器内核是不同的，微信团队开发的是基于 webkit 的 x5 内核浏览器，抹平了不同机型之间 webview 的差异，但是其实他们在填补了很多坑的时候，也埋了很多坑给我们开发者

* 缓存无法清除，修改不生效
* localStorage和cookie不生效
* 部分支持 flex
* Android 机型动画非常卡（卡出翔）
* 伪元素不支持动画
* video 视频的 controls 控制必须存在
* 设置 autoplay 但是视频/音频不能自动播放
* video 的 ontimeupdate事件可以出发，但是 currentTime 并不准确
* 等等

当时对于每个问题都给出了一定的解决的方案：

#####缓存

* 点击 设置 - 通用 - 清理微信存储空间 （但是对于用户显然不适用，而且大部分情况下也还是有问题）
* //triggerWebViewCacheCleanup 搜索框输入这个
* 感觉最靠谱的还是加版本号，然后微信很多时候是连 html 文件也缓存的，这个时候只能给 html 文件也加上版本号了 (以前在 Android 遇到过这个坑，分享测试结果拉取的都是上一个人的分享图片，给分享链接加上随机版本号以后就解决这个问题了)

#####localStorage和cookie

原因：

* 微信没有对 localStorage和cookie 进行特殊处理，经常会失效
* 内存不足
* 进程被杀
* 微信主动杀掉

我们很多情况只能是两个同时设置了，再都不生效的时候有个默认的选项而不让程序出错

#####flex

部分支持flex这个，推荐的是使用[autoprefixer](https://github.com/postcss/autoprefixer)，但是我自己是习惯使用 less 来写

另外还推荐了微信团队自己开发的一个类微信UI的前端开发库 [weui](https://github.com/weui/weui),与原生的ui体验基本一致，提高代码复用率

以及推荐了一个 [微信web开发者工具](http://mp.weixin.qq.com/wiki/10/e5f772f4521da17fa0d7304f68b97d7e.html),主要能完成下面需求：

* 网页授权（有时候想看别人页面的代码却显示要在微信上打开的问题）
* JS-SDK模拟输入输出
* 集成了 Chrome DevTools
* 支持设置代理
* 支持 weinre