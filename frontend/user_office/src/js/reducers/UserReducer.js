import {
    GET_USER_REQUEST,
    GET_USER_SUCCESSFULL,
    SET_ACCOUNT_REQUEST,
    SET_ACCOUNT_SUCCESSFULL,
    SET_GENERETED_ETHEREUM_ACCOUNT,
    SET_METAMASK_ACCOUNT_SUCCESSFULL,
} from '../types/UserTypes'
import {Map} from 'immutable'

const initialState = Map({
    eth_account: null,
    tokens_amount: null,
    username: null,
    kyc_required: false,
    userIsLoading: false,
    investment_threshold: 0,
    setAccountSubmitting: false,
    metamaskAccount: null,
    security: Map({
        privateKey: null
    })
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
        case SET_ACCOUNT_REQUEST: {
            return state.set("setAccountSubmitting", true)
        }
        case SET_ACCOUNT_SUCCESSFULL: {
            return state.set('setAccountSubmitting', false)
        }
        case SET_METAMASK_ACCOUNT_SUCCESSFULL: {
            return state.set('metamaskAccount', payload)
        }
        case SET_GENERETED_ETHEREUM_ACCOUNT : {
            const {address, privateKey} = action

            return state
                .set('eth_account', address)
                .setIn(['security', 'privateKey'], privateKey)
        }

        default: {
            return state
        }
    }
}
