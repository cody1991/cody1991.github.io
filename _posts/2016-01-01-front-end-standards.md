---
layout: post
title:  "Front end standards"
date:   2016-1-1 18:16:00
category: frontend
---

# 减少维护成本，最新的规范在 [html5-boilerplate](https://github.com/bear-front-end/html5-boilerplate) 

## 1. 规范说明 

此规范用于 [深圳市暖柚科技有限公司](http://www.impingo.me/) 日常前端开发使用的规范，参考[前端规范 Front-End-Standards.com](http://front-end-standards.com/)而来。

制定前端开发规范，意在统一日常前端开发的编码规范和风格，提高代码的规范性和可维护性，也能让技术得到沉淀，减少重复的工作。

但是规范也是人定的，不必要太拘泥于此文档，有感觉不合理的地方也欢迎提出修改。

顺便一提自己也写了一遍 [Start mobile front end](http://cody1991.github.io/frontend/2015/12/15/start-mobile-front-end.html) 的博客，有兴趣的可以先读一读。而规范使用的模板可以 [html5-boilerplate](https://github.com/bear-front-end/html5-boilerplate) 找到。

## 2. 书写规范

### 2.1 样式与内容分离

#### 2.1.1 项目结构

	---
     | ---- index.html      入口页面
     | ---- js/             存放各种JS脚本文件，
     | ---- css/            存放各种CSS样式文件
     | ---- images/         存放图片

#### 2.1.2 页面开发步骤约定

1. 书写`index.html`文件，为对应的元素添加 `class="xxx"` 属性。注意尽量不要添加使用 `id="xxx"` 属性 
2. 一般写完一个比较完整的 `div` 元素结构的时候，为其添加 `css` 样式。重复此步骤，完成**【页面重构工作】**。
3. 开始编写我们的 `js` 交互脚本文件，这个时候可以适当的添加 `id="xxx"` 和 `data-xxx="xxx"`属性来方便操作页面元素。需要后台数据支持的时候，通过 `ajax` 请求数据或者写好 `js` 接口，交付后台修改为 `php` 文件，**【完成页面交互工作】**。

#### 2.1.3 命名规范

* 文件和文件夹名字： 允许出现英文小写字母、数字以及连字符号 `-` ，禁止使用中文文字、其他符号（比如`_`，空格等等）。
* JS文件： 自己编写的 `js` 文件，如果压缩过，务必加上 `min` 关键词。如果调用别人的 `js插件` 则按照它原本的命名规范，最好能带有版本号。
* css id属性命名： [匈牙利命名法](https://zh.wikipedia.org/wiki/%E5%8C%88%E7%89%99%E5%88%A9%E5%91%BD%E5%90%8D%E6%B3%95) 和 [駝峰式大小寫](https://zh.wikipedia.org/wiki/%E9%A7%9D%E5%B3%B0%E5%BC%8F%E5%A4%A7%E5%B0%8F%E5%AF%AB)。比如： `topBoxList` `footerCopyright` `firstName`。
* css class属性命名： 使用减号连接符。比如： `top-item` `main-box` `box-list-item`
* 命名都需要有意义，尽量语义化让别人一眼看出代表什么，禁止使用拼音。

### 2.2 CSS 规范

#### 2.2.1 CSS文件结构

    --- ./css/
	 | ---- normalize.css       css reset 文件  
     | ---- style.less          自定义样式 less源文件
     | ---- style.css           自定义样式 css编译文件
     | ---- [name].less         可以为特定页面编写[name].less文件
     | ---- [name].css          特定页面编译后的[name].css文件
    
	// 可以创建一个base.less 文件，定义一些常用的 `less` 变量，以及 `less` 函数和方法，然后在 style.less 和 [name].less 中使用 `@import` 引入。

#### 2.2.2 css reset

不同浏览器对页面元素有不同的初始化方式，我们可以使用 [Normalize.css: Make browsers render all elements more consistently.](http://necolas.github.io/normalize.css/) 这个开发源项目来初始化页面元素，让最初的页面在不同浏览器中看起来的效果基本一致。

#### 2.2.3 css 注释以及格式规范

注释这块没有太多硬性的规定，可以使用

	// 

或者 

	/ *
      *
	  * 
      * /
 
简单说说这块样式定义了什么，或者修改别人的样式文件的时候，适当注释修改日期，修改原因和修改人等等。

* 使用 4个空格，可以使用 `tab` 按键。最后 `html` `css` `js` 文件都希望使用 `sublime text3` 的 [HTML-CSS-JS Prettify](https://packagecontrol.io/packages/HTML-CSS-JS%20Prettify)或者其他编辑器的相似插件来格式化。
* 一行写一条属性，而不是一行多条属性堆积在一起。

#### 2.2.4 css 属性排序

这块也不会有太多的硬性要求，但是希望：

* 类似的属性，比如 `top` `left` `bottom` `right` 能写在一个，
* `position` 和 `z-index` 与上面几条属性写在一起
* 尽量使用合并属性，比如 `margin` `padding` `background` `animation` ，而不是把它们分开书写

#### 2.2.5 less 编写规范

一个完整的 `div` 模块作为最外面的嵌套层，先把嵌套层次写好再开始动手写内部样式，比如：

	.container{

	}

	.main-wrapper{
		.item{
			.item-name{

			}
			.item-head{
			
			}
		}
	}

	.footer{
		// ...
	}

一般 `.container` 是作为整个页面的最外围，它可以单独分出来不进行嵌套。而 `.main-wrapper` 和 `.footer` 这些完整的一个模块，可以单独拿出来不进行嵌套。然后把它内部的元素结构书写完整以后再开始写具体的样式，以免嵌套出现混乱。

#### 2.2.6 使用 rem 进行布局

进行手机端开发的时候硬性要求。可以看看我的博客 [Start mobile front end](http://cody1991.github.io/frontend/2015/12/15/start-mobile-front-end.html) 里面提到的 [web app变革之rem](http://isux.tencent.com/web-app-rem.html) 进行学习。

拿到 640px 的设计稿，以 `100px = 1rem` 来进行计算。

### 2.3 HTML5 规范

#### 2.3.1 HTML 注释及格式规范

	<!-- #footer start -->
	<div class="footer">
		...
	</div>
	<!-- #footer end -->

使用四个空格缩进，可以简单地在一个模块的开始和结束位置进行注释说明。

#### 2.3.2 HTML 文件模板总览

使用HTML5标准： `<!DOCTYPE html>` `<meta charset="utf-8">`

	<!DOCTYPE html>
	<html>
	
	<head>
	    <title>demo-js</title>
	    <meta charset="utf-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
	    <meta content="telephone=no" name="format-detection" />
	    <meta content="email=no" name="format-detection" />
	    <link rel="stylesheet" type="text/css" href="./css/normalize.css">
	    <link rel="stylesheet" type="text/css" href="./css/style.css" />
	    <script>(function(){var _self=this;_self.width=640;_self.fontSize=100;_self.widthProportion=function(){var p=(document.body&&document.body.clientWidth||document.getElementsByTagName("html")[0].offsetWidth)/_self.width;return p>1?1:p<0.5?0.5:p};_self.changePage=function(){document.getElementsByTagName("html")[0].setAttribute("style","font-size:"+_self.widthProportion()*_self.fontSize+"px !important")};_self.changePage();window.addEventListener("resize",function(){_self.changePage()},false)})();</script>
	</head>

	<body>
	    <div class="container">
	    </div>
	    <script type="text/javascript" src="./js/common.js"></script>
	</body>
	
	</html>

`meta viewport`的设置：

	1.  width=device-width: 我们把页面的视窗宽度定位设备的宽度，这样就可以很好地让页面的大小与设备的屏幕大小适配
	2.  initial-scale=1.0: 设置初始的缩放比例为1.0，意思是不进行缩放
	3.  minimum-scale=1.0, maximum-scale=1.0: 最大和最小缩放比例都设置为1.0
	4.  user-scalable=0: 禁止用户的自由缩放，默认值是1

`meta content` 的设置：

	<meta content="telephone=no" name="format-detection" />
	<meta content="email=no" name="format-detection" />

	设置`format-detection`的两个值：`telephone=no` 将会禁止浏览器识别手机号码然后添加默认的样式，而`email=no`将会禁止浏览器自动识别email然后添加默认的样式

`<head> script`
	
头部插入的js代码可以参考参考 [使用rem布局手机页面](http://www.grycheng.com/?p=1249) 一文，不赘述。

### 2.4 js 规范 

#### 2.4.1 js代码规范

常用的 `js插件` ，使用一个文档来进行维护，公司内部是托管在七牛上，文档共同维护[lib.md](https://github.com/bear-front-end/html5-boilerplate/blob/master/lib.md)（公司内部使用）。而自己编写的 `js文件` 则统一放在 `./js/` 目录下，可以适当增加子文件夹。

一些简单的代码规范说明

* 采用4空格缩进
* 每条语句都添加 `;` 结尾
* 定义 `jQuery` 变量的时候，使用 `$` 开头，比如 `$footer`； 私有变量首字符使用 `_` 。
* 避免使用全局变量；禁止使用 `eval()`， `setTimeout()` 使用回调函数
* 使用 `console.log()` 或者 `console.dir()` 进行调试
* 多次调用的功能封装在一个函数中反复调用，但是一个函数只专注做一件事

在头部把需要的变量定义在一起，使用比如：

	var $footer = $('.footer'),
		title = document.getElementById('title'),
		count = 0,
		_selfCount = 0; 
	
定义完变量以后进行的初始化、绑定事件、计算等等，相似的功能模块最好能写在一起，而彼此之间有空行进行区分，或者使用注释来进行区分。


## 3. 友情链接

[编写灵活、稳定、高质量的 HTML 和 CSS 代码的规范。](http://codeguide.bootcss.com/)

[编写可维护的JavaScript](http://book.douban.com/subject/21792530/)