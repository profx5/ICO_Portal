import {
    GET_DEPOSITS_REQUEST,
    GET_DEPOSITS_SUCCESS,
} from '../types/DepositsTypes'

import {Map, List, fromJS} from 'immutable'

const initialState = Map({
    isDepositsLoading: false,
    list: List()
})

export function DepositsReducer(state=initialState, {type, payload, ...action}) {
    switch(type) {
        case GET_DEPOSITS_REQUEST: {
            return state.set('isDepositsLoading', true)
        }
        case GET_DEPOSITS_SUCCESS: {
            return state.merge({
                list: fromJS(payload)
            }).set('isDepositsLoading', false)

        }
        default: {
            return state
        }
    }
}
