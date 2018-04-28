import { createAction } from 'redux-act';



export const getDepositsRequest = createAction('GET_DEPOSITS_REQUEST');
export const getDepositsSuccess = createAction('GET_DEPOSITS_SUCCESS');
export const getDepositsFailed = createAction('GET_DEPOSITE_FAILED');

export const createPreparedDepositRequest = createAction('CREATE_PREPARED_DEPOSIT_REQUEST', (value, txnHash) => ({value, txnHash}));
export const createPreparedDepositSuccess = createAction('CREATE_PREPARED_DEPOSIT_SUCCESS');
export const createPreparedDepositFailed = createAction('CREATE_PREPARED_DEPOSIT_FAILED');

export const depositsNextPage = createAction('DEPOSITS_NEXT_PAGE');
export const depositsPrevPage = createAction('DEPOSITS_PREV_PAGE');