jQuery(s=>{s(document).ready(()=>{AOS.init({duration:1e3}),s(".js-scroll").click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var t=s(this.hash),e=s(".links-section").outerHeight();if(s(".links-section").hasClass("fixed")&&(e=0),(t=t.length?t:s("[name="+this.hash.slice(1)+"]")).length)return s("html,body").animate({scrollTop:t.offset().top-e},1e3),!1}}),s(window).width()<992&&(s(".links-section__links").mouseover(function(){const t=s(this).outerWidth()+"px",e=s(".links-section__list:first .links-section__links").offset().left,i=parseFloat(s(this).closest(".owl-stage").css("transform").split(",")[4]),n=s(this).offset().left-e+i+"px";s(".links-section__nav-scroll").css({"-webkit-transform":"translate("+n+")","-ms-transform":"translate("+n+")",transform:"translate("+n+")",width:t})}),s(".links-section__links").mouseleave(function(){const t=s(".links-section__item.active .links-section__links").outerWidth()+"px",e=s(".links-section__list:first .links-section__links").offset().left,i=parseFloat(s(this).closest(".owl-stage").css("transform").split(",")[4]),n=s(".links-section__item.active .links-section__links").offset().left-e+i+"px";s(".links-section__nav-scroll").css({"-webkit-transform":"translate("+n+")","-ms-transform":"translate("+n+")",transform:"translate("+n+")",width:t})})),s(window).width()>992&&(s(".links-section__links").mouseover(function(){const t=s(this).outerWidth()+"px",e=s(".links-section__list:first .links-section__links").offset().left,i=s(this).offset().left-e+"px";s(".links-section__nav-scroll").css({"-webkit-transform":"translate("+i+")","-ms-transform":"translate("+i+")",transform:"translate("+i+")",width:t})}),s(".links-section__links").mouseleave(function(){const t=s(".links-section__item.active .links-section__links").outerWidth()+"px",e=s(".links-section__list:first .links-section__links").offset().left,i=s(".links-section__item.active .links-section__links").offset().left-e+"px";s(".links-section__nav-scroll").css({"-webkit-transform":"translate("+i+")","-ms-transform":"translate("+i+")",transform:"translate("+i+")",width:t})})),s("#sub_nav").scrollspy2({offset:-100,onChange:function(t){let e=t[0].getAttribute("id"),i=s('.links-section__links[href="#'+e+'"]'),n=i.parents(".owl-item").index();n<s(".links-section__list .owl-item").length-1&&s(".links-section__list").trigger("to.owl.carousel",[n]),setTimeout(function(){const t=i.outerWidth()+"px",e=s(".links-section__list:first .links-section__links").offset().left;var n=0;if(0!=s(".links-section__list .owl-stage").length){var o=parseFloat(i.closest(".owl-stage").css("transform").split(",")[4]);n=(s(".links-section__list .owl-item").length,i.offset().left-e+o+"px")}else n=i.offset().left-e+"px";s(".links-section__nav-scroll").css({"-webkit-transform":"translate("+n+")","-ms-transform":"translate("+n+")",transform:"translate("+n+")",width:t})},300)}},1e3);let t=s(".links-section__wrapper").innerHeight();s(".links-section__dropdown").css("top",t);let e=s(".links-section__wrapper").offset().top;function i(t){var e=0,i=0;t.css("height","auto"),t.each(function(){(i=s(this).height())>e&&(e=i)}),t.height(e)}s(window).bind("scroll",function(){s(window).scrollTop()>e&&!s(".links-section").hasClass("fixed")&&(s(".links-section").fadeOut(100),s(".links-section").addClass("fixed"),s(".links-section").slideDown(500)),s(window).scrollTop()<e&&s(".links-section").hasClass("fixed")&&s(".links-section").removeClass("fixed")}),s(".dropdown-js").click(function(t){t.preventDefault();let e=s(this).find(".fas");e.hasClass("fa-chevron-down")?(e.removeClass("fa-chevron-down").addClass("fa-chevron-up"),s(".links-section__dropdown").slideDown()):e.hasClass("fa-chevron-up")&&(e.removeClass("fa-chevron-up").addClass("fa-chevron-down"),s(".links-section__dropdown").slideUp())}),s(".customers__nav-slider-js").slick({slidesToShow:4,asNavFor:".customers__slider-js",arrows:!1,draggable:!1,focusOnSelect:!0,responsive:[{breakpoint:767,settings:{centerMode:!0,centerPadding:"60px",infinite:!0,draggable:!0,slidesToShow:1}}]}),s(".customers__slider-js").slick({slidesToShow:1,arrows:!0,fade:!0,draggable:!1,autoplay:!0,autoplaySpeed:5e3,pauseOnHover:!0,asNavFor:".customers__nav-slider-js"}),s(".customers__slider-js").on("beforeChange",function(t,e){var i,n,o;o="customers__slider-item"==(i=s(e.$slider).find(".slick-current")).attr("class").split(" ")[0]?{method:"pause",value:"true"}:{event:"command",func:"pauseVideo"},null!=(n=i.find("iframe").get(0))&&n.contentWindow.postMessage(JSON.stringify(o),"*")}),s(".products__slider-js").owlCarousel({autoWidth:!0,nav:!0,dots:!1,rewind:!0,responsive:{992:{items:1},1150:{items:2},1460:{items:3},1790:{items:4}}}),s(window).width()<992&&s(".links-section__list").owlCarousel({autoWidth:!0,dots:!1,nav:!0,rewind:!0,items:1}),s(window).on("resize",function(){i(s(".products__item-cell--image")),i(s(".products__item-cell--specs")),i(s(".products__item-cell--data")),i(s(".products__item-cell--features"))}).resize(),s(".customers__play-btn").click(function(){const t=s(this).siblings(".customers__video"),e=s(this).siblings(".customers__video-image"),i=s(this).siblings(".customers__shadow-layer");s(t).attr("src",s(t).data("src")).removeAttr("data-src"),s(t)[0].src+="&autoplay=1",s(this).hide(),s(i).hide(),s(e).css({opacity:"0"})})})});