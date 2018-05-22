import axios from 'axios'
import Api from '../../api'
import {put, call, takeEvery} from 'redux-saga/effects'
import * as actions from '../actions/PhaseActions'

export class PhaseSaga {
    static * getPhaseSaga(action){
        try {
            const response = yield call(axios,{
                method: "GET",
                url: Api.getPhase()
            });

            yield put(actions.getPhaseSuccess(response.data));
        } catch(e) {
            yield put(actions.getPhaseFailed());
        }
    }
}

export function* saga() {
    yield takeEvery(actions.getPhaseRequest, PhaseSaga.getPhaseSaga)
}