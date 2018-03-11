{

  if ($(window).width() < dimensions.mobile) {

    $('.ProgressSection_progressWrapperScrollable').niceScroll({
      cursorwidth: '7px',
      // cursorminheight: '7px',
      cursorfixedheight: '35',
      cursorcolor: '#f84f78',
      cursoropacitymin: 1,
      cursoropacitymax: 1,
      railoffset: true,
      railpadding: { top: 0, right: 37, left: 0, bottom: -40 },
      emulatetouch: true,
      grabcursorenabled: true,
      preservenativescrolling: true, 
      cursordragontouch: true,
      horizrailenabled: true
    });
  }
  
}