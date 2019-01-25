$(function() {
    var account = '';

    function sendMetamaskLoginForm(err, result) {
        if (err) {
            console.error(err)
        } else {
            $('#metamask_account').val(account);
            $('#metamask_signature').val(result.result);

            $('#metamsk-login-form').submit()
        }

    }

    function loginViaMetamask() {
        ethereum.enable().catch(console.error);

        account = ethereum.selectedAddress;
        var token = $('#metamask-login-token').val()


        web3.currentProvider.sendAsync({
          method: "personal_sign",
          params: [token, account],
          from: account
        }, sendMetamaskLoginForm);
    }

    var metamaskButton = $('.metamask-login');

    if (typeof window.ethereum !== "undefined" && typeof ethereum.selectedAddress === "string") {
      metamaskButton.show();

      metamaskButton.click(loginViaMetamask);
    }
})
