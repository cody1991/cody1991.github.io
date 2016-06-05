---
layout: post
title:  "gulp introduction"
date:   2016-06-05 14:30:00
category: frontend
---

#文章背景

在我之前的博客 [start-mobile-front-end](http://cody1991.github.io/frontend/2015/12/15/start-mobile-front-end.html) 有提到日常使用的项目开发简单的模板，后面整合了 [可伸缩布局方案-lib-flexible](https://github.com/amfe/lib-flexible) 对模板进行了简单的修改，放在
[html5-boilerplate](https://github.com/bear-front-end/html5-boilerplate) 维护。

这里是把这套模板和 gulp 进行整合。

#gulp 介绍

打开 [gulp中文网]() 的源码，我们可以 `title` 是这样写的：

    gulp.js - 基于流的自动化构建工具。 | gulp.js 中文网

而它的 `description` 写着：

    Gulp.js 是一个自动化构建工具，开发者可以使用它在项目开发过程中自动执行常见任务。Gulp.js 是基于 Node.js 构建的，利用 Node.js 流的威力，你可以快速构建项目并减少频繁的 IO 操作。Gulp.js 源文件和你用来定义任务的 Gulp 文件都是通过 JavaScript（或者 CoffeeScript ）源码来实现的。

这里不进行太多关于 gulp 的讨论，可以看一些别人的讨论和简介： [前端框架可以直接使用，为何需要nodejs/gulp等工具?](https://www.zhihu.com/question/30597893) , [使用Gulp构建网站小白教程](https://www.h5jun.com/post/gulp-build.html) , [gulp-book](https://github.com/nimojs/gulp-book) 看看官网以及网上一些其他教程。


#正文

gulp的配置文件是 `gulpfile.js` ，我们手动添加这个文件，之后进行命令

    npm init

初始化我们的项目，之后敲入

    npm install --save-dev gulp

把gulp当做我们的开发依赖项。

在这套模板里面我们还用到的开发依赖项有以下几个：

模块 | 作用 
-----|-----
[jshint](https://github.com/spalger/gulp-jshint) | 检测js代码是否规范
[uglify](https://github.com/terinjokes/gulp-uglify) | 压缩js文件
[Less](https://github.com/plus3network/gulp-less) | CSS预处理语言的
[gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) | CSS浏览器兼容前缀自动补充
[gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) | 压缩CSS文件
[concat](https://github.com/wearefractal/gulp-concat) | 文件的合并
[rename](https://github.com/hparra/gulp-rename) | 文件的重命名
[browser-sync](https://www.npmjs.com/package/browser-sync) | 构建本地服务器并带有刷新功能 
[run-sequence](https://www.npmjs.com/package/run-sequence) | 任务能够按照顺序执行
