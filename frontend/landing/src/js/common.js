$(document).ready(function() {

  var dimensions = {
    mobile: 768,
    tablet: 1025
  };
  
  // =include classes/*.js
  // =include chunks/*.js
  // =include features/*.js



// START | INSTRUCTIONS SECTION > Close terms popup

{

  $('.TermsPopup_btn').click(() => {

    if (!$('.TermsPopup_checkbox').is(':checked')) return;
    
    $('.TermsPopup').addClass('TermsPopup-hidden');
    $('html').removeClass('content-blured');
  });
}

// END | INSTRUCTIONS SECTION > Close terms popup



// START | MAIN SECTION > Adjust section height 


{

  $('.MainSection').height($(window).height());

  {

    $('.InstrSection').css({
      'margin-top' : '-' + ($('.MainSection').height() - $('.Header').height() - 35) + 'px'
    });

  }

  $(window).resize(() => {
    $('.MainSection').height($(window).height());

    $('.InstrSection').css({
      'margin-top' : '-' + ($('.MainSection').height() - $('.Header').height() - 35) + 'px'
    });

  });

}

// END | MAIN SECTION > Adjust section height 



// START | ABOUT SECTION > Popup by click

{
  $('.AboutSection_btnDocs').click(() => {
    $('.AboutSection_docs').addClass('AboutSection_docs-active');
  });

  // $('.AboutSection_docsClose').click(() => {
  //   $('.AboutSection_docs').removeClass('AboutSection_docs-active');
  // });
}

// END | ABOUT SECTION > Popup by click




// START | TEAM SECTION > Crop text with ellipsis

{

  let dotsInst = new Dots($('.TeamSection_text'), {
    height: 50
  });
  
}

// END | TEAM SECTION > Crop text with ellipsis



});