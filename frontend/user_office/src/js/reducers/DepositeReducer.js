import {
    GET_DEPOSITE_REQUEST,
    GET_DEPOSITE_SUCCESS,
} from '../types/DepositTypes'

import {fromJS, List} from 'immutable'

const initialState = fromJS({
    isDepositLoading: false,
    list: []
})

export function DepositeReducer(state=initialState, {type, payload, ...action}) {
    switch(type) {
        case GET_DEPOSITE_REQUEST: {
            return state.set('isDepositLoading', true)
        }
        case GET_DEPOSITE_SUCCESS: {
            return state.merge({
                list: state.get('list').concat(payload)
            }).set('isDepositLoading', true)
           
        }
        default: {
            return state
        }
    }
}
