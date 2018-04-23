{
    function passwordStrength(input) {

      let $input = $(input),
          val = $input.val();

      let status = 0;

      if (val.length >= 6) ++status;
      if (/[A-Z]/.test(val)) {
        if (status === 0) return;
        ++status;
      }
      if (/\d/.test(val)) {
        if (status === 0) return;
        ++status;
      }
      return status;
    }


    $('.Signup_input[name="password"]').on('input', function() {

      let $input = $(this);

      if (passwordStrength($input) === 0) {

        $('.Signup_passwordComplexity')
          .attr('data-strength-state', '')
          .removeClass('Signup_passwordComplexity-weak')
          .removeClass('Signup_passwordComplexity-normal')
          .removeClass('Signup_passwordComplexity-strong');
      } else if (passwordStrength($input) === 1) {

        $('.Signup_passwordComplexity')
          .attr('data-strength-state', 'Weak')
          .removeClass('Signup_passwordComplexity-weak')
          .removeClass('Signup_passwordComplexity-normal')
          .addClass('Signup_passwordComplexity-weak');
      } else if (passwordStrength($input) === 2) {

        $('.Signup_passwordComplexity')
          .attr('data-strength-state', 'Normal')
          .removeClass('Signup_passwordComplexity-weak')
          .removeClass('Signup_passwordComplexity-strong')
          .addClass('Signup_passwordComplexity-normal');
      } else if (passwordStrength($input) === 3) {

        $('.Signup_passwordComplexity')
          .attr('data-strength-state', 'Strong')
          .removeClass('Signup_passwordComplexity-weak')
          .removeClass('Signup_passwordComplexity-normal')
          .addClass('Signup_passwordComplexity-strong');
      }
    });

  
    $.validator.addMethod("pwcheck", function(value) {
       return value.length >= 6;
           // && /[a-z]/.test(value) // has a lowercase letter
           // && /\d/.test(value) // has a digit
    });

    $.validator.addMethod("correct", function(value) {
       return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value);
    });
}