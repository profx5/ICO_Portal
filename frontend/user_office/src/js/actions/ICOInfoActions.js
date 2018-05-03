import { createAction } from 'redux-act';


export const getICOInfoRequest = createAction('GET_ICO_INFO_REQUEST');
export const getICOInfoSuccess = createAction('GET_ICO_INFO_SUCCESS');
export const getICOInfoFailed = createAction('GET_ICO_PHASE_STATS_FAILED');

export const humanizeEndTime = createAction('HUMANIZE_END_TIME');