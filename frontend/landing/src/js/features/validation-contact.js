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

  function submitHandler() {
      $.ajax({
        type: 'POST',
        url: $('#form').attr('action'),
        data: $('#form').serialize()
      }).done(() => {

          let popupInst = new Popup(`
            <div class="CopyPopup">
                <div class="CopyPopup_icon animated bounceIn">

                  <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41">
                    <g fill="none" fill-rule="evenodd">
                      <circle cx="20.5" cy="20.5" r="20.5" fill="#4FDDBE"/>
                      <path fill="#FDFFFE" fill-rule="nonzero" d="M16.5933 24.8904l-4.3161-4.2037-2.3732 2.3114 5.6957 5.5472.0065-.0064 1.0399 1.0128 16.0801-15.6613-2.4193-2.3563z"/>
                    </g>
                  </svg>

                </div>
                <div class="CopyPopup_content">
                    <p class="CopyPopup_text">Thanks for your message</p>
                </div>
            </div>
          `, 3500);
      });
  }


  $('#form').validate({
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
      },
      submitHandler: submitHandler
  });

}