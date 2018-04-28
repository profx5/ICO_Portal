{

  $('[data-scroll-to]').click(function(e) {
    e.preventDefault();
    let el = $(this).data('scroll-to');
    $('body, html').animate({
      'scrollTop': $(`.${el}`).offset().top - $('.HeaderSticky').height() + 3
    }, 1500);
    // if ($(this).hasClass('Sidebar_navLink')) {
      $('html').removeClass('noscroll');
      $('.Sidebar').removeClass('Sidebar-active');
    // }
  });

  $('.MainSection_scrollIcon').click(() => {
    $('body, html').animate({
      'scrollTop': $('.PartnersSection').offset().top
    },1400);
  });

}
