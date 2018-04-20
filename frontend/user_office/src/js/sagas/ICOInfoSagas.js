import axios from 'axios'
import Api from '../../api'
import {
    GET_ICO_INFO_REQUEST,
} from '../types/ICOInfoTypes'
import {put, call, takeEvery} from 'redux-saga/effects'
import {ICOInfoActions} from '../actions/ICOInfoActions'

export class ICOInfoSagas {
    static * getPhaseStatsSaga(action){
        try {
            const response = yield call(axios,{
                method: "GET",
                url: Api.getICOInfo()
            })

            yield put(ICOInfoActions.getICOInfoSuccess(response.data))
        } catch(e) {
            yield put(ICOInfoActions.getICOInfoFailed())
        }
    }
}

export function* saga() {
    yield takeEvery(GET_ICO_INFO_REQUEST, ICOInfoSagas.getPhaseStatsSaga)
}
