---
layout: post
title:  "learn-modern-PHP-book-10-good-practices"
date:   2017-01-15 18:59:00
category: PHP
---

这篇有点长。。

# 过滤输入 验证数据 转义输出

`htmlentities()` 函数过滤 `HTML`，把特殊字符 `&`,`>`,`&#x2003` 等等转义成对应的 `HTML` 实体。

但是默认不转义单引号，检测不出输入字符串的字符集

正确使用它的方式：第一个参数是输入字符窜，第二个参事设置为 `ENT_QUOTES` 常量，第三个设为输入字符串的字符集

    echo htmlentities('<p><script>alert("You won the game");<script></p>',ENT_QUOTES,'UTF-8');

---

用户资料信息，可能需要处理电子邮件、电话和邮政编码等，`PHP` 提供了 `filter_var()` 和 `filter_input()` 函数，能使用不同的标志，过滤不同类型的输入：电子邮箱地址、 `URL` 编码字符串、证书、浮点数、 `HTML` 字符、 `URL` 和特定范围内的 `ASCII` 字符

    // 过滤电子邮件
    $email = 'ñ476490767@qq.com';
    $emailSafe = filter_var($email,FILTER_SANITIZE_EMAIL);
    echo $emailSafe;

    // 过滤用户资料中的外国字符
    $string = "\nIñtërnâtiônàlizætiøn\t";
    $safeString = filter_var(
      $string,
      FILTER_SANITIZE_STRING,
      FILTER_FLAG_STRIP_LOW|FILTER_FLAG_ENCODE_HIGH
    );

--- 

验证数据

    $isEmail = filter_var($email, FILTER_VALIDATE_EMAIL);

    if($isEmail !== false) {
      echo 'Success';
    } else {
      echo 'Fail';
    }

验证成功，返回值是验证的值，如果失败，返回的是 `false`

---

验证功能的组件

[aura/filter](https://packagist.org/packages/aura/filter)

Filters to validate and sanitize objects and arrays.

[respect/validation](https://packagist.org/packages/respect/validation)

The most awesome validation engine ever created for PHP

[symfony/validator](https://packagist.org/packages/symfony/validator)

Symfony Validator Component

`PHP` 模板引擎，比如

[twig/twig](https://packagist.org/packages/twig/twig)

Twig, the flexible, fast, and secure template language for PHP

[smarty/smarty](https://packagist.org/packages/smarty/smarty)

Smarty - the compiling PHP template engine

自动转移输出，以 `Twig` 为例，默认转义所有的输出，为 `PHP Web` 应用提供了有力的安全保障

---

哈希和加密不同，加密是双向的，可以解密，哈希是单向的，不能还原，但是相同的数据有相同的哈希值

哈希有很多种，比如 `MD5` `SHA1` `bcrypt` `scrypt`，有些算法很快，用于验证数据完整性，有些很慢，为了安全性

目前最安全的是 `bcrypt`，和 `MD5` `SHA1` 不同，它故意设计的很慢。会自动加盐，防止潜在的彩虹表攻击，话费大量时间反复处理数据，生成很安全的哈希表。这个过程处理的次数叫做工作因子，值越高，不怀好意的人破解时间也数倍增长。

下面继续注册用户和登录用户的联系

注册：

    <?php
    try {
      // 验证电子邮件地址
      $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);

      if(!$email){
        throw new Exception('Invalid email');
      }

      // 验证密码
      $password = filter_input(INPUT_POST,'password');

      if(!$password || mb_strlen($password) < 8) {
        throw new Exception('Password must contain 8+ characters');
      }

      // 第一个参数纯文本密码
      // 第二个 PASSWORD_DEFAULT 告诉  PHP 使用 bcrypt 哈希算法
      // 数组，指定哈希选项，
      $passwordHash = password_hash(
        $password,
        PASSWORD_DEFAULT,
        ['cost' => 12]
      );

      echo $passwordHash;
      // $2y$12$qxzRNS8tGfnfA6Xw/VqShOYnsFWd8Aqoe2CggEsDi1L9KMtpqOzT2$2y$12$qxzRNS8tGfnfA6Xw/VqShOYnsFWd8Aqoe2CggEsDi1L9KMtpqOzT2

      if($passwordHash === false) {
        throw new Exception('Password hash failed');
      }

      print_r($passwordHash);

      // 虚构代码
      // $user = new User();
      // $user->email = $email;
      // $user->password_hash = $passwordHash;
      // $user->save();

      // 重定向
      header('HTTP/1.1 302 Redirect');
      header('Location: ./login-form.php');

    } catch (Exception $e) {
      header('HTTP/1.1 400 Bad request');
      echo $e->getMessage();
    }

登陆：

    <?php
    session_start();

    try {
      // 请求体中获取电子邮件地址
      $email = filter_input(INPUT_POST,'email');

      // 请求体中获取密码
      $password = filter_input(INPUT_POST,'password');

      // 虚构
      // $user = User::findByEmail($email);

      // 比较 http 请求主题提交的纯文本密码和记录用户存储的密码哈希值，如果验证失败，抛出异常
      // if(password_verify($password,$user->password_hash) === false) {
      //   throw new Exception('Invalid password');
      // }

      // 复制过来是错误，不明
      // if(password_verify($password,'$2y$12$qxzRNS8tGfnfA6Xw/VqShOYnsFWd8Aqoe2CggEsDi1L9KMtpqOzT2$2y$12$qxzRNS8tGfnfA6Xw/VqShOYnsFWd8Aqoe2CggEsDi1L9KMtpqOzT2') === false) {
      //   throw new Exception('Invalid password');
      // }

      // $currentHashAlgorithm = PASSWORD_DEFAULT;
      // $currentHashOptions = array('cost'=>15);
      // 确定用户密码哈希是否符合最新的密码算法选项，如果过时了，使用心得选项计算
      // $passwordNeedsRehash = password_needs_rehash(
      //   $user->password_hash,
      //   $currentHashAlgorithm,
      //   $currentHashOptions
      // );

      // if($passwordNeedsRehash === true) {
      //   $user->password_hash = password_hash(
      //     $password,
      //     $currentHashAlgorithm,
      //     $currentHashOptions
      //   );
      // }

      // $user->save();

      $_SESSION['user_logged_in'] = 'yes';
      $_SESSION['user_email'] = $email;

      header('HTTP/1.1 302 Redirect');
      header('Location: ./profile.php');

    } catch (Exception $e){
      header('HTTP/1.1 401 Unauthorized');
      echo $e->getMessage();
    }

# 日期、时间和时区

`PHP 5.2.0` 引入了 `DateTime` `DateInterval` `DateTimeZone`，简单的面向对象接口，准确创建和处理日期、时间和时区

## 设置默认时区

不设置的话会有一个 `E_WARNING` 消息，可以在 `php.ini` 中修改

    date.timezone = 'America/New_York';

也可以使用

    `date_default_timezone_set()`

设置

    `date_default_timezone_set('Asia/Shanghai')`

当然在 `php.ini` 里面修改，一劳永逸

下面是 `DateTime` 类使用的一些情况

    // 没有参数，表示当前时间的实例
    $datetime = new DateTime();

    $datetime2 = new DateTime('2014-04-27 5:03 AM');

    // 有了 DateTime::createFromFormat() 静态方法，我们可以使用自定义的格式创建 DateTime 实例
    // 这里不需要 new
    $datetime3 = DateTime::createFromFormat('M j, Y H:i:s', 'Jan 2, 2014 23:04:12');

而 `DateInterval` 表示长度固定的时间段，或者相对的时间段。

`DateTime` 提供了用于处理实例的 `add()` 和 `sub()` 方法，这两个方法的参数都是一个 `DateInterval` 实例，指定要添加或者减去到 `DateTime` 实例中的时间量。

实例化 `DateInterval` 使用构造方法，构造方法参数是一个字符串，表示间隔规约：以字母 `P` 开头，后面跟着一个整数，最后是一个周期标志符，限定前面的整数

    Y 年

    M 月

    D 日

    W 周

    H 时

    M 分

    S 秒

允许同时有日期和时间，如果有时间，日期和时间两部分之间要加上字母 `T` ，比如 `P2D` 表示两天，`P2DT5H2M` 表示两天五小时两分钟。接着上面的实例代码：

    $interval = new DateInterval('P2W');

    $datetime->add($interval);
    echo $datetime->format('Y-m-d H:i:s');

    $interval2 = DateInterval::createFromDateString('-1 day');
    $datePeriod = new DatePeriod($datetime,$interval2,3);
    echo "<pre>";
    foreach($datePeriod as $date){
      echo $date->format('Y-m-d'),PHP_EOL;
    }
    echo "</pre>";

最后如果需要经常处理时间的话，可以用 [Carbon](https://github.com/briannesbitt/Carbon)

# 数据库

PHP应用可以在很多数据库中持久保存信息，比如 `MySQL` `PostgreSQL` `SQLite` 和 `Oracle` ，提供了 `PHP` 和数据库之间通信的扩展。比如 `MySQL` 使用 `mysqli` 扩展，添加了很多的 `mysqli_*()` 函数， `SQLite` 使用的是 `SQLite3` 扩展，像 `PHP` 语言添加了 `SQLite3` `SQLite3Stmt` 和 `SQLite3Result` 类，如果在项目中使用多种数据库，需要安装学习多种 `PHP` 数据库扩展和接口

`PHP` 原生提供了 `PDO` 扩展 `PHP Data Objects` ，抽象不同数据库之间具体的实现，只通过一个用户界面就可以和多种不同的 `SQL` 数据库通信

`PDO` 类构造方法有一个字符串参数，用于指定 `DSN` `Data Source Name` 数据源名称，提供数据库连接的详细信息， `DSN` 开头是数据库驱动器的名称，比如 `mysql` `sqlite` ，后面跟着 `:` ，最后是剩下的内容。不同数据库使用的 `DSN` 链接字符串不同，不过一般包含下面的信息：

    主机名或者 `IP` 地址

    端口号

    数据库名

    字符集

`PDO` 类构造方法的第二个和第三个参数分别是数据库的用户名和密码。如果数据库需要认证，提供这两个参数

    try {
      $pdo = new PDO(
          'mysql:host=127.0.0.1;dbname=phplearn;port=3306;charset=utf8',
          'cody1991',
          'cody1991'
        );
      echo 'Datebase connection success';
    } catch (PDOException $e) {
      echo 'Database connection failed';
      exit;
    }

提供的第一个参数是 `DSN` ，以 `mysql` 开头，会使用 `pdo` 扩展中的 `mysql` 驱动器连接 `MySQL` 数据库， `:` 富豪之后我们使用分毫分隔键值对，设置 `host` `dbname` `port` `charset`

绝对不能在 `PHP` 中硬编码数据库凭证，不能再公开访问的 `PHP` 中这样做，由于数据缺陷和服务器配置出错，让 `HTTP` 客户端可以看到原始的 `PHP` 代码，那么数据库久暴露了。应该把数据库凭据保存在一个位于文档根目录之外的配置文件中，然后在需要使用的时候把 `PHP` 文件中导入

现在分开了两个文件， `settings.php` 不是公开的

    settings.php

    <?php
    $settings = [
      'host' => '127.0.0.1',
      'port' => '3306',
      'name' => 'phplearn',
      'username' => 'cody1991',
      'password' => 'cody1991',
      'charset' => 'utf8'
    ];

---
    index.php

    <pre>
    <?php 
      include ('./settings.php');
      try {
        $pdo = new PDO(
            sprintf(
                'mysql:host=%s;dbname=%s;port=%s;charset=%s',
                $settings['host'],
                $settings['name'],
                $settings['port'],
                $settings['charset']
              ),
            $settings['username'],
            $settings['password']
          );
        echo 'Datebase connection success';
      } catch (PDOException $e) {
        echo 'Database connection failed';
        print_r($e);
        exit;
      }
    ?>
    </pre>

## 预处理语句

我们现在建立了一条数据库的 `PDO` 连接，我们可以使用 `SQL` 语句从数据库中读取数据，写入数据

我们经常需要从当前 `HTTP` 请求中获取的动态信息定制 `SQL` 语句，比如使用 `/user?email=john@example.com` 这个 `URL` 显示具体用户账号的信息，这个 `URL` 使用的 `SQL` 语句可能是

    SELECT id FROM users WHERE email = 'john@example.com';

初级开发者可能像下面这样：

    $sql = sprintf(
      'SELECT id FROM users WHERE email = "john@example.com"',
      filter_input(INPUT_GET,'email');
    );

这样不好，使用了原始输入数据，等于为黑客打开了大门，用户输入的时候一定要过滤， `PDO` 扩展通过预处理语句和参数绑定把过滤输入这项工作变得很简单

预处理语句是 `PDOStatement` 实例，不过我们很少实例化它，通过 `PDO` 实例的 `prepare()` 方法获取预处理语言对象。这个方法的第一个参数是一个 `SQL` 语句字符串，返回的值是一个 `PDOStatement` 实例。

    $sql = 'SELECT id FROM users WHERE email = :email';
    $statement = $pdo->prepare($sql);

这里 `:email` 是具名占位符，可以安全绑定任何值。我们在 `$statement` 实例上调用 `bindValue()` 方法，把 `HTTP` 请求查询字符的值绑定在 `:email` 占位符上

    $sql = 'SELECT id FROM users WHERE email = :email';
    $statement = $pdo->prepare($sql);

    $email = filter_input(INPUT_GET, 'email');
    $statement->bindValue(':email', $email);

预处理语言自动过滤 `$email` 的值，防止数据库受到 `SQL` 注入攻击。一个 `SQL` 语句可以有多个具名占位符，然后在预处理语句上调用 `bindValue()` 方法绑定各个占位符的值

如果想用数值 `ID` 查找用户怎么办？我们必须像预处理语句的 `bindValue()` 方法传入第三个参数，指定占位符要绑定的数据是什么类型 。如果不传入第三个参数，预处理语言假定要绑定的数据是字符串

    $sql = 'SELECT id FROM users WHERE id = :id';
    $statement = $pdo->prepare($sql);

    $userId = filter_input(INPUT_GET, 'id');
    $statement->bindValue(':id', $userId, PDO::PARAM_INT);

指定 `PDO` 常量的有：

    PDO::PARAM_BOOL

    PDO::PARAM_NULL

    PDO::PARAM_INI

    PDO::PARAM_STR 默认

## 查询结果

有了预处理语言可以进行查询了。预处理语言调用 `execute()` 方法后会使用绑定的所有数据执行 `SQL` 参数，如果执行的是 `INSERT` `UPDATE` `DELETE` ，调用 `execute()` 后工作就结束了，如果是 `SELECT` 语句，我们可能希望数据库返回匹配的记录。我们可以调用预处理语句的 `fetch()` `fetchAll()` `fetchColumn()` `fetchObject()` 获取查询结果

`PDOStatement` 实例的 `fetch()` 方法用于获取集合中的下一行。我们使用这个方法迭代大型结果集合，如果可用内存放不下整个结果集合，特别适合这个方法

    $statement->execute();

    while(($result=$statement->fetch(PDO::FETCH_ASSOC))!==false){
      // print_r($result);
      echo $result['name'];
    }

这个实例，预处理语言实例上调用 `fetch()` 方法，我把这个方法第一个参数设为 `PDO::FETCH_ASSOC` 常量，这个参数决定 `fetch()` 和 `fetchAll()` 方法如何返回查询结果。可以使用的有：

    PDO::FETCH_ASSOC

    让 `fetch()` 和 `fetchAll()` 返回一个关联数组，数组的健是数据库的列名

    PDO::FETCH_NUM

    让 `fetch()` 和 `fetchAll()` 返回一个键为数字的数组，数组的健是数据库列在查询结果中的索引

    PDO::FETCH_BOTH

    让 `fetch()` 和 `fetchAll()` 返回一个既有键为列名，又有键为数字的数组，结合上面两个

    PDO::FETCH_OBJ

    让 `fetch()` 和 `fetchAll()` 返回一个对象，数组的属性是数据库的列名

如果只关系查询结果中的一列，可以使用预处理语言的 `fetchColumn()` ，这个方法和 `fetch()` 类似，返回的结果中下一行的某一列，只有一个参数，用于指定所需列的索引

    while(($result=$statement->fetchColumn(0))!==false){
      print_r($result);
    }

`fetchColumn()` 方法的参数是 1 ，列的索引从 0 开始

还可以使用 `fetchObject()` 方法，把行当作对象

    while(($result=$statement->fetchObject())!==false){
      print_r($result);
    }

## 事务

`PDO` 扩展还支持事务，事务指一系列数据库语言当作单个逻辑单元（具有原子性）。一系列的 `SQL` 查询要么都成功执行，要么都不执行。事务的原子性能保证数据的一致性、安全性和持久性。事务还有个很好的副作用，提升性能，因为事务把多个查询排成队列，一次全部执行

想执行的 `SQL` 语句 放在 `PDO` 实例的 `beginTransaction()` 方法和 `commit()` 之间。`beginTransaction()` 方法的作用是 `PDO` 把后续的 `SQL` 查询语句排入队列，而不是立即执行， `commit()` 方法作用是执行原子事务队列中的查询。有一个查询失败了，所有查询都无效。

    $stmtSubtract= $pdo->prepare('
      UPDATE accounts
      SET amount = amount - :amount
      WHERE name = :name
    ');
    $stmtAdd = $pdo->prepare('
      UPDATE accounts
      SET amount = amount + :amount
      WHERE name = :name
    ');

    $pdo->beginTransaction();

    $fromAccount = 'cody';
    $withdrawal = 50;
    $stmtSubtract->bindParam(":name",$fromAccount);
    $stmtSubtract->bindParam(":amount",$withdrawal,PDO::PARAM_INT);
    $stmtSubtract->execute();

    $toAccount = 'bob';
    $deposit = 50;
    $stmtAdd->bindParam(":name",$toAccount);
    $stmtAdd->bindParam(":amount",$deposit,PDO::PARAM_INT);
    $stmtAdd->execute();

    $pdo->commit();

在一个数据库事务中处理取钱和存钱的操作，保证两个操作都成功获都失败，保持了数据库的一致性

# 多字节字符串

`PHP` 假设字符串中每个字符都是八位字符，占一个字节的内存。但是很多时候会遇到多字节字符。

可以安装 `mbstring` 扩展 , [mbstring](http://php.net/manual/zh/book.mbstring.php) ，比如 `mb_strlen()` 代替了 `strlen()`

处理多字节字符串时，记住：

    一定要知道数据的字符编码

    使用utf-8字符编码存储数据

    使用utf-8字符编码输出数据

`mbstring()` 扩展不仅可以处理 `unicode` 字符串，还能在不同的字符编码之间转换多字节字符串。使用 `mb_detect_encoding()` 和 `mb_convert_encoding()` 函数把 `unicode` 字符串从一个字符编码转换成另一种字符编码

处理多字节字符，一定告诉 `PHP` 使用 `UTF_8` 字符编码，在 `php.ini` 中设置最简单

    default_charset = 'UTF-8';

很多 `PHP` 函数都会使用这个默认的字符集，比如 `htmlentities()` `html_entity_decode()` `htmlspecialchars()` 以及 `mbstring()` 扩展提供的函数。

补充：

    Convert special characters to HTML entities

    $new = htmlspecialchars("<a href='test'>Test</a>", ENT_QUOTES);
    echo $new; // &lt;a href=&#039;test&#039;&gt;Test&lt;/a&gt;

    Convert all applicable characters to HTML entities

    $str = "A 'quote' is <b>bold</b>";

    // Outputs: A 'quote' is &lt;b&gt;bold&lt;/b&gt;
    echo htmlentities($str);

    // Outputs: A &#039;quote&#039; is &lt;b&gt;bold&lt;/b&gt;
    echo htmlentities($str, ENT_QUOTES);

    Convert all HTML entities to their applicable characters

    $orig = "I'll \"walk\" the <b>dog</b> now";

    $a = htmlentities($orig);

    $b = html_entity_decode($a);

    echo $a; // I'll &quot;walk&quot; the &lt;b&gt;dog&lt;/b&gt; now

    echo $b; // I'll "walk" the <b>dog</b> now

如果没有像下面指定 `header()` 函数，`PHP` 返回的相应中 `Content-Type` 首部默认也使用这个值

    header('Content-Type: application/json;charset=utf-8');

但是建议 `html` 文档还是加入

    <meta charset="UTF-8"/>

# 流

在 `4.3.0` 引入，作用是使用统一的方式处理文件、网络和数据压缩等共用一套函数和用法的操作。简而言之，流逝具有流式行为的资源对象。流可以线性度鞋，或许还能使用 `fseek()` 函数定位到流中任何位置

流的作用是在出发地和目的地之间传输数据。出发地和目的地可以是文件、命令行进程、网络连接、`ZIP`或`TAR`压缩文件、临时内存、标准输入或输出，或者是 `PHP` 流封装协议实现的任何其他资源

如果写过文件，就使用过流，如果从 `php://stdin` 读取过数据，或者数据写入过`php://stdout`，就使用过流。 `PHP` 很多的 `IO` 数据提供了底层实现，例如 `file_get_contents()` `fopen()` `fgets()` `fwrite()`。`PHP` 的流函数提供了处理不同资源的统一接口。

## 流封装协议

流式数据很多，每个类型要独特的协议，以便读写数据。我们称它们为 [流封装协议](http://php.net/manual/zh/wrappers.php)。例如我们可以读写文件系统，可以通过 `HTTP` `HTTPS` `SSH` 和远程 `Web` 服务器通信，可以打开读写 `ZIP` `RAR` `PHAR` 压缩文件。它们有下面相同的过程

    开始通信

    读取数据

    写入数据

    结束通信

过程一样，但是读写文件系统的方式和收发 `http` 消息的方式不同，流封装协议的作用是使用普通的接口封装这些差异

每个流油一个协议和一个目标，指定协议的目标的方法是使用流标志符，格式如下：

    <scheme>://<target>

`<scheme>` 是流的封装协议，`<target>` 是流的数据源。下面使用 `http` 流封装协议创建一个和 其他网站 通信的 `PHP` 流 

    $json = file_get_contents(
      'http://m.maizuo.com/v4/api/billboard/home?t=1484468549423&callback=?'
    );

`file_get_contents()` 的字符串参数是一个流标志符，`http` 协议让 `PHP` 使用 `HTTP` 流封装协议。`http` 之后是流的目的

## file://流协议封装

我们使用 `file_get_contents()` `fopen()` `fwirte()` `fclose()` 函数读写文件系统。`PHP` 默认流封装协是 `file://`。下面我们读写 `/etc/hosts` 文件

    // 隐式
    $handle = fopen('/etc/hosts', 'rb');
    while (feof($handle) !== true) {
      echo fgets($handle);
    }
    fclose($handle);

    // 显式
    $handle = fopen('file:///etc/hosts', 'rb');
    while (feof($handle) !== true) {
      echo fgets($handle);
    }
    fclose($handle);

## php:// 流封装协议

这个流封装协议的作用是和 `PHP` 脚本的标准输入、标准输出和标准错误文件描述通信。我们可以使用 `PHP` 提供的文件系统函数打开、读取和写入下面四个流

php://stdin

    只读 PHP 流，其中的数据来自标准输入，比如脚本可以使用这个流接受命令行传入脚本的信息

php://stdout

    这个 PHP 流的作用把数据写入当前的输出缓冲区，这个流只能写，不能读或寻址

php://memory

    这个 PHP 流的作用是从系统内存中读取数据，或者把数据写入系统内存。缺点是内存有限，使用 php://temp 更加安全

php://temp

    和 php://memory 类似，不过没有可用内存的时候会把数据写入临时文件

## 其他封装协议

PHP 文件系统函数能在所有支持这些函数的流封装协议中使用。我们可以用 `fopen` `fgets` `fputs` `feof` `fclose` 处理 `ZIP` 压缩文件，和亚马逊服务，甚至处理 `Dropbox` 中的文件

## 流上下文

有些流可以接受一系列可选的参数，叫做流上下文，定制流的行为，使用 `stream_context_create()` 函数创建

`file_get_contents()` 函数可以发送 `HTTP POST` 请求

    $requestBody = '{"username":"cody"}';
    $context = stream_context_create(array(
      'http' => array(
        'method' => 'POST',
        'header' => "Content-Type: application/json;charset=utf-8;\r\n" .
                    "Content-Length: " . mb_strlen($requestBody),
        'content' => $requestBody
      )
    ));
    $response = file_get_contents('https://my-api.com/users', false , $context)

流上下文是个关联数组，最外层键是流封装协议的名称，流上下文数组中的值是针对每个具体的流封装协议

## 流过滤器

真正强大的地方在于过滤、转换、添加和删除流中传输的数据，比如我们打开一个流处理 `Markdown` 文件，把文件内容读入内存的过程中自动转换成 `HTML` 文件

有几个内置的过滤器 

    string.rot13

    string.toupper

    string.tolower

    string.strip_tags

想把过滤器附加在现在的流殇，使用 `stream_filter_append()` 函数。下面例子使用了 `string.toupper` 过滤器，把内容转成大写字母

    $handle = fopen('data.txt','rb');
    stream_filter_append($handle, 'string.toupper');
    while(feof($handle)!==true){
      echo fgets($handle);
    }
    fclose($handle);

还可以使用 `php://filter` 流封装协议把过滤器附在流殇，使用之前必须打开 `PHP流`

    $handle = fopen('php://filter/read=string.toupper/resource=data.txt','rb');
    while(feof($handle)!==true){
      echo fgets($handle);
    }
    fclose($handle);

格式：

    filter/read=<filter_name>/resource=<scheme>://<target>

和 `stream_filter_append()` 比较繁琐很多。不过某些文件系统函数调用后无法附加过滤器，比如 `file()` 和 `fpassthru()` 这个时候只能使用 `php://filter` 流协议封装附加流过滤器了

讲一个实例。 某个网站会吧 `nginx` 访问日志保存在 `rsync.net` ，我们把一天的访问情况保存在一个日志文件中，使用 `bzip2` 压缩每个日志文件，格式是 `YYYY-MM-DD.log.bz2` 。让我们提取过去30天某个域名访问的数据。

我们需要计算日期范围，确定日志文件的名称，通过 `FTP` 连接 `rsync.net`，下载文件，解压缩文件，逐行迭代文件，把相应的行提取，把访问数据写入一个输出目标。

    // 创建一个持续30天的 DatePeriod 实例，一天一天反向向前推移
    $dateStart = new DateTime();
    $dateInterval = DateInterval::createFromDateString('-1 day');
    $datePeriod = new DatePeriod($dateStart,$dateInterval,30);

    foreach($datePeriod as $date){
      // print_r($date);
      // 创建日志文件的文件名
      $file = 'sftp://USER:PASS@rsync.net/' . $date->format('Y-m-d') . '.log.bz2';
      echo $file . '<br/>';

      if(file_exists($file)){
        // 使用 SFTP 流打开谓语 rsync.net 上的日志文件流资源
        $handle = fopen($file,'rb');
        // bzip2.decompress 流过滤器附加到日志文件流资源上，实时解压缩bzip2格式的日志文件
        stream_filter_append($handle,'bzip2.decompress');
        while(feof($handle) !== true) {
          // 迭代文件
          $line = fgets($handle);
          // 如果日志访问是指定的域名，把这一行写入标准输出
          if(strpos($line,'www.example.com') !== false) {
            fwrite(STDOUT,$line);
          }
        }
        fclose($handle);
      } else {
        echo 'file not exists';
      }
    }

除了 `bzip2.decompress` 我们还可以用 `shell_exec()` 或者 `bzdecompress()` 函数，手动把日志文件解压到临时目录，然后迭代压缩后的文件。不过 `PHP` 流更简单和优雅

## 自定义过滤器

是一个 `PHP` 类，扩展内置的 `php_user_filter` 类。必须实现 `filter()` `onCreate()` 和 `onClose()` ，必须使用 `stream_filter_register()` 函数注册自定义过滤器

    class DirtyWordsFilter extends php_user_filter
    {
      // @param resource $in 流来的桶队列
      // @param resource $out 流走的桶队列
      // @oaram int #consumed 处理的字节数
      // @param bool $closing 是流中最后一个桶队列吗

      // 接收，处理再装运桶中的流数据。我们迭代桶中队列 $in ，把脏字替换成审查后的值。
      // 最后返回的 PSFS_PASS_ON 常量，表示操作成功
      // bin 上游流来一个队列，有一个或者多个桶，桶中是出发地流来的数据
      // bout 由一个桶或者多个桶组成的队列，流向下游的流目的地
      // &$consumed 自定义的过滤器处理的流数据总字节数
      public function filter($bin, $bout, &$consumed) {
        $words = array('grime', 'dirt', 'grease');
        $wordData = array();
        foreach ($words as $word) {
          // array_fill(start_index, num, value)
          $replacement = array_fill(0, mb_strlen($word), '*');
          // implode — 将一个一维数组的值转化为字符串
          // implode(glue, pieces)
          $wordData[$word] = implode('', $replacement);

          // print_r($replacement);
        }
        print_r($wordData);
        $bad = array_keys($wordData);
        print_r($bad);
        $good = array_values($wordData);
        print_r($good);

        // stream_bucket_make_writeable(brigade)
        while ($bucket = stream_bucket_make_writeable($bin)) {
          // 审查桶中的脏字
          // str_replace(search, replace, subject)
          $bucket->data = str_replace($bad, $good, $bucket->data);

          // 增加已处理的桶数量
          $consumed += $bucket->datalen;

          // 把桶放入流向下游的队列中
          // stream_bucket_append(brigade, bucket)
          stream_bucket_append($bout, $bucket);
        }

        return PSFS_PASS_ON;
      }
    }

    // 注册这个自定义的过滤器
    stream_filter_register('dirty_words_filter', 'DirtyWordsFilter');
    $handle = fopen('data.txt','rb');
    stream_filter_append($handle, 'dirty_words_filter');
    while(feof($handle) !== true) {
      echo fgets($handle);
    }
    fclose($handle);

# 异常

`Exception` 对象和其他任何的 `PHP` 对象一样，使用 `new` 关键字实例化。有两个主要的属性，一个是消息，一个是数字代码。消息用于描述出现的问题，数字代码是可选的，用于指定异常提供的上下文。

实例化 `Exception` 对象可以像下面这样设定消息和可选的数字代码

    $exception = new Exception('Danger, Will Robinson!',100);

    echo $code = $exception->getCode();
    echo '<br/>';
    echo $message = $exception->getMessage();

抛出异常

    throw new Exception('Something went wrong.');

一般捕获异常，而不是展示丑陋的异常栈

    try {
      throw new Exception('Something went wrong.');    
    } catch (Exception $e) {
      echo $code = $e->getCode();
      echo '<br/>';
      echo $message = $e->getMessage();
    }

另外 `catch` 可以很多个，比如还能捕获 `PDOException`。

最后一个 `finally` 一定会执行。

我们可以写一个异常处理的函数，在开发环境中显示调试信息，而生产环境显示用户友好的信息。它要接受一个 `Exception` 参数

    set_exception_handler(function(Exception $e){
      // 处理异常
    })

某些情况，我们要自定义异常处理程序替换现在的，代码执行后，建议还原异常处理程序： `restore_exception_handler()`

# 错误

`PHP` 能出发不同类型的错误，比如致命错误，运行时错误，编译时错误，启动错误和用户触发的错误。

`PHP` 脚本由于某种原因根本无法运行，会触发错误，也可以用 `trigger_error()` 函数自己触发错误，然后使用自定义的错误处理程序处理。

不过编写运行在用户空间的代码最好是用异常，异常可以在 `PHP` 应用的任何层级抛出和捕获，提供的上下文信息比 `PHP` 错误多。我们也可以扩展最顶层的 `Exception` 类，创建自定义的异常子类，加上一个好的日子记录器，比如 `Mongolog` ，比错误能解决更多的问题。

告诉 `PHP` 错误哪些要报告，哪些忽略，用 `E_*` 常量确定报告和忽略错误`

开发环境下，显示全部错误，生产环境，记录但不现实，遵守下面规则：

    一定要让 php 报告错误

    开发环境中显示错误

    生产环境不能显示错误

    开发环境和生产环境都要记录错误

`php.ini`  在开发环境的设置：

    ;显示错误
    display_startup_errors = On
    display_errors = On
    
    ;报告所有错误
    error_reporting = -1

    ;记录错误
    log_errors = On

`php.ini`  在生产环境的设置：

    ;不显示错误
    display_startup_errors = Off
    display_errors = Off
    
    ;除了注意事项外，报告所有其他错误
    error_reporting = E_ALL & ~E_NOTICE

    ;记录错误
    log_errors = On

## 错误处理程序

要在错误处理程序中调用 `die()` 或者 `exit()` 函数。如果错误处理程序中不手动终止脚本，会从错误地方向下执行。

    set_error_handler(function($errno,$errstr,$errfile,$errline){
    
    })

    $errno 错误等级，相当于 E_* 常量

    $errstr 错误信息

    $errfile 错误文件

    $errline 错误行号

    $errcontext 一个数组，指向错误发生可用的符号表。可选的，高级调试菜才要

`PHP` 会把所有错误交给错误处理程序处理，设置包括错误报告设置中排出的错误。我们要检查每个错误代码（第一个参数），然后适当处理。我们可以通过它的第一个参数，让错误处理程序只处理一部分的错误类型。这个参数的值是使用 `E_*` 常量组合的位掩码，比如 `E_ALL | E_STRICT`

转成异常处理

    set_error_handler(function($errno,$errstr,$errfile,$errline){
      if (!(error_reporting() & $errno)) {
        return;
      }
      throw new \ErrorException($errstr,$errno,0,$errfile,$errline);
    });

最后还原的错误处理程序是

    restore_error_handle();

开发环境下，默认的错误信息很难看，我们可以使用 [Whoops](https://packagist.org/packages/filp/whoops) 。

    require 'vendor/autoload.php';

    $whoops = new \Whoops\Run;

    $whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);

    $whoops->register();
    // 如果发生错误和捕获异常，就能看到它的诊断页面

    $a = 1;

    echo $a;

生产环境下，  `PHP` 提供了 `error_log` 函数，可以写入文件系统或者 `syslog` ，还可以通过电子邮箱发送。不过我们可以选择 [Monolog](https://packagist.org/packages/monolog/monolog)

    require('vendor/autoload.php');

    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $log = new Logger('cody');
    $log->pushHandler(new StreamHandler('cody.log',Logger::WARNING));

    $log->warning('haha');

它的扩展性很好，我们让每个处理程序只处理一个日志登记。

我们可以在添加一个 处理程序，把重要的提醒或者突发的错误通过电子邮件发给管理员。我们需要 [swiftmailer](https://packagist.org/packages/swiftmailer/swiftmailer)

修改后变成：

    require('settings.php');
    require('vendor/autoload.php');

    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;
    use Monolog\Handler\SwiftMailerHandler;

    $log = new Logger('cody');
    $log->pushHandler(new StreamHandler('cody.log',Logger::WARNING));

    // $log->warning('haha');

    // 添加 swiftMailer 处理程序，来处理重要的错误

    $transport = \Swift_SmtpTransport::newInstance('smtp.qq.com',465,'ssl')
        ->setUsername('476490767@qq.com')
        ->setPassword($settings['shouquanma']);

    $mailer = \Swift_Mailer::newInstance($transport);
    $message = \Swift_Message::newInstance()
        ->setSubject('Website error!')
        ->setFrom(array('476490767@qq.com'=>'Cody'))
        ->setTo(array('476490767@qq.com'));
    $log->pushHandler(new SwiftMailerHandler($mailer,$message,Logger::CRITICAL));

    $log->critical('The server is on fire!');

现在，如果有突然或者重要的错误，会发送邮件

[swift mailer注册时提示如下。用的qq邮箱，smtp服务已开启。Failed to authenticate on SMTP server with username "164045007@qq.com" using 1 possible authenticators](http://www.imooc.com/qadetail/157005)

但是发现没有开 

    ;extension=php_openssl.dll

也可以了

也可以参考官方的文档 [swiftmailer - Sending Messages](http://swiftmailer.org/docs/sending.html)
