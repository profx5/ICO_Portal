import { createReducer } from 'redux-act';
import * as actions from './../actions/ICOInfoActions';
import {Map} from 'immutable';



const initialState = Map({
    token_address: "",
    total_supply: 0,
    usd_c_per_eth: 0
});



export const ICOInfoReducer = createReducer({
    [actions.getICOInfoRequest]: (state = initialState, payload) => state,
    [actions.getICOInfoSuccess]: (state = initialState, payload) => state.merge(payload)
}, initialState);