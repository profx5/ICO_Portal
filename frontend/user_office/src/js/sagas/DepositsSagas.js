import axios from 'axios'
import Api from '../../api'
import { takeEvery, call, put, select} from 'redux-saga/effects';
import * as actions from './../actions/DepositsActions';

export class DepositsSagas {
    static * getDeposits() {
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
            const {value, txnHash} = action.payload

            yield call(axios, {
                url: Api.prepareDeposit(),
                method: 'POST',
                data: {value: value,
                       txn_hash: txnHash}
            })

            yield put(actions.createPreparedDepositSuccess())
            yield put(actions.getDepositsRequest())
        } catch(e) {
            yield put(actions.createPreparedDepositFailed())
        }
    }
}

export function* saga() {
    yield takeEvery(actions.getDepositsRequest, DepositsSagas.getDeposits)
    yield takeEvery(actions.createPreparedDepositRequest, DepositsSagas.createPreparedDeposit)
    yield takeEvery(actions.depositsNextPage, DepositsSagas.getDeposits)
    yield takeEvery(actions.depositsPrevPage, DepositsSagas.getDeposits)
}
