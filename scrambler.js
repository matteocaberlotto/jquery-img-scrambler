
(function($) {

    var is_scrambler_animating = null;
    var globalPosition = new Array();

   /**
    * jquery scrambler
    * author: matteo caberlotto mcaber@gmail
    * all the code below is executed at end of DOM ready event
    */
   $.fn.animator = function(options) {
         // default values
     var defaults = {
         selector : '#wrapper',
				 animation_timeout : 400
     };

     // actual options override default ones
     // (this object is available into 'each'
     // function simply as 'opts')
     var opts = $.extend(defaults, options);

     return this.each(function(){
       // cache the current node for performance
       var currentNode = $(this);


       var imgSelector = opts.selector + ' img';

       currentNode.click(function(){

        if(is_scrambler_animating)
        {
            return;
        }

        is_scrambler_animating = true;

        if(currentNode.hasClass('scrambled'))
        {

            $(imgSelector)
            .each(function(i){
                    $(this)
                    .animate({
                            left: globalPosition[i]._x,
                            top: globalPosition[i]._y
                    }, opts.animation_timeout)
            });

            setTimeout(function(){
                    $(imgSelector)
                    .draggable('destroy')
                    .attr('style', '');

                    is_scrambler_animating = false;
                    currentNode.removeClass('scrambled');
            }, opts.animation_timeout + 50);

        }
        else
        {
            $(imgSelector).each(function(i){
                _el = $(this);

                globalPosition[i] = {
                        _x: _el.offset().left,
                        _y: _el.offset().top
                }

                _el.css({
                        top: globalPosition[i]._y,
                        left: globalPosition[i]._x
                });

            })
            .mousedown(function(e){
                $('img').css({
                        'z-index':0
                });
                $(this).css({
                        'z-index':1
                });
            })
            .css({
                position: 'absolute',
                margin: 0
            });


            setTimeout(function(){
                $(imgSelector)
                .each(function(){
                        $(this)
                        .animate({
                                top: Math.random() * $(document).height() * 0.5,
                                left: Math.random() * ($(window).width() - 345) * 1.2 - $(window).width() * 0.1
                        }, opts.animation_timeout);
                })
                .draggable();
            }, 0);

            setTimeout(function(){
                is_scrambler_animating = false;
            }, opts.animation_timeout + 10);

            currentNode.addClass('scrambled');
        }
       });



     });

     // allow jquery chaining
     return( this );
   };
})(jQuery);


