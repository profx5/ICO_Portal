import { createReducer } from 'redux-act';
import * as actions from './../actions/CurrencyActions';
import {Map} from 'immutable';



const initialState = Map({
    currencies: [
        {
            code: "",
            name: "",
            rate: 0
        },

    ],
    investCurrency: '',
    investCurrencyRate: '',
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