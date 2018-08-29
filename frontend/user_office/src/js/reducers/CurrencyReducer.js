import {createReducer} from 'redux-act';
import * as actions from './../actions/CurrencyActions';
import {Map} from 'immutable';


const initialState = Map({
    currencies: [
        {code: "ETH", name: "Ethereum", rate: 461.9},
        {code: "BTC", name: "Bitcoin", rate: 0.00},
        {code: "LTC", name: "Litecoin", rate: 0.00},
        {code: "DOGE", name: "Dogecoin", rate: 0.00},
        {code: "DASH", name: "Dash", rate: 0.00},
        {code: "ZEC", name: "Zcash", rate: 0.00}
    ],
    investCurrency: '',
    investCurrencyRate: 0.00,
    spreadedCurrencyCards: false
});

export const CurrencyReducer = createReducer({
    [actions.getCurrenciesRequest]: (state, payload) => state,
    [actions.getCurrenciesSuccess]: (state, payload) => {
        return state.set('currencies', payload)
            .set('investCurrency', payload[0].code)
            .set('investCurrencyRate', payload[0].rate);
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
    },
    [actions.spreadVisibleCards]: (state, payload) => {
        return state.merge({
            spreadedCurrencyCards: payload
        });
    },

}, initialState);
