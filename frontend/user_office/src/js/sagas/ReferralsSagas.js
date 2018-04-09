import axios from 'axios'
import api from '../../api'
import {
    GET_REFERRAL_LINK_REQUEST,
} from '../types/ReferralsTypes'
import {takeLatest, put, call} from 'redux-saga/effects'
import {ReferralsActions} from '../actions/ReferralsActions'

export class ReferralsSagas {
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
    yield takeLatest(GET_REFERRAL_LINK_REQUEST, ReferralsSagas.getReferralLink)
}
