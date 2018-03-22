class Api {
    constructor() {
        this.prefix = '/api'
    }

    getMe() {
        return `${this.prefix}/getMe`
    }

    getICOPhaseStats() {
        return `${this.prefix}/getICOPhaseStats`
    }

    getOffChainBountiesBalance() {
        return `${this.prefix}/getOffChainBountiesBalance`
    }

    getDeposits() {
        return `${this.prefix}/getDeposits`
    }

    kyc() {
        return `${this.prefix}/kyc/`
    }

    setEthAccount() {
        return `${this.prefix}/setEthAccount/`
    }
}

const api = new Api();

export default api
