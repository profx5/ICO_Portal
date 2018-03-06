//types
import {
    GET_BOUNTIES_BALANCE_REQUEST,
    GET_BOUNTIES_BALANCE_SUCCESS,
} from '../types/BountiesBalanceTypes'

const initialState = {
    isBountiesBalanceLoading: false,
    currency: null,
    balance: null,
    next_stage: null,
}

export function BountiesBalanceReducer(state=initialState, {type, payload, ...action}) {
    switch(type) {
        case GET_BOUNTIES_BALANCE_REQUEST: {
            return {
                ...state,
                isBountiesBalanceLoading: true
            }
        }
        case GET_BOUNTIES_BALANCE_SUCCESS: {
            return {
                ...state,
                isBountiesBalanceLoading: false,
                ...payload
            }
        }
        default: {
            return {...state}
        }
    }
    return {...state}
}
