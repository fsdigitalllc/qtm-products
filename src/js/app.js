// ES6, ES7, ES8 supported

jQuery(function($) {

    $(document).ready(function() {

        //AOS plugin initialization
        AOS.init({
            duration: 1000
        });

        // smooth scrolling for down button
        $('.js-scroll').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                var menuHeight = $(".links-section").outerHeight();

                if ($(".links-section").hasClass("fixed") ) {
                    menuHeight = 0;
                }
                
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - menuHeight,
                    }, 1000);
                    return false;
                }
            }
        });

        // Home page ancors hover
        if ($(window).width() < 992) {
            $('.links-section__links').mouseover(function () {
                const tabWidth = $(this).outerWidth() + 'px';
                const startPos = $('.links-section__list:first .links-section__links').offset().left;
                const carouselOffset = parseFloat($(this).closest('.owl-stage').css('transform').split(',')[4]); // Get translateX value
                const pos = $(this).offset().left - startPos + carouselOffset + 'px';
                $('.links-section__nav-scroll').css({
                    '-webkit-transform': 'translate(' + pos + ')',
                    '-ms-transform': 'translate(' + pos + ')',
                    'transform': 'translate(' + pos + ')',
                    'width' : tabWidth
                });
            });
            $('.links-section__links').mouseleave(function () {
                const tabWidth = $('.links-section__item.active .links-section__links').outerWidth() + 'px';
                const startPos = $('.links-section__list:first .links-section__links').offset().left;
                const carouselOffset = parseFloat($(this).closest('.owl-stage').css('transform').split(',')[4]); // Get translateX value
                const pos = $('.links-section__item.active .links-section__links').offset().left - startPos + carouselOffset + 'px';
                $('.links-section__nav-scroll').css({
                    '-webkit-transform': 'translate(' + pos + ')',
                    '-ms-transform': 'translate(' + pos + ')',
                    'transform': 'translate(' + pos + ')',
                    'width' : tabWidth
                });
            });
        }
        if ($(window).width() > 992) {
            $('.links-section__links').mouseover(function () {
                const tabWidth = $(this).outerWidth() + 'px';
                const startPos = $('.links-section__list:first .links-section__links').offset().left;
                const pos = $(this).offset().left - startPos + 'px';
                $('.links-section__nav-scroll').css({
                    '-webkit-transform': 'translate(' + pos + ')',
                    '-ms-transform': 'translate(' + pos + ')',
                    'transform': 'translate(' + pos + ')',
                    'width' : tabWidth
                });
            });
            $('.links-section__links').mouseleave(function () {
                const tabWidth = $('.links-section__item.active .links-section__links').outerWidth() + 'px';
                const startPos = $('.links-section__list:first .links-section__links').offset().left;
                const pos = $('.links-section__item.active .links-section__links').offset().left - startPos + 'px';
                $('.links-section__nav-scroll').css({
                    '-webkit-transform': 'translate(' + pos + ')',
                    '-ms-transform': 'translate(' + pos + ')',
                    'transform': 'translate(' + pos + ')',
                    'width' : tabWidth
                });
            });
        }

        // Sub nav scrollspy for section activation
        $('#sub_nav').scrollspy2({
            offset: -100,
            onChange: function (section) {
                let id = section[0].getAttribute('id');
                let item = $('.links-section__links[href="#'+id+'"]');
                // let n = item.parents('.owl-item').not('.active').index();
                let n = item.parents('.owl-item').index();
                if(n < $('.links-section__list .owl-item').length -1) {
                    $('.links-section__list').trigger('to.owl.carousel', [n]);
                }
                setTimeout(function () {
                    const tabWidth = item.outerWidth() + 'px';
                    const startPos = $('.links-section__list:first .links-section__links').offset().left;
                    var pos = 0;
                    if($('.links-section__list .owl-stage').length != 0) {
                        var carouselOffset = parseFloat(item.closest('.owl-stage').css('transform').split(',')[4]); // Get translateX value
                        if(n == $('.links-section__list .owl-item').length -1) {
                            pos = item.offset().left - startPos + carouselOffset + 'px';
                        } else {
                            pos = item.offset().left  - startPos + carouselOffset + 'px';
                        }
                    } else {
                        pos = item.offset().left - startPos + 'px';
                    }
                    $('.links-section__nav-scroll').css({
                        '-webkit-transform': 'translate(' + pos + ')',
                        '-ms-transform': 'translate(' + pos + ')',
                        'transform': 'translate(' + pos + ')',
                        'width' : tabWidth
                    });
                }, 300)
            }
        }, 1000);


        //Home page ancors fixing
        let ancorHeight = $('.links-section__wrapper').innerHeight();
        // $('.links-section').css('height', ancorHeight);
        $('.links-section__dropdown').css('top', ancorHeight);

        let toTop = $('.links-section__wrapper').offset().top;
        $(window).bind('scroll', function () {
            if ($(window).scrollTop() > toTop && !$('.links-section').hasClass('fixed')) {
                $('.links-section').fadeOut(100);
                $('.links-section').addClass('fixed');
                $('.links-section').slideDown(500);
            }
            if($(window).scrollTop() < toTop && $('.links-section').hasClass('fixed')) {
                // toTop = $('.links-section').offset().top;
                $('.links-section').removeClass('fixed');
            }
        });

         //Home page dropdown
         $('.dropdown-js').click(function (e) {
            e.preventDefault();
            let icon = $(this).find('.fas,.svg-inline--fa');
            if (icon.hasClass('fa-chevron-down')) {
                icon.removeClass('fa-chevron-down').addClass('fa-chevron-up');
                $('.links-section__dropdown').slideDown();
            } else if (icon.hasClass('fa-chevron-up')) {
                icon.removeClass('fa-chevron-up').addClass('fa-chevron-down');
                $('.links-section__dropdown').slideUp();
            }
        });

        //Customers slider
        $('.customers__nav-slider-js').slick({
            slidesToShow: 4,
            asNavFor: '.customers__slider-js',
            arrows: false,
            draggable: false,
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        centerMode: true,
                        centerPadding: '60px',
                        infinite: true,
                        draggable: true,
                        slidesToShow: 1
                    }
                }
            ]
        });
        $('.customers__slider-js').slick({
            slidesToShow: 1,
            arrows: true,
            fade: true,
            draggable: false,
            autoplay: true,
            autoplaySpeed: 5000,
            pauseOnHover: true,
            asNavFor: '.customers__nav-slider-js'
        });

        // Setting video on pause when sliding
        $('.customers__slider-js').on('beforeChange', function(event, slick) {
            var currentSlide, slideType, player, command;

            //find the current slide element and decide which player API we need to use.
            currentSlide = $(slick.$slider).find(".slick-current");

            //determine which type of slide this, via a class on the slide container. This reads the second class, you could change this to get a data attribute or something similar if you don't want to use classes.
            slideType = currentSlide.attr("class").split(" ")[0];

            //get the iframe inside this slide.
            player = currentSlide.find("iframe").get(0);

            if (slideType == "customers__slider-item") {
                command = {
                    "method": "pause",
                    "value": "true"
                };
            } else {
                command = {
                    "event": "command",
                    "func": "pauseVideo"
                };
            }

            //check if the player exists.
            if (player != undefined) {
                //post our command to the iframe.
                player.contentWindow.postMessage(JSON.stringify(command), "*");
            }

        });

        //Products slider
        $(".products__slider-js").owlCarousel({
            autoWidth: true,
            nav: true,
            dots: false,
            rewind: true,
            responsive: {
                992 : {
                    items: 1
                },
                1150 : {
                    items: 2
                },
                1460 : {
                    items: 3
                },
                1790 : {
                    items: 4
                }
            }
        });
        if ($(window).width() < 992) {
            $(".links-section__list").owlCarousel({
                autoWidth: true,
                dots: false,
                nav: true,
                rewind: true,
                items: 1
            });
        }

        //height block
        function setEqualHeight(columns)
        {
            var tallestcolumn = 0;
            var currentHeight = 0;
            columns.css('height', 'auto');
            columns.each(function () {
                currentHeight = $(this).height();
                if (currentHeight > tallestcolumn) {
                    tallestcolumn = currentHeight;
                }
            });
            columns.height(tallestcolumn);
        }
        $(window).on("resize",function() {
            setEqualHeight($(".products__item-cell--image"));
            setEqualHeight($(".products__item-cell--specs"));
            setEqualHeight($(".products__item-cell--data"));
            setEqualHeight($(".products__item-cell--features"));
        }).resize();

        // Play-button on Home page
        $('.customers__play-btn').click(function() {
            const video = $(this).siblings('.customers__video');
            const image = $(this).siblings('.customers__video-image');
            const shadow = $(this).siblings('.customers__shadow-layer');
            $(video).attr("src", $(video).data('src')).removeAttr('data-src');
            $(video)[0].src += "&autoplay=1";
            $(this).hide( );
            $(shadow).hide( );
            $(image).css({'opacity' : '0'});
        });

    });
});
