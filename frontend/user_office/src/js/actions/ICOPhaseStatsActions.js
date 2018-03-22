import axios from 'axios'
import Api from '../../api'
//types
import {
    GET_ICO_PHASE_STATS_SUCCESS,
    GET_ICO_PHASE_STATS_REQUEST,
} from '../types/ICOPhaseStatsTypes.js'

export default class ICOPhaseStatsActions {
    static getPhaseStatsRequest() {
        return {
            type: GET_ICO_PHASE_STATS_REQUEST
        }
    }

    static getPhaseStatsSuccess(payload) {
        return {
            type: GET_ICO_PHASE_STATS_SUCCESS,
            payload
        }
    }

    static getPhaseStats() {
        return (dispatch) => {
            dispatch(ICOPhaseStatsActions.getPhaseStatsRequest())
            axios({
                method: "GET",
                url: Api.getICOPhaseStats()
            }).then( ({data})  => {
                dispatch(ICOPhaseStatsActions.getPhaseStatsSuccess(data))
            }).catch(error => {
                console.log("cant fetch phasses", {error})
            })
        }
    }
}
