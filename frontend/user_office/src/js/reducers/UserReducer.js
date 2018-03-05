import {
    GET_USER_REQUEST,
    GET_USER_SUCCESSFULL
} from '../types/UserTypes'

const initialState = {
    eth_account: null,
    tokens_amount: null,
    username: null,
    userIsLoading: false
}

export function UserReducer (state=initialState, {type, payload, ...action}) {
    switch(type) {
        case GET_USER_REQUEST: {
            return {...state, userIsLoading: true}
        }
        case GET_USER_SUCCESSFULL: {
            return {
                ...state,
                ...payload, 
                userIsLoading: false
            }
        }   
        default: {
            return state
        }

    }

    return state
}
