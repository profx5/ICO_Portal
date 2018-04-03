import axios from 'axios'
import Api from '../../api'

import {
    GET_ICO_INFO_REQUEST,
    GET_ICO_INFO_SUCCESS,
    GET_ICO_PHASE_STATS_FAILED
} from '../types/ICOInfoTypes.js'

import {put, call, takeEvery} from 'redux-saga/effects'


export class ICOInfoActions {
    static getPhaseStatsSuccess = (payload) => ({ type: GET_ICO_INFO_SUCCESS, payload })

    static getICOInfoRequest = () => ({type: GET_ICO_INFO_REQUEST})

    static getICOInfoFailed = () => ({type: GET_ICO_PHASE_STATS_FAILED})

    static * getPhaseStatsSaga(action){
        try {

            const respons = yield call(axios,{
                method: "GET",
                url: Api.getICOInfo()
            })

            yield put(ICOInfoActions.getPhaseStatsSuccess(respons.data))

        } catch(e) {
            yield put(ICOInfoActions.getICOInfoFailed())
        }
    }
}

export function* saga() {
    yield takeEvery(GET_ICO_INFO_REQUEST, ICOInfoActions.getPhaseStatsSaga)
}
