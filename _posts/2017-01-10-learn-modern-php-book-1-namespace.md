---
layout: post
title:  "learn-modern-PHP-book-1-namespace"
date:   2017-01-10 14:05:00
category: PHP
---

开始学习 [Modern PHP](https://book.douban.com/subject/26635862/) 一书，看到豆瓣的评分还是不错的，也有人推荐

---

`Zend Engine` 是 `PHP` 引擎，另外还有 `facebook` 的 `HipHop Virtual Machine`

`Hack` 是建立在 `PHP` 上的编程语言，引入了静态类型，新的数据皆结构和额外的借口，同时向后兼容现有的动态类型 `PHP` 代码


---

书本开始讲的是 `namespace`
  
我们首先需要安装 `composer`，这个熟悉前端的话知道它是类似于 `node.js` 的 `npm` 

所以到了他的 [官网下载](https://getcomposer.org/download/)

这个时候想要全局安装 `composer`，我使用的是 `mac` 有默认安装的 `PHP` ，但是我自己使用的是 `xampp`，所以参考了下这篇文章 [修改 MAC 默认 PHP 运行环境，给 XAMPP 配置全局 COMPOSER](http://www.wduw.com/p/606.html)

我们之后就可以在任意地方使用 `PHP` 的包管理器 `composer` 了

可以看上面官网如果使用 `composer` 也可以到 [中文网](http://docs.phpcomposer.com/01-basic-usage.html)

---

因为万恶的墙，后面的依赖下载都做不到，找不到了 [国内镜像地址](http://pkg.phpcomposer.com/) 替换

---
一开始练习就涉及到了引入 [Symfony](https://github.com/symfony/symfony)

    Symfony is a PHP full-stack web framework. It is written with speed and flexibility in mind. It allows developers to build better and easy to maintain websites with PHP.
  
    Symfony can be used to develop all kind of websites, from your personal blog to high traffic ones like Dailymotion or Yahoo! Answers.
  
我是看着官网的 [How to Install and Use the Symfony Components](https://symfony.com/doc/current/components/using_components.html) 进行的

    composer require symfony/finder
    composer require symfony/http-foundation
  
下载完这两个，我们就可以引入了，`composer` 在目录下会生成一个 `vendor` 文件夹。我们在自己的文件顶部写入下面这句可以自动加载

    require 'vendor/autoload.php';

      use Symfony\Component\HttpFoundation\Response as Response;
      use Symfony\Component\HttpFoundation\Request;
      use Symfony\Component\HttpFoundation\Cookie;

然后使用 `use` 引入我们需要的类就可以了。

注意，上面引入的最前面都不需要加上 `\`，全局命名空间才需要，如果 `Exception`，我们使用的话是 `\Exception`，但是比如我们自己有一个 

    `namespace My\App;`

使用的时候是

    `use My\App;`
  
如果使用 

    `use \My\App;`
  
    \Exception

会搜索 `\My\App\Exception` 但是不存在

---

一个文件里面不要写多个命名空间

---

`example`

    1.php
    
    <?php 
      require 'vendor/autoload.php';
    
      use Symfony\Component\HttpFoundation\Response as Response;
      use Symfony\Component\HttpFoundation\Request;
      use Symfony\Component\HttpFoundation\Cookie;
    
      $response = new Response('Oops', 400);
      $response->send();
    ?>


    2.php
    
    <?php 
      namespace Cody\App;
      class Foo {
        public function doSomething(){
          // \Exception 是全局类，加上\
          $exception = new \Exception();
          echo 'success';
          echo $exception;
        }
      }

    3.php
    
    <?php 
      require 'vendor/autoload.php';
      // 要引入 2.php
      require '2.php';
    
      use Cody\App\Foo;
    
      $foo = new Foo();
      
      // 调用函数使用箭头
      $foo->doSomething()
    ?>



