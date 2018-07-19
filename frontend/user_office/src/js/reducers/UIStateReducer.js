import { createReducer } from 'redux-act';
import * as actions from './../actions/UIActions';
import {Map} from 'immutable';



const initialState = Map({
    accountDropdownShown: false,
    stepsDropdownShown: false,
    showInvestOptions: false,
    showSetAccountPopup: false,
    faqSelectedTab: 'my',
    currentRoute: 1,
    openedTicket: 'qe12',
    activeKycTab: 2
});



export const UIStateReducer = createReducer({
    [actions.showAccountDropdown]: (state = initialState, payload) => state.set("accountDropdownShown", true),
    [actions.hideAccountDropdown]: (state = initialState, payload) => state.set("accountDropdownShown", false),
    [actions.showStepsDropdown]: (state = initialState, payload) => state.set("stepsDropdownShown", true),
    [actions.hideStepsDropdown]: (state = initialState, payload) => state.set("stepsDropdownShown", false),
    [actions.showInvestOptions]: (state = initialState, payload) => state.set("showInvestOptions", true),
    [actions.hideInvestOptions]: (state = initialState, payload) => state.set("showInvestOptions", false),
    [actions.showSetAccountPopup]: (state = initialState, payload) => state.set("showSetAccountPopup", true),
    [actions.hideSetAccountPopup]: (state = initialState, payload) => state.set("showSetAccountPopup", false),
    [actions.changeSelectedTab]: (state = initialState, payload) => state.set("faqSelectedTab", payload.tab),
    [actions.setCurrentRoute]: (state = initialState, payload) => state.set("currentRoute", payload.route_index),
    [actions.setOpenedTicket]: (state = initialState, payload) => state.set("openedTicket", payload.id),
    [actions.activateKycTab]: (state = initialState, payload) => state.set('activeKycTab', payload.id)

}, initialState);


