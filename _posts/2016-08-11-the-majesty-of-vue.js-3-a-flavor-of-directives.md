---
layout: post
title:  "The majesty of vue.js 3-a-flavor-of-directives"
date:   2016-08-12 15:21:00
category: vue
---

译者注：本章所有的代码可以在 [3-a-flavor-of-directives](https://github.com/cody1991/awesome-vue/tree/master/the-majesty-of-vue.js-ch/code/3-a-flavor-of-directives) 查看

# 指令的简单介绍

# A Flavor of Directives

在这张里面，我们开始接触一些简单的Vue指令示例。如果你之前没有使用过像Vue.js或者AngularJS这样的框架，你可能不知道指令是什么。本质上来说，指令就是一些特殊的标记告诉库做对一个DOM元素做一些事情。在Vue.js里面，指令的概念比Angular简单太多了，有如下一些指令：

In this chapter we are going through some basic examples of Vue’s directives. Well, if you have not
used any Framework like Vue.js or AngularJS before, you probably don’t know what a directive is.
Essentially, a directive is some special token in the markup that tells the library to do something to
a DOM element. In Vue.js, the concept of directive is drastically simpler than that in Angular. Some
of the directives are:

* v-show 选择性的显示一个元素

* v-show which is used to conditionally display an element

* v-if 可以替代v-show的使用(译者注：它们有本质上的区别，文章后面应该会说到)

* v-if which can be used instead of v-show

* v-else 当v-if或者v-show表达式执行为false的时候，会把这个元素显示出来

* v-else which displays an element when v-if or v-show evaluates to false.

也有v-for这样的指令，它需要特殊的语法来书写，作用是用来渲染一些东西（比如，基于数组渲染出一个列表）。在后面我们会详细的说明每个指令的用法。

Also, there is v-for, which requires a special syntax and its use is for rendering (e.g. render a list of
items based on an array). We will elaborate about the use of each later in this book.

让我们开始看看我们提到的那些指令

Let us begin and take a look at the directives we mentioned.

## v-show

我们会去写一些简单的案例来展示第一条指令的用法。我们也会给你一些提示让你更好更简单的明白它和使用它。假设你需要根据一些准则去切换一个元素的显示与否。可能是知道你输入了一些信息才会显示一个提交按钮的情景，我们怎么用Vue来完成呢？

To demonstrate the first directive we are going to build something simple. We will give you some
tips that will make your understanding and work much easier! Suppose you find yourself in need to
toggle the display of an element, based upon some set of criteria. Maybe a submit button shouldn’t
display unless you’ve first typed in a message. How might we accomplish that with Vue?

    <html>

    <head>
        <title>Hello Vue</title>
    </head>

    <body>
        <div id="app">
            <textarea></textarea>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: '#app',
            data: {
                message: 'Our king is dead!'
            }
        });
        </script>
    </body>

    </html>

上面的HTML文件可以看到我们熟知的id为app的div和一个textarea。在textarea里面我们将会展示我们的message变量。当然，你可能已经发现了它们还没有绑定在一起。你可能也发现了在这里我们没有继续使用压缩版本的vue.js。正如我们前面提到的一样，我们在开发的时候不适用压缩的版本，因为你可能错过一些常见错误的警告。从这里开始我们会使用这个版本，当然你也可以根据你的喜好去选择。

Here we have an HTML file with our known div id="app" and a textarea. Inside the textarea
we are going to display our message. Of course, it is not yet binded and by this point maybe you
have already figured it out. Also you may have noticed that in this example we are no longer using
the minified version of Vue.js. As we have mentioned before, the minified version shouldn’t be used
during development because you will miss out warnings for common mistakes. From now on we
are going to use this version in the book but of course you are free to do as you like.

    <html>

    <head>
        <title>Hello Vue</title>
    </head>

    <body>
        <div id="app">
            <textarea v-model="message"></textarea>
            <pre>
    {{$data | json}}
            </pre>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: '#app',
            data: {
                message: 'Our king is dead!'
            }
        });
        </script>
    </body>

    </html>

在这里我们通过v-model把textarea的值和message变量绑定在了一起来显示我们的message的值。每当我们输入东西的时候都会实时地改变message的值，正如前面章节我们使用input的时候。补充一下，在这里我们使用了一个pre标签来展示data的数据，{{$data|json}}的工作是把数据从Vue实例中取出来，通过json方式过滤，然后最终显示在了我们的浏览器上。我们相信，把所有的东西都展示在我们面前，是一个更好的构建和操作数据的方式，也不是一直通过控制台来查看。

It is time to bind the value of textarea with our message variable using v-model so it displays our
message. Anything we type in is going to change in real time just as we saw in the example from
the previous chapter where we were using an input. Additionally here we are using a pre tag to spit
out the data. What this is going to do, is to take the data from our Vue instance, filter it through
json, and finally display the data in our browser. We believe, that this gives a much better way to build and manipulate our data since having everything right in front of you is better than looking
constantly at your console.

JSON(javascript Object Notation) 是一个轻量级的数据交换格式，你可以在[这里](http://www.json.org/)找到更多关于JSON的信息.{{$data|json}}的输出和Vue的data选项绑定在一起，任何变化都会让它更新。

JSON (JavaScript Object Notation) is a lightweight data-interchange format. You can find
more info on JSON [here](http://www.json.org/). The output of {{$data | json}} is binded with Vue data and
will get updated on every change.

    <html>

    <head>
        <title>Hello Vue</title>
    </head>

    <body>
        <div id="app">
            <h1>You must send a message for help!</h1>
            <textarea v-model="message"></textarea>
            <button v-show="message">Send word to allies for help!</button>
            <pre>
    {{$data | json}}
            </pre>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: '#app',
            data: {
                message: 'Our king is dead! Send help!'
            }
        });
        </script>
    </body>

    </html>

我们现在只有一个简单的警告在h1标签里面，后面我们会根据一些标准来处理它的显示与否。在它下面有一个按钮，它会选择性的显示，它只有当message的值存在的时候显示。如果textarea为空，我们的数据，也就是button绑定的属性，也会同步的被设置为none而隐藏掉。

Carrying on, we now have a simple warning in the h1 tag that will toggle later based on some
criteria. Next to it,there is the button which is going to display conditionally, it appears only if there
is a message present. If the textarea is empty and therefore our data, the button’s display attribute
is automatically set to ‘none’ and the button disappears.

带有v-show指令的元素还是会被渲染并且存在于DOM里面。v-show只是简单的切换元素的CSS display属性

An element with v-show will always be rendered and remain in the DOM. v-show simply
toggles the display CSS property of the element.

    <h1 v-show="!message">You must send a message for help!</h1>
    <textarea v-model="message"></textarea>
    <button v-show="message">Send word to allies for help!</button>

在这个例子里面我们想完成的是切换不同的元素的显示。在这一步里面，如果message的值存在的话我们希望隐藏显示警告的h1标签，把它的样式设置为display:none;

What we want to accomplish in this example, is to toggle different elements. In this step, we need
to hide the warning inside the h1 tag, if a message is present, otherwise hide the message by setting
its style to **display: none.

## v-if

在这里也许你想问，我们上面提到的v-if是怎样的，接下来我们会重用上面的例子，但是这里我们会替换成使用v-if

In this point you might ask ‘What about the v-if directive we mentioned earlier?’, so we will build
the previous example again, only this time we’ll use v-if!

    <html>

    <head>
        <title>Hello Vue</title>
    </head>

    <body>
        <div id="app">
            <h1 v-if="!message">You must send a message for help!</h1>
            <textarea v-model="message"></textarea>
            <button v-show="message">Send word to allies for help!</button>
            <pre>
    {{$data | json}}
            </pre>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: '#app',
            data: {
                message: 'Our king is dead! Send help!'
            }
        });
        </script>
    </body>

    </html>

正如上面所示，把v-show替换成v-if以后和我们想象的一样工作的很顺利。自己去尝试实践一下看看是怎么实践的。它们两个的区别是使用v-if的元素不在存在于DOM里面了。

As shown, the replacement of v-show with v-if works just as good as we thought. Go ahead and
try to make your own experiments to see how this works! The only difference is that an element
with v-if will not remain in the DOM

### Template v-if

有时候我们会发现我们希望一次性切换多个元素的显示，这个时候我们可以在`<template>`元素上使用v-if指令。在这里用div或者span看起来好像也没有问题，但是`<template>`元素可以被对待为不可见的包装器。`<template>`也不会被渲染在最终的结果里面。

If sometime we find ourselves in a position where we want to toggle the existence of multiple
elements at once then we can use v-if on a `<template>` element. In occasions where the use of
div or span seems appropriate, the `<template>` element can serve also as an invisible wrapper. Also
the `<template>` won ‘t be rendered in the final result.

    <div id="app">
        <!-- <h1 v-if="!message">You must send a message for help!</h1> -->
        <template v-if="!message">
            <h1>You must send a message for help!</h1>
            <p>Dispatch a messenger immediately!</p>
            <p>To nearby kingdom of Hearts!</p>
        </template>
        <textarea v-model="message"></textarea>
        <button v-show="message">Send word to allies for help!</button>
        <pre>
    {{$data | json}}
        </pre>
    </div>

使用上面的示例代码可以发现v-if指令和template绑定在了一起，并且会把所有内嵌的元素切换显示

Using the setup from the previous example we have attached the v-if directive to the template
element, toggling the existence of all nested elements.

需要注意的是，`<template>`不支持v-show指令

The v-show directive does not support the `<template>` syntax.

## v-else

当使用v-if或者v-show指令，你可以使用v-else指令来表明一个“else块”，也许你已经早就想到这个了。记住，v-else指令必须紧跟着一个v-if或者v-show指令，否则它不会被识别。

When using v-if or v-show you can use the v-else directive to indicate an “else block” as you
might have already imagined. Be aware that the v-else directive must follow immediately the v-if
or v-show directive - otherwise it will not be recognized.

结合v-else使用v-show

Using v-else with v-show.

    <html>

    <head>
        <title>Hello Vue</title>
    </head>

    <body>
        <div id="app">
            <h1 v-show="!message">You must send a message for help!</h1>
            <h2 v-else>You have sent a message!</h2>
            <textarea v-model="message"></textarea>
            <button v-show="message">Send word to allies for help!</button>
            <pre>
    {{$data | json}}
            </pre>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: '#app',
            data: {
                message: 'Our king is dead! Send help!'
            }
        });
        </script>
    </body>

    </html>

结合v-else使用v-if

Using v-else with v-if.

    <html>

    <head>
        <title>Hello Vue</title>
    </head>

    <body>
        <div id="app">
            <!-- <h1 v-if="!message">You must send a message for help!</h1> -->
            <template v-if="!message">
                <h1>You must send a message for help!</h1>
                <p>Dispatch a messenger immediately!</p>
                <p>To nearby kingdom of Hearts!</p>
            </template>
            <h2 v-else>You have send a message!</h2>
            <textarea v-model="message"></textarea>
            <button v-show="message">Send word to allies for help!</button>
            <pre>
    {{$data | json}}
            </pre>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: '#app',
            data: {
                message: 'Our king is dead! Send help!'
            }
        });
        </script>
    </body>

    </html>

仅仅是为了展示例子，我们使用了一个h2标签，里面写了不同的警告信息，在前面例子的另外一种情况下显示。如果没有详细的时候，我们看到h1标签，如果有信息的时候，我们能看到h2标签，而我们只是使用了简单的Vue的v-if和v-else语法。你也可以看到上面我们使用了v-if也使用了v-show，他们给了我们同样的结果。很简单吧。

Just for the sake of the example we have used an h2 tag with a different warning than before which
is displayed conditionally. If there is no message present, we see the h1 tag. If there is a message, we
see the h2 using this very simple syntax of Vue v-if and v-else. As you can see above we’ve used
v-if as well as v-show. Both give us the same result. Simple as a pimple!

## v-if vs. v-show

尽管我们已经提到了v-if和v-show的区别，我们可以更加深入。有些问题可能在我们使用它们的时候显现出来。v-show和v-if之间有很大的区别吗？在一些情景下它们的性能会被影响吗？会存在一些问题，你可能使用这个比使用那个更好吗？你可能感受到了使用v-show在大部分情境下会消耗更多的时间当页面渲染的时候。对比之下,v-if是真正的有条件的。

Even though we have already mentioned a difference between v-if and v-show , we can deepen a bit
more. Some questions may arise out of their use. Is there a big difference between using v-show and
v-if? Is there a situation where performance is affected? Are there problems where you’re better
off using one or the other? You might experience that the use of v-show on a lot of situations causes
bigger time of load during page rendering. In comparison, v-if is truly conditional according to the
guide of Vue.js.

当使用v-if的时候，如果条件在一开始渲染的时候是false，vue不会做任何事情。部分的编译不会开始知道条件变成真。一般来说，v-if有更多的切换消耗，而w-show有更高的初始化渲染消耗。所以使用v-show如果你经常需要切换一些东西，而使用v-if如果条件看起来基本不会改变的话。

When using v-if, if the condition is false on initial render, it will not do anything
- partial compilation won’t start until the condition becomes true for the first time.
Generally speaking, v-if has higher toggle costs while v-show has higher initial render
costs. So prefer v-show if you need to toggle something very often, and prefer v-if if the
condition is unlikely to change at runtime.

所以，使用哪个主要看你的需求了。

So, when to use which really depends on your needs.

## 作业

## Homework

按照之前的作业练习，你需要去扩展一些功能。用户现在连同姓名和性别一起输入。如果用户是男性，头部会用“Hello Mister {{name}}”和用户打招呼，如果是一个女性，用“Hello Miss {{name}}”打招呼

Following the previous homework exercise, you should try to expand it a bit. The user now types in
his gender along with his name. If user is a male, then the heading will greet the user with “Hello
Mister {{name}}”. If user is a female, then “Hello Miss {{name}}” should appear instead.

如果性别不是男的也不是女的，头部会显示如下的警告"Enter a valid gender,human."

When gender in neither male or female then the user should see the warning heading “Enter a valid
gender, human.”.

    <html>

    <head>
        <title>Hello Vue</title>
        <link rel="stylesheet" href="../../lib/bootstrap.min.css">
    </head>

    <body>
        <div id="app">
            <div class="container">
                <!-- || 操作符是OR或操作 -->
                <!-- the || is the logical operator OR -->
                <div v-if="gender=='male' || gender=='female'">
                    <h1>
                            Hello,
                            <!-- 如果性别是male的话渲染出来 -->
                            <!-- render span if 'gender' equals to 'male' -->
                            <span v-show="gender=='male'">Mister {{name}}</span>
                            <!-- 如果性别是female的话渲染出来 -->
                            <!-- render span if 'gender' equals to 'female' -->
                            <span v-show="gender=='female'">Miss {{name}}</span>
                            <!-- （译者注：这里男女显示可以切换回比较频繁，所以都用了v-show） -->
                        </h1>
                </div>
                <!-- v-else紧跟着v-if块，才能正常工作 -->
                <!-- v-else immediately follows v-if block to work -->
                <h1 v-else>Enter a valid gender, human.</h1>
                <label for="gender">Enter your gender</label>
                <input type="text" v-model="gender" id="gender" class="form-control">
                <label for="name">Enter your name</label>
                <input type="text" v-model="name" id="name" class="form-control">
                <pre>{{$data | json}}</pre>
            </div>
        </div>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: '#app',
            data: {
                name: 'Universe',
                gender: 'female'
            }
        });
        </script>
    </body>

    </html>

译者注：本章所有的代码可以在 [3-a-flavor-of-directives](https://github.com/cody1991/awesome-vue/tree/master/the-majesty-of-vue.js-ch/code/3-a-flavor-of-directives) 查看
