import { createAction } from 'redux-act';



export const getCurrenciesRequest = createAction('GET_CURRENCY_REQUEST');
export const getCurrenciesSuccess = createAction('GET_CURRENCY_SUCCESSFUL');
export const getCurrenciesFailed = createAction('GET_CURRENCY_FAILED');