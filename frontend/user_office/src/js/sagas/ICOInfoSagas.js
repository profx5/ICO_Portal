import axios from 'axios'
import Api from '../../api'
import {put, call, takeEvery} from 'redux-saga/effects'
import * as actions from '../actions/ICOInfoActions'

export class ICOInfoSagas {
    static * getPhaseStatsSaga(action){
        try {
            const response = yield call(axios,{
                method: "GET",
                url: Api.getICOInfo()
            })

            yield put(actions.getICOInfoSuccess(response.data))
        } catch(e) {
            yield put(actions.getICOInfoFailed())
        }
    }
}

export function* saga() {
    yield takeEvery(actions.getICOInfoRequest, ICOInfoSagas.getPhaseStatsSaga)
}