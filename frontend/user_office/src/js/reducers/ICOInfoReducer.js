import { createReducer } from 'redux-act';
import * as actions from './../actions/ICOInfoActions';
import {Map} from 'immutable';


const initialState = Map({
    total_supply: "0",
    token_address: "0x",
    crowdsale_address: '0x',
    alt_crowdsale_address: '0x',
    token_decimals: 18,
    humanizedEndTime: '',
    countdownTime: ''
});


export const ICOInfoReducer = createReducer({
    [actions.getICOInfoRequest]: (state) => state,
    [actions.getICOInfoSuccess]: (state, payload) => state.merge(payload),
    [actions.humanizeEndTime]: (state, payload) => state.merge({humanizedEndTime: payload}),
    [actions.updateCountdown]: (state, payload) => state.set('countdownTime', payload),
    [actions.getCryptoAccountRequest]: (state) => state,
    [actions.getCryptoAccountSuccessful]: (state, payload) => state.set('alt_crowdsale_address', payload)
}, initialState);
