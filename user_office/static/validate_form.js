var FormValidation = (function() {
    const validate_types = ['password'];
    const _partial = function(fn, ...presentedArgs) {
        return function(...latestArgs) {
            return fn(...presentedArgs, ...latestArgs)
        }
    };
    const _toNumber = function(ch) {
        return parseInt(ch)
    }
    const _isExist = function(el) {
        return el
    }

    let inputs = [];
    let button = null;
    let settings = {};

    function getInputs(rule, inputsEl) {
        inputs = inputsEl.filter( (el) => rule.includes( $(el)[0].type) )
    }

    function setSettings(newSettings) {
        return settings = Object.assign({}, settings, newSettings)
    }

    function validatePassword( passwordValue, settings ) {

        let checkList = {
            min_length: false,
            do_not_match_words: false,
            contain_diff_types: false
        }

        if(settings.validate_password.is_validate) {

            const { rules: {
                    min_length,
                    not_like_email,
                    do_not_match_words,
                    contain_diff_types
                }
            } = settings.validate_password;

            if( passwordValue.trim().length === min_length || passwordValue.trim().length > min_length ) {
                checkList.min_length = true
            }
            if( !do_not_match_words.includes(passwordValue) ) {
                checkList.do_not_match_words = true
            }

            if(contain_diff_types && hasDifferentTypes(passwordValue)) {
                checkList.contain_diff_types = true
            }
            if(!contain_diff_types) {
                delete checkList.contain_diff_types
            }
        }
        return checkList
    }

    function hasDifferentTypes(string) {
        let hasDifferentTypes = false;
        const arr = string.split('');
        let result = arr.map(_toNumber).filter(_isExist);

        if(result.length !== arr.length && result.length > 0) {
            hasDifferentTypes = true
        }

        return hasDifferentTypes
    }

    function generatePasswordIndicator(checklists) {
        let result = ''
        if( !checklists.min_length ) {
            result = 'WEAK'
        }
        if ( !checklists.do_not_match_words ) {
            result = 'WEAK'
        }
        if(checklists.min_length && !checklists.contain_diff_types) {
            result = 'MEDIUM'
        }
        if(
            checklists.min_length &&
            checklists.contain_diff_types &&
            checklists.do_not_match_words
        ) {
            result = 'STRONG'
        }

        return result
    }

    function isValid() {
        if(
            $(inputs[0]).attr('data-password-indicator') !== 'weak' &&
            $(inputs[1]).attr('data-password-indicator') !== 'weak'
        )  {
            return true
        }
        return false
    }

    return {
        assignInputs: _partial(getInputs, validate_types),
        withValidationSettings: setSettings,
        runValidationForPassword: function(passwordValue) {
            const resultObj = validatePassword(passwordValue, settings)
            return generatePasswordIndicator(resultObj)
        },
        setAttr: function(indicator) {
            if(indicator === 'WEAK') {
                return 'weak'
            }
            if(indicator === 'MEDIUM') {
                return 'medium'
            }
            if(indicator === 'STRONG') {
                return 'strong'
            }
        },
        isValid: isValid
    }
})()

$(function() {
    const $passowrd_one = $('#id_password1');
    const $password_two =  $('#id_password2');

    $($passowrd_one).attr('data-password-indicator', 'default')
    $($password_two).attr('data-password-indicator', 'default')

    function displayValidation({button}) {
        return function(e) {
            let indicator = FormValidation.runValidationForPassword(e.target.value);
            const attrIndicator = FormValidation.setAttr(indicator);
            $(e.target).attr('data-password-indicator', attrIndicator);

            if(FormValidation.isValid()) {
                $(button).attr('disabled', false)
            } else {
                $(button).attr('disabled', true)
            }
        }
    }

    FormValidation.assignInputs([$passowrd_one, $password_two])

    FormValidation.withValidationSettings({
        validate_password: {
            is_validate: true,
            rules: {
                min_length: 8,
                do_not_match_words: ['password', 'pass', 'tree', 'q123'],
                contain_diff_types: true
            }
        }
    });

    $( $passowrd_one ).keypress(displayValidation({button: $('.auth-button') }));
    $( $password_two ).keypress(displayValidation({button: $('.auth-button') }));

})
