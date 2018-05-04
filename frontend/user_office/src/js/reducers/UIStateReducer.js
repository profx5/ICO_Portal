import { createReducer } from 'redux-act';
import * as actions from './../actions/UIStateActions';
import {Map} from 'immutable';



const initialState = Map({
    accountDropdownShown: false
})



export const UIStateReducer = createReducer({
    [actions.showAccountDropdown]: (state = initialState, payload) => state.set("accountDropdownShown", true),
    [actions.hideAccountDropdown]: (state = initialState, payload) => state.set("accountDropdownShown", false),
}, initialState);


