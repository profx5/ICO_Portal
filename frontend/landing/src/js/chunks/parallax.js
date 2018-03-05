


// let sections = document.querySelectorAll('section:not(.MainSection):not(.PartnersSection):not(.ContactSection):not(.MapSection)');
// let scroll;
// function parallaxFunc() {

//     scroll = $(window).scrollTop();
//     let i = 0;
//     // let elCurrent = sections[i],
//     //     elNext = sections[i + 1];


//     if (scroll - $(sections[i]).offset().top > 0) {
//         TweenMax.to(sections[i], 0.05, {
//             y: ($(window).scrollTop() - $(sections[i]).offset().top) / 1.2 + 'px'
//         });
//     }

//     if (scroll + $(window).height() > $(sections[i]).offset().top + $(sections[i]).height()) {

//         i += 1;
//         console.log('bro')
//     }


// }










// $(window).scroll(_.throttle(parallaxFunc, 5));
$(window).scroll(parallaxFunc);



function scrollHandler () {

    $('section').each((index, item) => {

        if (($(window).scrollTop() + $(window).height()) - $(item).offset().top >= $(item).height() / 2) {
            $(item).addClass('isReached')
        } else {
            $(item).removeClass('isReached')
        }
    })

}

$(window).scroll(scrollHandler)
