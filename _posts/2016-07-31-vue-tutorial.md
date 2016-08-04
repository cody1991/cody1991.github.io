---
layout: post
title:  "vue tutorial"
date:   2016-07-31 11:10:00
category: vue
---

# Vue构建单页应用

一个学习笔记，参考地址在 [vue-tutorial](https://github.com/MeCKodo/vue-tutorial)

[代码地址](https://github.com/cody1991/learn/tree/gh-pages/vue-learn/using-vue-template/vue-tutorial)

[在线预览](http://cody1991.github.io/learn/vue-learn/using-vue-template/vue-tutorial/without-backend/index.html)

### 使用vue-cli

[https://github.com/vuejs/vue-cli](https://github.com/vuejs/vue-cli)

我们可以使用 vue-cli 开始我们的项目，它是vue的一个脚手架。 我一般选择里面的[webpack](https://github.com/vuejs-templates/webpack)模板来使用，具体的使用方法可以到那个项目里面查看，使用方法如下：
    $ npm install -g vue-cli
    $ vue init webpack my-project
    $ cd my-project
    $ npm install
    $ npm run dev

然后我们再把 vue-resource vue-router 下载安装。分别是路由器和XHR请求

    $npm install --save vue-resource vue-router

并且我们可以安装 less less-loader 在 vue 模板里面写 less 代码

    $npm install --save-dev less less-loader

而这个教程里面我使用的是自己搭建的一个 [vue-template](https://github.com/bear-front-end/vue-template) 模板。

执行

    npm run dev

我们就可以在 `localhost:8080` 看到下面的页面了

<img src="{{site.baseurl}}/source/2016.07.31/1.png">

### 初始化(main.js)

在 src 目录下我们可以看到 `App.vue` 和 `main.js` 文件。我们修改 `main.js` 文件

    import Vue from 'vue';
    import App from './App';
    import VueRouter from 'vue-router';
    import VueResource from 'vue-resource';

    Vue.use(VueRouter);
    Vue.use(VueResource);

    const router = new VueRouter();

    router.redirect({
        '*': '/'
    });

    router.start(App, '#app');

我们在这里引入了 `vue` 和 `App` ，引入并且注册了 `vue-router` 和 `vue-resource`，并且通过创建了一个 `router` 实例以及通过

    router.start(App,'#app');

创建了一个 `vue` 实例。

我们的 `index.html` 文件暂时如下

    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="utf-8">
        <title>vue template</title>
        <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css">
    </head>

    <body>
        <div id="app">
            <app></app>
        </div>
        <!-- built files will be auto injected -->
    </body>

    </html>

引入了 `bootstrap` 作为UI

### 编写 App.vue 组件

我们的 `App.vue` 如下：

    <template>
        <div class="wrapper">
            <nav class="navbar navbar-default">
                <div class="container">
                    <a href="#" class="navbar-brand">
                        <i class="glyphicon glyphicon-time">
                            计划表
                        </i>
                    </a>
                    <ul class="nav navbar-nav">
                        <li>
                            <a v-link="'/home'">首页</a>
                        </li>
                        <li>
                            <a v-link="'/time-entries'">计划列表</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="container">
                <div class="col-sm-3">
                    
                </div>
                <div class="col-sm-9">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </template>

可以在里面看到 `<router-view></router-view>` ，`vue-router` 就是通过这个标签来展示页面内容的。

### 编写主页 Home.vue

    <template>
        <div class="jumbotron">
            <h1>任务追踪</h1>
            <p>
                <strong>
                    <a v-link="'/time-entries'">创建一个任务</a>
                </strong>
            </p>
        </div>
    </template>

`Home.vue` 的内容很简单，这个时候主要是需要修改 `main.js` 文件内容

    import Home from './components/Home.vue';

    ...

    router.map({
        '/home': {
            component: Home
        }
    });

    router.redirect({
        '*': '/home'
    });

    ...

看到页面现在显示如下：

<img src="{{site.baseurl}}/source/2016.07.31/2.png">

### 编写任务列表页面 TimeEntries.vue

我们先修改 `main.js` 文件

    ...

    import TimeEntries from './components/TimeEntries.vue';

    ...

    router.map({
        '/home': {
            component: Home
        },
        '/time-entries': {
            component: TimeEntries
        }
    });

    ...

而 `TimeEntries.vue` 文件的 `template` 如下：

    <template>
        <div>
            <!-- `$route.path`是当前路由对象的路径，会被解析为绝对路径当 -->
            <!-- `$route.path !== '/time-entries/log-time'`为`true`是显示，`false`，为不显示。 -->
            <!-- v-link 路由跳转地址 -->
            <button v-if="$route.path !== '/time-entries/log-time'" v-link="'/time-entries/log-time'" class="btn btn-primary">创建</button>

            <div v-if="$route.path === '/time-entries/log-time'">
                <h3>创建</h3>
            </div>

            <hr/>
            
            <!-- 下一级视图 -->
            <router-view></router-view>

            <hr/>

            <div class="time-entries">
                <p v-if="!timeEntries.length"><strong>没有任何任务</strong></p>
                <div class="list-group">
                    <a v-for="timeEntry in timeEntries" class="list-group-item">
                        <div class="row">
                            <div class="col-sm-2 user-details">
                                <img :src="timeEntry.user.image" class="avatar img-circle img-responsive">
                                <p class="text-center">
                                    <strong>
                                        {{timeEntry.user.name}}
                                    </strong>
                                </p>
                            </div>
                            <div class="col-sm-3 text-center time-block">
                                <div class="list-group-item-text total-time">
                                    <i class="glyphicon glyphicon-time">
                                        {{timeEntry.totalTime}}
                                    </i>
                                </div>
                                <p class="label label-primary text-center">
                                    <i class="glyphicon glyphicon-calendar">
                                        {{timeEntry.date}}
                                    </i>
                                </p>
                            </div>
                            <div class="col-sm-6 comment-section">
                                <p>{{timeEntry.comment}}</p>
                            </div>
                            <div class="col-sm-1">
                                <button class="btn btn-xs btn-danger delete-button" @click="deleteTimeEntry(timeEntry)">
                                    X
                                </button>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </template>

一个跳转到创建业务页面的按钮，以及展示页面列表

它的脚本如下：

    <script>
        export default{
            data(){
                let existingEntry = {
                    user: {
                        name: '二哲',
                        email: 'kodo@forchange.cn',
                        image: 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256'
                    },
                    comment: '我的一个备注',
                    totalTime: 1.5,
                    date: '2016-05-01'
                }
                return {
                    timeEntries:[existingEntry]
                }
            },
            methods:{
                deleteTimeEntry(timeEntry){
                    let index = this.timeEntries.indexOf(timeEntry);
                    if(window.confirm('确定要删除吗?'));
                    this.timeEntries.splice(index,1);
                    // 派发到父组件上，执行父组件events里面的deleteTime方法
                    this.$dispatch('deleteTime',timeEntry);
                }
            },
            events:{
                timeUpdate(timeEntry){
                    this.timeEntries.push(timeEntry);
                    return true;
                }
            }
        }
    </script>

里面写了一个虚拟数据 `existingEntry`，一个删除任务的方法，以及一个子元素触发父元素的 `timeUpdate`  事件。

最后还补充了一些样式代码：

    <style lang="less">
        .list-group-item{
            p{
                margin-bottom: 0;
            }
            padding-top:0;
            padding-bottom: 0;
            .avatar{
                height: 40px;
                margin:8px auto 0;
            }
            .user-details{
                background-color: #f5f5f5;
                border-right: 1px solid #ddd;
            }
            .time-block{
                padding:15px;
            }
            .comment-section{
                padding:20px;
            }
            .delete-button{
                margin-top: 5px;
            }
        }
    </style>

看到页面现在显示如下：

<img src="{{site.baseurl}}/source/2016.07.31/3.png">

### 编写创建任务页面 LogTime.vue

我们还是先修改 `main.js` 文件：

    import LogTime from './components/LogTime.vue';

    ...

    router.map({
        '/home': {
            component: Home
        },
        '/time-entries': {
            component: TimeEntries,
            subRoutes: {
                '/log-time': {
                    component: LogTime
                }
            }
        }
    });

而我们 `logTime.vue` 的模板如下：

    <template>
        <div class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-6">
                    <label>名字</label>
                    <input type="text" class="form-control" v-model="timeEntry.user.name" placeholder="Name">
                </div>
                <div class="col-sm-6">
                    <label>邮箱</label>
                    <input type="email" class="form-control" v-model="timeEntry.user.email" placeholder="Email">
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label>日期</label>
                    <input type="date" class="form-control" v-model="timeEntry.date" placeholder="Date">
                </div>
                <div class="col-sm-6">
                    <label>时间</label>
                    <input type="number" class="form-control" v-model="timeEntry.totalTime" placeholder="Hours">
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label>头像图片地址</label>
                    <input type="url" class="form-control" v-model="timeEntry.user.image" placeholder="Imaeg" value="https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256">
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label>备注</label>
                    <input type="text" class="form-control" v-model="timeEntry.comment" placeholder="Comment">
                </div>
            </div>
            <button class="btn btn-primary" @click="save()">保存</button>
            <button v-link="'/time-entries'" class="btn btn-danger">取消</button>
        </div>
    </template>

就是一个简单的表单填写

他的脚本如下：

    <script>
        export default{
            data(){
                return {
                    timeEntry:{
                        user:{

                        }
                    }
                }
            },
            methods:{
                save(){
                    let timeEntry = this.timeEntry;
                    this.$dispatch('timeUpdate',timeEntry);
                    this.timeEntry = {
                        user:{
                            
                        }
                    };
                }
            }
        }
    </script>

`save()`方法会触发父元素的 `timeUpdate` 方法

看到页面现在显示如下：

<img src="{{site.baseurl}}/source/2016.07.31/4.png">

### 编写侧边栏时间统计 Sidebar.vue

我们先回到我们的 `App.vue` 文件，修改下面的代码：

    <div class="container">
        <div class="col-sm-3">
            <sidebar :time="totalTime"></sidebar>
        </div>
        <div class="col-sm-9">
            <router-view></router-view>
        </div>
    </div>

    ...

    <script>
        import Sidebar from './components/Sidebar.vue';
        export default{
            components:{
                'sidebar':Sidebar
            },
            data(){
                return {
                    totalTime:1.5
                }
            },
            events:{
                timeUpdate(timeEntry){
                    this.totalTime += parseFloat(timeEntry.totalTime);
                },
                deleteTime(timeEntry){
                    this.totalTime -= parseFloat(timeEntry.totalTime);
                }
            }
        }
    </script>

上面会继续使用虚拟数据：总时间1.5

而 `Sidebar.vue` 文件就非常简单了 

    <template>
        <div class="panel panel-default">
            <div class="panel-heading">
                <div class="text-center">
                    已有时长
                </div>
            </div>
            <div class="panel-body">
                <div class="text-center">
                    {{time}}小时
                </div>
            </div>
        </div>
    </template>
    <script>
        export default{
            props:['time']
        }
    </script>

看到页面现在显示如下：

<img src="{{site.baseurl}}/source/2016.07.31/5.png">

### 配合后台抓取数据

我们先把虚拟数据给删除掉

`TimeEntries.vue` 文件：

    data(){
        // let existingEntry = {
        //     user: {
        //         name: '二哲',
        //         email: 'kodo@forchange.cn',
        //         image: 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256'
        //     },
        //     comment: '我的一个备注',
        //     totalTime: 1.5,
        //     date: '2016-05-01'
        // }
        return {
            // timeEntries:[existingEntry]
            timeEntries:[]
        }
    },

`App.vue` 文件：

    data(){
        return {
            totalTime:0
        }
    }

[后台配合 mongodb 的代码可以在这里查看](https://github.com/cody1991/learn/commit/62e84b9afe914c17ea7961c76fd90171b03336e4)
