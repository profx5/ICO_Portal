function tryLoginViaMetamasK(){

}

$(function() {
    var account = ''

    function sendMetamaskLoginForm(err, signature) {
        if (err) {
            return {}
        } else {
            $('#metamask_account').val(account);
            $('#metamask_signature').val(signature)

            $('#metamsk-login-form').submit()
        }

    }

    function loginViaMetamask() {
        account = web3.eth.accounts[0];
        var token = $('#metamask-login-token').val()

        var signature = web3.eth.sign(account, token, sendMetamaskLoginForm)
    }

    var metamaskButton = $('.metamask-login');

    if (typeof web3 !== 'undefined' && web3.eth.accounts.length > 0) {
        metamaskButton.show()

        metamaskButton.click(loginViaMetamask)
    }
})
