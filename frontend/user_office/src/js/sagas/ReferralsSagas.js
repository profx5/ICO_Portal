import axios from 'axios';
import api from 'api';
import {takeLatest, put, call} from 'redux-saga/effects';
import * as actions from 'js/actions/ReferralsActions';

export class ReferralsSagas {
    static * getReferralLink(action) {
        try {
            const response = yield call(axios, {
                url: api.getReferralLink(),
                method: 'GET'
            })

            yield put(actions.getReferralLinkSuccess(response.data.link))
        } catch(e) {
            yield put(actions.getReferralLinkFailed())
        }
    }
}

export function* saga() {
    yield takeLatest(actions.getReferralLinkRequest, ReferralsSagas.getReferralLink)
}
