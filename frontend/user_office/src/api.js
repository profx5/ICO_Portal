class Api {
    constructor() {
        this.prefix = '/api'
    }

    get_me() {
        return `${this.prefix}/getMe`
    }

    get_ico_phasesStats() {
        return `${this.prefix}/getICOPhaseStats`
    }

    get_off_cain_bounties_balance() {
        return `${this.prefix}/getOffCainBountiesBalance`
    }

    get_deposits() {
        return `${this.prefix}/getDeposits`
    }
    kyc() {
        return `${this.prefix}/kyc/`
    }
}

const api = new Api;

export default api
