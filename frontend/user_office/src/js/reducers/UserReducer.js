import { createReducer } from 'redux-act';
import * as actions from './../actions/UserActions';
import {Map} from 'immutable';



const initialState = Map({
    eth_account: null,
    tokens_amount: 0.00,
    username: null,
    email: 'gordon@ongrid.pro',
    kyc_required: false,
    userIsLoading: false,
    investment_threshold: 0,
    setAccountSubmitting: false,
    metamaskAccount: null,
    security: Map({
        privateKey: null
    })
})



export const UserReducer = createReducer({
    [actions.getUserRequest]: (state, payload) => state.set("userIsLoading", true),
    [actions.getUserSuccessfull]: (state, payload) => {
        return state.merge({
            ...payload
        }).set('userIsLoading', false)
    },

    [actions.showSetAccountForm]: (state, payload) => state.set('showSetAccountForm', true),
    [actions.hideSetAccountForm]: (state, payload) => state.set('showSetAccountForm', false),

    [actions.setAccountRequest]: (state, payload) => state.set("setAccountSubmitting", true),
    [actions.setAccountSuccessfull]: (state, payload) => state.set('setAccountSubmitting', false),

    [actions.setMetaMaskAccountSuccessfull]: (state, payload) => state.set('metamaskAccount', payload)
}, initialState);
