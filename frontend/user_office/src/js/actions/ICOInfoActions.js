import {
    GET_ICO_INFO_REQUEST,
    GET_ICO_INFO_SUCCESS,
    GET_ICO_PHASE_STATS_FAILED
} from '../types/ICOInfoTypes.js'

export class ICOInfoActions {
    static getPhaseStatsSuccess = (payload) => ({ type: GET_ICO_INFO_SUCCESS, payload })

    static getICOInfoRequest = () => ({type: GET_ICO_INFO_REQUEST})

    static getICOInfoFailed = () => ({type: GET_ICO_PHASE_STATS_FAILED})
}
