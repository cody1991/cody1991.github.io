---
layout: post
title:  "learn-modern-PHP-book-4-generator"
date:   2017-01-10 16:41:00
category: PHP
---

    // 生成器就是php函数，在函数中一次或多次使用yield关键字
    // 生成器不返回值，只产出值
    // 调用生成器返回属于Generator类的对象，可以用foreach()函数迭代
    // 没产出一个值，生成器内部状态会停顿，向生成器请求下一个值时，内部状态又会恢复
    // 知道末尾或者空的return;为止
    function myGenerator(){
      yield 'value1';
      yield 'value2';
      yield 'value3';
    }

    foreach(myGenerator() as $yieldedValue){
      echo $yieldedValue;
      echo '<br/>';
    }

    // -----

    function makeRange($length){
      $dateset = [];
      for($i=0;$i<$length;$i++){
        $dateset[] = $i;
      }
      return $dateset;
    }

    // 这里写 100000 什么的就很可怕了
    $customRange = makeRange(10);
    foreach($customRange as $i){
      echo $i;
      echo '<br/>';
    }

    function makeRange2($length){
      for($i=0;$i<$length;$i++){
        yield $i;
      }
    }

    // 第一个没有善用内存， makeRange() 函数预先创建一个由十万个证书组成的数组分配内存，而使用makeRange2()只会为一个整数分配内存

    foreach (makeRange2(1000) as $i) {
      echo $i;
      echo '<br/>';
    }

    // 如果我们想迭代一个4gb的csv(comma separated value，逗号分隔的值)文件，虚拟私有服务器vps(virtual private server)只允许php使用1gb内存，不能整个加载到内存中
    function getRows($file){
      $handle = fopen($file,'rb');
      if($handle===FALSE){
        throw new Exception();
      }
      while(feof($handle)===FALSE){
        yield fgetcsv($handle);
      }
      fclose($handle);
    }

    // 只分配一行的内存
    foreach(getRows('data.csv') as $row){
    print_r($row);
      // Array ( [0] => abc ) Array ( [0] => def ) Array ( [0] => ghi ) Array ( [0] => jkl ) Array ( [0] => mno ) Array ( [0] => pqr ) Array ( [0] => stu ) Array ( [0] => vwx ) Array ( [0] => yz )
    }

最后说下，生成器无法执行前进或者查找功能，最好还是自己实现 `Iterator` 接口 [Iterator（迭代器）接口](http://php.net/manual/zh/class.iterator.php)，或者使用 `PHP` 标准库中某个原生的迭代器 [迭代器](http://php.net/manual/zh/spl.iterators.php)

顺便来学习下迭代器吧

---

Iterator（迭代器）接口 

可在内部迭代自己的外部迭代器或类的接口。

    Iterator extends Traversable {
      /* 方法 */
      abstract public mixed current ( void )
      abstract public scalar key ( void )
      abstract public void next ( void )
      abstract public void rewind ( void )
      abstract public boolean valid ( void )
    }

下面写了一个自定义的迭代器：

    class myIterator implements Iterator{
      private $position = 0;
      private $array = array(
        "firstelement",
        "secondelement",
        "lastelement"
      );

      public function __constructor(){
        $this->position = 0;
      }

      function rewind(){
        var_dump(__METHOD__);
        $this->position=0;
      }

      function current(){
        var_dump(__METHOD__);
        return $this->array[$this->position];
      }

      function key(){
        var_dump(__METHOD__);
        return $this->position;
      }

      function next(){
        var_dump(__METHOD__);
        ++$this->position;
      }

      function valid(){
        var_dump(__METHOD__);
        return isset($this->array[$this->position]);
      }
    }

    $myIt = new myIterator();
    echo "<pre>";
    foreach($myIt as $key=>$value){
      var_dump($key,$value);
      echo '\n';
    }
    echo "</pre>";

浏览器返回的结果：

    string(18) "myIterator::rewind"
    string(17) "myIterator::valid"
    string(19) "myIterator::current"
    string(15) "myIterator::key"
    int(0)
    string(12) "firstelement"
    \nstring(16) "myIterator::next"
    string(17) "myIterator::valid"
    string(19) "myIterator::current"
    string(15) "myIterator::key"
    int(1)
    string(13) "secondelement"
    \nstring(16) "myIterator::next"
    string(17) "myIterator::valid"
    string(19) "myIterator::current"
    string(15) "myIterator::key"
    int(2)
    string(11) "lastelement"
    \nstring(16) "myIterator::next"
    string(17) "myIterator::valid"

下面是说明：

    Iterator::current — 返回当前元素
    Iterator::key — 返回当前元素的键
    Iterator::next — 向前移动到下一个元素
    Iterator::rewind — 返回到迭代器的第一个元素
    Iterator::valid — 检查当前位置是否有效

内置的迭代器碰到再看吧

完。
