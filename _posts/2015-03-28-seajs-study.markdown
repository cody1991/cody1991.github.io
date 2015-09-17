---
layout: post
title:  "Seajs Study"
date:   2015-03-28 17:32:00
category: frontend
---

今天学习了下sea.js，简单的写了一个[demo](http://cody1991.github.io/goodgoodstudydaydayup/seajs/mydemo/)，下面给出它各部分的代码结构：


	<!doctype html>
	<html>
	<head>
    	<title></title>
    	<meta charset="utf-8" />
	</head>
	<body>
    	<div id="content">
        	<p class="author"></p>
        	<p class="blog">
            	<a href="#">Blog</a>
        	</p>
    	</div>
    	<script src="./app/lib/sea.js"></script>
    	<script src="./app/lib/seajs-css.js"></script>
    	<script>
    	seajs.config({
        	base:'./app/',
        	alias:{
            	'style':'../style/style.css'
        	},
        	charset: 'utf-8'
    	})
    	seajs.use('init');
    	</script>
	</body>
	</html>

可以看到HTML部分只有一个简单的div#content，里面包含着作者名字和博客名和地址。而sea.js当然也和普通的javascript文件是通过script引入的。

接下来发现我们下面还引入了一个seajs-css.js，因为我引入的sea.js是最新的版本3.0，而根据seajs-css.js [github库](https://github.com/seajs/seajs-css)的说明：

	在Sea.js < 2.3.0版本之前是可以加载css文件的，新版本中此功能移除，为了兼容考虑，加载css功能将作为一个插件存在。

	使用方法
	可以在sea.js标签后引入这个插件使用，也可以将插件代码混入sea.js当中

可以知道这个文件是用来处理引入的 css 文件

我们继续往下看，下面的seajs.config是seajs的全局配置，接收一个表示全局配置的配置对象，比如下面的例子：

	seajs.config({
	    base: 'path/to/jslib/',
	    alias: {
	      'app': 'path/to/app/'
	    },
	    charset: 'utf-8',
	    timeout: 20000,
	    debug: false
	});

其中base表示基址寻址时的基址路径。例如base设置为 

	http://example.com/js/3-party/
则:

	var $ = require('jquery');

会载入 

	http://example.com/js/3-party/jquery.js 

而alias可以对较长的常用路径设置缩写

charset表示下载js时script标签的charset属性

timeout表示下载文件的最大时长，以毫秒为单位

debug表示是否工作在调试模式下

最后就是解释下：

	seajs.use('init');

因为我们上面已经设置了基路径，所以这里写init，它会自动需找 

	./app/

下面的init.js文件。没错， seajs.use和后面会提到的require.js引入javascript文件的时候都是不需要写上.js的。而seajs.use主要用于载入入口模块。入口模块相当于C程序的main函数，同时也是整个模块依赖树的根。seajs.use用法如下：

	//单一模式
	seajs.use('./a');
	
	//回调模式
	seajs.use('./a', function(a) {
	  a.run();
	});
	
	//多模块模式
	seajs.use(['./a', './b'], function(a, b) {
	  a.run();
	  b.run();
	});

接下来我们看看我们的入口 init.js 是怎么书写的：

	define(function(require, exports, module) {
	    var $ = require('lib/jquery');
	    var data = require('data');
	    var css = require( 'style');
	
	    $('.author').html(data.author);
	    $('.blog').find('a').attr('href',data.blog);
	    console.log($('.blog').attr('href'))
	});

我们下面来说下seajs的思想。使用SeaJS开发JavaScript的基本原则就是：一切皆为模块。引入SeaJS后，编写JavaScript代码就变成了编写一个又一个模块，SeaJS中模块的概念有点类似于面向对象中的类——模块可以拥有数据和方法，数据和方法可以定义为公共或私有，公共数据和方法可以供别的模块调用。

另外，每个模块应该都定义在一个单独js文件中，即一个对应一个模块。

下面介绍模块的编写和调用。我们来看看seajs里面的模块定义函数define

	/**
	* Defines a module.
	* @param {string=} id The module id.
	* @param {Array.|string=} deps The module dependencies.
	* @param {function()|Object} factory The module factory function.
	*/
	fn.define = function(id, deps, factory) {
	    //code of function…
	}

define可以接收的参数分别是模块ID，依赖模块数组及工厂函数。define对于不同参数个数的解析规则如下：

如果只有一个参数，则赋值给factory。

如果有两个参数，第二个赋值给factory；第一个如果是array则赋值给deps，否则赋值给id。

如果有三个参数，则分别赋值给id，deps和factory。

但是，包括SeaJS的官方示例在内几乎所有用到define的地方都只传递一个工厂函数进去，类似与如下代码：

	define(function(require, exports, module) {
	    //code of the module...
	});

遵循SeaJS官方示例的标准，用一个参数的define定义模块。那么id和deps会怎么处理呢？

id是一个模块的标识字符串，define只有一个参数时，id会被默认赋值为此js文件的绝对路径。如example.com下的a.js文件中使用define定义模块，则这个模块的ID会赋值为 http://example.com/a.js ，没有特别的必要建议不要传入id。

deps一般也不需要传入，需要用到的模块用require加载即可。

------------------

下面来看看工厂函数factory解析：

工厂函数是模块的主体和重点。在只传递一个参数给define时（推荐写法），这个参数就是工厂函数，此时工厂函数的三个参数分别是：

1.require——模块加载函数，用于记载依赖模块。

2.exports——接口点，将数据或方法定义在其上则将其暴露给外部调用。

3.module——模块的元数据。

这三个参数可以根据需要选择是否需要显示指定。下面说一下module。

module是一个对象，存储了模块的元信息，具体如下：

1.module.id——模块的ID。

2.module.dependencies——一个数组，存储了此模块依赖的所有模块的ID列表。

3.module.exports——与exports指向同一个对象。

我们来看看三种不同模式的定义方法：

第一种定义模块的模式是基于exports的模式：

	define(function(require, exports, module) {
	    var a = require('a'); //引入a模块
	    var b = require('b'); //引入b模块
	
	    var data1 = 1; //私有数据
	
	    var func1 = function() { //私有方法
	        return a.run(data1);
	    }
	
	    exports.data2 = 2; //公共数据
	
	    exports.func2 = function() { //公共方法
	        return 'hello';
	    }
	});

上面是一种比较“正宗”的模块定义模式。除了将公共数据和方法附加在exports上，也可以直接返回一个对象表示模块，如下面的代码与上面的代码功能相同：

	define(function(require) {
	    var a = require('a'); //引入a模块
	    var b = require('b'); //引入b模块
	
	    var data1 = 1; //私有数据
	
	    var func1 = function() { //私有方法
	        return a.run(data1);
	    }
	
	    return {
	        data2: 2,
	        func2: function() {
	            return 'hello';
	        }
	    };
	});

如果模块定义没有其它代码，只返回一个对象，还可以有如下简化写法：

	define({
	    data: 1,
	    func: function() {
	        return 'hello';
	    }
	});

第三种方法对于定义纯JSON数据的模块非常合适。


而模块的载入和引用又是怎样的呢？

上文说过一个模块对应一个js文件，而载入模块时一般都是提供一个字符串参数告诉载入函数需要的模块，所以就需要有一套从字符串标识到实际模块所在文件路径的解析算法。SeaJS支持如下标识：

绝对地址——给出js文件的绝对路径。
如:

	require("http://example/js/a");

就代表载入 http://example/js/a.js 。

相对地址——用相对调用载入函数所在js文件的相对地址寻找模块。
例如在 

	http://example/js/b.js 

中载入

	require("./c");

则载入 http://example/js/c.js 。

基址地址——如果载入字符串标识既不是绝对路径也不是以”./”开头，则相对SeaJS全局配置中的“base”来寻址，上面已经讨论过了。

上面在载入模块时都不用传递后缀名“.js”，SeaJS会自动添加“.js”。但是下面三种情况下不会添加：

载入css时，如:

	require("./module1-style.css");

路径中含有”?”时，如:

	require(<a href="http://example/js/a.json?cb=func">http://example/js/a.json?cb=func</a>);

路径以”#”结尾时，如:

	require("http://example/js/a.json#");

根据应用场景的不同，SeaJS提供了三个载入模块的API，分别是seajs.use，require和require.async。前两者已经提到过，我们再来看看最后的require.async函数：

如果想要某个js文件在用到时才下载，可以使用require.async：

	require.async('/path/to/module/file', function(m) {
	    //code of callback...
	});

这样只有在用到这个模块时，对应的js文件才会被下载，也就实现了JavaScript代码的按需加载。

我们回归到我们的案例，在这里再次贴出代码：

	define(function(require, exports, module) {
	    var $ = require('lib/jquery');
	    var data = require('data');
	    var css = require( 'style');
	
	    $('.author').html(data.author);
	    $('.blog').find('a').attr('href',data.blog);
	    console.log($('.blog').attr('href'))
	});

可以看到我们使用的定义模式，在这个函数里面我们首先引入了jquery.js文件。但是一开始的时候发现，使用console.log($)返回的一直都是 null ，百思不得其解，最后上网查了下看到了这篇文章：[传送门:seajs初尝 加载jquery返回null解决学习日志](http://www.tuicool.com/articles/bmuaEb)。里面已经非常详细地说明了原因。而我也是在jquery.js的文件里面进行了下面的修改：

	define(function(){
	    //jquery源代码
	    return $.noConflict();
	});

另外我们还引入了data.js文件，它的结构代码很简单：

	define({
		author:'ZhangYang',
		blog:'http://cody1991.github.io/'
	})

返回给data变量的值是一个类似json的结构。最后就是使用jquery方法进行操作了，没什么好说的。

sea.js还有很多方法的使用，这篇文章只是看了一些资料，弄了一个demo，然后总结出来的笔记。大概已经找到了 sea.js 的敲门砖。后面还会继续需找资料，力求熟悉使用sea.js并且能用到实际项目中。谢谢！