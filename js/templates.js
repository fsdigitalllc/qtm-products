(function () {
     //Scroll to top icon
    /*$(window).scroll(function () {
        var iCurScrollPos = $(this).scrollTop();
        if (iCurScrollPos > 1000) {
            $('.scrollToTop').css("display", "block");
        } else {
            $('.scrollToTop').css("display", "none");
        }
    });

    $('.scrollToTop').click(function () {
        $('html, body').animate({
            scrollTop: $('body').offset().top
        }, "fast");
    });

    $('.model-box').click(function (e) {
        e.preventDefault();
    });

    var productPage = {
        "height": 0,
    };*/


    $(document).ready(function () {
        if ($('.owl-carousel.featured-carousel').length > 0) {
            var featuredCarousel = $('.owl-carousel.featured-carousel');
            featuredCarousel.owlCarousel({
                loop: true,
                margin: 30,
                responsive: {
                    0: {
                        items: 1
                    }
                }
            });
        }

        if ($('.owl-carousel.our-customers-carousel').length > 0) {
            var ourCustomersCarousel = $('.owl-carousel.our-customers-carousel');
            ourCustomersCarousel.owlCarousel({
                dots: true,

                loop: true,
                margin: 30,
                responsive: {

                    0: {
                        items: 1
                    }
                }
            });
        }

        if ($('.owl-carousel.product-carousel').length > 0) {
            var productCarousel = $('.owl-carousel.product-carousel');
            productCarousel.owlCarousel({
                loop: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    476: {
                        items: 2
                    },
                    1200: {
                        items: 3
                    }
                },
                margin: 30,
            });
        }

        if ($('.owl-carousel.success-carousel').length > 0) {
            var successCarousel = $('.owl-carousel.success-carousel');
            successCarousel.owlCarousel({
                loop: true,
                responsive: {
                    0: {
                        items: 1
                    }
                }
            });
        }

        if ($('.owl-carousel.resource-carousel').length > 0) {
            var resourceCarousel = $('.owl-carousel.resource-carousel');
            resourceCarousel.owlCarousel({
                loop: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    767: {
                        items: 3
                    },
                    1200: {
                        items: 3
                    }
                },
                margin: 30,
            });
        }

        if ($('.owl-carousel.video-carousel').length) {
            var videoCarousel = $('.owl-carousel.video-carousel');
            videoCarousel.owlCarousel({
                loop: false,
                margin: 15,
                slideBy: 4,
                autoplay: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    476: {
                        items: 2
                    },
                    1200: {
                        items: 4
                    }
                }
            });
        }

        //$('.owl-item.active  a.not(".floatBox")').click(function (e) {
        //    e.preventDefault();
        //    var href = $(this).attr('href');
        //    window.open(href);
        //});

        // Technical Specifications Accordion Sc

    });
        
    
	//Technical Specifications Accordion Script
	
		  var headers = $('#accordion .accordion-header');
				var contentAreas = $('#accordion .ui-accordion-content.closeOnload').hide();
				var expandLink = $('.accordion-expand-all');
				
				// add the accordion functionality
				headers.click(function() {
					var panel = $(this).next();
					var isOpen = panel.is(':visible');

					// open or close as necessary
					panel[isOpen? 'slideUp': 'slideDown']()
						// trigger the correct custom event
						.trigger(isOpen? 'hide': 'show');

					// stop the link from causing a pagescroll
					return false;
				});

				// hook up the expand/collapse all
				expandLink.click(function(){
					var isAllOpen = $(this).data('isAllOpen');

					contentAreas[isAllOpen? 'hide': 'show']()
						.trigger(isAllOpen? 'hide': 'show');
				});

				// when panels open or close, check to see if they're all open
				contentAreas.on({
					// whenever we open a panel, check to see if they're all open
					// if all open, swap the button to collapse
					show: function(){
						var isAllOpen = !contentAreas.is(':hidden');
						$('.ui-accordion-content.openOnload').show();
						if(isAllOpen){
							expandLink.text('Collapse All')
								.data('isAllOpen', true);
						}
					},
					// whenever we close a panel, check to see if they're all open
					// if not all open, swap the button to expander
					hide: function(){
						var isAllOpen = !contentAreas.is(':hidden');
						$('.ui-accordion-content.openOnload').hide();
						if(!isAllOpen){
							expandLink.text('Expand all')
							.data('isAllOpen', false);
						} 
					}
				});
	
})();