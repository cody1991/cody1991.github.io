---
layout: post
title:  "learn-modern-PHP-book-5-closure"
date:   2017-01-10 19:29:00
category: PHP
---

闭包指创建时封装周围状态的函数。即使闭包所在的环境不存在了，闭包中封装的状态依然存在。

匿名函数时没有名称的函数，匿名函数可以赋值给变量，还能像其他任何 `PHP` 对象那样传递。不过匿名函数仍然是函数，还可以传入参数，特别适合作为函数或者方法的回调

闭包盒匿名函数不是一个概念。但是 `PHP` 把他们视为相同概念，所以提到闭包，也指的是匿名函数

闭包和匿名函数使用的句法和普通函数一样，不过别被这一点迷惑了，闭包和匿名函数其实是伪装成函数的对象，如果审查闭包盒匿名函数，发现都是 `Closure` 类的实例，闭包和字符串或整数一样，也是一等值类型。

---

    $closure = function($name){
      return sprintf('Hello %s',$name);
    };

    echo $closure("Josh");

能调用 `$closure ` 这个变量因为它的值是一个闭包，闭包实现了 `__invoke()` 魔术方法，只要变量后面有 `()` 就会查找并且调用 `__invoke()` 方法

---

通常把闭包当作函数和方法的回调函数。很多 `PHP` 函数都会使用回调函数，例如 `array_map()` 和 `preg_replace_callback()`。闭包和其他值一样，可作为参数传入其他 `PHP` 函数

比如： 

    $numbersPlusOne = array_map(function($number){
      return $number + 1;
    },[1,2,3]);

    print_r($numbersPlusOne);

之前我们的处理，不使用闭包，只能：

    function incrementNumber($number){
      return $number+1;
    }

    $numbersPlusOne = array_map('incrementNumber',[1,2,3]);
    print_r($numbersPlusOne);

这样代码会稍微慢一点，而且回调的实现和使用场所隔离开了

介绍下 `array_map`

    array array_map ( callable $callback , array $array1 [, array $... ] )

    array_map() returns an array containing all the elements of array1 after applying the callback function to each one. The number of parameters that the callback function accepts should match the number of arrays passed to the array_map()

具体可以看看这里 [array_map](http://php.net/manual/en/function.array-map.php)，把例子都敲一遍

---

`PHP` 闭包附加并封装状态，PHP闭包不会像真正的 `JavaScript` 闭包那样自动封装应用的状态，PHP必须手动调用闭包对象的 `bindTo()` 方法或者使用 `use` 关键字把状态附加到 `PHP` 闭包上

    function enclosePerson($name){
      return function ($doCommand) use ($name){
        return sprintf('%s,%s',$name,$doCommand);
      };
    }

    $clay = enclosePerson('Clay');

    echo $clay('get me sweet tea!');

具名函数 `enclosePerson` 有个名为 `$name` 的参数，这个函数返回一个闭包对象，闭包对象封装了 `$name` 参数，即使返回的闭包对象跳出了 `enclosePerson` 的函数作用域，也记住了 `$name` 参数的值，因为 `$name` 仍然在闭包中

`PHP` 闭包也是对象，和其他对象类似，每个闭包实例都可以用 `$this` 关键字获取闭包的内部状态，闭包对象的默认状态没什么用，但是又一个 `__invoke` 魔术方法和 `bindTo()` 方法 。我们可以用这个方法把 `Closure` 对象的内部状态绑定到其他对象上。闭包可以访问绑定对象中受保护和私有的成员变量

    class App{
      protected $routes = array();
      protected $responseStatus = '200 OK';
      protected $responseContentType = 'text/html';
      protected $responseBody = 'Hello world';

      public function addRoute($routePath,$routeCallback){
        $this->routes[$routePath] = $routeCallback->bindTo($this,__CLASS__);
      }

      public function dispatch($currentPath){
        foreach($this->routes as $routePath => $callback){
          if($routePath === $currentPath){
            echo $routePath;
            echo $currentPath;
            $callback();
          }
        }

        header('HTTP/1.1:' . $this->responseStatus);
        header('Content-type: ' . $this->responseContentType);
        header('Content-length: ' . mb_strlen($this->responseBody));

        echo $this->responseContentType;
        echo $this->responseBody;
      }
    }

    $app = new App();
    $app->addRoute('/users/josh',function(){
      $this->responseContentType = 'application/json;charset=utf8';
      $this->responseBody = '{"name":"Josh"}';
    });
    $app->dispatch('/users/josh');

看看这个 `addRoute()` 方法，我们把路由回调绑定到了当前的 `App` 实例上，这么在回调函数里面可以处理 `App` 实例的状态

    $this->routes[$routePath] = $routeCallback->bindTo($this,__CLASS__);
