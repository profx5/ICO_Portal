$(document).ready(function() {

  var dimensions = {
    mobile: 768,
    tablet: 1025
  };
  
  // =include chunks/*.js
  // =include features/*.js
  // =include classes/*.js


// START | MAIN SECTION > Adjust section height 


{


  $('.MainSection').height($(window).height());
  $(window).resize(() => {
    $('.MainSection').height($(window).height());
  });

  
}

// END | MAIN SECTION > Adjust section height 



// START | TEAM SECTION > Crop text with ellipsis

{

  let dotsInst = new Dots($('.TeamSection_text'), {
    height: 50
  });
  
}

// END | TEAM SECTION > Crop text with ellipsis



});