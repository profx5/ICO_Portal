import { createReducer } from 'redux-act';
import * as actions from './../actions/InvestActions';
import {Map} from 'immutable';



const initialState = Map({
    showInvestForm: false
})



export const InvestReducer = createReducer({
    [actions.showForm]: (state = initialState, payload) => state.set("showInvestForm", true),
    [actions.hideForm]: (state = initialState, payload) => state.set("showInvestForm", false)
}, initialState);


