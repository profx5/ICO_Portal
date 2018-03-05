import axios from 'axios'
import Api from '../../api'
//types
import {
    GET_ICO_PHASES_STATS_SUCCESS,
    GET_ICO_PHASES_STATS_REQUEST,
} from '../types/ICOPhasesStatsTypes.js'

export default class ICOPhasesStatsActions {
    static get_phases_stats_request() {
        return {
            type: GET_ICO_PHASES_STATS_REQUEST
        }
    }
    static get_phases_stats_success(payload) {
        return {
            type: GET_ICO_PHASES_STATS_SUCCESS,
            payload
        }
    }

    static get_phases_stats() {
        return (dispatch) => {
            dispatch(ICOPhasesStatsActions.get_phases_stats_request())
            axios({
                method: "GET",
                url: Api.get_ico_phasesStats()
            }).then( ({data})  => {
                dispatch(ICOPhasesStatsActions.get_phases_stats_success(data))
            }).catch(error => {
                console.log("cantc fetch phasses", {error})
            })
        }
    }
}
