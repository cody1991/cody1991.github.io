---
layout: post
title:  "Prefixfree.js Introduction"
date:   2014-12-04 13:35:00
category: frontend
---

因为是专注于移动前端的开发，特别是微信端的，而又需要各自各样的动画之类的，CSS3的不少属性需要加上 -webkit- 的前缀，（比如box-shadow啦，transition啦）真心有点感觉是无用功。。。

以前就发现prefixfree.js这个，它是“一个 JavaScript 工具库，用于帮助你从 CSS 前缀的地狱中解脱出来。你编写的 CSS 代码无需填写浏览器前缀，在需要的时候，prefixfree.js 会帮助你自动添加当前浏览器需要的前缀。” （引用别人的话~~）。官方的描述是“-prefix-free lets you use only unprefixed CSS properties everywhere. It works behind the scenes, adding the current browser’s prefix to any CSS code, only when it’s needed.”

下面先给出几个链接吧~

[prefixfree官网][prefixfreeHome]

[prefixfree Github 地址][prefixfreeGit]

根据官网，草草的翻译几段话吧。

特性上，它都可以在需要的时候给`<link>`引入的CSS或者`<style>`里面的CSS属性或者行内CSS属性加上前缀；也可以在动态引入的CSS属性在需要的时候加入前缀，不过需要它们的一个插件（有兴趣可以到官网的plugins栏目下看~）；而用`jquery.css()`设置的属性也同样生效，不过也需要另外多一个插件。

特效上也有它的局限性，在CSS文件里面使用`import`引入的CSS属性不支持前缀添加（那就不要这样用了~又增加请求神马的），跨域名的CSS样式表也是不支持的，比如在本地直接打开引入了这个插件的文件，会有报错“ Cross origin requests are only supported for protocol schemes: http, data, chrome-extension, https, chrome-extension-resource.”，所以一般我会用apache来看，你也可以在官网的FAQ下看看，给chrome或者firefox浏览器添加点参数神马的来解决。另外行内的CSS属性的前缀添加在firefox < 3.6下和IE中也不是支持的很好。

DEMO？官网左上角的圆圈（或者其他一些元素）就是很好的案例了，在引入的CSS文件中都没有写前缀，但在F12控制台下可以看到添加了 -webkit- 或者 -moz- 的前缀。

而使用的方法也是非常方便，只需要引入prefixfree.js文件就够了，不需要写其他任何的东西。你可以放在任何地方，但是推荐放在最后引入的css文件的后面，我也是这样做的。

兼容性方面，官网的说法是支持“IE9+, Opera 10+, Firefox 3.5+, Safari 4+ and Chrome on desktop and Mobile Safari, Android browser, Chrome and Opera Mobile on mobile.”

更多的内容就到官网查看吧~这几天接到手上的项目我都引入这个库了，以后再也不用写前缀了，是一种解脱！

不过如今自己在弄gulp结合less，感觉可以不使用这个插件了。


[prefixfreeHome]:http://leaverou.github.io/prefixfree/
[prefixfreeGit]:https://github.com/LeaVerou/prefixfree
[swiperSite]:http://www.idangero.us/sliders/swiper/
[fullpage]:    http://cody1991.github.io/fullpage/index.html
[owl.carousel.fullpage]: http://cody1991.github.io/owl.carousel.fullpage/index.html
[pagePilingSite]:http://cody1991.github.io/pagepiling/
[recentlyProjectSite]:http://cody1991.github.io/recentlyProject/
[codyLibSite]:http://cody1991.github.io/mylib/