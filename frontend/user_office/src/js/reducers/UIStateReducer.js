import {createReducer} from 'redux-act';
import * as actions from './../actions/UIActions';
import {Map} from 'immutable';


const initialState = Map({
    accountDropdownShown: false,
    stepsDropdownShown: false,
    showInvestOptions: false,
    showSetAccountPopup: false,
    faqSelectedTab: 'new',
    currentRoute: 1,
    activeKycTab: 2,
    showCurrenciesPopup: false,
    openedTxn: null,
    openedTip: null,
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
    [actions.showCurrenciesPopup]: (state = initialState, payload) => state.set("showCurrenciesPopup", true),
    [actions.hideCurrenciesPopup]: (state = initialState, payload) => state.set("showCurrenciesPopup", false),
    [actions.changeSelectedTab]: (state = initialState, payload) => state.set("faqSelectedTab", payload.tab),
    [actions.setCurrentRoute]: (state = initialState, payload) => state.set("currentRoute", payload.route_index),
    [actions.activateKycTab]: (state = initialState, payload) => state.set('activeKycTab', payload.id),
    [actions.setOpenedTxn]: (state = initialState, payload) => state.set('openedTxn', payload.id),
    [actions.setOpenedTip]: (state = initialState, payload) => state.set('openedTip', payload.id),
}, initialState);


