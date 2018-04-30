import { createReducer } from 'redux-act';
import * as actions from './../actions/CurrencyActions';
import {Map} from 'immutable';



const initialState = Map({
    currencies: [
        {
            name: 'ETH',
            logo: '/img.png',
            rate: '585.3880'
        },
        {
            name: 'BTC',
            logo: '/img.png',
            rate: '8471.2900'
        },
        {
            name: 'LTC',
            logo: '/img.png',
            rate: '149.1980'
        },
        {
            name: 'BCH',
            logo: '/img.png',
            rate: '1067.8200'
        },
        {
            name: 'BTG',
            logo: '/img.png',
            rate: '63.7921'
        },
        {
            name: 'DASH',
            logo: '/img.png',
            rate: '438.3370'
        },
        {
            name: 'ETC',
            logo: '/img.png',
            rate: '18.8307'
        },
    ]
});



export const CurrencyReducer = createReducer({
    [actions.getCurrenciesRequest]: (state, payload) => state,
    [actions.getCurrenciesSuccess]: (state, payload) => {
        return state.merge({
            currencies: payload
        });
    }
}, initialState);