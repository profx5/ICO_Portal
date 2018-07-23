import axios from 'axios'
import Api from '../../api'
import * as actions from './../actions/KYCActions'
import {call, put, takeEvery} from 'redux-saga/effects'

export class KYCSagas {
    static * submitKYC(action) {
        const type = action.payload.get('type');
        const url = type === 'create' ? Api.kyc() : Api.kyc_upd();
        try {
            yield call(axios, {
                url: url,
                method: 'POST',
                data: action.payload
            });
            yield put(actions.submitKYCSuccessfull());
            yield call(KYCSagas.getKYC);

        } catch(e) {
            yield put(actions.submitKYCFailed())
        }
    }

    static * submitKYC_and_retriveKYC(data) {
        try {
            yield call(KYCSagas.submitKYC, data)
            yield call(KYCSagas.getKYC)
        } catch(e) {
            console.log("CANT SUBMIT AND FETCH KYC")
        }
    }

    static * getKYC() {
        try {
            const response = yield call(axios, {
                url: Api.kyc(),
                method: 'GET'
            })
            yield put(actions.getKYCSuccessfull(response.data))
        } catch(e) {
            console.log("CANT GET KYC", {e})
        }
    }
}

export function* saga() {
    yield takeEvery(actions.getKYCRequest, KYCSagas.getKYC)
    yield takeEvery(actions.submitKYCRequest, KYCSagas.submitKYC)
    yield takeEvery(actions.submitKYC_and_retriveKYC_Request, KYCSagas.submitKYC_and_retriveKYC)
}
