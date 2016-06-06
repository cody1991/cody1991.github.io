---
layout: post
title:  "gulp introduction"
date:   2016-06-05 14:30:00
category: frontend
---

## 文章背景


在我之前的博客 [start-mobile-front-end](http://cody1991.github.io/frontend/2015/12/15/start-mobile-front-end.html) 有提到日常使用的项目开发简单的模板，后面整合了 [可伸缩布局方案-lib-flexible](https://github.com/amfe/lib-flexible) 对模板进行了简单的修改，放在
[html5-boilerplate](https://github.com/bear-front-end/html5-boilerplate) 维护。

这里是把这套模板和 gulp 进行整合。

## gulp 介绍


打开 [gulp中文网]() 的源码，我们可以 `title` 是这样写的：

    gulp.js - 基于流的自动化构建工具。 | gulp.js 中文网

而它的 `description` 写着：

    Gulp.js 是一个自动化构建工具，开发者可以使用它在项目开发过程中自动执行常见任务。Gulp.js 是基于 Node.js 构建的，利用 Node.js 流的威力，你可以快速构建项目并减少频繁的 IO 操作。Gulp.js 源文件和你用来定义任务的 Gulp 文件都是通过 JavaScript（或者 CoffeeScript ）源码来实现的。

这里不进行太多关于 gulp 的讨论，可以看一些别人的讨论和简介： [前端框架可以直接使用，为何需要nodejs/gulp等工具?](https://www.zhihu.com/question/30597893) , [使用Gulp构建网站小白教程](https://www.h5jun.com/post/gulp-build.html) , [gulp-book](https://github.com/nimojs/gulp-book) 看看官网以及网上一些其他教程。


## 正文


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
[del](https://www.npmjs.com/package/del) | 删除文件

在我们的 `gulpfile.js` 开头都引入了：

    var gulp = require('gulp'),

        jshint = require('gulp-jshint'),
        uglify = require('gulp-uglify'),

        concat = require('gulp-concat'),
        rename = require('gulp-rename'),

        autoprefix = require('gulp-autoprefixer'),
        less = require('gulp-less'),
        cleanCSS = require('gulp-clean-css'),

        browserSync = require('browser-sync'),

        runSequence = require('run-sequence'),

        del = require('del');


如图是我们的项目结构：

<img src="{{site.baseurl}}/source/2016.06.05/1.png">

下面开始构建我们的 `gulpfile.js` 工程。


### js代码规范验证

    gulp.task('jshint', function() {
        gulp.src('./js/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });  

当我们在控制台键入

    gulp jshint

就会执行 `jshint` 这个任务，它主要进行的任务是检查所有 js 目录下的 js 文件代码书写是否规范

### 合并压缩js文件

    gulp.task('scripts', function(callback) {
        // 这里可以引入其他js库
        gulp.src(['./js/common.js'])
            .pipe(concat('all.js'))
            .pipe(gulp.dest('./dist/js/'))
            .pipe(rename('all.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/js/'))
            .pipe(browserSync.reload({
                stream: true
            }));

        callback();
    });

我们可以在

    gulp.src(['./js/common.js'])

里面的数组按顺序填入我们想要进行合并压缩的js文件，然后把我们所有键入的js文件合并 `concat` 成 all.js 放入 dist/js  目录下，之后我们把它改名字 `rename` 为 all.min.js 并进行 `uglify` 压缩把它也放入 dist/js 目录下。最后通知浏览器进行刷新 `browserSync.reload`(后面会提到)

### less 编译合并压缩

    gulp.task('less', function(callback) {
        // 其余的样式文件都由style.less引入
        gulp.src(['./css/style.less'])
            .pipe(less())
            .pipe(autoprefix({
                browsers: ['last 2 versions'],
            }))
            .pipe(rename('all.css'))
            .pipe(gulp.dest('./dist/css/'))
            .pipe(rename('all.min.css'))
            .pipe(cleanCSS())
            .pipe(gulp.dest('./dist/css/'))
            .pipe(browserSync.reload({
                stream: true
            }));

        callback();
    });

这个地方一般只会配置 css/style.less 文件，其他的css或者less文件都由它引入：

    @import (inline) './normalize.css';

然后我们还进行了 `autoprefix` 的自动补全操作，`cleanCSS` 的压缩操作以及高速浏览器进行刷新 `browserSync.reload` (后面会提到)

### 浏览器自动刷新

    gulp.task('browserSync', function() {
        browserSync({
            server: {
                baseDir: './'
            }
        })
    });

这里就是配置浏览器自动刷新的任务，我们会监控一些文件的变化，然后进行 `browserSync.reload` 的操作

### 监控文件变化

    gulp.task('watch', function() {
        gulp.watch('./js/*.js', function() {
            runSequence('jshint', 'scripts');
        });

        gulp.watch('./css/*.less', ['less']);

        gulp.watch('./*.html', browserSync.reload);
    });

`runSequence` 让我们的任务可以按顺序执行。在检测到 js 文件夹下的文件变化的时候，会按顺序执行 `jshint` 和 `script` 操作，检测到 css 下的文件变化的时候会执行 `less` 操作（一般只有 style.less）。监控到根目录下的 html 文件变化的时候执行 `browserSync.reload` 操作

### 脚本控制

    gulp.task('clean', function(callback) {
        del(['dist/css/', 'dist/js/']);
        callback();
    });

    gulp.task('build', ['clean'], function(callback) {
        runSequence(['less', 'scripts']);
    });

    gulp.task('default', function(callback) {
        runSequence('jshint', ['less', 'scripts', 'browserSync', 'watch'], callback);
    });

我们在 `package.json` 中写入了：

    "scripts": {
        "build": "gulp build",
        "clean": "gulp clean",
        "dev": "gulp"
    },

配置了我们的脚本。

执行 `build` 的时候，主要生成我们合并压缩以后的 js 和 css 文件。
执行 `clean` 的时候，主要是想删除过往的版本先，再生成此次的最新代码文件（因为后期会考虑加入版本号）
执行 `dev` 的时候，代码着开发中，执行一系列的操作，然后在浏览器中键入

    localhost:8080

有个本地服务器，修改文件的时候会自动刷新
