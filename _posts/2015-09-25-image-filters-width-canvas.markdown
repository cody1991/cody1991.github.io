---
layout: post
title:  "Image Filters Width Canvas"
date:   2015-09-25 13:10:00
category: frontend
---

HTML5的画布元素可以用来制作图像滤镜。你需要做的事情是把图片绘制到一个Canvas元素上，然后读取Canvas上的像素信息，最后在像素信息上进行过滤处理。完成上面三个步骤以后你可以把处理的结果放到一个Canvas元素上（或者使用原来旧的Canvas元素就好了。

听起来很简单吧？好的，说干就干吧！

原文地址: [Click](http://www.html5rocks.com/en/tutorials/canvas/imagefilters/)

下面是原始的测试图片：

![demo_samll]({{ site.baseurl }}/source/2015.09.25/demo_small.png)

##处理像素信息

<hr/>

首先，取回图片像素信息：

	Filters = {};
    Filters.getPixels = function(img) {
        var c, ctx;
        if (img.getContext) {
            c = img;
            try {
                ctx = c.getContext('2d');
            } catch (e) {}
        }
        if (!ctx) {
            c = this.getCanvas(img.width, img.height);
            ctx = c.getContext('2d');
            ctx.drawImage(img, 0, 0);
        }
        return ctx.getImageData(0, 0, c.width, c.height);
    };

    Filters.getCanvas = function(w, h) {
        var c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        return c;
    };

接下来，我们需要使用方法去过滤那些图片。使用一个 `filterImage` 的方法，其中带有 `filter`，`image` 参数，最后返回过滤后的像素元素看起来怎样？

	Filters.filterImage = function(filter, image, var_args) {
        var args = [this.getPixels(image)];
        for (var i = 2; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        return filter.apply(null, args);
    };

##运行一个简单的过滤

现在我们已经把像素处理的方法放在一起了，我们开始去写一些简单的过滤器。我们先来把图片变成灰度吧。

	Filters.grayscale = function(pixels, args) {
        var d = pixels.data;
        for (var i = 0; i < d.length; i += 4) {
            var r = d[i];
            var g = d[i + 1];
            var b = d[i + 2];
            // CIE luminance for the RGB
            // 人类的眼睛看红色和蓝色不太好，所以我们强调了他们
            var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            d[i] = d[i + 1] = d[i + 2] = v
        }
        return pixels;
    };

我们可以通过加上一个固定的值给像素来调整亮度

	Filters.brightness = function(pixels, adjustment) {
        var d = pixels.data;
        for (var i = 0; i < d.length; i += 4) {
            d[i] += adjustment;
            d[i + 1] += adjustment;
            d[i + 2] += adjustment;
        }
        return pixels;
    };

图像阀值非常简单。你只要计算一个像素灰度值来和阀值比较，依据这个进行赋值就好了。

##卷积图像

[卷积过滤器](http://en.wikipedia.org/wiki/Convolution) 在图像处理里面是非常有用场景的过滤器。它的基本思想是从源图像里面选取一块矩形的加权值作为输出值。卷积过滤器可以用来处理模糊化、锐化、浮雕、边缘检测和一大堆其他的事情

