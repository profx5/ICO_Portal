import {
    GET_DEPOSITE_REQUEST,
    GET_DEPOSITE_SUCCESS,
} from '../types/DepositTypes'

const initialState = {
    isDepositLoading: false,
    list: []
}

export function DepositeReducer(state=initialState, {type, payload, ...action}) {
    switch(type) {
        case GET_DEPOSITE_REQUEST: {
            return {
                ...state,
                isDepositLoading: true
            }
        }

        case GET_DEPOSITE_SUCCESS: {
            return {
                ...state,
                list: [...state.list, ...payload],
                isDepositLoading: false
            }
        }
        default: {
            return {...state}
        }
    }

    return {...state}
}
