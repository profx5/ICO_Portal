import axios from 'axios'
import Api from 'api'
import * as actions from 'js/actions/BountiesBalanceActions'
import {takeEvery, call, put} from 'redux-saga/effects'

class BountiesBalanceSagas {
    static * getBounties() {
        try {
            const response = yield call(axios, {
                method: 'GET',
                url: Api.getBounties()
            })

            yield put(actions.getBountiesSuccess(response.data))
        } catch(e) {
            yield put(actions.getBountiesFailed())
        }
    }
    static * postTransferBounties(action) {
        try {
            const response = yield call(axios, {
                method: 'POST',
                url: Api.transferBounties()
            })

            yield put(actions.postTransferSuccess(response.data))

        } catch (e) {
            yield put(actions.postTransferFailed())
        }
    }
}

export function* saga() {
    yield takeEvery(actions.getBountiesRequest, BountiesBalanceSagas.getBounties)
    yield takeEvery(actions.postTransferRequest, BountiesBalanceSagas.postTransferBounties)
}
