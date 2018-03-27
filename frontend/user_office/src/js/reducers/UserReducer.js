import {
    GET_USER_REQUEST,
    GET_USER_SUCCESSFULL,
    SHOW_SET_ACCOUNT_FORM,
    HIDE_SET_ACCOUNT_FORM,
    SET_ACCOUNT_REQUEST,
    SET_ACCOUNT_SUCCESSFULL,
    SET_METAMASK_ACCOUNT
} from '../types/UserTypes'

const initialState = {
    eth_account: null,
    tokens_amount: null,
    username: null,
    kyc_required: false,
    userIsLoading: false,
    investment_threshold: 0,
    showSetAccountForm: false,
    setAccountSubmitting: false,
    metaMaskAccount: ''
}

export function UserReducer (state=initialState, {type, payload, ...action}) {
    switch(type) {
        case GET_USER_REQUEST: {
            return {
                ...state,
                userIsLoading: true
            }
        }
        case GET_USER_SUCCESSFULL: {
            return {
                ...state,
                ...payload,
                userIsLoading: false
            }
        }
        case SHOW_SET_ACCOUNT_FORM: {
            return {
                ...state,
                showSetAccountForm: true
            }
        }
        case HIDE_SET_ACCOUNT_FORM: {
            return {
                ...state,
                showSetAccountForm: false
            }
        }
        case SET_ACCOUNT_REQUEST: {
            return {
                ...state,
                setAccountSubmitting: true
            }
        }
        case SET_ACCOUNT_SUCCESSFULL: {
            return {
                ...state,
                setAccountSubmitting: false
            }
        }
        case SET_METAMASK_ACCOUNT: {
            return {
                ...state,
                ...payload
            }
        }
        default: {
            return state
        }

    }
}
