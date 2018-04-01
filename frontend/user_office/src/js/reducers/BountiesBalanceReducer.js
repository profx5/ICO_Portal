//types
import {
    GET_BOUNTIES_BALANCE_REQUEST,
    GET_BOUNTIES_BALANCE_SUCCESS,
} from '../types/BountiesBalanceTypes'

import {Map} from 'immutable'

const initialState = Map({
    isBountiesBalanceLoading: false,
    currency: null,
    balance: null,
    nextStage: null,
})

export function BountiesBalanceReducer(state=initialState, {type, payload, ...action}) {
    switch(type) {
        case GET_BOUNTIES_BALANCE_REQUEST: {
            return state.set('isBountiesBalanceLoading', true)
        }
        case GET_BOUNTIES_BALANCE_SUCCESS: {
            return state.merge({
                ...payload
            }).set('isBountiesBalanceLoading', false)
        }
        default: {
            return state
        }
    }
}
