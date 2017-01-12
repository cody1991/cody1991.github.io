---
layout: post
title:  "learn-modern-PHP-book-7-built-in-web-server"
date:   2017-01-11 17:38:00
category: PHP
---

`PHP 5.4.0` 开始内置了 `Web` 服务器

之前我是在 `xampp` 里面的 `htdocs` 文件夹编写 `PHP` 文件，然后拷贝到这个项目的 `GitHub` 文件，现在直接编辑 `GitHub` 下的文件，然后启动内置的服务器就好了，可以用来简单的预览使用 `Laravel`等等，以及单纯的一些简单例子

    php -S localhost:8888

有时候我们需要在同一个局域网中的另一台设备中访问这个 `PHP Web` 服务器，我们把 `localhost` 改成 `0.0.0.0` ，让 `PHP Web`服务监听所有的借口

    php -S 0.0.0.0:8888

补充下，这个时候我们就可以配置手机上 `wifi` 的 `http代理` 了，设置成 `pc` 的地址以及端口，比如：

    服务器： 192.168.0.108
    端口： 8888

在手机浏览器输入比如：

    http://0.0.0.0:8888/ch2/9-Zend-OPcache.php

就能访问到对应的服务器上的 `PHP` 文件了

---

另外精彩需要专属的 `PHP` 初始化配置文件，尤其是那些对内容用量、文件上传、分析或字节码缓存有特许要求的，要单独配置。我们可以使用 `-c` 选项，让它使用指定的初始化文件：

    php -S 0.0.0.0:8888 -c app/config/php.ini

---

但是和 `Apache` 和 `nginx` 不同，不支持 `.htaccess` 文件，很难使用多数流行的 `PHP` 框架中常见的 前端控制器（是一个 `PHP` 文件，用于转发所有 `HTTP` 请求，通过`.htaccess`文件或重写规则实现，职责是分发请求，以及适度调试适当的 `PHP` 代码）

`PHP` 内置的服务器使用路由脚本弥补这个遗漏的功能，处理每个 `HTTP` 请求钱，先执行这个路由器脚本，如果为 `false` 返回当前 `HTTP` 请求中引用的静态资源 `URI` ，否则路由器脚本执行的结果当作 `HTTP` 响应体安徽，和 `.htaccess` 文件一样

    php -S 0.0.0.0:8888 router.php

---

有时候需要知道 `PHP` 脚本使用的是内置的还是传统的服务器，是因为想为 `nginx` 设定某个首部（比如 Status:） 而不为内置服务器设置，我们可以使用

    php_sapi_name() 

查看使用哪个服务器。如果是内置服务器，这个函数返回 `cli-server`

下面是简单的 `router.php` 文件编写

    <?php 
      if(php_sapi_name()==='cli-server'){
        echo '内置服务器';
      }

      if(preg_match('/\.(?:png|jpg|jpeg|gif)$/',$_SERVER['REQUEST_URI'])){
        return false;
      }else{
        echo "<p>Welcome to PHP</p>";
        echo "<pre>";
        print_r(pathinfo($_SERVER["SCRIPT_FILENAME"]));

        print_r($_SERVER);
        echo "</pre>";
      }

      // Array
      // (
      //     [dirname] => /Users/cody1991/Desktop/github/learn/PHP/modernPHP-book/ch2
      //     [basename] => router.php
      //     [extension] => php
      //     [filename] => router
      // )
    ?>

---

缺点也有很多

不能用在生产环境，性能不好，一次只能处理一次请求，其他请求会被阻塞，比如某个 `PHP` 需要慢速的数据库查询或者远程 `API` 返回，会处于停顿状态

只支持少量的媒体类型

支持少量的 `URI` 编写规则

---

最后贴出在手机和电脑上的返回结果：

    Array
    (
        [DOCUMENT_ROOT] => /Users/cody1991/Desktop/github/learn/PHP/modernPHP-book/ch2
        [REMOTE_ADDR] => 192.168.0.101
        [REMOTE_PORT] => 53220
        [SERVER_SOFTWARE] => PHP 5.6.28 Development Server
        [SERVER_PROTOCOL] => HTTP/1.1
        [SERVER_NAME] => 0.0.0.0
        [SERVER_PORT] => 8888
        [REQUEST_URI] => http://0.0.0.0:8888/ch2/9-Zend-OPcache.php
        [REQUEST_METHOD] => GET
        [SCRIPT_NAME] => /ch2/9-Zend-OPcache.php
        [SCRIPT_FILENAME] => /Users/cody1991/Desktop/github/learn/PHP/modernPHP-book/ch2/router.php
        [PHP_SELF] => /ch2/9-Zend-OPcache.php
        [HTTP_HOST] => 0.0.0.0:8888
        [HTTP_ACCEPT_ENCODING] => gzip, deflate
        [HTTP_CONNECTION] => keep-alive
        [HTTP_PROXY_CONNECTION] => keep-alive
        [HTTP_UPGRADE_INSECURE_REQUESTS] => 1
        [HTTP_ACCEPT] => text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,UC/44,ios_plugin/1
        [HTTP_USER_AGENT] => Mozilla/5.0 (iPhone; CPU iPhone OS 10_2 like Mac OS X; zh-CN) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/14C92 UCBrowser/11.3.5.911 Mobile  AliApp(TUnionSDK/0.1.12) AliApp(TUnionSDK/0.1.12)
        [HTTP_X_UCBROWSER_UA] => dv(iPh7,1);pr(UCBrowser/11.3.5.911);ov(10_2);ss(414x736);bt(UC);pm(0);bv(0);nm(0);im(0);nt(2);
        [HTTP_CACHE_CONTROL] => max-age=0
        [HTTP_ACCEPT_LANGUAGE] => zh-cn
        [REQUEST_TIME_FLOAT] => 1484127203.7722
        [REQUEST_TIME] => 1484127203
    )

---

    Array
    (
        [DOCUMENT_ROOT] => /Users/cody1991/Desktop/github/learn/PHP/modernPHP-book/ch2
        [REMOTE_ADDR] => 127.0.0.1
        [REMOTE_PORT] => 54002
        [SERVER_SOFTWARE] => PHP 5.6.28 Development Server
        [SERVER_PROTOCOL] => HTTP/1.1
        [SERVER_NAME] => 0.0.0.0
        [SERVER_PORT] => 8888
        [REQUEST_URI] => /10.php
        [REQUEST_METHOD] => GET
        [SCRIPT_NAME] => /10.php
        [SCRIPT_FILENAME] => /Users/cody1991/Desktop/github/learn/PHP/modernPHP-book/ch2/router.php
        [PHP_SELF] => /10.php
        [HTTP_HOST] => localhost:8888
        [HTTP_CONNECTION] => keep-alive
        [HTTP_CACHE_CONTROL] => max-age=0
        [HTTP_UPGRADE_INSECURE_REQUESTS] => 1
        [HTTP_USER_AGENT] => Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36
        [HTTP_ACCEPT] => text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
        [HTTP_ACCEPT_ENCODING] => gzip, deflate, sdch, br
        [HTTP_ACCEPT_LANGUAGE] => zh-CN,zh;q=0.8,en;q=0.6
        [REQUEST_TIME_FLOAT] => 1484126985.1592
        [REQUEST_TIME] => 1484126985
    )

完成书本第二章的学习
