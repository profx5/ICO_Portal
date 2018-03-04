$(document).ready(function() {

  var dimensions = {
    mobile: 768,
    tablet: 1025
  };
  
  // =include chunks/*.js
  // =include classes/*.js



// START | MAIN SECTION > Adjust section height 


  $('.MainSection').height($(window).height());
  $(window).resize(() => {
    $('.MainSection').height($(window).height());
  });

// END | MAIN SECTION > Adjust section height 




// START | TEAM SECTION > Tabs switching 

$('.TeamSection_switcher').click(function() {
  $('.TeamSection_switcher').removeClass('TeamSection_switcher-active');
  $('.TeamSection').removeClass('TeamSection-advisiorsActive TeamSection-teamActive');

  $(this).addClass('TeamSection_switcher-active');

  if ($(this).hasClass('TeamSection_switcher-team')) {

    $('.TeamSection').addClass('TeamSection-teamActive');

  } else if ($(this).hasClass('TeamSection_switcher-advisiors')) {

    $('.TeamSection').addClass('TeamSection-advisiorsActive');

  }
});

// END | TEAM SECTION > Tabs switching 




// START | PROGRESS SECTION > Mobile scroll progress bar

if ($(window).width() < dimensions.mobile) {

  $('.ProgressSection_progressWrapperScrollable').niceScroll({
    cursorwidth: '7px',
    // cursorminheight: '7px',
    cursorfixedheight: '35',
    cursorcolor: '#f84f78',
    cursoropacitymin: 1,
    cursoropacitymax: 1,
    railoffset: true,
    railpadding: { top: 0, right: 37, left: 0, bottom: -10 },
    emulatetouch: true,
    grabcursorenabled: true,
    preservenativescrolling: true, 
    cursordragontouch: true,
    horizrailenabled: true
  });
}

// END | PROGRESS SECTION > Mobile scroll progress bar


	// =include pages/*.js
});