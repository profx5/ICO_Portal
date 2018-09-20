import { createAction } from 'redux-act';



export const getCurrenciesRequest = createAction('GET_CURRENCY_REQUEST');
export const getCurrenciesSuccess = createAction('GET_CURRENCY_SUCCESSFUL');
export const getCurrenciesFailed = createAction('GET_CURRENCY_FAILED');

export const setInvestCurrency = createAction('SET_INVEST_CURRENCY');
export const setInvestCurrencyRate = createAction('SET_INVEST_CURRENCY_RATE');

export const spreadVisibleCards = createAction('SPREAD_VISIBLE_CARDS');
