import { createAction } from 'redux-act';



export const getBountiesRequest = createAction('GET_DEPOSITE_REQUEST');
export const getBountiesSuccess = createAction('GET_DEPOSITE_SUCCESS');
export const getBountiesFailed = createAction('GET_BOUNTIES_BALANCE_FAILED');

export const postTransferRequest = createAction('TRANSFER_BOUNTIES_REQUEST');
export const postTransferSuccess = createAction('TRANSFER_BOUNTIES_SUCCESS');
export const postTransferFailed = createAction('TRANSFER_BOUNTIES_FAILED');
