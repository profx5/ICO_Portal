import { createReducer } from 'redux-act';
import * as actions from 'js/actions/UserActions';
import {Map} from 'immutable';


const initialState = Map({
    "email": "",
    "eth_account": null,
    "set_eth_error": null,
    "tokens_amount": 0.00,
    "kyc_required": false,
    "investment_threshold": 0,
    "state": "WAITING"
});


export const UserReducer = createReducer({
    [actions.getUserRequest]: (state, payload) => state.set("userIsLoading", true),
    [actions.getUserSuccessfull]: (state, payload) => {
        return state.merge({
            ...payload
        }).set('userIsLoading', false)
    },

    [actions.showSetAccountForm]: (state) => state.set('showSetAccountForm', true),
    [actions.hideSetAccountForm]: (state) => state.set('showSetAccountForm', false),
    [actions.setAccountRequest]: (state) => state.set("setAccountSubmitting", true),
    [actions.setAccountSuccessfull]: (state) => state.set('setAccountSubmitting', false),
    [actions.setAccountFailed]: (state, payload) => state.set('set_eth_error', payload),
    [actions.setMetaMaskAccountSuccessfull]: (state, payload) => state.set('metamaskAccount', payload),

}, initialState);
