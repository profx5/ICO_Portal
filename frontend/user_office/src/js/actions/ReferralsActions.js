import axios from 'axios'
import api from '../../api'

import {
    GET_REFERRAL_LINK_REQUEST,
    GET_REFERRAL_LINK_SUCCESS,
    GET_REFERRAL_LINK_FAILED,
} from '../types/ReferralsTypes'

import {takeLatest, put, call} from 'redux-saga/effects'


export class ReferralsActions {
    static getReferralLinkRequest = () => ({type: GET_REFERRAL_LINK_REQUEST})

    static getReferralLinkFailed = () => ({type: GET_REFERRAL_LINK_FAILED})

    static getReferralLinkSuccess = (payload) => ({type: GET_REFERRAL_LINK_SUCCESS, payload})

    static * getReferralLink(action) {
        try {
            const response = yield call(axios, {
                url: api.getReferralLink(),
                method: 'GET'
            })

            yield put(ReferralsActions.getReferralLinkSuccess(response.data.link))
        } catch(e) {
            yield put(ReferralsActions.getReferralLinkFailed())
        }
    }
}

export function* saga() {
    yield takeLatest(GET_REFERRAL_LINK_REQUEST, ReferralsActions.getReferralLink)
}
