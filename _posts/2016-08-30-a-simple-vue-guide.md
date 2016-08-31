---
layout: post
title:  "a simple vue guide"
date:   2016-08-30 17:45:00
category: vue
---

编辑中...

# 一个简单的 vue.js 实践教程

公司有一个项目，其中一部分的截图如下：

<img src="http://cody1991.github.io/source/2016.08.30/1.png">

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

[源码地址](https://github.com/cody1991/cody1991.github.io/tree/master/source/2016.08.30/vue-guide)

### 初始化

    <div class="container" id="app">
    </div>

    var app = new Vue({
        el: '#app'
    });

上面是最简单的 vue 实例初始化。

接下来我们继续构建我们的应用

在未使用 vue.js 之前，我们简单地使用HTML和CSS重构我们的项目：

    <div class="container" id="app">
        <div class="radio-wrapper">
            <ul class="list clearfix">
                <li>
                    <a class="link">
                        <div class="live">
                            <p>观看直播 ></p>
                        </div>
                        <img src="http://a.impingo.me/static/activity/singer/resource/1616312.jpg" class="user">
                        <img src="./images/play.png" class="play">
                        <p class="add">+1</p>
                    </a>
                    <div class="user-wrapper">
                        <div class="name">凌兒</div>
                        <div class="num">3280</div>
                    </div>
                    <div class="do-btn">
                        <p>支持</p>
                    </div>
                </li>
                <li>
                    <a class="link">
                        <div class="live">
                            <p>观看直播 ></p>
                        </div>
                        <img src="http://a.impingo.me/static/activity/singer/resource/1616312.jpg" class="user">
                        <img src="./images/play.png" class="play">
                        <p class="add">+1</p>
                    </a>
                    <div class="user-wrapper">
                        <div class="name">凌兒</div>
                        <div class="num">3280</div>
                    </div>
                    <div class="do-btn">
                        <p>支持</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>

大体上的HTML结构就是这样，配合CSS样式，可以得到下面的输出结果：

<img src="http://cody1991.github.io/source/2016.08.30/2.png">

当然现在还都是静态数据。

在 `ul` 里面的 `li` ，就需要我们使用 `v-for` 指令来进行循环输出了。下面再继续说明。

首先来看看我们一开始的 js 部分的代码：

    var lib = {
        urlParams: function(url) {
            var urlParamsList = {};
            var params = url.search.replace(/^\?/, "").split('&'); //分开成各个不同的对像，去掉'&'
            for (var i = 0; i < params.length; i++) {
                var param = params[i];
                var temp = param.split("=");
                urlParamsList[temp[0]] = decodeURI(temp[1]);
            }
            return urlParamsList;
        }
    };

    window.onload = function() {

        var attachFastClick = Origami.fastclick;
        attachFastClick(document.body);

        var windowLocation = window.location,
            selfUserID = lib.urlParams(windowLocation)['userID'];

        var app = new Vue({
            el: '#app',
            data: {
                anchorInfo: [],
                getAnchorInfoUrl: "http://a.impingo.me/activity/getAnchorInfo",
            },
            ready: function() {
                this.getAnchorInfo();
            },
            methods: {
                getAnchorInfo: function() {
                    this.$http.jsonp(this.getAnchorInfoUrl)
                        .then(function(res) {
                            var rtnData = res.data;
                            if (rtnData.rtn == 0) {
                                this.$set('anchorInfo', rtnData.data);
                            }
                        })
                        .catch(function(res) {
                            console.info('网络失败');
                        });
                }
            }
        })
    }

`lib` 对象主要放着一些基础的方法或者变量，在这里只有一个解析页面地址参数的函数 `urlParams` ，因为后面我们需要通过页面地址url获取投票用户的userID，即后面看到的

    selfUserID = lib.urlParams(windowLocation)['userID'];

而 `window.onload` 开头的这段：

    var attachFastClick = Origami.fastclick;
        attachFastClick(document.body);

引入了 [fastclick](https://github.com/ftlabs/fastclick)，消除手机上点击的300ms延时。

之后就是我们上面提到的vue实例了。

我们给实例添加了新的属性 `data` ，它是一个对象，这里是vue实例存放数据的地方。初始化用户信息 `anchorInfo` 为空数组，以及用户信息的接口地址 `getAnchorInfoUrl` 的值为 `http://a.impingo.me/activity/getAnchorInfo` 。

然后就是添加了新的属性 `ready` ，它是一个函数，在vue实例初始化完成的时候会调用这个方法。我们看看这个方法下的代码：

    this.getAnchorInfo();

`this` 指向vue实例，调用 `getAnchorInfo()` 方法。

接着往下看，我们看到一个新的属性 `methods` ，它是一个对象，放着我们vue实例的所有方法。在这之下我们定义了 `getAnchorInfo()` 方法。

    getAnchorInfo: function() {
        this.$http.jsonp(this.getAnchorInfoUrl)
            .then(function(res) {
                var rtnData = res.data;
                if (rtnData.rtn == 0) {
                    this.$set('anchorInfo', rtnData.data);
                }
            })
            .catch(function(res) {
                console.info('网络失败');
            });
    }

[vue-resource](https://github.com/vuejs/vue-resource) 的使用可以看看这里，我们在这里使用 `jsonp` 方法请求了 `getAnchorInfoUrl` 地址的接口，如果请求成功的话，`then(function(res)){}` ，我们看看 `res` 的数据结构

`res.data` 会装载后台返回给我们的数据

<img src="http://cody1991.github.io/source/2016.08.30/3.png">

可以看到一些返回的信息，而我们想要的数据在 `res.data` 里面，返回的格式是和后台协商好的。

看下图。`res.data.rtn` 是一个状态，这里 0 代表着返回成功。而`res.data.data` 是一个对象数组，长度为10，放着十个用户的信息。每个对象里面有属性 `userID`,`anchorName`,`supportCnt` 分别代表着用户的ID，用户的名字以及它的支持度。

在`res.data.rtn`为0代表成功的情况下，我们调用vue的 `$set` 方法，设置`anchorInfo`的值，把`res.data.data`赋给它。在这里使用`$set`方法才能保证`anchorInfo`变量的值在vue里面是响应式能实时更新的。

<img src="http://cody1991.github.io/source/2016.08.30/4.png">

接下来我们修改前面提到的HTML结构吧。我们从 `ul` 标签开始修改。

    <ul class="list clearfix" v-cloak>
        <li v-for="anchor in anchorInfo">
                            
        </li>
    </ul>

在这里我们可以看到给 `ul` 标签加了一个v-cloak，这个是vue实例的DOM结构渲染完成以后，会去掉的一个类。因为我们经常在vue实例还没渲染完成的时候会看到一些比如 `{{someStr}}` 这样的绑定属性，我们在CSS里面添加

    [v-cloak] {
        display: none;
    }

那么在vue实例的DOM还没渲染完成的时候，就会被隐藏起来了。

接下来我们看到了 `li` 标签里面有vue指令 `v-for`，在这里它会循环遍历vue实例的数据 `anchorInfo` 数组，每次遍历的变量别名为 `anchor`。

<img src="http://cody1991.github.io/source/2016.08.30/5.png">

在上图可以看到, `ul` 标签下面生成了十个`li`标签，正好是我们 `anchorInfo` 数组的长度。我们接着给 `li` 标签里面添加内容。

    <li v-for="anchor in anchorInfo">
        <a class="link">
            <div class="live">
                <p>观看直播 ></p>
            </div>
            <img :src="anchor.userID | getUserImg" class="user">
            <img src="./images/play.png" class="play">
            <p class="add">+1</p>
        </a>
    </li>

是否正在直播的DOM元素 `.live` 和点击投票的+1动画的DOM元素 `add` 我们暂时不考虑它们的暂时，在CSS里面都默认设置了 `display:none`。这里主要看的是用户的封面图 `.user`：

    <img :src="anchor.userID | getUserImg" class="user">

这里使用了过滤器 `getUserImg`。所以我们会在vue实例里面添加一个新的属性 `filters`以及 `getUserImg`过滤器定义：

    filters: {
        getUserImg: function(val) {
            return 'http://a.impingo.me/static/activity/singer/resource/' + val + '.jpg'
        },
    },

而我们当初在和后台协商的时候，图片的地址是 `domain+userID+.jpg`，所以在 `getUserImg` 过滤器里面的参数 `val` 就是我们传入的用户的ID，之后再进行拼凑，返回就好了。

之后在 `li` 标签继续加入下面的部分：

    <div class="user-wrapper">
        <div class="name" v-text="anchor.anchorName"></div>
        <div class="num" v-text="anchor.supportCnt"></div>
    </div>

这里应该很明显就能明白，是输出了用户的名字和投票数了。

    <template v-if="voteStatus | getVoteStatus anchor">
        <div class="had-btn">
            <p>今日已支持</p>
        </div>
    </template>
    <template v-else>
        <div class="do-btn">
            <p>支持</p>
        </div>
    </template>

我们继续在 `li` 标签里面添加了这样的代码，`template` 可以配合 vue的指令 `v-if` 一同使用。在这里你可能稍微讲解下 `v-if="voteStatus | getVoteStatus anchor"` 是来判断用户是否已经投票了，已经投票的话显示 `.had-btn` 元素，否则显示 `.do-btn` 元素，在后面会补充上。

<img src="http://cody1991.github.io/source/2016.08.30/6.png">

可以看到我们大部分的UI界面已经完成了。看看其实寥寥几十段代码而已，就把通过jquery来拼错DOM的繁杂方法完成了。

接下来我们主要考虑交互的部分了，在这之前我们先来获取用户是否在直播的状态吧。

    var app = new Vue({
        el: '#app',
        data: {
            ...
            livingInfo: [],
            getLiveStatusUrl: "http://a.impingo.me/activity/getLiveStatus",
            ...
        },
        ready: function() {
            ...
            this.getLiveStatus();
            ...
        },
        methods: {
            ...
            getLiveStatus: function() {
                this.$http.jsonp(this.getLiveStatusUrl)
                    .then(function(res) {
                        var that = this;
                        var rtnData = res.data;
                        if (rtnData.rtn == 0) {
                            this.$set('livingInfo', rtnData.data);
                        }
                    })
                    .catch(function(res) {
                        console.info('网络失败');
                    });
            },
            ...
        },
    })

我们添加了上面的代码，`data`里面的直播信息数组`livingInfo`和直播信息接口地址`getLiveStatusUrl`。在`ready`方法里面添加了一个新的函数调用`this.getLiveStatus();`对应的函数定义在`methods`对象里面。核心部分在

    this.$set('livingInfo', rtnData.data);

我们和上面一样，把返回的数组 `res.data.rtn`代表成功的情况下，给`livingInfo`数组赋值`res.data.data`。

<img src="http://cody1991.github.io/source/2016.08.30/7.png">

看看我们返回的jsonp数据。我们主要关注 `state` 变量，只有值为 1 的时候代表正在直播，所以我们现在修改一些HTML结构：

    <div class="live" v-show="living | getLiving anchor">
        <p>观看直播 ></p>
    </div>

给 `.live` 增加vue指令v-show，只有 `living` 为 `true` 的时候，它才会显示出来。我们在下面定义 `getLiving` 过滤器

    getLiving: function(val, anchor) {
        var curUserID = anchor.userID,
            isLiving = false;
        this.livingInfo.forEach(function(living) {
            if (living.createUserID === curUserID) {
                if (living.state == "1") {
                    isLiving = true;
                }
            }
        });
        return isLiving;
    },

过滤器接收两个变量，需要过滤的值以及`anchor`，即对应的用户。

我们把用户的ID赋值给 `curUserID` 变量，初始化代表是否在直播的变量 `isLiving` 的值为false，默认不显示。

然后我们使用`forEach`方法遍历 `livingInfo` 数组，并且判断此刻 `living.createUserID` 和 `curUserID` 相等的时候，看看它的 `state` 的属性，如果为1的话，`isLiving` 设置为真。否则其他情况返回 `false`。（这里可以不用 `forEach` 方法，因为在找到对应的 `living` 的时候， `forEach` 并不能退出循环。）

<img src="http://cody1991.github.io/source/2016.08.30/8.png">

如上图，现在正在直播的用户就能显示出观看直播这个标签了。

编辑中...
