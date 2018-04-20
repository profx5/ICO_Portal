import axios from 'axios'
import Api from '../../api'
import {
    GET_PHASE_REQUEST,
} from '../types/PhaseTypes'
import {put, call, takeEvery} from 'redux-saga/effects'
import {PhaseActions} from '../actions/PhaseActions'

export class PhaseSagas {
    static * getPhaseSaga(action){
        try {
            const response = yield call(axios,{
                method: "GET",
                url: Api.getPhase()
            })

            yield put(PhaseActions.getPhaseSuccess(response.data))
        } catch(e) {
            yield put(PhaseActions.getPhaseFailed())
        }
    }
}

export function* saga() {
    yield takeEvery(GET_PHASE_REQUEST, PhaseSagas.getPhaseSaga)
}
