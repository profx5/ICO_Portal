import axios from 'axios'
import Api from '../../api'
import {put, call, take, takeEvery, all} from 'redux-saga/effects'
//types
import {
    GET_ICO_PHASE_STATS_SUCCESS,
    GET_ICO_PHASE_STATS_REQUEST,
} from '../types/ICOPhaseStatsTypes.js'

function getPhaseStatsSuccess(payload) {
    return {
        type: GET_ICO_PHASE_STATS_SUCCESS,
        payload
    }
}

export function getPhaseStatsRequest() {
    return {type: GET_ICO_PHASE_STATS_REQUEST}
}

export function* getPhaseStatsSaga(action) {
    try {

        const respons = yield call(axios,{
            method: "GET",
            url: Api.getICOPhaseStats()
        })

        yield put(getPhaseStatsSuccess(respons.data))

    } catch(e) {
        yield take("GET_ICO_PHASE_STATS_FAILED")
    }
}

export function* saga() {
    yield takeEvery(GET_ICO_PHASE_STATS_REQUEST, getPhaseStatsSaga)
}
