import {createReducer} from 'redux-act';
import * as actions from 'js/actions/CurrencyActions';
import {Map} from 'immutable';


const initialState = Map({
    currencies: [
        {
            code: 'DAI',
            name: 'DAI',
            rate: 1.0,
        },
        {
            code: 'TUSD',
            name: 'TUSD',
            rate: 2.0,
        },
        {
            code: 'USDC',
            name: 'USDC',
            rate: 3.0,
        },
        {
            code: 'USDT',
            name: 'USDT',
            rate: 4.0,
        },
    ],
    investCurrency: 'DAI',
    investCurrencyRate: 0.00,
    spreadedCurrencyCards: false
});


export const CurrencyReducer = createReducer({
    [actions.getCurrenciesRequest]: (state) => state,
    [actions.setInvestCurrency]: (state, payload) => {
        return state.merge({
            investCurrency: payload
        });
    },
    [actions.setInvestCurrencyRate]: (state, payload) => {
        return state.merge({
            investCurrencyRate: payload
        });
    },
    [actions.spreadVisibleCards]: (state, payload) => {
        return state.merge({
            spreadedCurrencyCards: payload
        });
    },

}, initialState);
