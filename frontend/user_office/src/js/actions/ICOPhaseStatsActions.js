import axios from 'axios'
import Api from '../../api'
import {put, call, take, takeEvery, all} from 'redux-saga/effects'
//types
import {
    GET_ICO_INFO_REQUEST,
    GET_ICO_INFO_SUCCESS,
} from '../types/ICOInfoTypes.js'

function getPhaseStatsSuccess(payload) {
    return {
        type: GET_ICO_INFO_SUCCESS,
        payload
    }
}

export function getPhaseStatsRequest() {
    return {type: GET_ICO_INFO_REQUEST}
}

export function* getPhaseStatsSaga(action) {
    try {

        const respons = yield call(axios,{
            method: "GET",
            url: Api.getICOInfo()
        })

        yield put(getPhaseStatsSuccess(respons.data))

    } catch(e) {
        yield take("GET_ICO_PHASE_STATS_FAILED")
    }
}

export function* saga() {
    yield takeEvery(GET_ICO_INFO_REQUEST, getPhaseStatsSaga)
}
