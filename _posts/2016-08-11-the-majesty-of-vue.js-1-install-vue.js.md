---
layout: post
title:  "The majesty of vue.js 1-install-vue.js"
date:   2016-08-11 12:13:00
category: vue
---

# 安装 vue.js

# install Vue.js

## 单文件版本

## Standalone Version

### 从 vuejs.org 下载

### Download from vuejs.org

你可以简单的下载和使用script标签来安装使用vue。Vue会被注册为全局变量。

To install Vue you can simply download and include it with a script tag. Vue will be registered as a
global variable.

你可以下载vue.js的两个版本:

You can download two versions of Vue.js:

* 开发版本： [http://vuejs.org/js/vue.js](http://vuejs.org/js/vue.js)

* Development Version from [http://vuejs.org/js/vue.js](http://vuejs.org/js/vue.js)

* 生产版本： [http://vuejs.org/js/vue.min.js](http://vuejs.org/js/vue.min.js)

* Production Version from [http://vuejs.org/js/vue.min.js](http://vuejs.org/js/vue.min.js)

提示：在开发的时候不要使用压缩后的版本，你会错过很多常见问题对应的非常好的错误提示。

Tip: Don’t use the minified version during development. You will miss out all the nice
warnings for common mistakes.

### 使用CDN

### Include from CDN

你也可以在 [jsdelivr](http://cdn.jsdelivr.net/vue/1.0.26/vue.min.js) 或者 [cdnjs](https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.26/vue.min.js) 下载vue.js

You can find Vue.js also on [jsdelivr](http://cdn.jsdelivr.net/vue/1.0.26/vue.min.js) or [cdnjs](https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.26/vue.min.js)

你应该经常去看看有没有新的版本更新，最好同步使用最新的版本

It takes some time to sync with the latest version so you have to check frequently for
updates.

## 使用NPM下载

## Download using NPM

推荐下载的方式是使用NPM，当我们需要使用vue.js构建大型app的时候。它可以和一些 commonjs 模板加载模块很好地结合使用，比如 [Webpack](http://webpack.github.io/) 或者 [Browserify](http://browserify.org/)

NPM is the recommended installation method when building large scale apps with Vue.js. It pairs
nicely with a CommonJS module bundler such as [Webpack](http://webpack.github.io/) or [Browserify](http://browserify.org/)

    # 最新的稳定版本
    $ npm install vue
    # 最新的稳定版本 + CSP-compliant
    $ npm install vue@csp
    # 测试本版(直接从Github下载)
    $ npm install vuejs/vue#dev

    # latest stable
    $ npm install vue
    # latest stable + CSP-compliant
    $ npm install vue@csp
    # dev build (directly from GitHub):
    $ npm install vuejs/vue#dev

## 使用 bower 下载

## Download using Bower

    # 最新的稳定版本
    $ bower install vue

    # latest stable
    $ bower install vue

更多的安装指导和更新请看 [Vue.js安装指导](http://vuejs.org/guide/installation.html)

For more installation instructions and updates take a loot at the [Vue.js Installation Guide](http://vuejs.org/guide/installation.html)
