import { createAction } from 'redux-act';


export const showForm = createAction('SHOW_INVEST_FORM');
export const hideForm = createAction('HIDE_INVEST_FORM');
export const sendTransactionInit = createAction('SEND_TRANSACTION_INIT', (senderAccount, receiverAccount, value) => ({senderAccount, receiverAccount, value}));

export const sendTransactionSuccessfull = createAction('SEND_TRANSACTION_SUCCESSFULL');
export const sendTransactionFailed = createAction('SEND_TRANSACTION_FAILED');