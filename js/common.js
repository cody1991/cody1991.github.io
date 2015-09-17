 window.onload = function() {
     $('#loading').remove();
     $('body').css('overflow', 'auto');
 }
 $(document).ready(function() {

     //  unveil function
     (function($) {
         $.fn.unveil = function(threshold, callback) {
             var $w = $(window),
                 th = threshold || 0,
                 retina = window.devicePixelRatio > 1,
                 attrib = retina ? "data-src-retina" : "data-src",
                 images = this,
                 loaded;
             this.one("unveil", function() {
                 var source = this.getAttribute(attrib);
                 source = source || this.getAttribute("data-src");
                 if (source) {
                     this.setAttribute("src", source);
                     if (typeof callback === "function") callback.call(this);
                 }
             });

             function unveil() {
                 var inview = images.filter(function() {
                     var $e = $(this);
                     if ($e.is(":hidden")) return;

                     var wt = $w.scrollTop(),
                         wb = wt + $w.height(),
                         et = $e.offset().top,
                         eb = et + $e.height();

                     return eb >= wt - th && et <= wb + th;
                 });

                 loaded = inview.trigger("unveil");
                 images = images.not(loaded);
             }
             $w.on("scroll.unveil resize.unveil lookup.unveil", unveil);
             unveil();
             return this;
         };
     })(jQuery);

     // scrollTop function
     (function(a) {
         a.fn.scrollToTop = function(c) {
             var d = {
                 speed: 800
             };
             c && a.extend(d, {
                 speed: c
             });
             return this.each(function() {
                 var b = a(this);
                 a(window).scroll(function() {
                     100 < a(this).scrollTop() ? b.fadeIn() : b.fadeOut()
                 });
                 b.click(function(b) {
                     b.preventDefault();
                     a("body, html").animate({
                         scrollTop: 0
                     }, d.speed)
                 })
             })
         }
     })(jQuery);

     var blog = (function() {
         function pageInit() {
             var page = $('.page'),
                 pageNum = page.find('.pageNum'),
                 pageWidth = 0;
             pageNum.each(function() {
                 pageWidth += ($(this).width());
             });
             $('.page').width(pageWidth);
         }

         function navInit() {
             var other_pgae_url = window.location.href;
             var indexF = other_pgae_url.indexOf('sysutangzxBlog');
             other_pgae_url = '/' + other_pgae_url.substr(indexF);
             console.log(other_pgae_url);
             $('.page-link').each(function() {
                 var thishref = $(this).attr('href');
                 thishrefIndex = thishref.indexOf('#');
                 thishref = thishref.substr(thishrefIndex + 1);
                 if (other_pgae_url.indexOf(thishref) != -1) {
                     console.log(thishref);
                     console.log(other_pgae_url)
                     $(this).addClass('active');
                 }
             })
             if ($('.category-main').length != 0) {
                 var url = window.location.href;
                 var indexFlag = url.indexOf('#');

                 var old_cate;
                 var categoryClass;

                 if (indexFlag < 0) {
                     $('.category-main > div').eq(0).fadeIn();
                     $('.page-link').eq(0).addClass('active');
                 } else {
                     old_cate = '#' + url.substr(indexFlag + 1);
                     categoryClass = '.' + url.substr(indexFlag + 1);
                     if (categoryClass.length <= 1) {
                         $('.category-main > div').eq(0).fadeIn();
                         $('.page-link').eq(0).addClass('active');
                     } else {
                         $(categoryClass).fadeIn();
                         $('.page-link').each(function() {
                             if ($(this).attr('href').indexOf(old_cate) != -1) {
                                 console.log($(this).attr('href'));
                                 console.log(old_cate)
                                 $(this).addClass('active');
                             }
                         })
                     }
                 }
                 $('.page-link').click(function() {
                     $('.page-link').removeClass('active');
                     $(this).addClass('active');
                     var url = $(this).attr('href');
                     var indexFlag = url.indexOf('#');
                     url = url.substr(indexFlag + 1);
                     url = '.' + url;
                     $('.category-main > div').hide();
                     $(url).fadeIn();
                 })

             }
         }

         function init() {
             $("#toTop").scrollToTop();
             $('.book-images').unveil();
             var siteNav = $('#site-nav');

             $(window).on('scroll', function() {

                 if ($(window).scrollTop() > 100) {
                     siteNav.addClass('reading');
                 } else {
                     siteNav.removeClass('reading');
                 }
             });
             pageInit();
             navInit();
         }

         return {
             init: init
         }
     })();

     blog.init();


 });
