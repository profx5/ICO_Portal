import Web3 from 'web3';

export var icoWeb3 = undefined;

window.addEventListener('load', function() {
    if (typeof window.web3 !== 'undefined') {
        icoWeb3 = new Web3(window.web3.currentProvider);
        //for debug
        window.icoWeb3 = icoWeb3;
    } else {
        console.log('No web3? You should consider trying MetaMask!');
    }
});

export function canSendTransaction(userAccount) {
    if (typeof window.web3 === 'undefined') {
        return [false, 'Install MetaMask'];
    } else if (!window.web3.eth.defaultAccount) {
        return [false, 'Unlock MetaMask'];
    } else if (!userAccount) {
        return [false, 'Define Ethereum account'];
    } else if (window.web3.eth.defaultAccount.toUpperCase() !== userAccount.toUpperCase()) {
        return [false, 'Select MetaMask Ethereum account defined in your profile'];
    } else {
        return [true, ''];
    }
}

export function extractAccount() {
    icoWeb3.eth.getAccounts();
}

export function sendTransaction(from, to, value, callback) {
    icoWeb3.eth.sendTransaction({
        from: from,
        to: to,
        value: value
    }, callback);
}

export function ethToWei(value) {
    const stringValue = value + '';

    return icoWeb3.utils.toWei(stringValue, 'ether');
}

export function isMetamaskAvailable() {
    return window.icoWeb3;
}
