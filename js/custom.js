var Misc = (function () {
    function createCookieInHours(name, value, hours)
    {
        if (hours)
        {
            var date = new Date();
            date.setTime(date.getTime()+(hours*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else
        {
            var expires = "";
        }

        document.cookie = name+"="+value+expires+"; path=/";
    }

    function createCookieInDays(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";

        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        createCookie(name, "", -1);
    }

    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }

    function getUrlAllParameter() {
        var sPageURL = decodeURIComponent(window.location.search.substring(1));
        if (sPageURL != '') {
            sPageURL = '?' + sPageURL;
        }
        return sPageURL;
    }

    return {
        createCookieInDays: createCookieInDays,
        createCookieInHours: createCookieInHours,
        readCookie: readCookie,
        eraseCookie: eraseCookie,
        getUrlParameter: getUrlParameter,
        getUrlAllParameter: getUrlAllParameter
    }

})();

$(document).ready(function () {
    $('.footer-column:last-child>ul.footer-links>li>a').click(function(){
        window.open(this.href);
        return false;
    });

    // Open/close category menu
    $('.cat-menu a').click(function (e) {
        e.preventDefault();
        $('.category-menu').toggleClass('active');
        $('.filters-fixed').removeClass('show');
    });

    $('.category-menu a.close-btn').click(function (e) {
        e.preventDefault();
        $('.category-menu').removeClass('active');
    });


    //Check Mobile Devices
    var checkMobile = function(){

        //Check Device
        var isTouch = ('ontouchstart' in document.documentElement);

        //Check Device //All Touch Devices
        if ( isTouch ) {

            // Category sub menu
            $('.category-menu .has-sub a > i.fa ').click(function (e) {
                e.preventDefault();
                if($(this).parent().next('.sub-holder').hasClass('open')) {
                    $(this).parent().next('.sub-holder').removeClass('open');
                } else {
                    $('.category-menu .has-sub .sub-holder.open').removeClass("open");
                    $(this).parent().next('.sub-holder').addClass('open');
                }
            });

        }

    };

    //Execute Check
    checkMobile();


    // Recent Posts Slider
    $('.recent-articles-slider').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        adaptiveHeight: true,
        prevArrow: $('.arrow-prev.recent'),
        nextArrow: $('.arrow-next.recent')
    });

    // Old Posts Slider
    $('.old-articles-slider').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        adaptiveHeight: true,
        prevArrow: $('.arrow-prev.old'),
        nextArrow: $('.arrow-next.old')
    });

    // Home Home Slider
    $('.home-home-slider').slick({
        dots: true,
        arrows: false,
        draggable: true,
        autoplay: true,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        adaptiveHeight: true,
        fade: true,
        cssEase: 'linear',
        appendDots: $('.custom-dots')
    });

    // Home Baby Slider
    $('.home-baby-slider').slick({
        dots: true,
        arrows: false,
        draggable: true,
        autoplay: true,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        adaptiveHeight: true,
        fade: true,
        cssEase: 'linear',
        appendDots: $('.custom-dots')
    });

    // Home Office Slider
    $('.home-office-slider').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        fade: true,
        cssEase: 'linear'
    });

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 80) {
            $(".sticky-header").addClass("sticky-it");
        } else {
            $(".sticky-header").removeClass("sticky-it");
        }
    });



    hiddenElements = $(':hidden');
    visibleElements = $(':visible');

    if($('.category-navigation:visible').length == 1) {
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            if (scroll >= 80) {
                $("body, .breadcrumb-holder, .filter-container, .filters-fixed").addClass("sticky-it");
            } else {
                $("body, .breadcrumb-holder, .filter-container, .filters-fixed").removeClass("sticky-it");
            }
        });
    }

    $('.search-close').click(function (e) {
        e.preventDefault();
        $('.dropdown-wrapper-click.from-top').removeClass('opened');
    });

    // var xhr;
    //
    // $(window).scroll(function() {
    //     var hT = $('.results-info').offset().top - 500,
    //         hH = $('.results-info').outerHeight() - 500,
    //         wH = $(window).height(),
    //         wS = $(this).scrollTop();
    //
    //     if (wS > (hT+hH-wH) && (hT > wS) && (wS+wH > hT+hH) && $.active === 0){
    //         $('.load-more a').trigger('click');
    //     }
    // });

    $('.per-row a').click(function (e) {
        var perRow = $(this).data('text');
        Misc.createCookieInDays('per_row', perRow, 10);
        $('.per-row a').each(function () {
            $('.product-holder').removeClass('grid'+$(this).data('text'));
            $(this).removeClass('active');
        })
        $(this).addClass('active');
        $('.product-holder').addClass('grid'+perRow);
        return false;
    })

    $('.container, .custom-search-container').on('click','.load-more a', function () {
        var url = $(this).attr('href');
        if (typeof xhr !== 'undefined') {
            xhr.abort()
        }
        xhr = $.ajax({
            url: url + '&loadmore=1',
            type: 'get',
            dataType: 'json',
            beforeSend: function() {
                $('body').append('<span class="basel-spinner ajax-call"></span>');
                $('.grid-holder.product-holder').fadeTo( 0, 0.4 );
            },
            success: function(json) {
                $('.product-holder').append(json.products);
                $('.pagination-holder div').html(json.pagination);
                $('.results-info').html(json.results_info);
                if (typeof BrainyFilter !== 'undefined') {
                    BrainyFilter.addBFilterParam();
                }
                window.history.pushState({href: url}, '', url);
                $('.basel-spinner.ajax-call').remove();
                $('.grid-holder.product-holder').fadeTo( 400, 1 );
            }
        });
        return false;
    });

    // Remove Greek Accents
    $("span, h1, h2, h3, h4, h5, h6, p, a, strong, td, button, option").each( function() {
        if($(this).css('text-transform') == 'uppercase') {
            $(this).html($(this).html().replace(/[ά]/g, "α"));
            $(this).html($(this).html().replace(/[έ]/g, "ε"));
            $(this).html($(this).html().replace(/[ή]/g, "η"));
            $(this).html($(this).html().replace(/[ύ]/g, "υ"));
            $(this).html($(this).html().replace(/[ώ]/g, "ω"));
            $(this).html($(this).html().replace(/[ί]/g, "ι"));
            $(this).html($(this).html().replace(/[ό]/g, "ο"));
            $(this).html($(this).html().replace(/[Ά]/g, "Α"));
            $(this).html($(this).html().replace(/[Έ]/g, "Ε"));
            $(this).html($(this).html().replace(/[Ή]/g, "Η"));
            $(this).html($(this).html().replace(/[Υ]/g, "Υ"));
            $(this).html($(this).html().replace(/[Ώ]/g, "Ω"));
            $(this).html($(this).html().replace(/[Ί]/g, "Ι"));
            $(this).html($(this).html().replace(/[Ό]/g, "Ο"));
        }
    });

    var width = $(window).width();
    if (width <= 767) {
        lastScroll = 0;
        $(window).on('scroll',function() {
            var scroll = $(window).scrollTop();

            if( (lastScroll - scroll > 150) && scroll > 151) {
                $(".sticky-header ").addClass("is-sticky");
                $(".placebo-header").addClass("header-is-sticky");
            } else {
                $(".sticky-header ").removeClass("is-sticky");
                $(".placebo-header").removeClass("header-is-sticky");
            }

            if((lastScroll - scroll < 0) && scroll > 0) {
                $(".sticky-header").addClass("hide-header");
            } else {
                $(".sticky-header").removeClass("hide-header");
            }
            lastScroll = scroll;
        });
    }

    if($('.filters-per-row-wrapper').length > 0){
        var controller = new ScrollMagic.Controller({container: "body"});
        new ScrollMagic.Scene({
            triggerHook: 0,
            triggerElement: ".filters-per-row-wrapper",
        })
            .setPin(".filters-per-row-wrapper")
            //.addIndicators({name: "trigger"}) // add indicators (requires plugin)
            .addTo(controller);
    }
});