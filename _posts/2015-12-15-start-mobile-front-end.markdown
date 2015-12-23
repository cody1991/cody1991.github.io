---
layout: post
title:  "Start mobile front end"
date:   2015-12-15 17:46:00
category: frontend
---

这篇文章是简单地说说我自己是怎么开始一个移动前端开发项目的。

对于开始一个新的移动前端项目开发，我自己会有一套简单的模板，[demo](https://github.com/cody1991/cody1991.github.io/tree/master/source/2015.12.15/demo/) 和 [demo-js](https://github.com/cody1991/cody1991.github.io/tree/master/source/2015.12.15/demo-js/) 。可以事先看看这两套的源代码。

为什么会有两套？下面慢慢道来。

我自己是最近开始接触使用 rem 来进行移动页面的布局，另外在移动端 rem 的支持是非常好的，可以在[caniuse](http://caniuse.com/#search=rem)中查看它的各浏览器兼容情况。对于为什么使用 rem 来进行移动前端的布局，可以看看腾讯ISUX团队写的 [web app变革之rem](http://isux.tencent.com/web-app-rem.html)，这里就不赘述了。

我自己正式在项目中使用 rem 布局的模板是 [demo](https://github.com/cody1991/cody1991.github.io/tree/master/source/2015.12.15/demo/) 这一套，在它的 [style.less](https://github.com/cody1991/cody1991.github.io/tree/master/source/2015.12.15/demo/css/style.less) 中有如下图所示的一串样式定义。

<img src="{{site.baseurl}}/source/2015.12.15/1.png">

后面我们定义一个例如 640px 设计稿上字体大小为32px的元素的时候，就可以使用 ((32 / 2) / 100) = 0.16rem 来定义了。

而最近新开的 [demo-js](https://github.com/cody1991/cody1991.github.io/tree/master/source/2015.12.15/demo-js/) 模板 <del>则是用一段如图所示的 [common.js](https://github.com/cody1991/cody1991.github.io/tree/master/source/2015.12.15/demo-js/js/common.js) 代码来完成</del> ，则是在html文件的 head 头插入了下面一段代码(因为考虑有时候加载js文件时间过长，那个时候定义的一些 rem css 样式可能出现错乱，所以把这段代码移到了 head 头部，css文件之后进行加载，现在common.js文件是空的 `2015.12.23`)。参考[使用rem布局手机页面](http://www.grycheng.com/?p=1249)

<img src="{{site.baseurl}}/source/2015.12.15/2.png">

下面言归正传，因为非常推崇使用 rem 来进行移动前端页面的布局，所以开头先啰嗦了一段。

------

我们开始写HTML部分，在head头部一般会加入下面一行代码：

	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">

我们来看看设置的viewport的值有哪些：

1.  width=device-width: 我们把页面的视窗宽度定位设备的宽度，这样就可以很好地让页面的大小与设备的屏幕大小适配
2.  initial-scale=1.0: 设置初始的缩放比例为1.0，意思是不进行缩放
3.  minimum-scale=1.0, maximum-scale=1.0: 最大和最小缩放比例都设置为1.0
4.  user-scalable=0: 禁止用户的自由缩放，默认值是1

接下来会设置下面这行代码，也是在head头部里面

	<meta content="telephone=no" name="format-detection" />
	<meta content="email=no" name="format-detection" />

设置`format-detection`的两个值：`telephone=no` 将会禁止浏览器识别手机号码然后添加默认的样式，而`email=no`将会禁止浏览器自动识别email然后添加默认的样式

下面就是引入我们的 css 样式文件了

	<link rel="stylesheet" type="text/css" href="./css/normalize.css">
    <link rel="stylesheet" type="text/css" href="./css/style.css" />

html文件我都是放在根目录下的，然后把需要引入的css文件放在 css/ 文件夹中，其中包括了 normalize.css 以及自己写的 style.less 文件，最后编译成 style.css 引入

我们首先来看看 [normalize.css](https://github.com/cody1991/cody1991.github.io/tree/master/source/2015.12.15/demo/css/normalize.css) 文件。因为其实在手机端各种各样不同的手机设备，都会给页面元素添加了它们各自不同的初始化样式，这样对我们来完成设计稿的视觉效果是有很大的影响的。[Normalize.css: Make browsers render all elements more consistently.](http://necolas.github.io/normalize.css/) 这个伟大的开源项目应运而生，它的目的就是初始化各自页面元素的样式，让在各种手机上看起来的效果都一样，符合它们定下的标准，省下了开发者很多的精力。

而我自己模块使用的 [normalize.css](https://github.com/cody1991/cody1991.github.io/tree/master/source/2015.12.15/demo/css/normalize.css) 是在 [Normalize.css: Make browsers render all elements more consistently.](http://necolas.github.io/normalize.css/) 提供的文件基础上进行了压缩和部分修改而成的，除了 `去掉注释，进行部分代码压缩`，还进行了下面部分代码的添加：

	html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{padding:0;margin:0;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}

把页面常见的元素的 margin 值和 padding 值都设置为0，因为浏览器会默认添加。另外在手机上点击一些元素的时候会有一个阴影背景出现，影响用户体验，我们设置 `-webkit-tap-highlight-color:rgba(0,0,0,0);` 把这个阴影背景设置颜色为透明色。以及把 `box-sizing` 都设置为 `borer-box` ，这个属性很有用，在给元素赋值 `width` 属性的时候，元素的 `width` 会把 内容宽度 content ，padding 以及 border 的宽度都进算进去，在移动端响应式布局下，通常使用百分比来设置宽度，这个时候 `box-sizing:border-box` 的优势就体现出来了。


	ol,ul{list-style:none}
	a{text-decoration:none}
	a,button,input{outline:0;}

这几个的作用很简单，就是把 ol 和 ul标签的 `list-style` 去掉，删掉 `a` 链接的下划线以及 `a,button,input` 元素的 `outline` 属性而已。

	audio,canvas,img,video{vertical-align:middle}

有时候我们的一张图片会发现它没挨着底边出现一些空隙，这个时候设置 `vertical-align:middle` 就可以解决这个问题了。

	.clearfix:before,.clearfix:after{content:" ";display:table}
	.clearfix:after{clear:both}

当我们一个父元素下面的子元素都设置为 float:left 或者 float:right 浮动元素的时候会发现父元素的高度为0了，这个时候我们可以给父元素加上一个 `class='clearfix'` 清除浮动来解决这个问题。

当然上面所提及的就是我对 [Normalize.css: Make browsers render all elements more consistently.](http://necolas.github.io/normalize.css/) 的修改了，你可以引入它的源文件（保证使用最新版本），然后在自定义的样式文件上加入我提到的几个样式，也可以直接使用我的 normalize.css 文件。

下面来谈谈我使用的 [demo/style.less](https://github.com/cody1991/cody1991.github.io/tree/master/source/2015.12.15/demo/css/style.less) 和 [demo-js/style.less](https://github.com/cody1991/cody1991.github.io/tree/master/source/2015.12.15/demo-js/css/style.less) 文件。

为什么要列出来两个。看了上面 [web app变革之rem](http://isux.tencent.com/web-app-rem.html) 一文应该大概懂的 rem 的使用了。我们拿到的设计稿一般是 640px ，这个时候如果设计稿有一个 600px 的元素，使用[demo/style.less](https://github.com/cody1991/cody1991.github.io/tree/master/source/2015.12.15/demo/css/style.less) 的话，我们的计算是要先除以2再除以100得出 3rem ，而使用 [common.js](https://github.com/cody1991/cody1991.github.io/tree/master/source/2015.12.15/demo-js/js/common.js) 这套模板，我们这个时候只要除以100邓触 6rem 来使用就好了。虽然对于第一套模板来说也可以改成像第二套模板的形式来计算，不过自己还是偏向于使用 js 来计算根html的 `font-size` 大小。

然后继续看看 [demo/style.less](https://github.com/cody1991/cody1991.github.io/tree/master/source/2015.12.15/demo/css/style.less)

	.container {
	    user-select: none;
	    font-family: 'Microsoft YaHei', sans-serif;
	    position: relative;
	    min-width: 320px;
	    max-width: 640px;
	    margin: 0 auto;
	    font-size: 0.16rem;
	}

`.container` 一般用来包括整个页面的元素，然后设置

1.  user-select: none; 来禁止用户选择文本
2.  font-family: 'Microsoft YaHei', sans-serif; 设置默认的字体文字
3.  position: relative; 设置为相对定位，让里面的元素进行fixed或者absolute定位的时候以它为最顶的对应元素
4.  min-width: 320px;max-width: 640px; 一般手机的最大尺寸不会超过640px最小尺寸不小于320，让我们在电脑上打开的话宽度不超过640px，防止过多的变形
5.  margin: 0 auto; 让.container居中
6.  默认的字体大小为 font-size: 0.16rem; (而在demo-js模板里面是 font-size: 0.32rem;)

而在最后我们就引入自定义的 common.js 文件了。写在 `</body>` 前。

------

自己的这两套移动前端开发的模板基本就讲解完毕啦。喜欢的欢迎使用。(写这篇教程也发现了模板中存在的一些问题进行修改，对自己也有不少帮助~)

另外对于移动前端来说，现在 `display:flex` 布局是越来越流行了，大家可以参考 [Flexbox详解](http://segmentfault.com/a/1190000002910324) 等文章进行学习，要注意兼容性问题。

下面可能是零零散散说一些移动前端经常用到的一些小技巧和问题

------

1. 我们在移动端的时候有时候因为文字太长，需要一行内省略截断显示，可以添加下面的CSS样式：

		white-space:nowrap;
		text-overflow:ellipsis;

2. 绘制小三角形，是通过border来设置的，这种可以随便搜到，比如[CSS 魔法系列：纯 CSS 绘制三角形（各种角度）](http://www.cnblogs.com/lhb25/p/css-and-css3-triangle.html)一文

3. 在一些手机上我们设置的音频即使设置了自动播放也是没用的，这个时候一般需要一个 touchstart 事件来触发音频的播放，另外有时候设置了循环播放属性也没用，我自己在之前的项目中是使用下面代码来解决这个坑的

		    var bgm = document.createElement('audio');
            bgm.id = 'bgm';
            bgm.src = '..../bgm.mp3';
            document.body.appendChild(bgm);
            bgm.addEventListener('canplaythrough', function() {
                this.play();
            });
            bgm.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            });

            document.addEventListener('touchstart', musicPlay);

            function musicPlay() {
                bgm.play();
                document.removeEventListener('touchstart', musicPlay);
            }

4. 还有很多的坑可以自己慢慢摸索吧~

# End