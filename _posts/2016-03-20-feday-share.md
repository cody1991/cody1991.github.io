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

##09:45 演讲者：Stepan Parunashvili 使用React、Redux和Node.js构建通用应用

Stepan的演讲以08年的 rails 的常见项目目录作为了切入点，过去 rails 里面的路由、校验和视图都是在 rails 中完成的， javascript 只是放在 assets/javascripts 一个不明显的角落，简单用来做做动画而已。

09年以后相继出现的 Backbone.js ， Angular.JS ， React.js ， Vue.js 等等可以构建单页面应用， javascript 开始负责了路由、校验和视图等功能。

回到 rails 的例子上面，路由、校验和视图可以使用 rails 也可以使用 javascript 来编写，如果一个人或者一个团队使用两种语言来穿插着编写迟早是会失控的，而且那些模块也很难复用。

这个时候提出了我们可不可以前后端统一使用 javascript 来编写而不去依赖 rails？

但是后端是没有 DOM 的，我们怎么通过前端的写法来呈现 DOM 结构？答案是写虚拟的DOM，开始安利 react.js。

前后端使用同一套语言的好处：

* 代码共享（统一的代码习惯，不需要切换语言）
* 使用 node.js 来把数据的处理都放在了服务器，前端只要把数据渲染出来，可以很大的优化性能
* SEO（后端直接输出精通HTML）
* 也可以让那些想要学习后端语言而已经有 javascript 基础的人的学习曲线降低

我们可以使用怎样的技术栈来做这些事情？

* React （视图模板共享）
* Webpack + babel + family （构建工具）
* ReactRouter (前端路由)
* Redux （存储）

自己只是简单学习过 React.js 而没有使用在实际项目中，但是这个主题让我对 React.js 的学习有了很多新的认识


##10:50 演讲者：江剑锋 微信Web APP开发最佳实践

印象最深的一个主题，感觉没有展示太多的技术细节却都是平日 Web app 开发项目中经常遇到的问题，非常实用。

微信中很多时候的坑都会出现在 Android 机型上，他先给我们展示了下面一段数据：

<img src="{{site.baseurl}}/source/2016.03.20/3.jpg"> 

<img src="{{site.baseurl}}/source/2016.03.20/4.jpg"> 

<img src="{{site.baseurl}}/source/2016.03.20/5.jpg"> 

在APP里面打开网页，其实是打开了一个 webview ，而各种不同的手机机型，使用的浏览器内核是不同的，微信团队开发的是基于 webkit 的 x5 内核浏览器，抹平了不同 Android 机型之间 webview 的差异，但是其实他们在填补了很多坑的时候，也埋了很多坑给我们开发者

* 缓存无法清除，修改不生效
* localStorage和cookie不生效
* 部分支持 flex
* Android 机型动画非常卡（卡出翔）
* 伪元素不支持动画
* video 视频的 controls 控制必须存在 （除非你有白名单）
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

等等。。。

#####音频/视频不能自动播放

我们可以监控 touchstart 事件来捕获第一次用户操作后手动播放，或者在在weixinjsBridge的ready事件里手动播放

---

另外还推荐了微信团队自己开发的一个类微信UI的前端开发库 [weui](https://github.com/weui/weui),与原生的ui体验基本一致，提高代码复用率。但是微信团队没有给出相对于的 weui.js 框架，不过衍生出来的一个 weui.js （基于 jQuery），react-weui， vue-weui 等等还是非常有用的

以及推荐了一个 [微信web开发者工具](http://mp.weixin.qq.com/wiki/10/e5f772f4521da17fa0d7304f68b97d7e.html),主要能完成下面需求：

* 网页授权（有时候想看别人页面的代码却显示要在微信上打开的问题）
* JS-SDK模拟输入输出
* 集成了 Chrome DevTools
* 支持设置代理
* 支持 weinre

<img src="{{site.baseurl}}/source/2016.03.20/6.jpg"> 

上面提了好多好多的坑，但是看一下上图， x5内核浏览器正在进行中，而且不需要用户进行客户端的升级。使用 x5 with blink(blink内核是由谷歌开发，chromium/chrome浏览器的内核，实际上也是由webkit衍生而来)，能把很多上面提到的坑给补了，对于经常在微信上开发的前端开发来说是个好消息

* Chrome inspect
* 使用了标准的缓存策略
* 完整支持 flex 
* canvas 支持 css 设置背景色
* filter:blur 有模糊效果了，而不是简单的放大图片
* 改善了动画卡帧的问题
* 伪元素也支持动画效果

##13:10 演讲者：黄士旗(ShihChi Huang) React tips

待补充

##14:20 演讲者：陈子舜(PuterJam) 下一代Web技术运用

