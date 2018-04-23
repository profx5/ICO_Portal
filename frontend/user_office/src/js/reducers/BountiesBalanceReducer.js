import {
    GET_BOUNTIES_BALANCE_REQUEST,
    GET_BOUNTIES_BALANCE_SUCCESS,
    GET_BOUNTIES_BALANCE_FAILED,
    TRANSFER_BOUNTIES_REQUEST,
    TRANSFER_BOUNTIES_SUCCESS,
    TRANSFER_BOUNTIES_FAILED,
} from '../types/BountiesBalanceTypes'

import {Map} from 'immutable'

const initialState = Map({
    isBountiesBalanceLoading: false,
    currency: null,
    balance: null,
    nextStage: null,
    bounties: Map({
        currentValue: null,
        thresholdValue: null,
        canTransfer: false
    }),
    transfer: Map({
        success: null,
        error: null,
    }),
    transferIsLoading: false
})

export function BountiesBalanceReducer(state=initialState, {type, payload, ...action}) {
    switch(type) {
        case GET_BOUNTIES_BALANCE_REQUEST: {
            return state.set('isBountiesBalanceLoading', true)
        }

        case GET_BOUNTIES_BALANCE_FAILED: {
            return state.set('isBountiesBalanceLoading', false)
        }
        
        case GET_BOUNTIES_BALANCE_SUCCESS: {
            return state
                .get('bounties')
                .merge({...payload})
                .set('isBountiesBalanceLoading', false)
        }
        
        case TRANSFER_BOUNTIES_REQUEST: {
            return state.set('transferIsLoading', true)
        }

        case TRANSFER_BOUNTIES_FAILED: {
            return state.set('transferIsLoading', false)
        }
            
        case TRANSFER_BOUNTIES_SUCCESS: {
            return state
                .set('transferIsLoading', false)
                .get('transfer')
                .merge({...payload})
        }

        default: {
            return state
        }
    }
}
