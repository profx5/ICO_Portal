import {
    GET_BOUNTIES_BALANCE_REQUEST,
    TRANSFER_BOUNTIES_REQUEST,
} from '../types/BountiesBalanceTypes'
import axios from 'axios'
import Api from '../../api'
import {BountiesActions} from '../actions/BountiesBalanceActions'
import {takeEvery, call, put} from 'redux-saga/effects'

class BountiesBalanceSagas {
    static * getBounties() {
        try {
            const response = yield call(axios, {
                method: 'GET',
                url: Api.getBounties()
            })

            yield put(BountiesActions.getBountiesSuccess(response.data))
        } catch(e) {
            yield put(BountiesActions.getBountiesFailed())
        }
    }
    static * postTransferBounties(action) {
        try {
            const response = yield call(axios, {
                method: 'POST',
                url: Api.transferBounties()
            })

            yield put(BountiesActions.postTransferSuccess(response.data))

        } catch (e) {
            yield put(BountiesActions.postTransferFailed())
        }
    }
}

export function* saga() {
    yield takeEvery(GET_BOUNTIES_BALANCE_REQUEST, BountiesBalanceSagas.getBounties)
    yield takeEvery(TRANSFER_BOUNTIES_REQUEST, BountiesBalanceSagas.postTransferBounties)
}
