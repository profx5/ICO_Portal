import { createAction } from 'redux-act';


export const showAccountDropdown = createAction('SHOW_ACCOUNT_DROPDOWN');
export const hideAccountDropdown = createAction('HIDE_ACCOUNT_DROPDOWN');

export const showInvestOptions = createAction('SHOW_INVEST_OPTIONS');
export const hideInvestOptions = createAction('HIDE_INVEST_OPTIONS');

export const showSetAccountPopup = createAction('SHOW_SET_ACCOUNT_POPUP');
export const hideSetAccountPopup = createAction('HIDE_SET_ACCOUNT_POPUP');