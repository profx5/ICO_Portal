import axios from 'axios'
import Api from '../../api'
//types
import {
    GET_DEPOSITS_REQUEST,
    GET_DEPOSITS_SUCCESS,
    GET_DEPOSITE_FAILED
} from '../types/DepositsTypes'
import { takeEvery, call, put, take } from 'redux-saga/effects';

export class DepositAction {

    static getDepositRequest = () => ({ type: GET_DEPOSITS_REQUEST })

    static getDepositSuccess = (payload) => ({ type: GET_DEPOSITS_SUCCESS, payload })

    static * getDeposite() {
        try {
            const response = yield call(axios, {
                method: 'GET',
                url: Api.getDeposits()
            })
    
            yield put(DepositAction.getDepositSuccess(response.data))
    
        } catch(e) {
            yield take(GET_DEPOSITE_FAILED)
        }
    }
}

export function* saga() {
    yield takeEvery(GET_DEPOSITS_REQUEST, DepositAction.getDeposite)
}
