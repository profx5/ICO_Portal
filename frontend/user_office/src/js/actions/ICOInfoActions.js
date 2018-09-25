import { createAction } from 'redux-act';


export const getICOInfoRequest = createAction('GET_ICO_INFO_REQUEST');
export const getICOInfoSuccess = createAction('GET_ICO_INFO_SUCCESS');
export const getICOInfoFailed = createAction('GET_ICO_PHASE_STATS_FAILED');

export const humanizeEndTime = createAction('HUMANIZE_END_TIME');
export const updateCountdown = createAction('UPDATE_COUNTDOWN');

export const getCryptoAccountRequest = createAction('GET_CRYPTO_ACCOUNT_REQUEST');
export const getCryptoAccountSuccessful = createAction('GET_CRYPTO_ACCOUNT_SUCCESSFUL');
export const getCryptoAccountFailed = createAction('GET_CRYPTO_ACCOUNT_FAILED');
