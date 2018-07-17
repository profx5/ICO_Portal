class Api {
    constructor() {
        this.prefix = '/api'
    }

    getAccount() {
        return `${this.prefix}/getAccount/`
    }

    getMe() {
        return `${this.prefix}/getMe/`
    }

    getICOInfo() {
        return `${this.prefix}/getICOInfo/`
    }

    getPhases() {
        return `${this.prefix}/getPhases/`
    }

    getOffChainBountiesBalance() {
        return `${this.prefix}/getOffChainBountiesBalance/`
    }

    getDeposits() {
        return `${this.prefix}/getTokensMoves/`
    }

    prepareDeposits() {
        return `${this.prefix}/prepareTokensMove/`
    }

    kyc() {
        return `${this.prefix}/kyc/`
    }

    setEthAccount() {
        return `${this.prefix}/setEthAccount/`
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

    getAvailableCurrencies() {
        return `${this.prefix}/getAvailableCurrencies/`
    }

    changePassword() {
        return `${this.prefix}/changePassword/`
    }
    changeEmail() {
        return `${this.prefix}/changeEmail/`
    }
    getTickets() {
        return `${this.prefix}/tickets/`
    }
    getTicket(id) {
        return `${this.prefix}/tickets/${id}/`
    }
}

const api = new Api();

export default api
