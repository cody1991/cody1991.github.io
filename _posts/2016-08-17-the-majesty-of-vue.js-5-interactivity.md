---
layout: post
title:  "The majesty of vue.js 4-list-rendering"
date:   2016-08-17 15:12:00
category: vue
---

译者注：本章所有的代码可以在 [5-interactivity](https://github.com/cody1991/awesome-vue/tree/master/the-majesty-of-vue.js-ch/code/5-interactivity) 查看

# 交互

# Interactivity

在本章，我们将会创建和扩展之前的例子，学习一些关于“方法”，“事件处理”和“计算属性”的新东西。我们将使用不同的方法开发一些例子。让我们来看看我们怎么使用Vue的交互来创建一个小的app，像计算器，运行起来非常好和简单

In this chapter, we are going to create and expand previous examples, learn new things concerning
‘methods’, ‘event handling’ and ‘computed properties’. We will develop a few examples using
different approaches. It’s time to see how we can implement Vue’s interactivity to get a small app,
like a Calculator, running nice and easy.

## 事件处理

## Event handing

HTML事件是发生在HTML元素上的。当vue在HTML页面使用的时候，可以获取到那些事件

HTML events are things that happen to HTML elements. When Vue.js is used in HTML pages, it
can react to these events.

在HTML里面，事件可以代表任何发生在渲染模型的基础的用户交互

In HTML, events can represent everything from basic user interactions to things happening in the
rendering model.

下面是一些HTML的事件示例：

These are some examples of HTML events:

* 网页页面完成加载

* A web page has finished loading

* 一个输入框发生了变化

* An input field was changed

* 一个按钮被点击了

* A button was clicked

* 一个表格提交了

* A form was submitted

事件处理的含义就是事件发生的时候你去处理一些事情

The point of event handling is that you can do something whenever an event takes place.

在Vue.js，监听DOM事件你可以使用v-on指令

In Vue.js, to listen to DOM events you can use the v-on directive.

v-on指令把绑定事件监听器给一个函数。事件的类型是由参数决定的，比如v-on:keyup监听keyup事件

The v-on directive attaches an event listener to an element. The type of the event is denoted by the
argument, for example v-on:keyup listens to the keyup event.

keyup事件发生在用户释放一个按键的时候。你可以在[这里](http://www.w3schools.com/tags/ref_eventattributes.asp)看到一个完整的HTML事件列表

The keyup event occurs when the user releases a key. You can find a full list of HTML
events [here](http://www.w3schools.com/tags/ref_eventattributes.asp)

### 行内处理事件

### Handling Events Inline

说的够多的了，让我们在实战中看看事件处理。下面，会有一个"upvote"的按钮，在每次点击的时候可以提交对应项目的upvotes数量

Enough with the talking, let’s move on and see event handling in action. Below, there is an ‘Upvote’
button which increases the number of upvotes every time it gets clicked.

    <html>

    <head>
        <title>Hello Vue</title>
        <link rel="stylesheet" href="../../lib/bootstrap.min.css">
    </head>

    <body>
        <div class="container">
            <button v-on:click="upvotes++">
                Upvote!{{upvotes}}
            </button>
            <pre>{{$data|json}}</pre>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: '.container',
            data: {
                upvotes: 0
            }
        });
        </script>
    </body>

    </html>

正如你上面所看到的，我们有一些简单的初始化，我们在视图模型中使用.container类。在我们的数据中有一个upvotes变量。在这里，我们绑定了一个click事件监听器，它就在v-on:click的右边。在括号里门，我们简单地使用增量运算符(upvotes++)在按钮每次点击的时候增加1.

As you can see above, we have a basic setup and this time we use the class container in our view
model. There is an upvotes variable within our data. In this case, we bind an event listener for
click, with the statement that is right next to it. Inside the quotes we’re simply increasing the count
of upvotes by one, each time the button is pressed, using the increment operator (upvotes++).

上面展示的就是一个简单的行内javascript语句。

Shown above is a very simple inline JavaScript statement

### 使用方法来处理事件

### Handling Events using Methods

现在我们使用方法来做和上面完全一样的事情。在Vue.js里面，方法是用来执行一些特定任务的方法。要执行一个方法，你必须定义然后调用它。

Now we are going to do the exact same thing as before, using a method instead. A method in Vue.js
is a block of code designed to perform a particular task. To execute a method you have to define it
and then invoke it.

    <html>

    <head>
        <title>Hello Vue</title>
        <link rel="stylesheet" href="../../lib/bootstrap.min.css">
    </head>

    <body>
        <div class="container">
            <button v-on:click="upvote">
                Upvote!{{upvotes}}
            </button>
            <pre>{{$data|json}}</pre>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: '.container',
            data: {
                upvotes: 0
            },
            // 在methods对象下定义方法
            // define methods under the **`methods`** object
            methods: {
                upvote: function() {
                    // 在方法里面的this指代Vue实例
                    // // **`this`** inside methods points to the Vue instance
                    this.upvotes++;
                }
            }
        });
        </script>
    </body>

    </html>

我们把一个点击事件监听器绑定了一个叫做upvote的方法。它和前面的工作一样，但是在阅读你的代码的时候更加工整和简单来理解它们

We are binding a click event listener to a method named ‘upvote’. It works just as before, but cleaner
and easier to understand when reading your code.

事件处理器严格的只能执行一个语句

Event handlers are restricted to execute one statement only.

### v-on缩写版本

### Shorthand for v-on

当你在项目中都使用v-on的时候，你会发现你的HTML很快就变得很脏。幸运的是，v-on有一个缩写的版本，`@`符号。`@`代表整个v-on:指令，使用它的时候代码看起来更加的干净。但是每个人都有它们自己的实践，这完全是可选的。

When you find yourself using v-on all the time in a project, you will find out that your HTML will
quickly becomes dirty. Thankfully, there is a shorthand for v-on, the @ symbol. The @ replaces the entire v-on: and when using it, the code looks a lot cleaner, but everyone has their own practices
and this is totally optional.

使用压缩版本，前面的实例按钮会变成这样：

Using the shorthand the button of our previous example will be:

使用v-on监听click

Listening to ‘click’ using v-on:

    <button v-on:click="upvote">
        Upvote!{{upvotes}}
    </button>

使用@缩写版本监听click

Listening to ‘click’ using @ shorthand

    <button @:click="upvote">
        Upvote!{{upvotes}}
    </button>

## 事件修饰符

## Event Modifiers

我们继续，接下来创建一个计算器应用。为了达到这个目的，我们使用一个带有两个input输入框和一个选择我们希望的操作符的选择框的表格

Now we will move on and create a Calculator app. To do so, we gonna use a form with two inputs
and one dropdown to select the desired operation.

即使下面的代码看起来是好的，但是我们的计算器没有像我们预期的一样工作

Even though the following code seems fine, our calculator does not work as expected

    <html>

    <head>
        <title>Hello Vue</title>
        <link rel="stylesheet" href="../../lib/bootstrap.min.css">
    </head>

    <body>
        <div class="container">
            <h1>Type 2 numbers and choose operation.</h1>
            <form class="form-inline">
                <!-- 注意到这里传入了一个number的属性，希望我们传入input的值是一个数字 -->
                <!-- Notice here the special attribute 'number' is passed in order to parse inputs as numbers.-->
                <input number v-model="a" class="form-control">
                <select v-model="operator" class="form-control">
                    <option selected>+</option>
                    <option>-</option>
                    <option>*</option>
                    <option>/</option>
                </select>
                <!-- 注意到这里传入了一个number的属性，希望我们传入input的值是一个数字 -->
                <!-- Notice here the special attribute 'number' is passed in order to parse inputs as numbers.-->
                <input number v-model="b" class="form-control">
                <button class="btn btn-primary" type="submit" @click="calculate">Calculate</button>
            </form>
            <h2>Result: {{a}}  {{operator}}  {{b}} = {{c}}</h2>
            <pre>{{$data|json}}</pre>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: '.container',
            data: {
                a: 1,
                b: 2,
                c: null,
                operator: ''
            },
            methods: {
                calculate: function() {
                    switch (this.operator) {
                        case "+":
                            this.c = this.a + this.b;
                            break;
                        case "-":
                            this.c = this.a - this.b;
                            break;
                        case "*":
                            this.c = this.a * this.b;
                            break;
                        case "/":
                            this.c = this.a / this.b;
                            break;
                    }
                }
            }
        });
        </script>
    </body>

    </html>

如果你尝试运行这段代码，你会发现每当calculate按钮被点击的时候，它会重新加载页面而非计算。

If you try and run this code yourself, you will find out that when the “calculate” button is clicked,
instead of calculating, it reloads the page.

这是有意义的，当你点击calculate的时候，在后台，你提交了表格所以页面重新加载了。

This makes sense because when you click “calculate”, in the background, you are submitting the
form and thus the page reloads.

为了防止表格的提交，我们必须取消onsubmit事件的默认行为。这是一个很常见的需求：在我们的事件处理器方法里面调用`event.preventDefault()`。在我们的例子中事件处理器方法叫做calculate

To prevent the submission of the form, we have to cancel the default action of the onsubmit event. It
is a very common need to call event.preventDefault() inside our event handling method. In our
case the event handling method is called calculate.

所以，我们的方法会变成这样：

So, our method will become:

    calculate: function() {
        event.preventDefault();
        switch (this.operator) {
            case "+":
                this.c = this.a + this.b;
                break;
            case "-":
                this.c = this.a - this.b;
                break;
            case "*":
                this.c = this.a * this.b;
                break;
            case "/":
                this.c = this.a / this.b;
                break;
        }
    }

尽管我们可以在方法里面这样简单的书写，这样会更加好：方法是纯粹的代码逻辑处理，而不应该有处理DOM事件的细节。

Although we can do this easily inside methods, it would be better if the methods can be purely
ignorant about data logic rather than having to deal with DOM event details.

(译者注：下面的内容是原著的，但是内容有错误。.stop并不是阻止事件默认的行为而是阻止冒泡，所以下面的例子中如果添加.stop的话，页面还是会刷新。请注意一下。)

Vue.js会给v-on提供两个事件修饰符来住址事件的默认行为

Vue.js provides two event modifiers for v-on to prevent the event default behavior:

* .prevent

* .stop

所以，使用他们我们的提交按钮会改变表格：

So, using one of them, our submit button will change from:

    <button class="btn btn-primary" type="submit" @click="calculate">Calculate</button>

    to:

    <button type="submit" @click.prevent="calculate">Calculate</button>

    or:

    <button type="submit" @click.stop="calculate">Calculate</button>

我们现在可以安全的移除在calculate方法里面的`event.preventDefault()`语句了

And we can now safely remove event.preventDefault() from our calculate method

## 键修饰符

## key modifiers

如果你在其中一个正在聚焦的input输入框敲击enter键的时候，你会发现页面又重新加载而不是计算。这是因为我们禁止了提交按钮的默认行为，而没有禁止input输入框的默认行为（译者注：发现enter的时候并没有刷新页面，而是正常计算）

If you hit enter when you are focused in one of the inputs, you will notice that the page reloads
again instead of calculating. This happens because we have prevented the behavior of the submit
button but not of the inputs.

为了修复它，我们必须使用'键修饰符'

To fix this, we have to use ‘Key Modifiers’

    <input v-model="a" @keyup.enter="calculate">

    <input v-model="b" @keyup.enter="calculate">

如果你一个表格里面有非常多的input输入框，按钮和其他你需要禁止他们默认的提交行为，你可以修改form表格的提交事件。比如：`<form @submit.prevent=”calculate”>`

When you have a form with a lot of inputs/buttons/etc and you need to prevent their
default submit behavior you can modify the submit event of the form. Example: `<form @submit.prevent=”calculate”>`

最终，计算器很好地运行了起来

Finally, the calculator is up and running.

## 计算属性

## Computed Properties

Vue.js的行内表达式非常方便，但是对于那些更加复杂的逻辑，你应该使用计算属性。实际上，计算属性是一种它们的值依赖于其他因素的变量。

Vue.js inline expressions are very convenient, but for more complicated logic, you should use
computed properties. Practically, computed properties are variables which their value depends on
other factors.

计算属性看起来像函数，但是你可以把它们作为属性来应用。但是有一个显著的区别，每当计算属性依赖的因素变化的时候，计算属性的值会重新被计算

Computed properties work like functions that you can use as properties. But there is a significant
difference, every time a dependency of a computed property changes, the value of the computed
property re-evaluates.

在Vue.js里面，你可以在Vue实例里面的computed对象里面定义计算属性

In Vue.js, you define computed properties within the computed object inside your Vue instance.

    <html>

    <head>
        <title>Hello Vue</title>
        <link rel="stylesheet" href="../../lib/bootstrap.min.css">
    </head>

    <body>
        <div class="container">
            a={{a}},b={{b}}
            <pre>{{$data|json}}</pre>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: '.container',
            data: {
                a: 1
            },
            computed: {
                // a computed getter
                b: function() {
                    // this指向Vue实例
                    // **`this`** points to the Vue instance
                    return this.a + 1;
                }
            }
        });
        </script>
    </body>

    </html>

这是一个演示计算属性用法的基本例子。我们设置了两个变量，先是a，把它设为1，然后上b，它回设置为computed对象里面函数返回的值。在这个例子里面，它的值会被设置为2

This is a basic example demonstrating the use of computed properties. We’ve set two variables, the
first, a, is set to 1 and the second, b, will be set by the returned result of the function inside the
computed object. In this example the value of b will be set to 2.

    <html>

    <head>
        <title>Hello Vue</title>
        <link rel="stylesheet" href="../../lib/bootstrap.min.css">
    </head>

    <body>
        <div class="container">
            a={{a}},b={{b}}
            <input type="text" v-model="a">
            <pre>{{$data|json}}</pre>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: '.container',
            data: {
                a: 1
            },
            computed: {
                // a computed getter
                b: function() {
                    // this指向Vue实例
                    // **`this`** points to the Vue instance
                    return this.a + 1;
                }
            }
        });
        </script>
    </body>

    </html>

这个例子和上面的例子基本一样，只有一个区别就是加了一个input输入框和a绑定。这样设计的想法是改变绑定的属性然后实时更新b的值。但是你会发现，它工作起来并不是我们想要的

Above there is the same example as before with one difference, there is an input binded to the a
variable. The desired outcome is to change the value of the binded attribute and update instantly
the result of b. But what you will notice here, is that it does not work as we would expect.

如果你运行这段代码，给a变量输入一个数字5，你希望b的值是6，但是结果并不是这样的,b会被设置为51

If you run this code and enter an input for variable a the number 5, you expect that b will be set to
6. Sure, but it doesn’t, b is set to 51.

为什么会发生这样的事呢？好的，可能你已经想到了。b从输入框("a")里面拿到的值是一个字符串，然后会把数字1加在它的末尾。

Why is this happening? Well, as you might have already thought of, b takes the given value from
the input (“a”) as a string, and appends the number 1 at the end of it.

一个解决方案就是使用parseFloat()方法，来解析字符串a，返回一个浮点数字

One solution to solve this problem is to use the parseFloat() function that parses a string and
returns a floating point number

    new Vue({
        el: '.container',
        data: {
            a: 1
        },
        computed: {
            // a computed getter
            b: function() {
                // this指向Vue实例
                // **`this`** points to the Vue instance
                // return this.a + 1;
                return parseFloat(this.a) + 1;
            }
        }
    });

也想到另外一种方法，使用`<input type="number">`,这个输入框必须包含数字值

Another option that comes to mind, is to use the `<input type="number">` that is used for input fields
that should contain a numeric value.

但是有一个更加简洁的方法。使用Vue.js，如果你想要用户每次输入的都是数字，你可以给input输入框加入number属性

But there is a more neat way. With Vue.js, whenever you want your user inputs to be automatically
persisted as numbers, you can add the special attribute number to these inputs.

    <input type="text" v-model="a" number>

number属性可以让我们毫不费力地得到我们想要的结果

The number attribute is going to give us the desired result without any further effort.

为了展示计算属性更多的用法，我们准备用它们来创建我们前面展示过的计算器，但是这次使用的是计算属性而不是方法。

To demonstrate a wider picture of computed properties, we are going to make use of them and build
the calculator we have showed before again, but this time using computed properties instead of
methods.

让我们从一个简单的例子开始，计算属性c是a加b的和

Lets start with a simple example, where a computed property c contains the sum of a plus b.

    <html>

    <head>
        <title>Hello Vue</title>
        <link rel="stylesheet" href="../../lib/bootstrap.min.css">
    </head>

    <body>
        <div class="container">
            <h1>Enter 2 numbers to calculate their sum.</h1>
            <form class="form-inline">
                <input type="text" v-model="a" number class="form-control"> +
                <input type="text" v-model="b" number class="form-control">
            </form>
            <h2>Result: {{a}} + {{b}} = {{c}} </h2>
            <pre>{{$data|json}}</pre>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: '.container',
            data: {
                a: 1,
                b: 2
            },
            computed: {
                c: function() {
                    return this.a + this.b
                }
            }
        });
        </script>
    </body>

    </html>

初始化的代码已经好了，现在用户可以输入两个数字然后得到它们的和。计算器的目标是可以进行四个基本的运算，让我们继续构建吧。

The initial code is ready, and at this point the user can type in 2 numbers and get the sum of these
two. A calculator that can do the four basic operations is the goal, so let’s continue building!

HTML代码和之前章节我们构建的计算器是一样的（除了在这里我们不需要按钮），这里只会给你看javascript代码

Since the HTML code will be the same with the calculator we build in the previous section of
this chapter (except now we don’t need a button), I am gonna show you here only the Javascript
codeblock.

    new Vue({
        el: '.container',
        data: {
            a: 1,
            b: 2,
            operator: ''
        },
        computed: {
            c: function() {
                // event.preventDefault();
                switch (this.operator) {
                    case "+":
                        return this.a + this.b;
                        break;
                    case "-":
                        return this.a - this.b;
                        break;
                    case "*":
                        return this.a * this.b;
                        break;
                    case "/":
                        return this.a / this.b;
                        break;
                }
            }
        }
    });

计算器已经可以使用了。我们只要把那些原本在calculate方法里面的代码改成计算属性c的代码就完成了。每当你改变a或者b的值，结果都会实时更新。我们不需要按钮，没有事件或者其他的。非常棒吧？

The calculator is ready to be put to use. We just had to move whatever was inside calculate method
to the computed property c and we are done! Whenever you change the value of a or b the result
updates in real time! We don’t need no buttons, no events, nor anything. How awesome is that??

注意一下，这里有一个通过的方法就是需要有一个语句来避免除法的时候出现错误。好消息就是已经有这种缺陷的预测方案。如果一个用户输入1/0，结果会自动变成无穷大。如果一个用户输入文本，结果会显示"not a number"

Note here that a normal approach would be to have an if statement to avoid error for the
division. The best part about this is that there is already a prediction for this kind of flaws.
If the user types 1/0 the result automatically becomes infinity! If the user types a text the
displayed result is “not a number”.

### 使用计算属性来过滤一个数组

### Using Computed Properties to Filter an Array

一个输出属性也可以用来过滤数组。使用计算属性来处理过滤一个数组让你有更加深入的控制和更大的灵活性，因为它完全是javascript，也可以让你在任何地方都获取到过滤后的结果。比如你可以在任何地方获取到过滤后的数组的长度

A computed property can also be used to filter an array. Using a computed property to perform array
filtering gives you in-depth control and more flexibility, since it’s full JavaScript, and allows you to access the filtered result elsewhere. For example you can get the length of a filtered array elsewhere
in your code

来看看它是怎么工作的，我们会过滤之前在自定义过滤器例子中的famous stories数组。这里我们会创建一个计算属性来返回过滤后的数组。

To see how it’s done, we will filter the famous stories as we did in the Custom Filter example. This
time we will create a computed property that returns the filtered Array.

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
        },
        computed: {
            famous: function() {
                return this.stories.filter(function(item) {
                    return item.upvotes > 25;
                });
            }
        }
    });

在HTML代码里面，我们会渲染计算属性famous，而不是stories数组

In our HTML code, instead of stories array, we will render the famous computed property.

    <div class="container">
        <h1>Let's hear some stories! ({{famous.length}})</h1>
        <div>
            <ul class="list-group">
                <li class="list-group-item" v-for="(index,story) in famous">
                    {{index}}. {{story.writer}} said "{{story.plot}}" and vpvoted {{story.upvotes}} times.
                </li>
            </ul>
        </div>
        <pre>{{$data|json}}</pre>
    </div>

就是这样。我们使用了计算属性来过滤我们的数据。你有没有发现我们在头部可以简单的使用`{{famous.length}}`来展示famous stories的数量

That’s it. We have filtered our array using a computed property. Did you notice how easily we managed to display the number of famous stories next to our heading message using {{famous.length}}?

即使使用计算属性来处理数组的过滤让我们有更大的灵活性，数组过滤会在更多的例子下使用

Although using a computed property to perform array filtering gives you more flexibility,
array filters can be more convenient for common use cases.

## 作业

## Homeword

现在你对于Vue的事件处理，方法和计算属性等等有基本的了解。你应该要去尝试一些更有挑战性的东西。一开始创建一个"Mayor"候选人的数组。每一个候选人都有一个"name"和"votes"的数量。使用一个按钮来增加每个候选人的"votes"。使用计算属性来决定谁是现在的"Mayor"，并且展示他的名字。

Now that you have a basic understanding of Vue’s event handling, methods, computed properties etc,
you should try something a bit more challenging. Start by creating an array of “Mayor” candidates.
Each candidate has a “name” and a number of “votes”. Use a button to increase the count of votes
for each candidate. Use a computed property to determine who is the current “Mayor”, and display
his name.

最后使用键'c'来重置选举，所有的votes会被成0

Finally when key ‘c’ is pressed the elections start from the beginning, and all votes become 0.

javascropt的sort()和map()方法，还有键修饰符在这里非常有用，

Javascript’s sort() and map() methods could prove very useful and Key modifiers will get
you there

你可以把目标定在body元素上来监听全局的事件

To listen globally for events you should target the body element

    <html>

    <head>
        <title>Hello Vue</title>
        <link rel="stylesheet" href="../../lib/bootstrap.min.css">
    </head>
    <!-- 监听键盘事件 -->
    <!-- listening for keyboard event -->

    <body @keyup.c="clear">
        <div class="container">
            <h1>People of Vue</h1>
            <ul class="list-group">
                <li v-for="candidate in candidates" class="list-group-item">
                    {{candidate.name}} {{candidate.votes}}
                    <!-- 增加票数 'on:click' -->
                    <!-- increase votes 'on:click'-->
                    <button class="btn btn-default" @click="candidate.votes++">Vote</button>
                </li>
            </ul>
            <!-- 使用计算属性展示'mayor'的名字 -->
            <!-- display the name of the 'mayor' using a computed property -->
            <h2>Our mayor is {{mayor.name}}</h2>
            <pre>{{$data|json}}</pre>
            <pre>{{mayor|json}}</pre>
        </div>
        <script src="../../lib/vue.js"></script>
        <script>
        new Vue({
            el: 'body',
            data: {
                candidates: [{
                    name: 'Mr.Black',
                    votes: 140
                }, {
                    name: 'Mr.White',
                    votes: 135
                }, {
                    name: 'Mr.Pink',
                    votes: 145
                }, {
                    name: 'Mr.Brown',
                    votes: 130
                }]
            },
            computed: {
                mayor: function() {
                    // 首先我们按照倒叙来排序数组
                    //first we sort the array descending
                    var candidatesSorted = this.candidates.sort(function(a, b) {
                        return b.votes - a.votes;
                    });
                    // myor会是第一项
                    //the mayor will be the first item
                    return candidatesSorted[0];
                }
            },
            methods: {
                // 这个方法只有键c被按下的时候会被执行
                //this method runs when the key 'c' is pressed
                clear: function() {
                    // 通过map()方法把所有候选人的votes设置为0
                    //Turn votes of all candidate to 0 using map() function.
                    this.candidates = this.candidates.map(function(candidate) {
                        candidate.votes = 0;
                        return candidate;
                    });
                }
            }
        });
        </script>
    </body>

    </html>

译者注：本章所有的代码可以在 [5-interactivity](https://github.com/cody1991/awesome-vue/tree/master/the-majesty-of-vue.js-ch/code/5-interactivity) 查看
