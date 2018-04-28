{

  
    $.validator.addMethod("pwcheck", function(value) {
       return value.length >= 6;
           // && /[a-z]/.test(value) // has a lowercase letter
           // && /\d/.test(value) // has a digit
    });

    $.validator.addMethod("correct", function(value) {
       return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value);
    });



  $.validator.setDefaults({
      highlight: function(input) {

        $(input).closest('[class*="inputWrapper"]').addClass('error');
      },
      unhighlight: function(input) {

        $(input).closest('[class*="inputWrapper"]').removeClass('error');
      },
      errorPlacement: function(error, input) {
        $(input).siblings('[class*="error"]').html(error.text());
      }
  });

  function signupHandler() {
      if (grecaptcha.getResponse().length === 0) return;
      alert('Signup')
  }

  function signinHandler() {
      alert('Signin')
  }

  function recoverHandler() {
      alert('Recover')
  }





$('.Signup_form').validate({
    rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            pwcheck: true,
            correct: true
        },
        confirm: {
            required: true,
            equalTo: '#password'
        },
        checkbox: {
            required: true
        }
    },
    messages: {
        email: {
            required: 'Obligatory field',
            email: 'Invalid email address'
        },
        password: {
            required: 'Obligatory field',
            pwcheck: 'Password must contain 6 letters or more',
            correct: 'Incorrect symbols'
        }
    },
    submitHandler: signupHandler
    });


$('.Signin_form').validate({
    rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
        },
    },
    messages: {
        email: {
            required: 'Obligatory field',
            email: 'Invalid email address'
        },
        password: {
            required: 'Obligatory field',
        }
    },
    submitHandler: signinHandler
    });

$('.Recover_form').validate({
    rules: {
        email: {
            required: true,
            email: true
        }
    },
    messages: {
        email: {
            required: 'Obligatory field',
            email: 'Invalid email address'
        }
    },
    submitHandler: recoverHandler
    });


}


{

  let $signup = $('.Signup'),
      $signin = $('.Signin'),
      $recover = $('.Recover'),
      $terms = $('.Terms');

  let niceScrollInited = false;

  $('.Signup_tipLink').click(e => {
    e.preventDefault();
    $signup.addClass('Popup-hidden');
    $signin.removeClass('Popup-hidden');
  });

  $('.Signin_tipLink').click(e => {
    e.preventDefault();
    $signin.addClass('Popup-hidden');
    $signup.removeClass('Popup-hidden');
  });



  $('.Signup_termsLink').click(e => {

    e.preventDefault();
    $signup.addClass('Popup-hidden');
    $terms.removeClass('Popup-hidden');
    $('.nicescroll-rails').removeClass('nicescroll-rails-hidden');

    if (!niceScrollInited) {

      $('.Terms_textWrapper').niceScroll({
        cursorwidth: '10',
        cursorfixedheight: '43',
        cursorcolor: '#f84f78',
        cursoropacitymin: 1,
        cursoropacitymax: 1,
        railoffset: true,
        railpadding: { top: 0, right: 1, left: 0, bottom: 0 },
        cursordragontouch: true
      });
      niceScrollInited = true;
    }
  });

  $('.Terms_linkBack').click(e => {

    e.preventDefault();
    $terms.addClass('Popup-hidden');
    $signup.removeClass('Popup-hidden');
    $('.nicescroll-rails').addClass('nicescroll-rails-hidden');
  });



  $('.Signin_forgotLink').click(e => {

    e.preventDefault();
    $signin.addClass('Popup-hidden');
    $recover.removeClass('Popup-hidden');
  });




}



