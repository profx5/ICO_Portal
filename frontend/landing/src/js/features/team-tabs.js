{

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

  
}