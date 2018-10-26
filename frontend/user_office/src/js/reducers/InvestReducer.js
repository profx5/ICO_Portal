import { createReducer } from 'redux-act';
import * as actions from './../actions/InvestActions';
import {Map} from 'immutable';


const initialState = Map({
    tokenPrice: 2,
    investAmount: 0,
    USDAmount: 0,
    tokensAmount: 0,
    isMetamaskEnabled: true,
    qrcode: ''
})


export const InvestReducer = createReducer({
    [actions.setInvestAmount]: (state, payload) => {
        return state.merge({
            investAmount: payload
        });
    },
    [actions.setUSDAmount]: (state, payload) => {
        return state.merge({
            USDAmount: payload
        });
    },
    [actions.setTokensAmount]: (state, payload) => {
        return state.merge({
            tokensAmount: payload
        });
    },

    [actions.enableMetamaskOption]: (state, payload) => state.set('isMetamaskEnabled', true),
    [actions.disableMetamaskOption]: (state, payload) => state.set('isMetamaskEnabled', false),
    [actions.setQRCode]: (state, payload) => state.set('qrcode', payload)
}, initialState);
