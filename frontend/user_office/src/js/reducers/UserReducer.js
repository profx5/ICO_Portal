import {
    GET_USER_REQUEST,
    GET_USER_SUCCESSFULL,
    SHOW_SET_ACCOUNT_FORM,
    HIDE_SET_ACCOUNT_FORM,
    SET_ACCOUNT_REQUEST,
    SET_ACCOUNT_SUCCESSFULL
} from '../types/UserTypes'


import {Map} from 'immutable'

const initialState = Map({
    eth_account: null,
    tokens_amount: null,
    username: null,
    kyc_required: false,
    userIsLoading: false,
    investment_threshold: 0,
    showSetAccountForm: false,
    setAccountSubmitting: false
})

export function UserReducer (state=initialState, {type, payload, ...action}) {
    switch(type) {
        case GET_USER_REQUEST: {
            return state.set("userIsLoading", true)
        }
        case GET_USER_SUCCESSFULL: {
            return state.merge({
                ...payload
            }).set('userIsLoading', false)
        }
        case SHOW_SET_ACCOUNT_FORM: {
            return state.set('showSetAccountForm', true)
        }
        case HIDE_SET_ACCOUNT_FORM: {
            return state.set('showSetAccountForm', false)
        }
        case SET_ACCOUNT_REQUEST: {
            return state.set("setAccountSubmitting", true)
        }
        case SET_ACCOUNT_SUCCESSFULL: {
            return state.set('setAccountSubmitting', false)
        }
        default: {
            return state
        }

    }
}
