---
layout: post
title:  "learn-modern-php-book-5-closure"
date:   2017-01-10 19:29:00
category: php
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
