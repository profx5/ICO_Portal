import axios from 'axios'
import Api from '../../api'
import {put, call, take, takeEvery, all} from 'redux-saga/effects'
//types
import {
    GET_ICO_INFO_REQUEST,
    GET_ICO_INFO_SUCCESS,
    GET_ICO_PHASE_STATS_FAILED
} from '../types/ICOInfoTypes.js'

export class ICOInfo {

    static getPhaseStatsSuccess = (payload) => ({ type: GET_ICO_INFO_SUCCESS, payload })

    static getICOInfoRequest = () => ({type: GET_ICO_INFO_REQUEST})

    static getICOInfoFailed = () => ({type: GET_ICO_PHASE_STATS_FAILED})

    static * getPhaseStatsSaga(action){
        try {
    
            const respons = yield call(axios,{
                method: "GET",
                url: Api.getICOInfo()
            })
    
            yield put(ICOInfo.getPhaseStatsSuccess(respons.data))
    
        } catch(e) {
            yield put(ICOInfo.getICOInfoFailed())
        }
    }
}

export function* saga() {
    yield takeEvery(GET_ICO_INFO_REQUEST, ICOInfo.getPhaseStatsSaga)
}
