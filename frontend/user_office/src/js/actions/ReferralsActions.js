import { createAction } from 'redux-act';


export const getReferralLinkRequest = createAction('GET_REFERRAL_LINK_REQUEST');
export const getReferralLinkFailed = createAction('GET_REFERRAL_LINK_SUCCESS');
export const getReferralLinkSuccess = createAction('GET_REFERRAL_LINK_FAILED');