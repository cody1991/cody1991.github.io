---
layout: post
title:  "learn-modern-PHP-book-8-PSR"
date:   2017-01-12 18:06:00
category: PHP
---

# PHP Standards Recommendation
 
列举一些，不是全部

## PSR-1 基本的代码风格

类的名字：使用驼峰 ( `CamelCase` )，比如 `CoffeeGrinder`

常量名字：全部大些，分隔使用下横线

方法名字：camelCase 驼峰，比如 `phpIsAwesom()`

## PSR-2 严格的代码风格

最好不要写关闭标签 `?>` ,能避免意料之外的输出，加上的话在关闭标签后哦鱼空行，这个空行会被当作输出，导致错误，
日股设定 `HTTP` 首部时

`TRUE` `FALSE` `NULL`摒弃这些，使用小写，`PHP` 关键字都应该使用小写字母 

类的起始括号在类名之后重起一行

函数的起始括号在函数名之后重起一行

可见性 `public` `protected` `privae` ，类中每个属性和方法都要声明可见性，如果被声明为 `abstract` `final` ，这两个限定符 必须在可见性关键词之前，如果声明为 `static` ，必须在可见性关键词之后

    <?php
    namespace Animals;

    class MyClass{
      // 指定了可见性静态属性
      public static $num  = 0;
      // 指定了可见性的方法
      public function __construct(){
        static::$num;
      }
    }

所有控制结构关键字后面都要一个空格，包括 `if` `elseif` `else` `switch` `case` `while` `do while` `for` `foreach` `try` `catch`。如果这些关键字后面有一个圆括号，起始圆括号后面不能有空格，结束空格号前面也不行。起始括号和关键字要写在一行

    if (1 === 1) {
      do {

      } while (2 === 3);
    }

## PSR-3 日志记录器

一个接口，规定 `PHP` 日志记录器组件可以实现的方法。

最受欢迎的是 [monolog/monolog](https://packagist.org/packages/monolog/monolog)

复合 `PSR-3` 推荐规范的日志记录器组件，必须包含一个实现 `Psr\Log\LoggerInterface` 接口的 `PHP类` 

    interface LoggerInterface
    {
      public function emergency($message, array $context = array());
      public function alert($message, array $context = array());
      public function critical($message, array $context = array());
      public function error($message, array $context = array());
      public function warning($message, array $context = array());
      public function notice($message, array $context = array());
      public function info($message, array $context = array());
      public function debug($message, array $context = array());
      public function log($level, $message, array $context = array());
    }

每个方法对应 `RFC 5424` 协议的一个日志级别，而且接受两个参数，第一个参数 `$message` 必须是一个字符串，有一个 `__toString()` 方法的对象，第二个参数 `$context` 是可选的一个数组，提供用于替换第一个参数中占位标记的值

`$context` 参数用于构建复杂的日志消息，消息文本中可以使用占位符，比如 `{placeholder_name}` ，占位符由 `{` 占位符名称和 `}` 组成，不能包括空格。 `$context` 参数的值是一个关联数组，健是占位符的名称，对应的值用于替换消息文本中的占位符 

    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    // 准备日志记录器

    $log = new Logger('myApp');

    $log->pushHandler(new StreamHandler('logs/development.log',Logger::DEBUG));
    $log->pushHandler(new StreamHandler('logs/production.log',Logger::WARNING));

    $log->debug('This is a debug message');
    $log->warning('This is a warning message');
    $log->error('This is a error message');

使用 `monolog` 可以看到下面的结果，我们不需要自己去写一套

    productin.log

    [2017-01-12 10:52:06] myApp.WARNING: This is a warning message [] []
    [2017-01-12 10:52:08] myApp.WARNING: This is a warning message [] []
    [2017-01-12 10:52:43] myApp.WARNING: This is a warning message [] []
    [2017-01-12 10:52:51] myApp.WARNING: This is a warning message [] []
    [2017-01-12 10:53:57] myApp.WARNING: This is a warning message [] []
    [2017-01-12 10:53:57] myApp.ERROR: This is a error message [] []

    development

    [2017-01-12 10:52:06] myApp.DEBUG: This is a debug message [] []
    [2017-01-12 10:52:06] myApp.WARNING: This is a warning message [] []
    [2017-01-12 10:52:08] myApp.DEBUG: This is a debug message [] []
    [2017-01-12 10:52:08] myApp.WARNING: This is a warning message [] []
    [2017-01-12 10:52:43] myApp.DEBUG: This is a debug message [] []
    [2017-01-12 10:52:43] myApp.WARNING: This is a warning message [] []
    [2017-01-12 10:52:51] myApp.DEBUG: This is a debug message [] []
    [2017-01-12 10:52:51] myApp.WARNING: This is a warning message [] []
    [2017-01-12 10:53:57] myApp.DEBUG: This is a debug message [] []
    [2017-01-12 10:53:57] myApp.WARNING: This is a warning message [] []
    [2017-01-12 10:53:57] myApp.ERROR: This is a error message [] []

## PSR-4 自动加载器策略  

运行时查找并加载 `PHP` 类、接口和性状。不要求改变代码的实现方式，建议如何使用文件系统目录结构和 `PHP` 命名空间组织代码。依赖 `PHP` 命名空间和文件系统目录结构查找并加载 `PHP` 类、接口和性状

精髓在于把命名空间的前缀和文件系统中的目录对应起来。比如 `\Orieilly\ModernPHP` 命名空间中的类、接口和性状在物理文件系统 `src/` ，这样系统就知道比如 `\Orieilly\ModernPHP\Chapter1` 命名空间对应于 `src/Chapter1` 目录，`\Orieilly\ModernPHP\Chapter1\Example` 类对应于 `src/Chapter1/Example.php` 文件

我们可以直接使用依赖管理器 `Composer` 自动生成 `PSR-4` 自动加载器。

    require 'vendor/autoload.php';
