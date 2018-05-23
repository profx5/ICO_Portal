import { createReducer } from 'redux-act';
import * as actions from './../actions/ICOInfoActions';
import {Map} from 'immutable';



const initialState = Map({
    total_supply: "0",
    token_address: "0x",
    token_decimals: 2,
    humanizedEndTime: '',
    countdownTime: ''
});



export const ICOInfoReducer = createReducer({
    [actions.getICOInfoRequest]: (state, payload) => state,
    [actions.getICOInfoSuccess]: (state, payload) => state.merge(payload),
    [actions.humanizeEndTime]: (state, payload) => state.merge({humanizedEndTime: payload}),
    [actions.updateCountdown]: (state, payload) => state.merge({countdownTime: payload})
}, initialState);