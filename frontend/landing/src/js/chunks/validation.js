{

  $.validator.setDefaults({
      highlight: function(input) {
        if ($(window).width() < dimensions.mobile) {
            $(input).addClass('input-error');
            return;
        }
        $(input).siblings('.ContactSection_errorText').addClass('ContactSection_errorText-active');
      },
      unhighlight: function(input) {
        if ($(window).width() < dimensions.mobile) {
            $(input).addClass('input-error');
            return;
        }
        $(input).siblings('.ContactSection_errorText').removeClass('ContactSection_errorText-active');
      },
      errorPlacement: function(error, input) {
        $(input).siblings('.ContactSection_errorText').html(error.text());
      }
  });


  $('#form').submit(function(e) {
      // e.preventDefault();
  }).validate({
      rules: {
          email: {
              required: true,
              email: true
          },
          message: {
              required: true
          }
      },
      messages: {
          email: {
              required: 'Obligatory field',
              email: 'Invalid email address'
          },
          message: {
              required: 'Obligatory field'
          }
      }
  });

}