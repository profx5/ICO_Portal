import axios from 'axios'
import Api from '../../api'
import * as KYCActions from './../actions/KYCActions'
import * as UIActions from './../actions/UIActions'
import {call, put, takeEvery} from 'redux-saga/effects'

export class KYCSagas {
    static * submitKYC(action) {

        const type = action.payload.state;
        const method = type !== 'WAITING' ? "POST" : "PUT";
        try {
            yield call(axios, {
                url: Api.kyc(),
                method: method,
                data: action.payload.form
            });
            yield put(KYCActions.submitKYCSuccessfull());
            yield call(KYCSagas.getKYC);
            yield put(UIActions.showModal({
                modalHead: 'Congratulations',
                modalContent: 'You\'ve successfully send your data! Our managers are validating your data. Soon the status will be updated!'
            }));

        } catch(e) {
            yield put(KYCActions.submitKYCFailed())
            yield put(UIActions.showModal({
                modalHead: 'Warning',
                modalContent: 'Something went wrong. Check if you submitted correct data and try again!'
            }));
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
            yield put(KYCActions.getKYCSuccessfull(response.data))
        } catch(e) {
            console.log("CANT GET KYC", {e})
        }
    }
}

export function* saga() {
    yield takeEvery(KYCActions.getKYCRequest, KYCSagas.getKYC)
    yield takeEvery(KYCActions.submitKYCRequest, KYCSagas.submitKYC)
    yield takeEvery(KYCActions.submitKYC_and_retriveKYC_Request, KYCSagas.submitKYC_and_retriveKYC)
}
