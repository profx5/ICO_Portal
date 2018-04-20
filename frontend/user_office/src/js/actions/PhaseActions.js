import {
    GET_PHASE_REQUEST,
    GET_PHASE_SUCCESS,
    GET_PHASE_FAILED
} from '../types/PhaseTypes.js'

export class PhaseActions {
    static getPhaseSuccess = (payload) => ({ type: GET_PHASE_SUCCESS, payload })

    static getPhaseRequest = () => ({type: GET_PHASE_REQUEST})

    static getPhaseFailed = () => ({type: GET_PHASE_FAILED})
}
