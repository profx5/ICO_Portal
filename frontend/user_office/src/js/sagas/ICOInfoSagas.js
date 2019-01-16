import axios from 'axios'
import API from 'api'
import {put, call, takeEvery} from 'redux-saga/effects'
import * as actions from 'js/actions/ICOInfoActions'

export class ICOInfoSagas {
    static * getPhaseStatsSaga(action){
        try {
            const response = yield call(axios,{
                method: "GET",
                url: API.getICOInfo()
            })

            yield put(actions.getICOInfoSuccess(response.data))
        } catch(e) {
            yield put(actions.getICOInfoFailed())
        }
    }

    static * getCryptoAccount(action) {
        try {
            const response = yield call(axios, {
                url: API.getAccount(),
                method: "GET",
                params: {
                    "currency": action.payload
                }
            });

            yield put(actions.getCryptoAccountSuccessful(response.data.address));

        } catch(e) {

        }
    }
}

export function* saga() {
    yield takeEvery(actions.getICOInfoRequest, ICOInfoSagas.getPhaseStatsSaga)
    yield takeEvery(actions.getCryptoAccountRequest, ICOInfoSagas.getCryptoAccount)
}
