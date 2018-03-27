import axios from 'axios'
import Api from '../../api'
//types
import {
    GET_BOUNTIES_BALANCE_REQUEST,
    GET_BOUNTIES_BALANCE_SUCCESS,
} from '../types/BountiesBalanceTypes'

import {takeEvery, call, put, take} from 'redux-saga/effects'


export function getBountiesRequest() {
    return {type: GET_BOUNTIES_BALANCE_REQUEST}
}

function getBountiesSuccess(payload) {
    return {
        type: GET_BOUNTIES_BALANCE_SUCCESS,
        payload
    }
}

function* getBounties() {
    try {
        const response = yield call(axios, {
            method: 'GET',
            url: Api.getOffChainBountiesBalance()
        })

        yield put(getBountiesSuccess(response.data))
    } catch(e) {
        yield take("GET_BOUNTIES_BALANCE_FAILED")
    }
}

export function* saga() {
    yield takeEvery(GET_BOUNTIES_BALANCE_REQUEST, getBounties)
}
