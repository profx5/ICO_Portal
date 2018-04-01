import {
    GET_DEPOSITS_REQUEST,
    GET_DEPOSITS_SUCCESS,
} from '../types/DepositsTypes'

import {Map} from 'immutable'

const initialState = Map({
    isDepositsLoading: false,
    list: []
})

export function DepositsReducer(state=initialState, {type, payload, ...action}) {
    switch(type) {
        case GET_DEPOSITS_REQUEST: {
            return state.set('isDepositLoading', true)
        }
        case GET_DEPOSITS_SUCCESS: {
            return state.merge({
                list: state.get('list').concat(payload)
            }).set('isDepositLoading', true)
           
        }
        default: {
            return state
        }
    }
}
