import axios from 'axios'
import API from 'api'
import {put, call, takeEvery} from 'redux-saga/effects'
import * as actions from 'js/actions/PhaseActions'

export class PhaseSaga {
    static * getPhasesSaga(action){
        try {
            const response = yield call(axios,{
                method: "GET",
                url: API.getPhases()
            });

            yield put(actions.getPhasesSuccess(response.data));
        } catch(e) {
            yield put(actions.getPhaseFailed());
        }
    }
}

export function* saga() {
    yield takeEvery(actions.getPhasesRequest, PhaseSaga.getPhasesSaga)
}
