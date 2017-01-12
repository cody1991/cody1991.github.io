---
layout: post
title:  "learn-modern-PHP-book-3-trait"
date:   2017-01-10 15:50:00
category: PHP
---

# 性状

通俗：`RetialStore` 和 `Car` 两个类的作用十分不同，继承层次结构没有共同的父类，不过都要使用地理编码技术转换成经纬度

性状就是解决这样的问题，把模块化实现方法注入多个无关的类中，促进代码的重用

原来为了解决这个问题我们会创建一个父类 `Geocodable` ，让 `RetialStore` 和 `Car` 都继承这个类。这样不好，强制让两个无关的类继承一个祖先

可以创建一个 `Geocodable` 接口，定义实现地理编码功能需要哪些方法，让它们都实现这个接口。不过两个类中实现相同的地理编码功能，不符合 `DRY` 原理

---

下面讲讲实例

    // 定义 trait
    // trait MyTrait{
    // ...
    // }

    trait Geocodable{
      
      // 地址
      protected $address;
      // willdurand/geocoder组建 http://geocoder-php.org/
      // \Geocoder\Geocoder
      // 地理编码器对象
      protected $geocoder;
      // 地理编码器处理后得到的结果对象
      // \Geocoder\Model\AddressCollection
      protected $geocoderResult;

      // 注入 Geocoder 对象
      public function setGeocoder(Geocoder\Geocoder $geocoder){
        $this->geocoder = $geocoder;
      }

      // 设定地址
      public function setAddress($address){
        $this->address = $address;
      }

      // 下面两个获取经纬度
      public function getLatitude(){
        if(isset($this->geocoderResult)===FALSE){
          $this->getcodeAddress();
        }

        return $this->geocoderResult->first()->getLatitude();
      }

      public function getLongitude(){
        if(isset($this->geocoderResult)===FALSE){
          $this->getcodeAddress();
        }
        return $this->geocoderResult->first()->getLongitude();
      }

      // 地址字符串传给 Geocoder 实例，获取经地理编码器处理得到的结果
      protected function getcodeAddress(){
        $this->geocoderResult = $this->geocoder->geocode($this->address);
        return true;
      }
    }

很长的一窜代码，代码注释都写了， [geocoder](http://geocoder-php.org/) 的用法可以到官网查看。其他用法不用太多解释～

---

然后我们需要使用这个性状

命名空间和性状都使用 use 关键字倒入，导入的位置有所不同。
命名空间／类／接口／函数／和常量在类的定义体外导入，性状在类的定义体内导入

    // 使用 trait
    // class MyClass{
    //   use MyTrait;
    //   ...
    // }

    class RetailStore{
      use Geocodable;
    }

---

最后就是执行我们的代码了

    // 官网实例
    // $curl     = new \Ivory\HttpAdapter\CurlHttpAdapter();
    // $geocoder = new \Geocoder\Provider\GoogleMaps($curl);
    // $geocoder->geocode(...);
    // $geocoder->reverse(...);

    require 'vendor/autoload.php';
    use Ivory\HttpAdapter\CurlHttpAdapter;
    use Geocoder\Provider\GoogleMaps;

    $curl = new CurlHttpAdapter();
    $geocoder = new GoogleMaps($curl);

    $store = new RetailStore();
    $store->setAddress('shenzhen');
    $store->setGeocoder($geocoder);

    $latitue = $store->getLatitude();
    $longitude = $store->getLongitude();
    echo $latitude,':',$longitude;

但是一直返回这样的错误，`timed out`的原因吧，搜了下无果，暂时不管

    Fatal error: Uncaught exception 'Ivory\HttpAdapter\HttpAdapterException' with message 'An error occurred when fetching the URI "http://maps.googleapis.com/maps/api/geocode/json?address=shenzhen" with the adapter "curl" ("name lookup timed out").' in /Applications/XAMPP/xamppfiles/htdocs/PHP/modernPHP-book/ch2/vendor/egeloen/http-adapter/src/HttpAdapterException.php:101 Stack trace: #0 /Applications/XAMPP/xamppfiles/htdocs/PHP/modernPHP-book/ch2/vendor/egeloen/http-adapter/src/CurlHttpAdapter.php(196): Ivory\HttpAdapter\HttpAdapterException::cannotFetchUri('http://maps.goo...', 'curl', 'name lookup tim...') #1 /Applications/XAMPP/xamppfiles/htdocs/PHP/modernPHP-book/ch2/vendor/egeloen/http-adapter/src/CurlHttpAdapter.php(54): Ivory\HttpAdapter\CurlHttpAdapter->createResponse(Resource id #54, false, Object(Ivory\HttpAdapter\Message\InternalRequest)) #2 /Applications/XAMPP/xamppfiles/htdocs/PHP/modernPHP-book/ch2/vendor/egeloen/http-adapter/src/HttpAdapterTrait.php(110): Ivory\HttpAdapter\CurlHttpAdapter->sendInternalRequest in /Applications/XAMPP/xamppfiles/htdocs/PHP/modernPHP-book/ch2/vendor/egeloen/http-adapter/src/HttpAdapterException.php on line 101
