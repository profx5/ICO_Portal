import { createReducer } from 'redux-act';
import * as actions from './../actions/InvestActions';
import {Map} from 'immutable';



const initialState = Map({
    showInvestForm: false,
    investAmount: 1,
    tokensAmount: 0
})



export const InvestReducer = createReducer({
    [actions.showForm]: (state = initialState, payload) => state.set("showInvestForm", true),
    [actions.hideForm]: (state = initialState, payload) => state.set("showInvestForm", false),
    [actions.setInvestAmount]: (state, payload) => {
        return state.merge({
            investAmount: payload
        });
    },
    [actions.setTokensAmount]: (state, payload) => {
        return state.merge({
            tokensAmount: payload
        });
    }
}, initialState);
