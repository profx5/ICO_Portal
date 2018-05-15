import {
    METAMASK_IS_BLOCKED,
    SHOW_MODAL_WITH_OPTIONS_FOR_ETH_ACCOUNT,
} from '../types/MetaMaskTypes'

export class MetaMaskActions {
    static metamaskIsBlocked = () => ({type: METAMASK_IS_BLOCKED})
    static showModalWithOptionsForEthAccount = () => ({type: SHOW_MODAL_WITH_OPTIONS_FOR_ETH_ACCOUNT})
}
