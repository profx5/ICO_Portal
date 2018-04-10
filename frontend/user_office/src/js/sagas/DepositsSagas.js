import axios from 'axios'
import Api from '../../api'
import {
    GET_DEPOSITS_REQUEST,
    CREATE_PREPARED_DEPOSIT_REQUEST,
} from '../types/DepositsTypes'
import { takeEvery, call, put} from 'redux-saga/effects';
import {DepositsActions} from '../actions/DepositsActions'

export class DepositsSagas {
    static * getDeposits() {
        try {
            const response = yield call(axios, {
                method: 'GET',
                url: Api.getDeposits()
            })

            yield put(DepositsActions.getDepositsSuccess(response.data))
        } catch(e) {
            yield put(DepositsActions.getDepositsFailed())
        }
    }

    static * createPreparedDeposit(action) {
        try {
            const {value, txnHash} = action.payload

            yield call(axios, {
                url: Api.prepareDeposit(),
                method: 'POST',
                data: {value: value,
                       txn_hash: txnHash}
            })

            yield put(DepositsActions.createPreparedDepositSuccess())
            yield put(DepositsActions.getDepositsRequest())
        } catch(e) {
            yield put(DepositsActions.createPreparedDepositFailed())
        }
    }
}

export function* saga() {
    yield takeEvery(GET_DEPOSITS_REQUEST, DepositsSagas.getDeposits)
    yield takeEvery(CREATE_PREPARED_DEPOSIT_REQUEST, DepositsSagas.createPreparedDeposit)
}
