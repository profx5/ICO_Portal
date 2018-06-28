import { createAction } from 'redux-act';



export const getUserRequest = createAction('GET_USER_REQUEST');
export const getUserSuccessfull = createAction('GET_USER_SUCCESSFULL');
export const getUserFailed = createAction('GET_USER_FAILED');

export const showSetAccountForm = createAction('SHOW_SET_ACCOUNT_FORM');
export const hideSetAccountForm = createAction('HIDE_SET_ACCOUNT_FORM');

export const setAccountRequest = createAction('SET_ACCOUNT_REQUEST');
export const setAccountSuccessfull = createAction('SET_ACCOUNT_SUCCESSFULL');
export const setAccountFailed = createAction('SET_ACCOUNT_FAILED');

export const setMetaMaskAccountRequest = createAction('SET_METAMASK_ACCOUNT_REQUEST');
export const setMetaMaskAccountSuccessfull = createAction('SET_METAMASK_ACCOUNT_SUCCESSFULL');
export const setMetaMaskAccountFailed = createAction('SET_METAMASK_ACCOUNT_FAILED');

export const changePasswordRequest = createAction('CHANGE_PASSWORD_REQUEST');
export const changePasswordSuccessfull = createAction('CHANGE_PASSWORD_SUCCESSFULL');
export const changePasswordFailed = createAction('CHANGE_PASSWORD_FaILED');

export const changeEmailRequest = createAction('CHANGE_EMAIL_REQUEST');
export const changeEmailSuccessfull = createAction('CHANGE_EMAIL_SUCCESSFULL');
export const changeEmailFailed = createAction('CHANGE_EMAIL_FaILED');
