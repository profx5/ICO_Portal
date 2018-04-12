import {
    GET_DEPOSITS_REQUEST,
    GET_DEPOSITS_SUCCESS,
    DEPOSITS_NEXT_PAGE,
    DEPOSITS_PREV_PAGE
} from '../types/DepositsTypes'

import {Map, List} from 'immutable'

const initialState = Map({
    isDepositsLoading: false,
    count: 0,
    pages: 0,
    current_page: 1,
    results: List()
})

export function DepositsReducer(state=initialState, {type, payload, ...action}) {
    switch(type) {
        case GET_DEPOSITS_REQUEST: {
            return state.set('isDepositsLoading', true)
        }
        case GET_DEPOSITS_SUCCESS: {
            return state.mergeDeep(payload).set('isDepositsLoading', false)
        }
        case DEPOSITS_NEXT_PAGE: {
            return state.update('current_page', page => page + 1)
        }
        case DEPOSITS_PREV_PAGE: {
            return state.update('current_page', page => page - 1)
        }
        default: {
            return state
        }
    }
}
