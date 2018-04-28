import { createAction } from 'redux-act';



export const getPhaseRequest  = createAction('GET_PHASE_REQUEST');
export const getPhaseSuccess = createAction('GET_PHASE_SUCCESS');
export const getPhaseFailed = createAction('GET_PHASE_FAILED');