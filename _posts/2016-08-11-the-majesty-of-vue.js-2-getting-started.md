---
layout: post
title:  "The majesty of vue.js 2-getting-started.js"
date:   2016-08-11 15:41:00
category: vue
---

# 开始

# Getting Started

我们从一个vue的数据绑定特性开始。我们将准备写一个简单的应用，允许我们输入一些信息，并且把它实时地展示在页面。这将证明vue强大的双向数据绑定。为了创建我们的vue应用，我们需要去做一些准备工作，涉及到了创建一个html页面。

Let’s start with a quick tour of Vue’s data binding features. We’re going to make a simple application
that will allow us to enter a message and have it displayed on the page in real time. It’s going to
demonstrate the power of Vue’s two-way data binding. In order to create our Vue application, we
need to do a little bit of setting up, which just involves creating an HTML page.

在这过程中，你会有这样的想法：使用比如vue.js这样的框架来代替一些javascript工具(库)，比如jQuery，节省了大量的时间和努力。

In the process you will get the idea of the amount of time and effort we save using a javascript
Framework like Vue.js instead of a javascript tool (library) like jQuery.

## Hello World

## Hello World

我们将会创建一个新的文件并且放一些模板代码进去。你可以按照你的喜爱给它起任何的名字，这里的这个叫做 hello.html

We will create a new file and we will drop some boilerplate code in. You can name it anything you
like, this one is called hello.html.

    <html>

    <head>
        <title>Hello Vue</title>
    </head>

    <body>
        <h1>Greetings your Majesty!</h1>
    </body>

    </html>

这是一个简单的HTML文件，里面有一些打招呼的信息

This is a simple HTML file with a greeting message.

我们接下来会使用vue.js做和上面一样的工作。我们首先需要引入vue.js和创建一个实例

Now we will carry on and do the same job using Vue.js. First of all we will include Vue.js and create
a new Instance.

    <html>

    <head>
        <title>Hello Vue</title>
    </head>

    <body>
        <div id="app">
            <h1>Greetings your Majesty!</h1>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: '#app'
        });
        </script>
    </body>

    </html>

我们首先引入了vue.js并且在一个script标签里面创建了我们的Vue实例。实例里面我们指向了一个id为#app的div元素，Vue知道去哪里查找，我们可以把它看做Vue工作的一个容器，Vue不能识别上任何在这个目标元素以外的东西。使用el这个选项去指向我们想要作用的元素上。

For starters, we have included Vue.js <del>from cdnjs</del> and inside a script tag we have our Vue instance.
We use a div with an id of #app which is the element we refer to, so Vue knows where to ‘look’.
Try to think of this as a container that Vue works at. Vue won’t recognize anything outside of the
targeted element. Use the el option to target the element you want.

接下来我们会命名一个对象叫做data，里面分配了一个我们想展示的变量message。接下来我们会把对象data作为一个选项传递到Vue的构造器上。

Now we will assign the message we want to display to a variable inside an object named data. Then
we’ll pass the data object as an option to Vue constructor.

    var data = {
        message: 'Greetings your majesty!'
    }
    new Vue({
        el: '#app',
        data: data
    });

把我们的message展示在页面上，我们仅仅需要把message变量包含在双括号中。所以无论我们的message里面有什么，它都会自动出现在h1标签里面

To display our message on the page, we just need to wrap the message in double curly brackets . So
whatever is inside our message it will appear automatically in the h1 tag.

    <div id="app">
        <!-- <h1>Greetings your Majesty!</h1> -->
        <h1>{{message}}</h1>
    </div>

就是这么简单。另外一个方法定义message变量是直接把它放在Vue构造器的data选项上

It is as simple as that. Another way to define the message variable is to do it directly inside Vue
constructor in data object.

    new Vue({
        el: '#app',
        data: {
            message: 'Greetings your majesty!'
        }
    });

两种方法都会有一样的结果，你可以选择任何一个你喜欢的语法去书写。

Both ways have the exact same result, so you are again free to pick whatever syntax you like

双括号不是HTML代码，它是脚本代码，任何包含在标签内的东西被叫做绑定表达式。javascript会计算那些表达式。 {{message}} 计算出了一个javascript变量的值，代码块{{1+2}}会展示数字3

The double curly brackets are not HTML but scripting code, anything inside mustache tags
are called binding expressions. Javascript will evaluate these expressions. The {{ message
}} brings up the value of the Javascript variable. This piece of code {{1+2}} will display
the number 3.

## 双向绑定

## Two-way Binding

vue非常酷，让我们更加轻松。如果我们想通过用户输入来修改message的值，会是多么简单的去完成？在下面的例子，我们使用了v-model，它是Vue的一个指令，(我们在下面的章节里面会覆盖更多的指令)。接下来我们使用双向数据绑定去动态地改变message的值当用户修改input标签里面的message的文本的时候。默认的，数据在任何的input事件上都是同步的。

What is cool about Vue is that it makes our lives easier. Say we want to change the message on
user input, how this can be easily accomplished? In the example below we use v-model, a directive
of Vue, (we will cover more on directives in the next chapter). Then we use two-way data binding
to dynamically change the message value when the user changes the message text inside an input.
Data is synced on every input event by default.

    <div id="app">
        <h1>{{message}}</h1>
        <input type="text" v-model="message">
    </div>

    new Vue({
        el: '#app',
        data: {
            message: 'Greetings your majesty!'
        }
    });

就这样。现在我们头部的message和用户输入的数据绑定在一起了。通过在input标签里面使用v-model我们告诉Vue哪一个变量应该和这个input绑定在一起，在这个例子里面，便指的是message了

That’s it. Now our heading message and user input are binded! By using v-model inside the input
tag we tell Vue which variable should bind with that input, in this case message .

双向数据绑定代码的就是如果你在你的界面(view)改变了一个模型(model)的值，所有的东西会保持更新。

Two-way data binding means that if you change the value of a model in your view, everything will
be kept up to date

## 和jQuery对比

## Comparison with jQuery

假设你们都有jQuery的基本经验。如果你没有，那也没关系，在这本书里面jQuery的使用都是最基本的。我们使用它的时候，只是为了说明很多事情我们都能使用Vue来做好，替换掉jQuery

Probably all of you have a basic experience with jQuery. If you don’t, it’s okay, the use of jQuery
in this book is minimal. When we use it, its only to demonstrate how things can be done with Vue
instead of jQuery and we will make sure everybody gets it.

无论怎么样，为了更好的指导数据绑定是如何帮助我们去构建app的，花点时间想想前面提到的例子我们如何使用jQuery去完成。你可能会创建一个input元素然后给它一个id或者class以此来找到它和修改它。这之后，你会声明一个函数，然后让目标元素的值能在input的所有keyup事件发生时，和input的值匹配上。这真的很麻烦。

Anyway, in order to better understand how data-binding is helping us to build apps, take a moment
and think how you could do the previous example using jQuery. You would probably create an input
element and give it an id or a class so you could target it and modify it accordingly. After this,
you would call a function that changes the desired element to match the input value, whenever the
keyup event happens. It’s a real bother.

你的代码看起来会是下面这样的

More or less, your snippet of code would look like this.

    <html>

    <head>
        <title>Hello Vue</title>
    </head>

    <body>
        <div id="app">
            <h1>Greetings your Majesty!</h1>
            <input type="text" id="message">
        </div>
        <script src="../../lib/jquery-2.1.4.min.js"></script>
        <script>
        $('#message').on('keyup', function() {
            var message = $('#message').val();
            $('h1').text(message);
        })
        </script>
    </body>

    </html>

这是一个简单的例子，通过对比你也可以看到，Vue显得更加优美，花费更少的时间，更加容易去把握。当然，jQuery是一个非常强大的javascript库：操作文档对象模型(DOM)，但是每个库都有它们各自的长短。

This is a simple example of comparison and as you can see, Vue appears to be much more beautiful,
less time consuming, and easier to grasp. Of course, jQuery is a powerful JavaScript library for
Document Object Model (DOM) manipulation but everything comes with its ups and downs!

2.4 作业

2.4 Homework

一个非常好而且简单的入门练习：创建一个html文件，头部展示 Hello,{{name}}。加入一个input元素并且把它和name变量绑定在一起。你可以想象到，头部的信息在用户输入和改变名字的时候也需要得到变更。祝你好运。

A nice and super simple introductory exercise is to create an HTML file with a Hello, {{name}}
heading. Add an input and bind it to name variable. As you can imagine, the heading must change
instantly whenever the user types or changes his name. Good luck and have fun!

    <html>

    <head>
        <title>Hello Vue</title>
    </head>

    <body>
        <div id="app">
            <h1>Hello, {{name}}</h1>
            <!-- 把input和变量name绑定起来 -->
            <!-- binded input to 'name' -->
            <input type="text" v-model="name" placeholder="Name">
            <!-- 展示Vue实例的所有data数据，并且添加了一个JSON过滤器 -->
            <!-- displays all data within Vue instance filtered through JSON -->
            <pre>{{$data | json}}</pre>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: '#app',
            data: {
                // 绑定空的变量到input元素上
                //empty variable each binded to input
                name: ''
            }
        });
        </script>
    </body>

    </html>

译者注：本章所有的代码可以在 [1-getting-started](https://github.com/cody1991/awesome-vue/tree/master/the-majesty-of-vue.js-ch/code/1-getting-started) 查看
