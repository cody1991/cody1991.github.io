---
layout: post
title:  "learn-modern-PHP-book-9-component"
date:   2017-01-13 21:43:00
category: PHP
---

# 组件

[guzzlehttp/guzzle](https://packagist.org/packages/guzzlehttp/guzzle)

Guzzle is a PHP HTTP client library

[aura/router](https://packagist.org/packages/aura/router)

Powerful, flexible web routing for PSR-7 requests.

[league/route](https://packagist.org/packages/league/route)

A fast routing and dispatch package built on top of FastRoute.

[aws/aws-sdk-php](https://packagist.org/packages/aws/aws-sdk-php)

AWS SDK for PHP - Use Amazon Web Services in your PHP project

[league/flysystem](https://packagist.org/packages/league/flysystem)

Filesystem abstraction: Many filesystems, one API.

其他开发者用了无数时间创建、优化和测试专用的组件，以便让组件尽量做好一件事，不需要自己去造轮子

---

组件是打包好的代码，帮你解决 `PHP` 应用中某个具体的问题，一系列相关的类、接口和性状，用来解决某个具体的问题。

# 框架

[symfony](https://github.com/symfony/symfony)

star 13000+

[laravel](https://github.com/laravel/laravel)

star 28000+

[yiiframework](http://www.yiiframework.com/)

[drupal](https://www.drupal.org/)

[Zend](https://framework.zend.com/)

[aura](http://auraphp.com/framework/)

no GitHub

---

收集了优秀的 `PHP组件`

[awesome-php](https://github.com/ziadoz/awesome-php)

---

下面是一个简单实用组件的例子

    <?php
      // composer.phar require guzzlehttp/guzzle
      // composer.phar require league/csv

      require 'vendor/autoload.php';

      use GuzzleHttp\Client;
      use League\Csv\Reader;

      $client = new Client();
      // $argv[1] 参数
      // $csv = new Reader($argv[1]);
      $csv = Reader::createFromPath('urls.csv');

      foreach($csv as $csvRow) {
        try {
          $httpResponse = $client->options($csvRow[0]);

          echo "<pre>";
          print_r($httpResponse);
          echo "</pre>";


          if ($httpResponse->getStatusCode() >= 400) {
            throw new \Exception();
          }
        } catch (\Exception $e) {
          echo $csvRow[0] . PHP_EOL;
        }
      }

也创建了一个组件，但是没有上传到网上

    <?php
      namespace Cody\ModernPHP\Url;

      use GuzzleHttp\Client;

      class Scanner {
        protected $urls;

        protected $httpClient;

        public function __construct(array $urls)
        {
          $this->urls = $urls;
          $this->httpClient = new Client();
        }

        public function getInvalidUrls()
        {
          $invalidUrls = [];

          foreach ($this->urls as $url) {
            try {
              $statusCode = $this->getStatusCodeForUrl($url);
            } catch (\Exception $e) {
              $statusCode = 500;
            }

            echo $statusCode;

            if ($statusCode >= 400) {
              array_push($invalidUrls, [
                  'url' => $url,
                  'status' => $statusCode
                ]);
            }
          }

          return $invalidUrls;
        }

        public function getStatusCodeForUrl($url)
        {
          $httpResponse = $this->httpClient->options($url);

          echo "<pre>";
          print_r($httpResponse);
          echo "</pre>";


          return $httpResponse->getStatusCode();
        }
      }
