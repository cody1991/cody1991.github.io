---
layout: post
title:  "a simple vue guide"
date:   2016-08-30 17:45:00
category: vue
---

# 一个简单的 vue.js 实践教程

公司有一个项目，其中一部分的截图如下：

<img src="{{site.baseurl}}/source/2016.08.30/1.png">

主要需求如下：

* 需要拉取十个人的信息，包括封面图，名字，票数，以及对应用户是否进行了投票等信息，以及根据票数排序

* 正在直播的人在右上角会有一个提示

* 点击支持的时候，需要反馈给后台，并且前端这边会有+1的动画，之后重新拉取人物信息以及是否正在直播的状态

* 每隔一段时间，拉取人物信息以及是否正在直播的状态

这里就想到了使用下 [vue.js](vuejs.org) 来构建，因为

* 人物信息都是后台拉取的json数据，前端需要展示，如果使用jquery来拼错DOM结构，或者使用模板来写，比如[BaiduTemplate](http://tangram.baidu.com/BaiduTemplate/)，都非常繁琐。使用vue.js的v-for指令可以简单的完成这个任务

* 一开始想要前端这边进行排序，那么vue.js的orderBy指令也可以很简单的完成排序功能，而不需要额外的代码判断（不过后来排序都通过后台进行了，相应代码会给出。）

* 拉取数据，进行前后台交互，可以使用比较成熟的[vue-resource](https://github.com/vuejs/vue-resource)代替jquery的$.ajax来操作。

* 数据会经常进行变化，使用vue.js这样的MVVM框架，可以把重点放在数据的操作上，因为数据的更新也会让DOM保持实时更新

这里不会讲太多vue.js的基础，因为官网文档 [Getting Started](http://vuejs.org/guide/) 已经非常完善了。下面开始我们这个简单的vue实践吧。

### 初始化

    <div class="container" id="app">
    </div>

    var app = new Vue({
        el: '#app'
    });

上面是最简单的 vue 实例初始化


编辑中...
