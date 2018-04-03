import axios from 'axios'
import Api from '../../api'

import {
    GET_BOUNTIES_BALANCE_REQUEST,
    GET_BOUNTIES_BALANCE_SUCCESS,
    GET_BOUNTIES_BALANCE_FAILED,
    TRANSFER_BOUNTIES_REQUEST,
    TRANSFER_BOUNTIES_SUCCESS,
    TRANSFER_BOUNTIES_FAILED,
} from '../types/BountiesBalanceTypes'

import {takeEvery, call, put} from 'redux-saga/effects'


export class BountiesActions {
    static getBountiesRequest = () => ({type: GET_BOUNTIES_BALANCE_REQUEST})

    static getBountiesFailed = () => ({type: GET_BOUNTIES_BALANCE_FAILED})

    static getBountiesSuccess = (payload) => ({type: GET_BOUNTIES_BALANCE_SUCCESS, payload})

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

    static postTransferRequest = () => ({type: TRANSFER_BOUNTIES_REQUEST})

    static postTransferSuccess = (payload) => ({type: TRANSFER_BOUNTIES_SUCCESS, payload})

    static postTransferFailed = () => ({type: TRANSFER_BOUNTIES_FAILED})

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
    yield takeEvery(GET_BOUNTIES_BALANCE_REQUEST, BountiesActions.getBounties)
    yield takeEvery(TRANSFER_BOUNTIES_REQUEST, BountiesActions.postTransferBounties)
}
