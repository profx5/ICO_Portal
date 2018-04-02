import axios from 'axios'
import Api from '../../api'
//types
import {
    GET_DEPOSITS_REQUEST,
    GET_DEPOSITS_SUCCESS,
    GET_DEPOSITE_FAILED
} from '../types/DepositsTypes'
import { takeEvery, call, put, take } from 'redux-saga/effects';

export function getDepositRequest() {
    return {
        type: GET_DEPOSITS_REQUEST
    }
}

function getDepositSuccess(payload) {
    return {
        type: GET_DEPOSITS_SUCCESS,
        payload
    }
}

function* getDeposite() {
    try {
        const response = yield call(axios, {
            method: 'GET',
            url: Api.getDeposits()
        })

        yield put(getDepositSuccess(response.data))

    } catch(e) {
        yield take(GET_DEPOSITE_FAILED)
    }
}

export function* saga() {
    yield takeEvery(GET_DEPOSITS_REQUEST, getDeposite)
}