{


  $('.CalculatorSection_btnWrapper').fancybox({
      baseTpl: '<div class="fancybox-container fancybox-container-join" role="dialog" tabindex="-1">' +
          '<div class="fancybox-bg" style="background-color: rgba(50,116,255,.8);"></div>' +
          '<div class="fancybox-inner">' +
              '<div class="fancybox-infobar">' +
                  '<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>' +
              '</div>' +
              '<div class="fancybox-stage"></div>' +
              '<div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div>' +
          '</div>' +
      '</div>',
      btnTpl: {
        smallBtn: `<button data-fancybox-close="" class="JoinPopup_btnClose" ></button>`
      },
      touch: false
  });

  $.validator.setDefaults({
      highlight: function(input) {
        $(input).closest('.JoinPopup_inputWrapper').addClass('JoinPopup_inputWrapper-error');
      },
      unhighlight: function(input) {
        $(input).closest('.JoinPopup_inputWrapper').removeClass('JoinPopup_inputWrapper-error');
      }
  });

  function submitHandler() {
      $.ajax({
        type: 'POST',
        url: $('.JoinPopup_form').attr('action'),
        data: $('#form').serialize()
      }).done(() => {

          $('.JoinPopup_btnClose').click();
          $('.JoinPopup_form input, .JoinPopup_form textarea').val('');
          $('.JoinPopup_input[name="messenger"]').trigger('input');

          $.fancybox.open(`
            <div class="JoinPopupFeedback">
              <p class="JoinPopupFeedback_head">Thank you</p>
              <p class="JoinPopupFeedback_text">
                Thank you for joining our Whitelist! We will contact you soon. <br/>
                Please visit our Telegram channel to get Longevity United project latest news
              </p>
              <a class="JoinPopupFeedback_btnLink" target="blank" href="https://t.me/longevitychat">
                <button class="JoinPopupFeedback_btn">Telegram
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="18" height="18">
                      <path fill="#ffffff" d="M5.3 144.645l69.125 25.8 26.756 86.047c1.716 5.51 8.455 7.548 12.928 3.89l38.532-31.41c4.04-3.292 9.79-3.456 14.012-.392l69.5 50.457c4.784 3.478 11.563.856 12.763-4.926l50.91-244.89c1.31-6.313-4.895-11.582-10.91-9.26L5.22 129.406c-7 2.7-6.94 12.612.08 15.243zm91.57 12.066l135.097-83.203c2.428-1.49 4.926 1.792 2.84 3.726L123.314 180.87c-3.92 3.648-6.447 8.53-7.163 13.83l-3.795 28.145c-.503 3.758-5.782 4.13-6.82.494l-14.607-51.33c-1.673-5.854.765-12.107 5.943-15.303z" />
                  </svg>
                </button>
              </a>
            </div>
          `,{
            baseTpl: '<div class="fancybox-container fancybox-container-joinFeedback" role="dialog" tabindex="-1">' +
                '<div class="fancybox-bg" style="background-color: rgba(50,116,255,.8);"></div>' +
                '<div class="fancybox-inner">' +
                    '<div class="fancybox-infobar">' +
                        '<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>' +
                    '</div>' +
                    '<div class="fancybox-stage"></div>' +
                    '<div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div>' +
                '</div>' +
            '</div>',
            btnTpl: {
              smallBtn: `<button data-fancybox-close="" class="JoinPopupFeedback_btnClose" ></button>`
            },
            touch: false
          });


      });
  }


  $('.JoinPopup_form').validate({
      rules: {
          messenger: {
              required: true
          },
          invest: {
              required: true
          },
          nickname: {
            required: true
          }
      },
      submitHandler: submitHandler
  });

  $('.JoinPopup_input[name="messenger"]').on('input', function() {
    if ($(this).val().length > 0) {
      $('.JoinPopup_input[name="nickname"]').removeAttr('readonly');
    } else {
      $('.JoinPopup_input[name="nickname"]').attr('readonly', 'true');
    }
  });


  $('.JoinPopup_input[name="invest"]').on('input', function() {
    let val = $(this).val() || ' ',
        lastChar = val[val.length - 1],
        newVal;


    if (lastChar.match(/[0-9.,]/g) === null) {
      event.preventDefault();
      $(this).val(val.substr(0,val.length - 1));
    }

    if ($(this).val().indexOf(',') != -1) {
      newVal = val.replace(',' , '.');
      $(this).val(newVal);

      if (newVal.match(/\./g) !== null && newVal.match(/\./g).length >= 2) {
        $(this).val(newVal.substr(0,newVal.length - 1));
      }

    }

    if (val.match(/\./g) !== null && val.match(/\./g).length >= 2) {
      $(this).val(val.substr(0,val.length - 1));
    }
    
  })





}

