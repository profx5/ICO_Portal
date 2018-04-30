import { createReducer } from 'redux-act';
import * as actions from './../actions/ICOInfoActions';
import {Map} from 'immutable';



const initialState = Map({
    USDcPerETHRate: 0,
    USDcRaised: 0,
    totalHardCapUSDc: 400000000,
    crowdSaleAddress: "",
    tokenAddress: "",
    currentPhase: {
        name: "preICO",
        discountPercent: 40,
        startTime: 1520467200,
        endTime: 1523145600,
        softCapUSDc: 200000000,
        hardCapUSDc: 300000000
    }
});



export const ICOInfoReducer = createReducer({
    [actions.getICOInfoRequest]: (state, payload) => state,
    [actions.getICOInfoSuccess]: (state, payload) => state.merge(payload)
}, initialState);