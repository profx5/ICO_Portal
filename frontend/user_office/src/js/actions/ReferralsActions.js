import {
    GET_REFERRAL_LINK_REQUEST,
    GET_REFERRAL_LINK_SUCCESS,
    GET_REFERRAL_LINK_FAILED,
} from '../types/ReferralsTypes'

export class ReferralsActions {
    static getReferralLinkRequest = () => ({type: GET_REFERRAL_LINK_REQUEST})

    static getReferralLinkFailed = () => ({type: GET_REFERRAL_LINK_FAILED})

    static getReferralLinkSuccess = (payload) => ({type: GET_REFERRAL_LINK_SUCCESS, payload})
}
