/*!
 * parallax.js v1.5.0 (http://pixelcog.github.io/parallax.js/)
 * @copyright 2016 PixelCog, Inc.
 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
 */

;(function ( $, window, document, undefined ) {

  // Polyfill for requestAnimationFrame
  // via: https://gist.github.com/paulirish/1579671

  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  }());


  // Parallax Constructor

  function Parallax(element, options) {
    var self = this;

    if (typeof options == 'object') {
      delete options.refresh;
      delete options.render;
      $.extend(this, options);
    }

    this.$element = $(element);

    if (!this.imageSrc && this.$element.is('img')) {
      this.imageSrc = this.$element.attr('src');
    }

    var positions = (this.position + '').toLowerCase().match(/\S+/g) || [];

    if (positions.length < 1) {
      positions.push('center');
    }
    if (positions.length == 1) {
      positions.push(positions[0]);
    }

    if (positions[0] == 'top' || positions[0] == 'bottom' || positions[1] == 'left' || positions[1] == 'right') {
      positions = [positions[1], positions[0]];
    }

    if (this.positionX !== undefined) positions[0] = this.positionX.toLowerCase();
    if (this.positionY !== undefined) positions[1] = this.positionY.toLowerCase();

    self.positionX = positions[0];
    self.positionY = positions[1];

    if (this.positionX != 'left' && this.positionX != 'right') {
      if (isNaN(parseInt(this.positionX))) {
        this.positionX = 'center';
      } else {
        this.positionX = parseInt(this.positionX);
      }
    }

    if (this.positionY != 'top' && this.positionY != 'bottom') {
      if (isNaN(parseInt(this.positionY))) {
        this.positionY = 'center';
      } else {
        this.positionY = parseInt(this.positionY);
      }
    }

    this.position =
      this.positionX + (isNaN(this.positionX)? '' : 'px') + ' ' +
      this.positionY + (isNaN(this.positionY)? '' : 'px');

    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
      if (this.imageSrc && this.iosFix && !this.$element.is('img')) {
        this.$element.css({
          backgroundImage: 'url("' + this.imageSrc + '")',
          backgroundSize: 'cover',
          backgroundPosition: this.position
        });
      }
      return this;
    }

    if (navigator.userAgent.match(/(Android)/)) {
      if (this.imageSrc && this.androidFix && !this.$element.is('img')) {
        this.$element.css({
          backgroundImage: 'url("' + this.imageSrc + '")',
          backgroundSize: 'cover',
          backgroundPosition: this.position
        });
      }
      return this;
    }

    this.$mirror = $('<div />').prependTo(this.mirrorContainer);

    var slider = this.$element.find('>.parallax-slider');
    var sliderExisted = false;

    if (slider.length == 0)
      this.$slider = $('<img />').prependTo(this.$mirror);
    else {
      this.$slider = slider.prependTo(this.$mirror)
      sliderExisted = true;
    }

    this.$mirror.addClass('parallax-mirror').css({
      visibility: 'hidden',
      zIndex: this.zIndex,
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden'
    });

    this.$slider.addClass('parallax-slider').one('load', function() {
      if (!self.naturalHeight || !self.naturalWidth) {
        self.naturalHeight = this.naturalHeight || this.height || 1;
        self.naturalWidth  = this.naturalWidth  || this.width  || 1;
      }
      self.aspectRatio = self.naturalWidth / self.naturalHeight;

      Parallax.isSetup || Parallax.setup();
      Parallax.sliders.push(self);
      Parallax.isFresh = false;
      Parallax.requestRender();
    });

    if (!sliderExisted)
      this.$slider[0].src = this.imageSrc;

    if (this.naturalHeight && this.naturalWidth || this.$slider[0].complete || slider.length > 0) {
      this.$slider.trigger('load');
    }

  }


  // Parallax Instance Methods

  $.extend(Parallax.prototype, {
    speed:    0.2,
    bleed:    0,
    zIndex:   -100,
    iosFix:   true,
    androidFix: true,
    position: 'center',
    overScrollFix: false,
    mirrorContainer: 'body',

    refresh: function() {
      this.boxWidth        = this.$element.outerWidth();
      this.boxHeight       = this.$element.outerHeight() + this.bleed * 2;
      this.boxOffsetTop    = this.$element.offset().top - this.bleed;
      this.boxOffsetLeft   = this.$element.offset().left;
      this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;

      var winHeight = Parallax.winHeight;
      var docHeight = Parallax.docHeight;
      var maxOffset = Math.min(this.boxOffsetTop, docHeight - winHeight);
      var minOffset = Math.max(this.boxOffsetTop + this.boxHeight - winHeight, 0);
      var imageHeightMin = this.boxHeight + (maxOffset - minOffset) * (1 - this.speed) | 0;
      var imageOffsetMin = (this.boxOffsetTop - maxOffset) * (1 - this.speed) | 0;
      var margin;

      if (imageHeightMin * this.aspectRatio >= this.boxWidth) {
        this.imageWidth    = imageHeightMin * this.aspectRatio | 0;
        this.imageHeight   = imageHeightMin;
        this.offsetBaseTop = imageOffsetMin;

        margin = this.imageWidth - this.boxWidth;

        if (this.positionX == 'left') {
          this.offsetLeft = 0;
        } else if (this.positionX == 'right') {
          this.offsetLeft = - margin;
        } else if (!isNaN(this.positionX)) {
          this.offsetLeft = Math.max(this.positionX, - margin);
        } else {
          this.offsetLeft = - margin / 2 | 0;
        }
      } else {
        this.imageWidth    = this.boxWidth;
        this.imageHeight   = this.boxWidth / this.aspectRatio | 0;
        this.offsetLeft    = 0;

        margin = this.imageHeight - imageHeightMin;

        if (this.positionY == 'top') {
          this.offsetBaseTop = imageOffsetMin;
        } else if (this.positionY == 'bottom') {
          this.offsetBaseTop = imageOffsetMin - margin;
        } else if (!isNaN(this.positionY)) {
          this.offsetBaseTop = imageOffsetMin + Math.max(this.positionY, - margin);
        } else {
          this.offsetBaseTop = imageOffsetMin - margin / 2 | 0;
        }
      }
    },

    render: function() {
      var scrollTop    = Parallax.scrollTop;
      var scrollLeft   = Parallax.scrollLeft;
      var overScroll   = this.overScrollFix ? Parallax.overScroll : 0;
      var scrollBottom = scrollTop + Parallax.winHeight;

      if (this.boxOffsetBottom > scrollTop && this.boxOffsetTop <= scrollBottom) {
        this.visibility = 'visible';
        this.mirrorTop = this.boxOffsetTop  - scrollTop;
        this.mirrorLeft = this.boxOffsetLeft - scrollLeft;
        this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed);
      } else {
        this.visibility = 'hidden';
      }

      this.$mirror.css({
        transform: 'translate3d('+this.mirrorLeft+'px, '+(this.mirrorTop - overScroll)+'px, 0px)',
        visibility: this.visibility,
        height: this.boxHeight,
        width: this.boxWidth
      });

      this.$slider.css({
        transform: 'translate3d('+this.offsetLeft+'px, '+this.offsetTop+'px, 0px)',
        position: 'absolute',
        height: this.imageHeight,
        width: this.imageWidth,
        maxWidth: 'none'
      });
    }
  });


  // Parallax Static Methods

  $.extend(Parallax, {
    scrollTop:    0,
    scrollLeft:   0,
    winHeight:    0,
    winWidth:     0,
    docHeight:    1 << 30,
    docWidth:     1 << 30,
    sliders:      [],
    isReady:      false,
    isFresh:      false,
    isBusy:       false,

    setup: function() {
      if (this.isReady) return;

      var self = this;

      var $doc = $(document), $win = $(window);

      var loadDimensions = function() {
        Parallax.winHeight = $win.height();
        Parallax.winWidth  = $win.width();
        Parallax.docHeight = $doc.height();
        Parallax.docWidth  = $doc.width();
      };

      var loadScrollPosition = function() {
        var winScrollTop  = $win.scrollTop();
        var scrollTopMax  = Parallax.docHeight - Parallax.winHeight;
        var scrollLeftMax = Parallax.docWidth  - Parallax.winWidth;
        Parallax.scrollTop  = Math.max(0, Math.min(scrollTopMax,  winScrollTop));
        Parallax.scrollLeft = Math.max(0, Math.min(scrollLeftMax, $win.scrollLeft()));
        Parallax.overScroll = Math.max(winScrollTop - scrollTopMax, Math.min(winScrollTop, 0));
      };

      $win.on('resize.px.parallax load.px.parallax', function() {
          loadDimensions();
          self.refresh();
          Parallax.isFresh = false;
          Parallax.requestRender();
        })
        .on('scroll.px.parallax load.px.parallax', function() {
          loadScrollPosition();
          Parallax.requestRender();
        });

      loadDimensions();
      loadScrollPosition();

      this.isReady = true;

      var lastPosition = -1;

      function frameLoop() {
        if (lastPosition == window.pageYOffset) {   // Avoid overcalculations
          window.requestAnimationFrame(frameLoop);
          return false;
        } else lastPosition = window.pageYOffset;

        self.render();
        window.requestAnimationFrame(frameLoop);
      }

      frameLoop();
    },

    configure: function(options) {
      if (typeof options == 'object') {
        delete options.refresh;
        delete options.render;
        $.extend(this.prototype, options);
      }
    },

    refresh: function() {
      $.each(this.sliders, function(){ this.refresh(); });
      this.isFresh = true;
    },

    render: function() {
      this.isFresh || this.refresh();
      $.each(this.sliders, function(){ this.render(); });
    },

    requestRender: function() {
      var self = this;
      self.render();
      self.isBusy = false;
    },
    destroy: function(el){
      var i,
          parallaxElement = $(el).data('px.parallax');
      parallaxElement.$mirror.remove();
      for(i=0; i < this.sliders.length; i+=1){
        if(this.sliders[i] == parallaxElement){
          this.sliders.splice(i, 1);
        }
      }
      $(el).data('px.parallax', false);
      if(this.sliders.length === 0){
        $(window).off('scroll.px.parallax resize.px.parallax load.px.parallax');
        this.isReady = false;
        Parallax.isSetup = false;
      }
    }
  });


  // Parallax Plugin Definition

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var options = typeof option == 'object' && option;

      if (this == window || this == document || $this.is('body')) {
        Parallax.configure(options);
      }
      else if (!$this.data('px.parallax')) {
        options = $.extend({}, $this.data(), options);
        $this.data('px.parallax', new Parallax(this, options));
      }
      else if (typeof option == 'object')
      {
        $.extend($this.data('px.parallax'), options);
      }
      if (typeof option == 'string') {
        if(option == 'destroy'){
            Parallax.destroy(this);
        }else{
          Parallax[option]();
        }
      }
    });
  }

  var old = $.fn.parallax;

  $.fn.parallax             = Plugin;
  $.fn.parallax.Constructor = Parallax;


  // Parallax No Conflict

  $.fn.parallax.noConflict = function () {
    $.fn.parallax = old;
    return this;
  };


  // Parallax Data-API

  $( function () { 
    $('[data-parallax="scroll"]').parallax(); 
  });

}(jQuery, window, document));

!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.svg4everybody=b()}):"object"==typeof module&&module.exports?module.exports=b():a.svg4everybody=b()}(this,function(){function a(a,b,c){if(c){var d=document.createDocumentFragment(),e=!b.hasAttribute("viewBox")&&c.getAttribute("viewBox");e&&b.setAttribute("viewBox",e);for(var f=c.cloneNode(!0);f.childNodes.length;)d.appendChild(f.firstChild);a.appendChild(d)}}function b(b){b.onreadystatechange=function(){if(4===b.readyState){var c=b._cachedDocument;c||(c=b._cachedDocument=document.implementation.createHTMLDocument(""),c.body.innerHTML=b.responseText,b._cachedTarget={}),b._embeds.splice(0).map(function(d){var e=b._cachedTarget[d.id];e||(e=b._cachedTarget[d.id]=c.getElementById(d.id)),a(d.parent,d.svg,e)})}},b.onreadystatechange()}function c(c){function e(){for(var c=0;c<o.length;){var h=o[c],i=h.parentNode,j=d(i),k=h.getAttribute("xlink:href")||h.getAttribute("href");if(!k&&g.attributeName&&(k=h.getAttribute(g.attributeName)),j&&k){if(f)if(!g.validate||g.validate(k,j,h)){i.removeChild(h);var l=k.split("#"),q=l.shift(),r=l.join("#");if(q.length){var s=m[q];s||(s=m[q]=new XMLHttpRequest,s.open("GET",q),s.send(),s._embeds=[]),s._embeds.push({parent:i,svg:j,id:r}),b(s)}else a(i,j,document.getElementById(r))}else++c,++p}else++c}(!o.length||o.length-p>0)&&n(e,67)}var f,g=Object(c),h=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,i=/\bAppleWebKit\/(\d+)\b/,j=/\bEdge\/12\.(\d+)\b/,k=/\bEdge\/.(\d+)\b/,l=window.top!==window.self;f="polyfill"in g?g.polyfill:h.test(navigator.userAgent)||(navigator.userAgent.match(j)||[])[1]<10547||(navigator.userAgent.match(i)||[])[1]<537||k.test(navigator.userAgent)&&l;var m={},n=window.requestAnimationFrame||setTimeout,o=document.getElementsByTagName("use"),p=0;f&&e()}function d(a){for(var b=a;"svg"!==b.nodeName.toLowerCase()&&(b=b.parentNode););return b}return c});
/*!
 * Scrollspy Plugin
 * Author: r3plica
 * Licensed under the MIT license
 */
; (function ($, window, document, undefined) {

    // Add our plugin to fn
    $.fn.extend({

        // Scrollspy is the name of the plugin
        scrollspy2: function (options) {

            // Define our defaults
            var defaults = {
                namespace: 'scrollspy2',
                activeClass: 'active',
                animate: false,
                duration: 1000,
                offset: 0,
                container: window,
                replaceState: false
            };

            // Add any overriden options to a new object
            options = $.extend({}, defaults, options);

            // Adds two numbers together
            var add = function (ex1, ex2) {
                return parseInt(ex1, 10) + parseInt(ex2, 10);
            }

            // Find our elements
            var findElements = function (links) {

                // Declare our array
                var elements = [];

                // Loop through the links
                for (var i = 0; i < links.length; i++) {

                    // Get our current link
                    var link = links[i];

                    // Get our hash
                    var hash = $(link).attr("href");

                    // Store our has as an element
                    var element = $(hash);

                    // If we have an element matching the hash
                    if (element.length > 0) {

                        // Get our offset
                        var top = Math.floor(element.offset().top),
                            bottom = top + Math.floor(element.outerHeight());

                        // Add to our array
                        elements.push({ element: element, hash: hash, top: top, bottom: bottom });
                    }                    
                }

                // Return our elements
                return elements;
                // console.log(elements);
            };

            // Find our link from a hash
            var findLink = function (links, hash) {

                // For each link
                for (var i = 0; i < links.length; i++) {

                    // Get our current link
                    var link = $(links[i]);

                    // If our hash matches the link href
                    if (link.attr("href") === hash) {

                        // Return the link
                        return link;
                    }
                }
            };

            // Reset classes on our elements
            var resetClasses = function (links) {

                // For each link
                for (var i = 0; i < links.length; i++) {

                    // Get our current link
                    var link = $(links[i]);

                    // Remove the active class
                    link.parent().removeClass(options.activeClass);
                }
            };

            // Store last fired scroll event
            var scrollArea = '';

            // For each scrollspy instance
            return this.each(function () {

                // Declare our global variables
                var element = this,
                    container = $(options.container);

                // Get our objects
                var links = $(element).find('a');

                // Loop through our links
                for (var i = 0; i < links.length; i++) {

                    // Get our current link
                    var link = links[i];

                    // Bind the click event
                    $(link).on("click", function (e) {
                        
                        // Get our target
                        var target = $(this).attr("href"),
                            $target = $(target);

                        // If we have the element
                        if ($target.length > 0) {

                            // Get it's scroll position
                            var top = add($target.offset().top, options.offset);
                            
                            // If animation is on
                            if (options.animate) {

                                // Animate our scroll
                                $('html, body').animate({ scrollTop: top }, options.duration);
                            } else {

                                // Scroll to our position
                                window.scrollTo(0, top);
                            }
                            
                            // Prevent our link
                            e.preventDefault();
                        }
                    });
                }

                // Set links
                // resetClasses(links);

                // Get our elements
                var elements = findElements(links);

                var trackChanged = function() {

                    // Get the position and store in an object
                    var position = {
                        top: add($(this).scrollTop(), Math.abs(options.offset)),
                        left: $(this).scrollLeft()
                    };

                    // Create a variable for our link
                    var link;

                    // Loop through our elements
                    for (var i = 0; i < elements.length; i++) {

                        // Get our current item
                        var current = elements[i];

                        // If we are within the boundaries of our element
                        if (position.top >= current.top && position.top < current.bottom) {

                            // get our element
                            var hash = current.hash;

                            // Get the link
                            link = findLink(links, hash);

                            // If we have a link
                            if (link) {
                                // If we have an onChange function
                                if (options.onChange && (scrollArea !== hash)) {

                                    // Fire our onChange function
                                    options.onChange(current.element, $(element), position);

                                    // set scrollArea
                                    scrollArea = hash;

                                }

                                // Update url
                                if (options.replaceState) {
                                    history.replaceState( {}, '', '/' + hash )
                                }

                                // Reset the classes on all other link
                                resetClasses(links);

                                // Add our active link to our parent
                                link.parent().addClass(options.activeClass);

                                // break our loop
                                break;
                            }
                        }
                    }

                    // If we don't have a link and we have a exit function
                    if (!link && (scrollArea !== 'exit') && options.onExit) {

                        // Fire our onChange function
                        options.onExit($(element), position);

                        // Reset the classes on all other link
                        resetClasses(links);

                        // set scrollArea
                        scrollArea = 'exit';

                        // Update url
                        if (options.replaceState) {
                            history.replaceState( {}, '', '/' )
                        }

                    }
                }

                // Add a listener to the window
                container.bind('scroll.' + options.namespace, function () {
                    trackChanged();
                });

                $( document ).ready(function (e) {
                    trackChanged();
                })

                $(window).on('resize', function () {
                    // console.log(links);
                    elements = findElements(links);
                })

            });
        }
    });
})(jQuery, window, document, undefined);
// Supoort svg for old browsers
svg4everybody();

//Scrollspy
!function($,window,document,undefined){$.fn.extend({scrollspy:function(options){var defaults={namespace:"scrollspy",activeClass:"active",animate:!1,duration:1e3,offset:0,container:window,replaceState:!1};options=$.extend({},defaults,options);var add=function(ex1,ex2){return parseInt(ex1,10)+parseInt(ex2,10)},findElements=function(links){for(var elements=[],i=0;i<links.length;i++){var link=links[i],hash=$(link).attr("href"),element=$(hash);if(element.length>0){var top=Math.floor(element.offset().top),bottom=top+Math.floor(element.outerHeight());elements.push({element:element,hash:hash,top:top,bottom:bottom})}}return elements},findLink=function(links,hash){for(var i=0;i<links.length;i++){var link=$(links[i]);if(link.attr("href")===hash)return link}},resetClasses=function(links){for(var i=0;i<links.length;i++)$(links[i]).parent().removeClass(options.activeClass)},scrollArea="";return this.each(function(){for(var element=this,container=$(options.container),links=$(element).find("a"),i=0;i<links.length;i++){var link=links[i];$(link).on("click",function(e){var target=$(this).attr("href"),$target=$(target);if($target.length>0){var top=add($target.offset().top,options.offset);options.animate?$("html, body").animate({scrollTop:top},options.duration):window.scrollTo(0,top),e.preventDefault()}})}resetClasses(links);var elements=findElements(links),trackChanged=function(){for(var link,position={top:add($(this).scrollTop(),Math.abs(options.offset)),left:$(this).scrollLeft()},i=0;i<elements.length;i++){var current=elements[i];if(position.top>=current.top&&position.top<current.bottom){var hash=current.hash;if(link=findLink(links,hash)){options.onChange&&scrollArea!==hash&&(options.onChange(current.element,$(element),position),scrollArea=hash),options.replaceState&&history.replaceState({},"","/"+hash),resetClasses(links),link.parent().addClass(options.activeClass);break}}}!link&&"exit"!==scrollArea&&options.onExit&&(options.onExit($(element),position),resetClasses(links),scrollArea="exit",options.replaceState&&history.replaceState({},"","/"))};container.bind("scroll."+options.namespace,function(){trackChanged()}),$(document).ready(function(e){trackChanged()})})}})}(jQuery,window,document);