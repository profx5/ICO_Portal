import {
    GET_DEPOSITS_REQUEST,
    GET_DEPOSITS_SUCCESS,
} from '../types/DepositsTypes'

const initialState = {
    isDepositsLoading: false,
    list: []
}

export function DepositsReducer(state=initialState, {type, payload, ...action}) {
    switch(type) {
        case GET_DEPOSITS_REQUEST: {
            return {
                ...state,
                isDepositsLoading: true
            }
        }
        case GET_DEPOSITS_SUCCESS: {
            return {
                ...state,
                list: payload,
                isDepositsLoading: false
            }
        }
        default: {
            return {...state}
        }
    }
}
