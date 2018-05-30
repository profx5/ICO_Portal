import axios from 'axios'
import Api from '../../api'
import { takeEvery, call, put, select} from 'redux-saga/effects';
import * as actions from './../actions/DepositsActions';

export class DepositsSagas {
    static * getTokensMoves() {
        try {
            const page = yield select(state => state.deposits.get('current_page'))

            const response = yield call(axios, {
                method: 'GET',
                url: Api.getDeposits()
            })

            yield put(actions.getDepositsSuccess(response.data))
        } catch(e) {
            yield put(actions.getDepositsFailed())
        }
    }

    static * createPreparedDeposit(action) {
        try {
            const {value, txn_hash, currency} = action.payload;

            yield call(axios, {
                url: Api.prepareDeposits(),
                method: 'POST',
                data: {
                    value: value,
                    txn_hash: txn_hash,
                    currency: currency
                }
            })

            yield put(actions.createPreparedDepositSuccess())
            yield put(actions.getDepositsRequest())
        } catch(e) {
            yield put(actions.createPreparedDepositFailed())
        }
    }
}

export function* saga() {
    yield takeEvery(actions.getDepositsRequest, DepositsSagas.getTokensMoves)
    yield takeEvery(actions.createPreparedDepositRequest, DepositsSagas.createPreparedDeposit)
    yield takeEvery(actions.depositsNextPage, DepositsSagas.getTokensMoves)
    yield takeEvery(actions.depositsPrevPage, DepositsSagas.getTokensMoves)
}
