#### Update

2017.09.07 Update duoshuo to gitment , see [commit](https://github.com/cody1991/cody1991.github.io/commit/2996c8f2e4aa90e5e33764605c407f5fd18eb1a2) , refer [gitment-introduction](https://imsun.net/posts/gitment-introduction/)

## Welcome simplified Jekyll theme

The purpose of this Jekyll theme is to make a simplified theme.

## Usage

first, see the [Jekyll • Simple, blog-aware, static sites - Transform your plain text into static websites and blogs](http://jekyllrb.com/) to get you Jekyll installed.

---

Then see the `_config.yml` 

    # Site settings
    encoding: utf-8
    title: Cody
    description: Cody1991的个人博客
    baseurl: "http://cody1991.github.io" 
    # baseurl: ''
    github_username:  cody1991
    paginate: 5
    paginate_path: "/page:num"
    footer_books: "书旅"
    footer_github: "GitHub"
    footer_resume: "简历"
    footer_resume_site: "http://cody1991.github.io/aboutme/index.html"
    port: 8070
    gems: [jekyll-paginate]

You juse neet to change

    * `title` as your site's title
    * `description` as your site's description
    * `baseurl` is empty when you are running localhost with the `port` and the long baseurl is your site's url
    * `github_username` is your github's name
    * `paginate` as the number of blog every page
    * `paginate_path` as the format of the paginate
    * `footer_*` as the description of the footer link
    * `port` as the prot when you are running localhost
    * `gems` as an array contains some plugins you are using
    
## License
The MIT License (MIT)

Copyright (c) 2015~2017 cody1991

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
