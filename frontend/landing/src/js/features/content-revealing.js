$(document).ready(function() {

    $('.Header [data-animation-type], .MainSection [data-animation-type]').each((index,item) => {
        $(item).addClass(`animated ${item.dataset.animationType}`);
    });

});


let animateCssClasses = [
    'bounce',
    'flash',
    'pulse',
    'rubberBand',
    'shake',
    'headShake',
    'swing',
    'tada',
    'wobble',
    'jello',
    'bounceIn',
    'bounceInDown',
    'bounceInLeft',
    'bounceInRight',
    'bounceInUp',
    'bounceOut',
    'bounceOutDown',
    'bounceOutLeft',
    'bounceOutRight',
    'fadeIn',
    'fadeInDown',
    'fadeInDownBig',
    'fadeInLeft',
    'fadeInLeftBig',
    'fadeInRight',
    'fadeInRightBig',
    'fadeInUp',
    'fadeInUpBig',
    'fadeOut',
    'fadeOutDown',
    'fadeOutDownBig',
    'fadeOutLeft',
    'fadeOutLeftBig',
    'fadeOutRight',
    'fadeOutUp',
    'fadeOutUpBig',
    'flipInX',
    'flipOutX',
    'flipOutY',
    'lightSpeedIn',
    'lightSpeedOut',
    'rotateIn',
    'rotateInDownLeft',
    'rotateInDownRight',
    'rotateInUpLeft',
    'rotateInUpRight',
    'rotateOut',
    'rotateOutDownLeft',
    'rotateOutDownRight',
    'rotateOutUpLeft',
    'rotateOutUpRight',
    'hinge',
    'jackInTheBox',
    'rollIn',
    'rollOut',
    'zoomIn',
    'zoomInDown',
    'zoomInLeft',
    'zoomInRight',
    'zoomInUp',
    'zoomOut',
    'zoomOutDown',
    'zoomOutLeft',
    'zoomOutRight',
    'zoomOutUp',
    'slideInDown',
    'slideInLeft',
    'slideInRight',
    'slideInUp',
    'slideOutDown',
    'slideOutLeft',
    'slideOutRight',
    'slideOutUp',
    'fadeInUpCustom',
    'pulseFadeIn',
    'fadeInUpBar'
].join(' ');


let lastScrollTop = 0;




document.querySelectorAll('[data-animation-delay]').forEach(item => {
    $(item).css({
        'animation-delay': $(item).data('animation-delay') + 's'
    })

})

function scrollHandler () {

    
    if ($(window).width() < dimensions.tablet) return;

    let winHeight = $(window).height();
    let winScrollTop = $(window).scrollTop();
    let winScrollAndHeight = winHeight + winScrollTop;

    var st = $(window).scrollTop()

    let elemsToAnimate = document.querySelectorAll('[data-animation-show]');

    elemsToAnimate.forEach(item => {

        let elOffset = $(item).offset().top;


        if (st > lastScrollTop) {

            if (winScrollAndHeight >= Number(item.dataset.animationShow) + elOffset) {

                $(item).addClass(`animated ${item.dataset.animationType ? item.dataset.animationType : ''}`).removeClass('isHidden');

            }
            return;
        } else {

            if (winScrollAndHeight <= elOffset + (Number(item.dataset.animationHide) || 150)) {
                if ($(item).hasClass('isAnimating')) return;
                $(item).removeClass(`animated ${animateCssClasses}`).addClass('isHidden');
            }
        }

    });
    lastScrollTop = st;

}



$(window).on('scroll', throttle(scrollHandler, 100));

$(window).trigger('scroll');