import { createReducer } from 'redux-act';
import * as actions from './../actions/UIActions';
import {Map} from 'immutable';



const initialState = Map({
    accountDropdownShown: false,
    showInvestOptions: false
});



export const UIStateReducer = createReducer({
    [actions.showAccountDropdown]: (state = initialState, payload) => state.set("accountDropdownShown", true),
    [actions.hideAccountDropdown]: (state = initialState, payload) => state.set("accountDropdownShown", false),
    [actions.showInvestOptions]: (state = initialState, payload) => state.set("showInvestOptions", true),
    [actions.hideInvestOptions]: (state = initialState, payload) => state.set("showInvestOptions", false),
}, initialState);


