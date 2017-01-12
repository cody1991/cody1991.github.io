---
layout: post
title:  "learn-modern-PHP-book-6-Zend-OPcache"
date:   2017-01-11 16:32:00
category: PHP
---

字节码缓存不是 `PHP` 的新特性，很多独立的扩展可以实现缓存，比如 `Alternative PHP Cache(APC)` `eAccelerator` `ionCube` 和 `XCache`。但是都没有集成到 `PHP` 核心中。

5.5开始内置了字节码缓存功能，叫做 `Zend-OPcache` 

`PHP` 是解释型语言，`PHP` 解释器执行 `PHP` 脚本会解析 `PHP` 脚本代码，把 `PHP` 编译成的一系列 `Zend` 操作码，然后执行字节码

每次请求 `PHP` 文件都是这样，很消耗资源，每次 `HTTP` 请求 `PHP` 都必须不断解析、编译和执行 `PHP` 脚本，消耗更多的资源。

缓存预先编译好的字节码，减少应用的响应时间、降低系统资源的压力

默认情况下没有启用

---

参考 [how-to-use-php-opcache - stackoverflow](http://stackoverflow.com/questions/17224798/how-to-use-php-opcache)

我们首先要找到 配置的 `php.ini` 文件，可以通过 `phpinfo()` 找到

    Loaded Configuration File /Applications/XAMPP/xamppfiles/etc/php.ini

之后通过命令

    php-config --extension-dir 

找到 `PHP` 扩展所在的目录

然后修改 `php.ini` 里面的这句：

    zend_extension=/Applications/XAMPP/xamppfiles/lib/php/extensions/no-debug-non-zts-20131226/opcache.so

这里改成你自己的地址

[官网的推荐配置](http://php.net/manual/zh/opcache.installation.php)：

    opcache.memory_consumption=128
    opcache.interned_strings_buffer=8
    opcache.max_accelerated_files=4000
    opcache.revalidate_freq=60
    opcache.fast_shutdown=1
    opcache.enable_cli=1

完整的 [运行时配置](http://ua2.php.net/manual/zh/opcache.configuration.php)

    opcache.memory_consumption integer

    OPcache 的共享内存大小，以兆字节为单位。

    opcache.interned_strings_buffer integer 

    用来存储临时字符串的内存大小，以兆字节为单位。 PHP 5.3.0 之前的版本会忽略此配置指令。

    opcache.max_accelerated_files integer

    OPcache 哈希表中可存储的脚本文件数量上限。 真实的取值是在质数集合 { 223, 463, 983, 1979, 3907, 7963, 16229, 32531, 65407, 130987 } 中找到的第一个比设置值大的质数。 设置值取值范围最小值是 200，最大值在 PHP 5.5.6 之前是 100000，PHP 5.5.6 及之后是 1000000。

    opcache.revalidate_freq integer

    检查脚本时间戳是否有更新的周期，以秒为单位。 设置为 0 会导致针对每个请求， OPcache 都会检查脚本更新。

    opcache.fast_shutdown boolean

    如果启用，则会使用快速停止续发事件。 所谓快速停止续发事件是指依赖 Zend 引擎的内存管理模块 一次释放全部请求变量的内存，而不是依次释放每一个已分配的内存块。

    opcache.enable_cli boolean

    仅针对 CLI 版本的 PHP 启用操作码缓存。 通常被用来测试和调试。

    opcache.validate_timestamps boolean

    如果启用，那么 OPcache 会每隔 opcache.revalidate_freq 设定的秒数 检查脚本是否更新。 如果禁用此选项，你必须使用 opcache_reset() 或者 opcache_invalidate() 函数来手动重置 OPcache，也可以 通过重启 Web 服务器来使文件系统更改生效。

按照官网的配置来，添加进入 `php.ini` 然后重启

`opcache.validate_timestamps` 值0的时候，它觉察不到 `PHP` 的变化，必须手动晴空 `Zend OPchache` 缓存的字节码，让他发现 `PHP` 文件的变动。

生产环境设为0，但是这样开发的时候也不方便，可以再加上下面这样配置：

    opcache.validate_timestamps=1
    opcache.revalidate_freq=0

    // 开发环境 validate_timestamps 设为1，revalidate_freq请求变换设为0，每次都请求新的

