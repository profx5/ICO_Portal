import { createAction } from 'redux-act';


export const showAccountDropdown = createAction('SHOW_ACCOUNT_DROPDOWN');
export const hideAccountDropdown = createAction('HIDE_ACCOUNT_DROPDOWN');

export const showStepsDropdown = createAction('SHOW_STEPS_DROPDOWN');
export const hideStepsDropdown = createAction('HIDE_STEPS_DROPDOWN');

export const showCurrenciesPopup = createAction('SHOW_CURRENCIES_POPUP');
export const hideCurrenciesPopup = createAction('HIDE_CURRENCIES_POPUP');

export const showInvestOptions = createAction('SHOW_INVEST_OPTIONS');
export const hideInvestOptions = createAction('HIDE_INVEST_OPTIONS');

export const showSetAccountPopup = createAction('SHOW_SET_ACCOUNT_POPUP');
export const hideSetAccountPopup = createAction('HIDE_SET_ACCOUNT_POPUP');
export const changeSelectedTab = createAction('CHANGE_SELECTED_TAB', (tab => ({tab})));
export const setCurrentRoute = createAction('SET_CURRENT_ROUTE', (route_index => ({route_index})));
