---
layout: post
title:  "The majesty of vue.js 4-list-rendering"
date:   2016-08-15 15:15:00
category: vue
---

译者注：本章所有的代码可以在 [4-list-rendering](https://github.com/cody1991/awesome-vue/tree/master/the-majesty-of-vue.js-ch/code/4-list-rendering) 查看

# 列表渲染

# List Rendering

在这本书的第三章节，我们准备学习列表渲染。使用Vue的指令我们将会展示怎么去：

In the third chapter of this book, we are going to learn about list rendering. Using Vue’s directives
we are going to demonstrate how to:

* 渲染一个基于数组的项目列表

* Render a list of items based on an array.

* 渲染一个模板

* Repeat a template.

* 遍历一个对象的属性

* Iterate through the properties of an object.

* 过滤一个项目数组

* Filter an array of items.

* 排序一个项目数组

* Order an array of items.

* 给列表一个自定义的过滤器

* Apply a custom filter to a list.

## 安装和使用Bootstrap

## Install & Use Bootstrap

为了让我们更加容易看清我们的页面，我们准备引入Bootstrap

To make our work easier on the eye, we are going to import Bootstrap.

Bootstrap是最出名的一个HTML,CSS,JS框架，让开发者开发响应式和移动优先的网页项目

Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive,
mobile first projects on the web

前往 [http://getbootstrap.com/](http://getbootstrap.com/) 然后点击下载按钮，一开始我们仅仅从[CDN链接](https://www.bootstrapcdn.com/)获取Bootstrap来使用，但是你可以按照适合你的需求来安装它。我们的示例仅需要一个文件，css/bootstrap.min.css。当我们在我们的app里面使用这个css文件，我们能得到所有漂亮的结构和样式。仅需要在head标签头部把它引入然后你就可以很好地使用它了。

Head to [http://getbootstrap.com/](http://getbootstrap.com/) and click the download button. For the time being, we’ll just use
Bootstrap from the [CDN link](https://www.bootstrapcdn.com/) but you can install it any way that suits your particular needs. For
our example we need only one file, for now: css/bootstrap.min.css. When we use this .css file
in our app, we have access to all the pretty structures and styles. Just include it within the head tag
of your page and you are good to go.

Bootstrap需要一个容器来包含网站的内容和网格系统。你可以从下面两种container里面选择一个到你的项目中。请注意，由于存在padding和一些其他的，containers都是不可嵌套的。

Bootstrap requires a containing element to wrap site contents and house our grid system. You may
choose one of two containers to use in your projects. Note that, due to padding and more, neither
container is nestable.

* .container：响应式的固定宽度的容器 `<div class="container"> … </div>`

* Use .container for a responsive fixed width container. `<div class=”container”> … </div>`

* .container-fluid：宽度铺满整个可视范围的容器 `<div class="container-fluid"> … </div>`

* Use .container-fluid for a full width container, spanning the entire width of your viewport.`<div class=”container-fluid”> … </div>`

At this point, we would like to make an example of Vue.js with Bootstrap classes. This is the
introductory example concerning classes and many will follow. Of course, not much study or
experimentation is required in order make use of combined Vue and Bootstrap

    <html>

    <head>
        <title>Hello Vue</title>
        <link rel="stylesheet" href="../../lib/bootstrap.min.css">
    </head>

    <body>
        <div class="container">
            <h1>{{message}}</h1>
            <pre>{{$data|json}}</pre>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: '.container',
            data: {
                message: 'Hello,Vue.js'
            }
        });
        </script>
    </body>

    </html>

上面展示了如何安装Bootstrap，以及简单的配置。

shown here is the installed Bootstrap and the basic set up for our stories example.

注意一下，替换了以前指向id为app的元素，我们这里在Vue实例里面指向的是类为container的元素设置为el选项的值。这样的话，我们获得了这个类上的样式和结构，可以让我们的app写起来更加的令人愉悦

Notice this time, instead of targeting app id, we have targeted the container class within the el
option inside the Vue instance. Going that way, we have gained the styles and structure that comes
along with this class and made our app a bit more delightful

很多时候我们也会使用pre标签来展示我们json格式的数据

Most of the times we are going to use the pre tag in our code to display our data in JSON
format

再上面的例子中，我们指向的是有.containe类的元素。注意了当你的指向的元素使用的是类名来查找并且这个类名的元素超过1个的时候，Vue.js只会在第一个元素上作用

In the above example we target the element with class of .container. Be careful when
you are targeting an element by class, when the class is present more than 1 time, Vue.js
will mount on the first element only.

使用 el: 你可以指向任何DOM元素。尝试下把它指向body标签而它仍然可以很好的运行

Using el: you can target any DOM element on the! Try targeting the body of your HTML
and see how that works!

## v-for

为了可以遍历一个数组里面的所有项目，我们会使用Vue的v-for指令

In order to loop through each item in an array, we will use v-for Vue’s directive.

v-for循环可以作用在数组/对象上，它可以遍历数组里面的所有项目。这个指令需要特殊的语法，一个是源数据的数组，一个是遍历数组时所对应的那个项目

The v-for loop works on arrays/objects and is used to loop through each item in an array. This
directive requires a special syntax in the form of item in array where array is the source data
Array and item is an alias for the Array element being iterated on.

如果你了解php的话你会发现v-for和php的foreach函数相似。但是注意了如果你使用foreach函数是这样的：($array as $value)

If you are coming from the php world you may notice that v-for is similar to php’s foreach
function. But be careful if you are used to foreach($array as $value).

而vue的v-for刚好相反，它是这样的：value in array

Vue’s v-for is exactly the opposite, value in array.

单数先，然后才是复数

The singular first, the plural next.

### range v-for

v-for指令也可以作用在数字上。当传入的不是数组/对象而是一个数字的话，模板会按照给的数字来重复那么多次。

Directive v-for can also take an integer. Whenever a number is passed instead of an array/object,
the template will be repeated as many times as the number given.

    <html>

    <head>
        <title>Hello Vue</title>
        <link rel="stylesheet" href="../../lib/bootstrap.min.css">
    </head>

    <body>
        <div class="container">
            <h1>The multiplication table of 4.</h1>
            <ul class="list-group">
                <li class="list-group-item" v-for="i in 11">
                    {{i}} times 4 equals {{i*4}}
                </li>
            </ul>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: '.container',
            data: {

            }
        });
        </script>
    </body>

    </html>

上面的代码会展示一个4的乘法表

The above code displays the multiplication table of 4.

因为我们想要展示所有的4的乘法表（一直到40），我们重复模板11次，因为i的值是从0开始的

Because we want to display all the multiplication table of 4 (until 40) we repeat the template
11 times since the first value i takes is 0.

## 数组渲染

## Array Rendering

### 循环遍历一个数组

### Loop Through an Array

在下一个例子我们会创建下面的stories数组存放我们的数据对象，并且一个接一个的展示出它们

In the next example we will set up the following array of Stories inside our data object and we will
display them all, one by one.

    stories: [
        "I crashed my car today!",
        "Yesterday, someone stole my bag!",
        "Someone ate my chocolate..."
    ]

我们需要在这里做的就是渲染出一个列表。这里指的就是，数组里面的字符。

What we need to do here, is to render a list. Specifically, an array of strings.

    <html>

    <head>
        <title>Hello Vue</title>
        <link rel="stylesheet" href="../../lib/bootstrap.min.css">
    </head>

    <body>
        <div class="container">
            <h1>Let's hear some stories!</h1>
            <div>
                <ul class="list-group">
                    <li class="list-group-item" v-for="story in stories">
                        Someone said "{{story}}"
                    </li>
                </ul>
            </div>
            <pre>{{$data|json}}</pre>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: '.container',
            data: {
                stories: [
                    "I crashed my car today!",
                    "Yesterday, someone stole my bag!",
                    "Someone ate my chocolate..."
                ]
            }
        });
        </script>
    </body>

    </html>

.list-group和.list-group-item类都是bootstrap的类。[你可以在这里找到更多bootstrap的列表样式](http://getbootstrap.com/css/#type-lists)

Both list-group and list-group-item classes are Bootstrap classes. [Here you can find more information about Bootstrap list styling](http://getbootstrap.com/css/#type-lists).

使用v-for我们可以用简单的乱序列表来展示我们的stories，非常简单。

Using v-for we have managed to display our stories in a simple unordered list. It is really that easy!

### 循环遍历一个对象数组

### Loop Through an Array of Objects

现在我们把我们的Stories数组改成包含story对象。一个story对象有两个属性：plot和writer。我们会做和之前一样的事情，但是这次不会直接输出story，我们会来输出story.plot和story.writer。

Now, we change the Stories array to contain story objects. A story object has 2 properties: plot and
writer. We will do the same thing we did before but this time instead of echoing story immediately,
we will echo story.plot and story.writer respectively.

    <html>

    <head>
        <title>Hello Vue</title>
        <link rel="stylesheet" href="../../lib/bootstrap.min.css">
    </head>

    <body>
        <div class="container">
            <h1>Let's hear some stories!</h1>
            <div>
                <ul class="list-group">
                    <li class="list-group-item" v-for="story in stories">
                        {{story.writer}} said "{{story.plot}}"
                    </li>
                </ul>
            </div>
            <pre>{{$data|json}}</pre>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: '.container',
            data: {
                stories: [{
                    plot: "I crashed my car today!",
                    writer: 'Alex'
                }, {
                    plot: "Yesterday,someone stole my bag!",
                    writer: 'John'
                }, {
                    plot: "Someone ate my chocolate...",
                    writer: 'John'
                }]
            }
        });
        </script>
    </body>

    </html>

补充一下，当你需要展示现在项目的索引的时候，你可以使用$index这个特殊的变量。下面是一个展示它怎么工作的示例。

Additionally, when you need to display the index of the current item, you can use $index special
variable. Following is an example to show how it works.

    <ul class="list-group">
        <li class="list-group-item" v-for="story in stories">
            {{$index}}. {{story.writer}} said "{{story.plot}}"
        </li>
    </ul>

在花括号里面的$index，清楚地表明了迭代项目的索引。

The $index inside the curly braces, clearly represents the index of the iterated item in the given
example.

另外一种获得迭代项目索引的方法是去定义一个数组索引的别名，如下所示

Another way to access the index of the iterated item, is to specify an alias for the index of the array
as shown below.

    <ul class="list-group">
        <li class="list-group-item" v-for="(index,story) in stories">
            {{index}}. {{story.writer}} said "{{story.plot}}"
        </li>
    </ul>

输出的结果和上面一个例子的结果一模一样。

The output of the last code is exactly the same with the previous one

## Object v-for

你可以使用v-for来遍历一个对象的属性。我们在前面提到了如果展示数组的索引，你在迭代一个对象的时候也可以这样做。不过的是，每一个作用域读取的是另外一个特殊的属性：$key

You can use v-for to iterate through the properties of an Object. We mentioned before that you can
bring to display the index of the array, but you can also do the same when iterating an object. In
addition to $index, each scope will have access to another special property, the $key.

当遍历一个对象的时候，$index的范围是0到n-1，n的值是对象属性的数量

When iterating an object, $index is in range of 0 … n-1 where n is the number of object
properties

我们重构了我们的数据，它是一个纯粹的对象，有三个属性：plot,writer和点赞数。你可以在下面的代码看到，我们使用$key和$index来列出了键-值对，以及每个对的$index

We have restructured our data to be a single object with 3 attributes this time: plot, writer and
upvotes. As you can see in the example code above, we use $key and $index to bring inside the list
the key-value pairs, as well as the $index of each pair.

    <ul class="list-group">
        <li class="list-group-item" v-for=" value in story">
            {{$index}} : {{$key}} : {{value}}
        </li>
    </ul>

    new Vue({
        el: '.container',
        data: {
            story: {
                plot: 'Someone ate my chocolate...',
                writer: 'John',
                upvotes: 47
            }
        }
    });

你也可以给key指定别名

Alternatively, you can also specify an alias for the key

    <ul class="list-group">
        <li class="list-group-item" v-for="(key,value) in story">
            {{$index}} : {{key}} : {{value}}
        </li>
    </ul>

两种情况出来的结果是一样的

Either way the result will be

## 过滤结果

## Filtered Results

有时候我们需要展示一个数组过滤后的版本，但是又不去改变或者重置原来的数据。在我们接下来的例子里面我们想展示Alex写的故事列表和一个John写的故事列表，我们可以通过内置的过滤器-filterBy来实现

Sometimes we need to display a filtered version of an array without actually mutating or resetting
the original data. In our example we want to display a list with the stories written by Alex and one
list with the stories written by John. We can achieve this using the built-in filter, filterBy.

    <html>

    <head>
        <title>Hello Vue</title>
        <link rel="stylesheet" href="../../lib/bootstrap.min.css">
    </head>

    <body>
        <div class="container">
            <h1>Let's hear some stories!</h1>
            <div>
                <h3>Alex's stories</h3>
                <ul class="list-group">
                    <li class="list-group-item" v-for="(index,story) in stories | filterBy 'Alex' in 'writer'">
                        {{index}}. {{story.writer}} said "{{story.plot}}"
                    </li>
                </ul>
            </div>
            <div>
                <h3>John's stories</h3>
                <ul class="list-group">
                    <li class="list-group-item" v-for="(index,story) in stories | filterBy 'John' in 'writer'">
                        {{index}}. {{story.writer}} said "{{story.plot}}"
                    </li>
                </ul>
            </div>
            <pre>{{$data|json}}</pre>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: '.container',
            data: {
                stories: [{
                    plot: "I crashed my car today!",
                    writer: 'Alex'
                }, {
                    plot: "Yesterday,someone stole my bag!",
                    writer: 'John'
                }, {
                    plot: "Someone ate my chocolate...",
                    writer: 'John'
                }]
            }
        });
        </script>
    </body>

    </html>

非常简单，对吧？我们接下来会实现一个很简单（但是很棒）的搜索功能。但用户输入了一部分的故事内容，我们可以实时地猜这个故事是哪个以及谁写的。我们会绑定一个空的query变量，动态的过滤我们的Stories数组

Simple enough, right? Next we will implement a very basic (but awesome) search. When the user
types a part of a story, we can guess which story it is and who wrote it, in real time. We’ll add a text
input binded to an empty variable query so we can dynamically filter our Stories array

    <div class="form-group">
        <label for="query">What are you looking for?</label>
        <input type="text" v-model="query" class="form-control">
    </div>
    <h3>Search results:</h3>
    <ul class="list-group">
        <li class="list-group-item" v-for="(index,story) in stories | filterBy query in 'plot'">
            {{index}}. {{story.writer}} said "{{story.plot}}"
        </li>
    </ul>

    new Vue({
        el: '.container',
        data: {
            query: '',
            stories: [{
                plot: "I crashed my car today!",
                writer: 'Alex'
            }, {
                plot: "Yesterday,someone stole my bag!",
                writer: 'John'
            }, {
                plot: "Someone ate my chocolate...",
                writer: 'John'
            }]
        }
    });

是不是非常棒？？

Isn’t that awesome??

## 排序结果

## Ordered Results

有时候我们希望我们展示的数组项目可以按照一些标准排序。幸运的是有内置的排序方法在任何时候来排序我们的列表。首先我们会给我们的Stories数组增加一个新的属性叫做upvotes，接下来我们会按照每个故事的upvotes来排序我们的数组。越出名的故事，应该排名越高。

Sometimes we may want to display the items of an Array ordered by some criteria. Luckily there
is an orderBy built in filter to sort our list in no time! First we will enhance our Stories with a new
property called upvotes. Then we’ll go on and display our array ordered by the count of each story’s
upvotes. The more famous a story is, the higher it should appear.

    <html>

    <head>
        <title>Hello Vue</title>
        <link rel="stylesheet" href="../../lib/bootstrap.min.css">
    </head>

    <body>
        <div class="container">
            <h1>Let's hear some stories!</h1>
            <div>
                <ul class="list-group">
                    <li class="list-group-item" v-for="(index,story) in stories | orderBy 'upvotes'">
                        {{index}}. {{story.writer}} said "{{story.plot}}" and upvoted {{story.upvotes}} times.
                    </li>
                </ul>
            </div>
            <pre>{{$data|json}}</pre>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: '.container',
            data: {
                stories: [{
                    plot: "I crashed my car today!",
                    writer: 'Alex',
                    upvotes: 28
                }, {
                    plot: "Yesterday,someone stole my bag!",
                    writer: 'John',
                    upvotes: 8
                }, {
                    plot: "Someone ate my chocolate...",
                    writer: 'John',
                    upvotes: 61
                }]
            }
        });
        </script>
    </body>

    </html>

数组已经排序了但是不是我们想要的结果。我们希望出名的故事排在前面。幸运的是，orderBy过滤器接受两个参数：排序数组的键值，以及结果的排序应该是顺序(order >= 0)还是倒叙的(order < 0)。

Hmmm, the array is ordered but this is not what we expected. We wanted the famous stories first.
Luckily, again, orderBy filter accepts two arguments: the key to sort the array, and the order which
specifies whether the result should be ordered in ascending (order >= 0) or descending (order <
0) order

最后，为了让这里的数组按照倒序来排序，我们的代码看起来是下面这样的：

Eventually, for the sake of ordering the array in descending order, our code will look like this:

    <ul class="list-group">
        <li class="list-group-item" v-for="(index,story) in stories | orderBy 'upvotes' -1">
            {{index}}. {{story.writer}} said "{{story.plot}}" and upvoted {{story.upvotes}} times.
        </li>
    </ul>

我们可以很容易的改变排序数组的order，通过动态地改变order参数。增加了一个按钮，会在-1和1之间切换一个新的变量的值，然后这个变量会被传递给orderBy过滤器作为order参数。

We can easily change the order we sort the array, by dynamically changing the order parameter. A
button is added, which will toggle the value of a new variable between -1 and 1, and then the new
variable is passed as order parameter to orderBy filter. Watch now.

    new Vue({
        el: '.container',
        data: {
            order: -1,
            stories: [{
                plot: "I crashed my car today!",
                writer: 'Alex',
                upvotes: 28
            }, {
                plot: "Yesterday,someone stole my bag!",
                writer: 'John',
                upvotes: 8
            }, {
                plot: "Someone ate my chocolate...",
                writer: 'John',
                upvotes: 61
            }]
        }
    });

我们初始化order变量为-1然后传递到orderBy过滤器

We initialize order variable with the value of -1 and then we pass it to orderBy filter.

    <ul class="list-group">
        <li class="list-group-item" v-for="(index,story) in stories | orderBy 'upvotes' order">
            {{index}}. {{story.writer}} said "{{story.plot}}" and upvoted {{story.upvotes}} times.
        </li>
    </ul>
    <button @click="order=order*-1">Reverse Order</button>

印象深刻没？如果你还没有留下深刻印象的话，还会有谁可以呢？“我们已经做到了！”

Impressing huh? If you are not impressed by now, guess who is! ..“We are!”..

## 自定义过滤器

## Custom Filter

这是本章最麻烦的部分。假设我们只想展示出名的故事(那些点赞数超过20的)。为了做到这点，我们必须创建一个自定义过滤器来使用。我们准备创建一个叫做带有两个参数的famous过滤器，这两个参数是：

This is the most cumbersome part of this chapter. Assume we want to display only the famous stories
(the ones with upvotes greater than 20). In order to achieve that we have to create a custom filter and
apply it to filterBy. We are going to create a filter named famous which expects two parameters:

* 我们希望过滤的数组array

* the array we want to filter

* bound参数，定义了一个故事的点赞数必须拥有的数目是多少才可以认定为famous

* and the bound which defines the amount of upvotes a story must have in order to be
considered as famous

famous过滤器会返回一个数组，包含了那些满足条件的对象

The famous filter returns an array which contains only the objects that satisfy a condition.

如果你跟不上这个例子，不要担心，你迟早会懂得，一直保持阅读下去就对了。。。

If you can’t keep up with this example don’t worry, you will get it sooner or later, just keep reading..

    <html>

    <head>
        <title>Hello Vue</title>
        <link rel="stylesheet" href="../../lib/bootstrap.min.css">
    </head>

    <body>
        <div class="container">
            <h1>Let's hear some stories!</h1>
            <div>
                <ul class="list-group">
                    <li class="list-group-item" v-for="(index,story) in stories | famous">
                        {{index}}. {{story.writer}} said "{{story.plot}}" and vpvoted {{story.upvotes}} times.
                    </li>
                </ul>
            </div>
            <pre>{{$data|json}}</pre>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        Vue.filter('famous', function(stories) {
            return stories.filter(function(item) {
                return item.upvotes > 20;
            });
        });
        new Vue({
            el: '.container',
            data: {
                stories: [{
                    plot: "I crashed my car today!",
                    writer: 'Alex',
                    upvotes: 28
                }, {
                    plot: "Yesterday,someone stole my bag!",
                    writer: 'John',
                    upvotes: 8
                }, {
                    plot: "Someone ate my chocolate...",
                    writer: 'John',
                    upvotes: 58
                }]
            }
        });
        </script>
    </body>

    </html>

我们的famous过滤器使用了[javascript过滤方法](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).filter()方法创建了一个新的数组，这个数组里面包含了通过了给出的方法的测试的项。

Our famous filter uses [javascript’s filter method](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/filter). The filter() method creates a new
array with all elements that pass the test implemented by the provided function.

译者注：后面重写了famous过滤器方法，可以自己传入bound值：

    <html>

    <head>
        <title>Hello Vue</title>
        <link rel="stylesheet" href="../../lib/bootstrap.min.css">
    </head>

    <body>
        <div class="container">
            <h1>Let's hear some stories!</h1>
            <div>
                <ul class="list-group">
                    <li class="list-group-item" v-for="(index,story) in stories | famous 30">
                        {{index}}. {{story.writer}} said "{{story.plot}}" and vpvoted {{story.upvotes}} times.
                    </li>
                </ul>
            </div>
            <pre>{{$data|json}}</pre>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        Vue.filter('famous', function(stories, bound) {
            return stories.filter(function(item) {
                return item.upvotes > bound;
            });
        });
        new Vue({
            el: '.container',
            data: {
                stories: [{
                    plot: "I crashed my car today!",
                    writer: 'Alex',
                    upvotes: 28
                }, {
                    plot: "Yesterday,someone stole my bag!",
                    writer: 'John',
                    upvotes: 8
                }, {
                    plot: "Someone ate my chocolate...",
                    writer: 'John',
                    upvotes: 58
                }]
            }
        });
        </script>
    </body>

    </html>

## 作业

## Homework

这个章节的练习你需要做下面的工作：创建一个people数组，每一个人都有name和age，使用你学过的东西，尝试去按照age排序来渲染数组列表。之后，创建第二个列表，创建一个自定义过滤器old，会返回那些old超过55岁的人。

For this chapter’s exercise you should do the following. Start by creating an array of people. Each
person has a name and an age. Using what you’ve learned so far, try to render the array in a list and
sort it by “age”. After that, create a second list below and apply a custom filter called “old” which
returns all people older than 55 years old.

可以随便的填充你自己的数组数据。记得people的age要有大于和小于55岁的人来保证过滤器的工作正常。去吧~。

Feel free to fill the array with your own data. Be careful to add people with age older and younger
than 55 to ensure your filter is working properly. Go ahead!

译者注：本章所有的代码可以在 [4-list-rendering](https://github.com/cody1991/awesome-vue/tree/master/the-majesty-of-vue.js-ch/code/4-list-rendering) 查看
