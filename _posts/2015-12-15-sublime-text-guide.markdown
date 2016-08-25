---
layout: post
title:  "Sublime text guide"
date:   2015-12-15 15:57:00
category: other
---

这篇文字从0开始介绍 [sublime text3](http://www.sublimetext.com/) 的安装和部分插件配置。首先进入官网安装自己的系统来下载对应的安装包

安装过程很简单，主要需要注意的地方是如下图所示，把 Add to explorer context menu 加上，添加到平时的鼠标右键菜单中

<img src="{{site.baseurl}}/source/2015.09.22/1.png">

之后我们需要去下载安装 [Package Control](https://packagecontrol.io/) ，官网对它的介绍是 The Sublime Text package manager that makes it exceedingly simple to find, install and keep packages up-to-date. 意思是：package control 是 sublime text 的包管理工具，让我们更方便和安装插件，并且保证它们是最新的

Package Control 的下载方式很简单，使用 ctrl + ` 或者 菜单栏里面选择 View > Show Console ，然后 Console 就会显示出来，接下来把下面这段代码添加到里面：

	import urllib.request,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)

如果你还是使用 sublime text2 版本的话，把下面代码填入 Console 中：

	import urllib2,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler()) ); by = urllib2.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); open( os.path.join( ipp, pf), 'wb' ).write(by) if dh == h else None; print('Error validating download (got %s instead of %s), please try manual install' % (dh, h) if dh != h else 'Please restart Sublime Text to finish installation')

还有一种手动的方法安装，具体可以到 [package control installation](https://packagecontrol.io/installation#st3) 阅读查看，这里就不多说了。

<img src="{{site.baseurl}}/source/2015.09.22/2.png">

如上图所示，按下 Enter 键以后等待片刻， package control 安装成功以后，在菜单栏点开 Preferences 就可以看到最下面多了个 Package Control 了。

接下来开始介绍部分插件吧。

----

## [Material-theme](https://github.com/equinusocio/material-theme)

sublime text的默认主题还是有点看不过去的，可以在菜单栏的 Perferences > Color Scheme 中更换，个人蛮喜欢 material theme 这个主题的，如果你也喜欢的话可以自行去下载安装。安装的方式是在菜单栏找到 Preferences > Package Control 选择 install Package 或者直接 ctrl + shift + p 之后键入 install Package ，然后键入插件名，它就会自动帮你下载安装了。之后我们可以按照它给的提示，打开 Preferences > Setting - User ，键入 

	"theme": "Material-Theme.sublime-theme",
	"color_scheme": "Packages/Material Theme/schemes/Material-Theme.tmTheme",

使我们下载的 material theme 生效。

Preferences > Setting - User 是个人的设置，在 Preferences > Setting - Default 里面有非常多的设置我们可以到 User 里面设置来覆盖，那些配置我们可以在 [Sublime Text 3 配置文件](http://www.linuxidc.com/Linux/2014-03/98103.htm) 中查看它们的意思。

接下来上面提到过的就不赘述了，更多的是介绍插件本身。

## [HTML-CSS-JS-Prettify](https://packagecontrol.io/packages/HTML-CSS-JS%20Prettify)

这个插件是我自己非常非常喜欢的一个插件，主要功能就是把你的 HTML CSS JAVASCRIPT 代码一键 [ alt + shift + H ] 格式化成符合规范的代码格式，自己一边敲代码一边 ctrl + s 和  alt + shift + H ，代码看起来整整齐齐非常舒坦 (没错我是个处女座) 。安装这个插件之前需要先安装 [nodejs](https://nodejs.org/en/) 环境。

## [Emmet-sublime](https://github.com/sergeche/emmet-sublime)

emmet sublime 基本是所有的前端开发工程师都会使用的一个插件，它非常出名，有非常多的功能能让你大大地提高开发速率。可以到这里 [emmet](http://www.emmet.io/) 看下 DEMO 和介绍，感受下它的魅力。

## [SideBarEnhancements](https://github.com/titoBouzout/SideBarEnhancements)

sublime text3的侧边栏文件夹的右键功能是非常少的，只有几个，而这个插件的功能就是扩展了侧边栏文件夹的功能，非常有用。

## [AutoFileName](https://github.com/BoundInCode/AutoFileName)

这个主要的功能是按照路径自动补全文件名字，非常有用吧

## [BracketHighlighter](https://github.com/facelessuser/BracketHighlighter)

BracketHighlighter 的功能是能高亮比如[], (), {}, "", ''这些对应的括号，更好的看清代码结构

## [Less](https://github.com/danro/LESS-sublime)

书写less时候的高亮显示

## [git](https://github.com/kemayo/sublime-text-git)

把git的功能集成到sublime text里面，非常方便好用

---

下面是我个人的简单 sublime text 配置

	{
		"always_show_minimap_viewport": true,
		"bold_folder_labels": true,
		"color_scheme": "Packages/Material Theme/schemes/Material-Theme.tmTheme",
		"font_size": 11,
		"ignored_packages":
		[
			"Vintage"
		],
		"line_padding_bottom": 2,
		"line_padding_top": 2,
		"material_theme_accent_yellow": true,
		"material_theme_small_tab": true,
		"overlay_scroll_bars": "enabled",
		"theme": "Material-Theme.sublime-theme",
		"word_wrap":true,
		"highlight_line":true
	}

下面讲讲一些常用的快捷键

----

## ctrl+shift+p

package control的一些控制命令

## ctrl + p

可以快速的打开你所输入的字符对应的文件

## ctrl + r

当你的一个JS文件很大，定义了很多方法的时候想去查找一个函数的定义，可以使用这条指令快速地找到对应方法的位置

## ctrl + d

选取当前对应的文字以及下一个相同的文字

## ctrl + click

点击的每个位置都会有一个光标可以让你去编辑

## ctrl + F3

选取和当前选取的文字相同的所有文本

# End
