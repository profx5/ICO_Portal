import { createAction } from 'redux-act';


export const showForm = createAction('SHOW_INVEST_FORM');
export const hideForm = createAction('HIDE_INVEST_FORM');
export const sendTransactionInit = createAction('SEND_TRANSACTION_INIT', (senderAccount, receiverAccount, value, currency) => ({senderAccount, receiverAccount, value, currency}));

export const setInvestAmount = createAction('SET_INVEST_AMOUNT');
export const setUSDAmount = createAction('SET_USD_AMOUNT');
export const setTokensAmount = createAction('SET_TOKENS_AMOUNT');

export const sendTransactionSuccessfull = createAction('SEND_TRANSACTION_SUCCESSFULL');
export const sendTransactionFailed = createAction('SEND_TRANSACTION_FAILED');

export const enableMetamaskOption = createAction('ENABLE_METAMASK_OPTION');
export const disableMetamaskOption = createAction('DISABLE_METAMASK_OPTION');

export const setQRCode = createAction('SET_QR_CODE');
