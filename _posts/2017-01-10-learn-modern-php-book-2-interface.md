---
layout: post
title:  "learn-modern-PHP-book-2-interface"
date:   2017-01-10 14:05:00
category: PHP
---

接口是两个对象之间的默契，目的不是让一个对象以来另外一个对象的身份，而是依赖另一个对象的能力

接口把我们代码和依赖解耦了，允许我们代码依赖任何实现了预期接口的第三方代码

---

    class DocumentStore{
      protected $data = [];

      public function addDocument(Documentable $document){
        $key = $document->getId();
        $value = $document->getContent();
        $this->data[$key] = $value;
      }

      public function getDocuments(){
        return $this->data;
      }
    }

这个地方我们定义了一个类， `DocumentStore`
里面有私有变量 `$data` 数组
公共函数 `addDocument`，会把我们 `Documentable` 类型？

等等～如果 `Documentable` 是一个类，那它里面要实现的 `getId` 和 `getContent` 函数，而它们里面获取 `ID` 和 `Content` 的方法都要一样～ `黑人问号.png`

所以接下来我们就实现了一个 `PHP` 里面的 `interface ` 接口

    interface Documentable{
      public function getId();
      public function getContent();
    }

先实现一个读取 `html` 文档的类

    class HtmlDocument implements Documentable{
      protected $url;
      public function __construct($url){
        $this->url = $url;
      }
      public function getId(){
        return $this->url;
      }
      public function getContent(){
        $myCh = curl_init();
        curl_setopt($myCh, CURLOPT_URL,$this->url);
        curl_setopt($myCh, CURLOPT_RETURNTRANSFER,1);
        curl_setopt($myCh, CURLOPT_CONNECTTIMEOUT, 3);
        curl_setopt($myCh, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($myCh, CURLOPT_MAXREDIRS, 3);
        $html = curl_exec($myCh);
        curl_close($myCh);
        return $html;
      }
    }

我们看看 `getContent()` 里面的内容，可以查看 [PHP中文手册](http://php.net/manual/zh/function.curl-multi-setopt.php)

`__construct()`

    构造函数

`curl_init()` 

    初始化一个cURL会话

`curl_exec()`

    执行一个cURL会话

`curl_close()`

    关闭一个cURL会话

`curl_setopt`
    
    设置一个cURL传输选项

    ch
    由 curl_init() 返回的 cURL 句柄。

    option
    需要设置的CURLOPT_XXX选项。

    value
    将设置在option选项上的值。

`CURLOPT_URL`

    需要获取的 URL 地址，也可以在curl_init() 初始化会话的时候。

`CURLOPT_RETURNTRANSFER`

    TRUE 将curl_exec()获取的信息以字符串返回，而不是直接输出。

`CURLOPT_CONNECTTIMEOUT`

    在尝试连接时等待的秒数。设置为0，则无限等待。

`CURLOPT_FOLLOWLOCATION`

    TRUE 时将会根据服务器返回 HTTP 头中的 "Location: " 重定向。（注意：这是递归的，"Location: " 发送几次就重定向几次，除非设置了 CURLOPT_MAXREDIRS，限制最大重定向次数。）。

`CURLOPT_MAXREDIRS`

    指定最多的 HTTP 重定向次数，这个选项是和CURLOPT_FOLLOWLOCATION一起使用的。

贴出官网的实例备忘：

    <?php
    // 创建一个新cURL资源
    $ch = curl_init();

    // 设置URL和相应的选项
    curl_setopt($ch, CURLOPT_URL, "http://www.example.com/");
    curl_setopt($ch, CURLOPT_HEADER, false);

    // 抓取URL并把它传递给浏览器
    curl_exec($ch);

    //关闭cURL资源，并且释放系统资源
    curl_close($ch);
    ?>

---

接下来我们实现一个 `StreamDocument` 的类

    class StreamDocument implements Documentable{
      protected $resource;
      protected $buffer;

      public function __construct($resource,$buffer=4096){
        $this->resource = $resource;
        $this->buffer = $buffer;
      }

      public function getId(){
        return 'resource-' . (int)$this->resource;
      }

      public function getContent(){
        $streamContent = '';
        rewind($this->resource);

        while(feof($this->resource)===FALSE){
          $streamContent .= fread($this->resource,$this->buffer);
        }

        return $streamContent;
      }
    }

`rewind`

    rewind — 倒回文件指针的位置
    
    bool rewind ( resource $handle )
    
    将 handle 的文件位置指针设为文件流的开头。
  
    如果将文件以附加（"a" 或者 "a+"）模式打开，写入文件的任何数据总是会被附加在后面，不管文件指针的位置

`feof`

    测试文件指针是否到了文件结束的位置

    bool feof ( resource $handle )

    测试文件指针是否到了文件结束的位。

`fread`

    读取文件（可安全用于二进制文件）

    string fread ( resource $handle , int $length )
    
    fread() 从文件指针 handle 读取最多 length 个字节。 该函数在遇上以下几种情况时停止读取文件：

      读取了 length 个字节
      
      到达了文件末尾（EOF）

---

最后创建了一个 `CommandOutputDocument` 类

    class CommandOutputDocument implements Documentable{
      protected $command;

      public function __construct($command){
        $this->command = $command;
      }
      public function getId(){
        return $this->command;
      }
      public function getContent(){
        return shell_exec($this->command);
      }
    }

`shell_exec`

    通过 shell 环境执行命令，并且将完整的输出以字符串的方式返回。

---

    $documentStore = new DocumentStore();

    $htmlDoc = new HtmlDocument('https://www.baidu.com/');
    $documentStore->addDocument($htmlDoc);

    $streamDoc = new StreamDocument(fopen('composer.json','rb'));
    $documentStore->addDocument($streamDoc);

    $cmdDoc = new CommandOutputDocument('ls');
    $documentStore->addDocument($cmdDoc);

最后我们先创建一个 `DocumentStore` 实例 `$documentStore`

然后就是调用 `addDocument()` 存入我们上面定义的三个 `Documentable`

`fopen`

    fopen — 打开文件或者 URL

    resource fopen ( string $filename , string $mode [, bool $use_include_path = false [, resource $context ]] )
    fopen() 将 filename 指定的名字资源绑定到一个流上。

`mode` 的类型很多：

    'r' 只读方式打开，将文件指针指向文件头。
    'r+'  读写方式打开，将文件指针指向文件头。
    'w' 写入方式打开，将文件指针指向文件头并将文件大小截为零。如果文件不存在则尝试创建之。
    'w+'  读写方式打开，将文件指针指向文件头并将文件大小截为零。如果文件不存在则尝试创建之。
    'a' 写入方式打开，将文件指针指向文件末尾。如果文件不存在则尝试创建之。
    'a+'  读写方式打开，将文件指针指向文件末尾。如果文件不存在则尝试创建之。
    'x' 创建并以写入方式打开，将文件指针指向文件头。如果文件已存在，则 fopen() 调用失败并返回 FALSE，并生成一条 E_WARNING 级别的错误信息。如果文件不存在则尝试创建之。这和给 底层的 open(2) 系统调用指定 O_EXCL|O_CREAT 标记是等价的。
    'x+'  创建并以读写方式打开，其他的行为和 'x' 一样。
    'c' Open the file for writing only. If the file does not exist, it is created. If it exists, it is neither truncated (as opposed to 'w'), nor the call to this function fails (as is the case with 'x'). The file pointer is positioned on the beginning of the file. This may be useful if it's desired to get an advisory lock (see flock()) before attempting to modify the file, as using 'w' could truncate the file before the lock was obtained (if truncation is desired, ftruncate() can be used after the lock is requested).
    'c+'  Open the file for reading and writing; otherwise it has the same behavior as 'c'.

---

最后打印出来，完成学习

    echo '<pre>';
    print_r($documentStore->getDocuments());
    echo '<pre>';
