// {

//   const vendors = ['ms', 'moz', 'webkit', 'o'];
//   const af = 'AnimationFrame';
//   let lastTime = 0;

//   if('performance' in window == false)
//       window.performance = {};

//   if(!Date.now)
//     Date.now = () => new Date().getTime()

//   if ('now' in window.performance == false){
//     let nowOffset = Date.now();

//     if(performance.timing && performance.timing.navigationStart)
//       nowOffset = performance.timing.navigationStart;

//     window.performance.now = () => Date.now() - nowOffset;
//   }

//   for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
//       const vendor = vendors[x]
//       window.requestAnimationFrame  = window[`${vendor}Request${af}`];
//       window.cancelAnimationFrame   = window[`${vendor}Cancel${af}`] || window[`${vendor}CancelRequest${af}`];
//   }

//   if(!window.requestAnimationFrame){
//     window.requestAnimationFrame = callback =>{
//         const currTime    = Date.now()
//         const timeToCall  = Math.max(0, 16 - (currTime - lastTime));
//         const id          = window.setTimeout(() => callback(currTime + timeToCall), timeToCall);

//         lastTime = currTime + timeToCall;
//         return id;
//     };
//   }

//   if(!window.cancelAnimationFrame)
//     window.cancelAnimationFrame = id => clearTimeout(id)

// }

// let sections = document.querySelectorAll('.MainSection_container, section:not(.MainSection):not(.PartnersSection):not(.ContactSection):not(.MapSection)');
// let scroll;
// function parallaxFunc() {

//     scroll = $(window).scrollTop();
//     let i = 0;
//     // let elCurrent = sections[i],
//     //     elNext = sections[i + 1];

//     console.log(scroll)
//     if (scroll - $(sections[i]).offset().top > 0) {
//         TweenMax.to(sections[i], 0.05, {
//             y: ($(window).scrollTop() - $(sections[i]).offset().top) / 4 + 'px'
//         });
//         if ($(sections[i]).offset)
//         console.log('bro')
//     }

//     if (scroll + $(window).height() > $(sections[i]).offset().top + $(sections[i]).height()) {

//         i += 1;
//         // console.log('bro')
//     }


// }






// $(window).scroll(_.throttle(parallaxFunc, 5));
// $(window).scroll(_.throttle(parallaxFunc, 10));


// function isWithinViewport(el, type = '') {

//     const rect = el.getBoundingClientRect();
//     // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
//     const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
//     const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

//     // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
//     var vertInView;
//     if (type === 'top') {
//         vertInView = el.offsetTop <= $(window).scrollTop() && ($(el).outerHeight() + el.offsetTop) >= $(window).scrollTop() - 200;

//     } else {
//         vertInView = (rect.top <= windowHeight) && (rect.top + rect.height) >= 0;
//     }
//     const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

//     return (vertInView && horInView);
// }




//     let elToParallax = $('.MainSection');

//     function parallax () {
//         $('[data-parallax-type]').each((index, item) => {

//             let parallaxType = $(item).data('parallax-type'),
//                 parallaxValue = Number($(item).data('parallax-value')),
//                 parallaxCondition = $(item).data('parallax-condition'),
//                 parallaxBlur = Number($(item).data('parallax-blur')),
//                 scrolled = $(window).scrollTop();

//             if (isWithinViewport(item, parallaxCondition)) {

//                 if (parallaxBlur) {

//                     $(item).css({
//                         'filter': `blur(${scrolled / parallaxBlur}px)`
//                     });

//                 }
//                 if (parallaxType === "offset") {

//                     TweenMax.to(item, 0.1, {
//                         y: (scrolled - $(item).offset().top) / parallaxValue + 'px'
//                     });
//                 }
//             }
//         });
//     }

//     if ($(window).width() > dimensions.tablet) {
//         $(window).on('scroll.parallax', _.throttle(parallax,6));
//     }


//     $(window).resize(() => {
//         if ($(window).width() < dimensions.tablet) {
//             $(window).unbind('scroll.parallax');
//         }
//     })