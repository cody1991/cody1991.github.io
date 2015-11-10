使用jekyll模板来创建的个人博客

./study
---

存放着个人学习的源代码

./post
---

存放着所有文章的markdown格式文件

./recycle
---

存放着舍弃了的文章文件

./source
---

存放一个图片等其他资源


#Welcome simplified jekyll theme

The purpose of this jekyll theme is to make a simplified theme.

#Usage

see the `_config.yml` 

    # Site settings
    encoding: utf-8
    title: Home
    description: simplified-jekyll-theme
    baseurl: "http://cody1991.github.io/simplified-jekyll-theme" 
    #baseurl: ''
    github_username:  cody1991
    paginate: 6
    paginate_path: "/page:num"
    footer_github: "cody的github"
    footer_resume_site: "http://cody1991.github.io/aboutme/index.html"
    port: 8080

you juse neet to change

    1   `title` as your site's title
    2   `description` as your site's description
    3   `baseurl` is empty when you are running localhost with the `port` and the long baseurl is your site's url
    4   `github_username` is your github's name
    
...more and more