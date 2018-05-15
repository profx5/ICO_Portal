class Api {
    constructor() {
        this.prefix = '/api'
    }

    getMe() {
        return `${this.prefix}/getMe/`
    }

    getICOInfo() {
        return `${this.prefix}/getICOInfo/`
    }

    getPhase() {
        return `${this.prefix}/getPhase/`
    }

    getOffChainBountiesBalance() {
        return `${this.prefix}/getOffChainBountiesBalance/`
    }

    getDeposits() {
        return `${this.prefix}/getDeposits/`
    }

    kyc() {
        return `${this.prefix}/kyc/`
    }

    setEthAccount() {
        return `${this.prefix}/setEthAccount/`
    }

    prepareDeposit() {
        return `${this.prefix}/prepareDeposit/`
    }

    getReferralLink() {
        return `${this.prefix}/getReferralLink/`
    }

    getBounties() {
        return `${this.prefix}/getBounties/`
    }

    transferBounties() {
        return `${this.prefix}/transferBounties/`
    }

    getCurrencies() {
        return `${this.prefix}/getCurrencies/`
    }
}

const api = new Api();

export default api
