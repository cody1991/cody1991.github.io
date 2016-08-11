---
layout: post
title:  "The majesty of vue.js 0-introduction"
date:   2016-08-11 12:00:00
category: vue
---

(有部分删减)

# 介绍

# Introduction

## 关于 vue.js

## About Vue.js

### vue.js 一览

### Vue.js Overview

vue.js(发音是 `/vju:/`，就像 `view`)是一个用来构建可交互web界面的库。vue.js的目标是尽可能简单地只使用一个API接口来方便我们构建可交互的数据绑定和可复用的视图组件。

Vue.js (pronounced /vju:/, like view) is a library for building interactive web interfaces. The goal of
Vue.js is to provide the benefits of reactive data binding and composable view components with
an API that is as simple as possible.

vue.js本身不是一个完整的框架，它主要的关注点在视图层。所以可以非常简单的让它和其他库或者现有的项目整合在一起。而在另外一个方面，当它和其他合适的工具和对它支持的库一起使用的时候，vue.js也可以在复杂的单页应用中胜任。

Vue.js itself is not a full-blown framework - it is focused on the view layer only. It is therefore very
easy to pick up and to integrate with other libraries or existing projects. On the other hand, when
used in combination with proper tooling and supporting libraries, Vue.js is also perfectly capable of
powering sophisticated Single-Page Applications.

如果你是一个经验丰富的前端开发工程师，而且想知道vue.js和其他库/框架的对比，可以前去查看[和其他框架的对比](#和其他框架的对比)章节

If you are an experienced frontend developer and want to know how Vue.js compares to other
libraries/frameworks, check out the [comparison-with-other-frameworks-chapter](#comparison-with-other-frameworks)

如果你有兴趣想看到更多有关vue.js核心的信息的话，可以看看[vue.js的官网指导](http://vuejs.org/guide/overview.html)

If you are interested to learn more information about Vue.js’ core take a look at [Vue.js official guide](http://vuejs.org/guide/overview.html)

### 人们都说怎样讨论vue.js的

### What people say about Vue.js

"vue.js让我更加爱上javascript。使用它非常容易和享受。它也有非常多的周边插件和工具去扩充它的基本功能，他们可以非常快的集合在你那些不管大小的项目中，而你仅仅只是需要几行代码而已。vue.js它快速，轻巧，也是前端开发的未来。"

“Vue.js is what made me love JavaScript. It’s extremely easy and enjoyable to use. It has a great
ecosystem of plugins and tools that extend its basic services. You can quickly include it in any project,
small or big, write a few lines of code and you are set. Vue.js is fast, lightweight and is the future of
Front end development!”

—Alex Kyriakidis

"当我想重新拾起javascript的时候，我非常兴奋并且想到非常多的学习可能。但是我朋友推荐我去学习 vue.js，我听从了他的建议，事件也开始变的疯狂。当跟着教程学习的时候，我想到很多以前做过的事情，并且想到了如果我更早的学习vue，我可以更加方便的完成那些任务。我的意见是，如果你想更加快、好喝简单的完成工作，vue是你所需要的框架。 "

“When I started picking up Javascript I got excited learning a ton of possibilities, but when my friend
suggested to learn Vue.js and I followed his advice, things went wild. While reading and watching
tutorials I kept thinking all the stuff I’ve done so far and how much easier I could have done them if
I had invest time to learn Vue earlier. My opinion is that if you want to do your work fast, nice and
easy Vue is the JS Framework you need. “

—Kostas Maniatis

"记住我的话，vue.js在2016会一飞冲天流行起来"

“Mark my words: Vue.js will sky-rocket in popularity in 2016. It’s that good.”

— Jeffrey Way

"vue是我一直想要的javascript框架。它是可以标榜你是一个开发者的框架。你可以把它集成在一个页面，或者配合vuex和vue router来构建更加高级的单页页面。它真的是我见过的最精美的javascript框架。"

“Vue is what I always wanted in a JavaScript framework. It’s a framework that scales with you as a
developer. You can sprinkle it onto one page, or build an advanced single page application with Vuex
and Vue Router. It’s truly the most polished JavaScript framework I’ve ever seen.”

— Taylor Otwell

"vue.js是我发现的第一个可以让服务端渲染APP构建起来像完整的单页应用构建一样自然的。不伦是我需要在单一页面的一个小部件，或者构建一个复杂的javascript客户端的时候，它都游刃有余。"

“Vue.js is the first framework I’ve found that feels just as natural to use in a server-rendered app as
it does in a full-blown SPA. Whether I just need a small widget on a single page or I’m building a
complex Javascript client, it never feels like not enough or like overkill.”

— Adam Wathan

"vue.js已经是一个非常简单又容易去使用和理解的框架了。别人还在努力怎么去构建复杂的框架的时候，你在使用它的时候已经感受到了这世间上清晰空气。"

“Vue.js has been able to make a framework that is both simple to use and easy to understand. It’s
a breath of fresh air in a world where others are fighting to see who can make the most complex
framework.”

— Eric Barnes

"我喜欢vue.js的原因是：我是一个hybird设计/开发者，我有看过一些其他的比如react,angular，但是它们的学习曲线和术语都不得不让我放弃。vue.js是我第一个能读懂的框架。它能很容易的让那些对于自己javascript不太自信的人重拾信心，比如我，还有一些其他的经验丰富的angular和react开发者也开始和注意到vue.js并且喜欢上了。这在javascript的世界基本是前所未有的，这也是我关注伦敦vue.js大会的原因。"

“The reason I like Vue.js is because I’m a hybrid designer/developer. I’ve looked at React, Angular
and a few others but the learning curve and terminology has always put me off. Vue.js is the first
JS framework I understand. Also, not only is it easy to pick up for the less confidence JS’ers, such as
myself, but I’ve noticed experienced Angular and React developers take note, and liking, Vue.js. This
is pretty unprecedented in JS world and it’s that reason I started London Vue.js Meetup.”

—Jack Barham

### 和其他框架的对比

### Comparison with Other Frameworks

#### Angular

#### Angular

这里有几点为什么使用vue而不是用angular的原因，但是可能并不是对于每个人都是这样的

There are a few reasons to use Vue over Angular, although they might not apply for everyone:

* vue.js比angular简单多了，不仅是API还是设计上。你可以很快并且很有动力的去学习所有有关vue.js的东西

* Vue.js is much simpler than Angular, both in terms of API and design. You can learn almost
everything about it really fast and get productive.

* Vue.js is a more flexible, less opinionated solution. That allows you to structure your app the way you want it to be, instead of being forced to do everything the Angular way. It’s only an interface layer so you can use it as a light feature in pages instead of a full blown SPA. It gives you bigger room to mix and match with other libraries, but you are also responsible for making more architectural decisions. For example, Vue.js’ core doesn’t come with routing or ajax functionalities by default, and usually assumes you are building the application using an
external module bundler. This is probably the most important distinction

* Angular uses two-way binding between scopes. While Vue also supports explicit two-way
bindings, it defaults to a one-way, parent-to-child data flow between components. Using oneway binding makes the flow of data easier to reason about in large apps.

* Vue.js has a clearer separation between directives and components. Directives are meant to
encapsulate DOM manipulations only, while Components stand for a self-contained unit that
has its own view and data logic. In Angular there’s a lot of confusion between the two.

* Vue.js has better performance and is much, much easier to optimize, because it doesn’t use
dirty checking. Angular gets slow when there are a lot of watchers, because every time
anything in the scope changes, all these watchers need to be re-evaluated again. Also, the
digest cycle may have to run multiple times to “stabilize” if some watcher triggers another
update. Angular users often have to resort to esoteric techniques to get around the digest
cycle, and in some situations there’s simply no way to optimize a scope with a large amount
of watchers. Vue.js doesn’t suffer from this at all because it uses a transparent dependencytracking observing system with async queueing - all changes trigger independently unless
they have explicit dependency relationships. The only optimization hint you’ll ever need is
the track-by param on v-for lists.

Interestingly, there are quite some similarities in how Angular 2 and Vue are addressing these
Angular 1 issues.

#### React

#### React

React and Vue.js do share a similarity in that they both provide reactive & composable View
components. There are, of course, many differences as well.

First, the internal implementation is fundamentally different. React’s rendering leverages the Virtual
DOM - an in-memory representation of what the actual DOM should look like. When the state
changes, React does a full re-render of the Virtual DOM, diffs it, and then patches the real DOM.
The virtual-DOM approach provides a functional way to describe your view at any point of time,
which is really nice. Because it doesn’t use observables and re-renders the entire app on every update,
the view is by definition guaranteed to be in sync with the data. It also opens up possibilities to
isomorphic JavaScript applications.

Instead of a Virtual DOM, Vue.js uses the actual DOM as the template and keeps references to
actual nodes for data bindings. This limits Vue.js to environments where DOM is present. However,
contrary to the common misconception that Virtual-DOM makes React faster than anything else,
Vue.js actually out-performs React when it comes to hot updates, and requires almost no handtuned optimization. With React, you need to implement shouldComponentUpdate everywhere or
use immutable data structures to achieve fully optimized re-renders.

API-wise, one issue with React (or JSX) is that the render function often involves a lot of logic, and
ends up looking more like a piece of program (which in fact it is) rather than a visual representation
of the interface. For some developers this is a bonus, but for designer/developer hybrids like me,
having a template makes it much easier to think visually about the design and CSS. JSX mixed with
JavaScript logic breaks that visual model I need to map the code to the design. In contrast, Vue.js
pays the cost of a lightweight data-binding DSL so that we have a visually scannable template and
with logic encapsulated into directives and filters.

Another issue with React is that because DOM updates are completely delegated to the Virtual DOM,
it’s a bit tricky when you actually want to control the DOM yourself (although theoretically you
can, you’d be essentially working against the library when you do that). For applications that needs
ad-hoc custom DOM manipulations, especially animations with complex timing requirements, this
can become a pretty annoying restriction. On this front, Vue.js allows for more flexibility and there
are [multiple FWA/Awwwards winning sites](https://github.com/vuejs/vue/wiki/Projects-Using-Vue.js#interactive-experiences) built with Vue.js.

Some additional notes:

* The React team has very ambitious goals in making React a platform-agnostic UI development
paradigm, while Vue is focused on providing a pragmatic solution for the web.

* React, due to its functional nature, plays very well with functional programming patterns.
However it also introduces a higher learning barrier for junior developers and beginners. Vue
is much easier to pick up and get productive with in this regard.

* For large applications, the React community has been doing a lot of innovation in terms of
state management solutions, e.g. Flux/Redux. Vue itself doesn’t really address that problem
(same for React core), but the state management patterns can be easily adopted for a similar
architecture. Vue has its own state management solution called [Vuex](https://github.com/vuejs/vuex), and it’s also possible
to use Redux with [Vue](https://github.com/egoist/revue).

* The trend in React development is pushing you to put everything in JavaScript, including
your CSS. There has been many CSS-in-JS solutions out there but all more or less have its
own problems. And most importantly, it deviates from the standard CSS authoring experience
and makes it very awkward to leverage existing work in the CSS community. Vue’s [single file components](http://vuejs.org/guide/application.html#Single_File_Components) gives you component-encapsulated CSS while still allowing you to use your pre-processors of choice.

#### Ember

#### Ember

Ember is a full-featured framework that is designed to be highly opinionated. It provides a lot
of established conventions, and once you are familiar enough with them, it can make you very
productive. However, it also means the learning curve is high and the flexibility suffers. It’s a tradeoff when you try to pick between an opinionated framework and a library with a loosely coupled
set of tools that work together. The latter gives you more freedom but also requires you to make
more architectural decisions.

That said, it would probably make a better comparison between Vue.js core and Ember’s templating
and object model layer:

* Vue provides unobtrusive reactivity on plain JavaScript objects, and fully automatic computed
properties. In Ember you need to wrap everything in Ember Objects and manually declare
dependencies for computed properties.

* Vue’s template syntax harnesses the full power of JavaScript expressions, while Handlebars’
expression and helper syntax is quite limited in comparison.

* Performance wise, Vue outperforms Ember by a fair margin, even after the latest Glimmer
engine update in Ember 2.0. Vue automatically batches updates, while in Ember you need to
manually manage run loops in performance-critical situations.

#### Polymer

#### Polymer

Polymer is yet another Google-sponsored project and in fact was a source of inspiration for Vue.js as
well. Vue.js’ components can be loosely compared to Polymer’s custom elements, and both provide
a very similar development style. The biggest difference is that Polymer is built upon the latest
Web Components features, and requires non-trivial polyfills to work (with degraded performance)
in browsers that don’t support those features natively. In contrast, Vue.js works without any
dependencies down to IE9.

Also, in Polymer 1.0 the team has really made its data-binding system very limited in order to
compensate for the performance. For example, the only expressions supported in Polymer templates
are the boolean negation and single method calls. Its computed property implementation is also not
very flexible.

Finally, when deploying to production, Polymer elements need to be bundled via a Polymer-specific
tool called vulcanizer. In comparison, single file Vue components can leverage everything the
Webpack ecosystem has to offer, and thus you can easily use ES6 and any CSS pre-processors you
want in your Vue components.

#### Riot

#### Riot

Riot 2.0 provides a similar component-based development model (which is called a “tag” in Riot),
with a minimal and beautifully designed API. I think Riot and Vue share a lot in design philosophies.
However, despite being a bit heavier than Riot, Vue does offer some significant advantages over Riot:

* True conditional rendering (Riot renders all if branches and simply show/hide them)

* A far-more powerful router (Riot’s routing API is just way too minimal)

* More mature tooling support (see webpack + vue-loader)

* Transition effect system (Riot has none)

* Better performance. (Riot in fact uses dirty checking rather than a virtual-dom, and thus
suffers from the same performance issues with Angular.)

For updated comparisons feel free to check Vue.js guide.

(框架对比的翻译后面补全)

## 欢迎

## Welcome

### 关于这本书

### About the Book

这本书会带你快速完整的学习vue.js框架

This book will guide you through the path of the rapidly spreading Javascript Framework called
Vue.js!

前不久，我们开始了一个基于Laravel和vue.js的项目。通读了vue.js的官方指导还有一些教程以后我们发现关于vue.js的资源很缺乏。在开发我们的项目的时候我们得到了非常多的经验，由此而生我们决定写一本书来分享我们得到的知识给这个世界。

Some time ago, we started a new project based on Laravel and Vue.js. After thoroughly reading
Vue.js guide and a few tutorials, we discovered a lack of resources about Vue.js around the web.
During the development of our project, we gained a lot of experience, so we came up with the idea
to write this book in order to share our acquired knowledge with the world.

这本书的风格是非正式的，直观的，易于遵循的，里面的例子都有适当详细的解释，足够让所有人都看得懂。

This book is written in an informal, intuitive, and easy-to-follow format, wherein all examples are
appropriately detailed enough to provide adequate guidance to whoever.

我们会从非常基础的例子开始，并且通过这些例子可以让你全面覆盖vue.js特性的学习。而在最后你会有能力快速创建一个前端应用程序，和提高你把vue.js整合到现有项目的能力。

We’ll start from the very basics and through many examples we’ll cover the most significant features
of Vue.js. By the end of this book you will be able to create fast front end applications and increase
the performance of your existing projects with Vue.js integration.

### 这本书适合谁

### Who is this Book for

适合那些使用了不少时间去学习前端开发框架的人，看过Bootstrap,Javascript和其他很多的Javscript框架。这本书适合那些对学习一个轻巧简单的Javascript框架感兴趣的人。不需要太多的知识储备，但是如果对HTML和javascript熟悉的话再好不过了。如果你都不知道string和object有什么区别的话，建议先进行一些学习。

Everyone who has spent time to learn modern web development, has seen Bootstrap, Javascript and
many Javascript frameworks. This book is for anyone interested in learning a lightweight and simple
Javascript framework. No excessive knowledge is required, though it would be good to be familiar
with HTML and Javascript. If you dont’t know what the difference is between a string and an object,
maybe you need to do some digging first.

这本书同样对于那些已经熟知vue.js并且想扩充他们关于这方面的知识的有有益。

This book is also useful for any reader who already know their way around Vue.js and want to
expand their knowledge.

### 作业

### Homework

最好的学习代码的方式就是写代码，所以我们在大部分的章节末尾都准备了习题让你去解决来检验你的学习成果。我们强烈建立你尽全力去解决它们，通过它们更好的理解vue.js。不要害怕去测试你自己的想法，一点点的努力都有很长的路需要去走。或许一些不同的案例或者道路会给你正确的想法。当然我们也不是无情的，我们会提供提示和潜在的解决方案。

The best way to learn code is to write code, so we have prepared one exercise at the end
of most chapters for you to solve and actually test yourself on what you have learned. We
strongly recommend you to try as much as possible to solve them and though them gain a better
understanding of Vue.js. Don’t be afraid to test your ideas, a little effort goes a long way! Maybe a
few different examples or ways will give you the right idea. Of course we are not merciless, hints
and potential solutions will be provided!

你可以开始你的旅程了！

You may begin your journey!

### 错误

### Errata

即使我们已经非常小心地去保证内容的正确性，错误还是会出现的。如果你发现了书中的一些错误，我们非常感谢你汇报给我们。你可以保护其他读者免于挫折感，帮助我们在以后的版本得到提升。如果你发现了任何的错误，请提交问题到我们的[github 仓库](https://github.com/hootlex/the-majesty-of-vuejs)

Although we have taken every care to ensure the accuracy of our content, mistakes do happen. If
you find a mistake in the book we would be grateful if you could report it to us. By doing so, you
can protect other readers from frustration and help us improve subsequent versions of this book. If
you find any errata, please submit an issue on our [github repository](https://github.com/hootlex/the-majesty-of-vuejs)
