$(document).ready(function() {
    $('#loading').remove();
    $('body').css('overflow', 'auto');

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
            var pageLinkList = $('.page-link'),
                categoryMain = $('.category-main'),
                touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
            hash = window.location.hash;

            $(hash).addClass('active');
            categoryMain.find(hash.replace(/#/, '.')).fadeIn();

            pageLinkList.on(touchEvent, function() {
                var curId = $(this).attr('id');
                $(this).siblings().removeClass('active').end().addClass('active')
                categoryMain.find('div').hide();
                categoryMain.find('.' + curId).fadeIn();
            });
        }

        function init() {
            $("#toTop").scrollToTop();
            $('.book-images').unveil(200, function() {
                $(this).removeClass('book-images');
            });
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
