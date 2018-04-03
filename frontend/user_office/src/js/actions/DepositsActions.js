import axios from 'axios'
import Api from '../../api'

import {
    GET_DEPOSITS_REQUEST,
    GET_DEPOSITS_SUCCESS,
    GET_DEPOSITE_FAILED,
    CREATE_PREPARED_DEPOSIT_REQUEST,
    CREATE_PREPARED_DEPOSIT_SUCCESS,
    CREATE_PREPARED_DEPOSIT_FAILED
} from '../types/DepositsTypes'

import { takeEvery, call, put} from 'redux-saga/effects';

export class DepositsActions {
    static getDepositsRequest = () => ({ type: GET_DEPOSITS_REQUEST })

    static getDepositsSuccess = (payload) => ({ type: GET_DEPOSITS_SUCCESS, payload })

    static getDepositsFailed = () => ({type: GET_DEPOSITE_FAILED})

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

    static createPreparedDepositRequest = (value, txnHash) => ({
        type: CREATE_PREPARED_DEPOSIT_REQUEST,
        payload: {value, txnHash}
    })

    static createPreparedDepositSuccess = () => ({type: CREATE_PREPARED_DEPOSIT_SUCCESS})

    static createPreparedDepositFailed = () => ({type: CREATE_PREPARED_DEPOSIT_FAILED})

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
    yield takeEvery(GET_DEPOSITS_REQUEST, DepositsActions.getDeposits)
    yield takeEvery(CREATE_PREPARED_DEPOSIT_REQUEST, DepositsActions.createPreparedDeposit)
}
