---
layout: post
title:  "Github Pages Introduction"
date:   2015-04-04 16:46:40
category: github
---
github pages是用来搭建免费的，不限流量的个人网站，可以把自己的东西托管在二级域名 *.github.io 下，本教程就是来简单的说明github pages的使用。

友情链接：

[github pages 官网][githubpages]，英文网站。

[git简易指南][gitintro]，git的使用简单教程。

[git bash下载][gitbashsite]，git bash的下载地址。

在看本教程前，英文水平OK的可以看看github pages的官网，另外教程中不会涉及github的使用说明，可以在上面的git简明指南中查看，所以默认你是会使用git的。

首先，进入[github.com][gitsite]，登陆以后进入到自己的个人空间，点击 Repositories ，选择 new ，创建新的git仓库。如图所示：

<img src="{{site.baseurl}}/source/2014.11.07/1.png">

之后这一步很重要，创建的仓库的名字一定要是 yourname.github.io 的格式，前面是你自己的github名字。接下来可以选择下面的"initialize this repository with a readme"，创建原始的readme，最后选择 "create repository"，创建仓库即可 。如图，由于我已经创建过这个 域名了，所以提示我这个仓库名已经存在。

<img src="{{site.baseurl}}/source/2014.11.07/2.png">

创建成功以后，会进入到自己的仓库的主页，接下来我们选择右边sidebar里面的 "settings" 选项。如图所示，当然刚创建成功的话，仓库里面只有Readme.md一个文件。（接下来用另外一个github的账号sysutangzx来说明好了）

<img src="{{site.baseurl}}/source/2014.11.07/3.png">

我们进入到settings界面以后，滚动到下面的Github Pages栏。点击 Automatic page generator 按钮。如图所示：

<img src="{{site.baseurl}}/source/2014.11.07/4.png">

进去以后，如果没有特别需要设置的话，因为构造个人网站你不需要太多的原来github pages提供的东西，可以直接选择 Continue to layouts 按钮。如图：

<img src="{{site.baseurl}}/source/2014.11.07/5.png">

之后任意选择一个模板，点击Publish page按钮，你的个人网站域名就生成了。不过不要着急，大概十分钟后左右才可以访问。如图：

<img src="{{site.baseurl}}/source/2014.11.07/6.png">

在等待的时间，我们可以回到原来的仓库首页去设置一下仓库的介绍了。如图：

<img src="{{site.baseurl}}/source/2014.11.07/7.png">

下面就是我们原始的github pages首页了。如图：

<img src="{{site.baseurl}}/source/2014.11.07/8.png">

------------------------------------------------------------------------------------------------------------

那么问题来了！。。华丽的分割线

我们当然不止只有一个仓库，如果我们有其他的项目仓库也希望能挂在github pages上面呢。比如下面这个：

<img src="{{site.baseurl}}/source/2014.11.07/9.png">

其实和创建前面的步骤差不多，但是如上图所示，这个时候我们可以任意定义我们的仓库名字了，创建成功之后还是进入到 "settings部分"，选择上面提到的 Automatic page generator 按钮 。在网站成功创建以后，这里有个问题就需要特别注意了：分支。
在上面创建的网站，生成以后的文件默认是放在 master 分支里面的，而在以后的仓库的网站生成以后，放的地方是在 gh-pages 里面的，所以我们需要到 "setting" 里面设置我们的默认仓库是 gh-pages。如图：

<img src="{{site.baseurl}}/source/2014.11.07/10.png">

回到仓库首页以后，可以看到 commit ' create gh-pages branch via github'，这个就是原始的分支文件。接下来的事情就是把我们这个仓库 git clone 到本地了。（这一步就不赘述了，相信看了前面友情提示下的git简易教程，你是会的）

<img src="{{site.baseurl}}/source/2014.11.07/11.png">

然后我们进入到我们的目录中，比较暴力的我就把原本的文件全部删掉，然后放进了我自己的文件。当然不能删掉里面的.git文件夹了。

<img src="{{site.baseurl}}/source/2014.11.07/12.png">

之后在git bash中提交就完成了。上图涉及到的文件是我的项目[fullpage][fullpagesite]的文件，可以点击这里查看。这样就大功告成了！如今访问，例如 [http://cody1991.github.io/fullpage][fullpagesite] 或者 [http://cody1991.github.io/][mygithubsite] 都可以了。另外想要搭建像我这样的一个github pages jekyll博客的话，可以访问它的主页[jekyll 主页][jekyllsite]或者[jekyll 中文网站][jekyllcn]。我自己这个jekyll网页还很丑。。基本没有美化 ╮(╯_╰)╭ 是它原本的样式。

<img src="{{site.baseurl}}/source/2014.11.07/13.png">

[gitbashsite]:http://git-scm.com/downloads
[githubpages]: https://pages.github.com/
[gitintro]: http://www.bootcss.com/p/git-guide/
[gitsite]:https://github.com/
[fullpagesite]:http://cody1991.github.io/fullpage
[mygithubsite]:http://cody1991.github.io/
[jekyllsite]:http://jekyllrb.com/
[jekyllcn]:http://jekyllcn.com/