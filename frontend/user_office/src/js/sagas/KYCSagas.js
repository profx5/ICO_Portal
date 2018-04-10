import axios from 'axios'
import Api from '../../api'
import {
    GET_KYC_REQUEST,
    SUBMIT_KYC_REQUEST,
    SUBMIT_AND_GET_KYC_REQEUST
} from '../types/KYCTypes'
import {KYCActions} from '../actions/KYCActions'
import {call, put, takeEvery} from 'redux-saga/effects'

export class KYCSagas {
    static * submitKYC(action) {
        try {
            yield call(axios, {
                url: Api.kyc(),
                method: 'POST',
                data: action.data
            })
            yield put(KYCActions.submitKYCSuccessfull())

        } catch(e) {
            yield put(KYCActions.submitKYCFailed())
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
            console.log({response})
            yield put(KYCActions.getKYCSuccessfull(response.data))
        } catch(e) {
            console.log("CANT GET KYC", {e})
        }
    }
}

export function* saga() {
    yield takeEvery(GET_KYC_REQUEST, KYCSagas.getKYC)
    yield takeEvery(SUBMIT_KYC_REQUEST, KYCSagas.submitKYC)
    yield takeEvery(SUBMIT_AND_GET_KYC_REQEUST, KYCSagas.submitKYC_and_retriveKYC)
}
