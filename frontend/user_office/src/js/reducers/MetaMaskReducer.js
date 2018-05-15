import {
    SHOW_MODAL_WITH_OPTIONS_FOR_ETH_ACCOUNT,
    METAMASK_IS_BLOCKED,
} from '../types/MetaMaskTypes'
import {Map} from 'immutable'

const initialState = Map({
    showOptionsForSettingAccount: false,
    metamaskIsBlocked: false,
})

export function MetaMaskReducer( state=initialState, {type, ...action} ) {
    switch(type) {
        case SHOW_MODAL_WITH_OPTIONS_FOR_ETH_ACCOUNT : {
            return state.set('showOptionsForSettingAccount', true)
        }
        case METAMASK_IS_BLOCKED : {
            return state.set('metamaskIsBlocked', true)
        }
        default: {
            return state
        }
    }
}
