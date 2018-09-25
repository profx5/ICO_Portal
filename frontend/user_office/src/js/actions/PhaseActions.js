import { createAction } from 'redux-act';


export const getPhasesRequest  = createAction('GET_PHASE_REQUEST');
export const getPhasesSuccess = createAction('GET_PHASE_SUCCESS');
export const getPhaseFailed = createAction('GET_PHASE_FAILED');
