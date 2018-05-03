import { createReducer } from 'redux-act';
import * as actions from './../actions/CurrencyActions';
import {Map} from 'immutable';



const initialState = Map({
    currencies: [
        {
            name: 'ETH',
            rate: 585.38
        },
        {
            name: 'BTC',
            rate: 8471.29
        },
        {
            name: 'LTC',
            rate: 149.19
        },
        {
            name: 'BCH',
            rate: 1067.82
        },
        {
            name: 'BRK',
            rate: 63.79
        },
        {
            name: 'DASH',
            rate: 438.33
        },
        {
            name: 'ETC',
            rate: 18.83
        },
    ],
    investCurrency: '',
    investCurrencyRate: ''
});



export const CurrencyReducer = createReducer({
    [actions.getCurrenciesRequest]: (state, payload) => state,
    [actions.getCurrenciesSuccess]: (state, payload) => {
        return state.merge({
            currencies: payload
        });
    },
    [actions.setInvestCurrency]: (state, payload) => {
        return state.merge({
            investCurrency: payload
        });
    },
    [actions.setInvestCurrencyRate]: (state, payload) => {
        return state.merge({
            investCurrencyRate: payload
        });
    }
}, initialState);