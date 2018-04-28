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
            name: 'ETH',
            logo: '/img.png',
            rate: '585.3880'
        },
        {
            name: 'ETH',
            logo: '/img.png',
            rate: '585.3880'
        },
        {
            name: 'ETH',
            logo: '/img.png',
            rate: '585.3880'
        },
        {
            name: 'ETH',
            logo: '/img.png',
            rate: '585.3880'
        },
        {
            name: 'ETH',
            logo: '/img.png',
            rate: '585.3880'
        },
        {
            name: 'ETH',
            logo: '/img.png',
            rate: '585.3880'
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