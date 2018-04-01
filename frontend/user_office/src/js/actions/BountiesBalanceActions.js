import axios from 'axios'
import Api from '../../api'
//types
import {
    GET_BOUNTIES_BALANCE_REQUEST,
    GET_BOUNTIES_BALANCE_SUCCESS,
    GET_BOUNTIES_BALANCE_FAILED,
    TRANSFER_BOUNTIES_REQUEST,
    TRANSFER_BOUNTIES_SUCCESS,
    TRANSFER_BOUNTIES_FAILED,
} from '../types/BountiesBalanceTypes'

import {takeEvery, call, put, take} from 'redux-saga/effects'

export class Bountie {
    
    static getBountiesRequest = () => ({type: GET_BOUNTIES_BALANCE_REQUEST})

    static getBountiesFailed = () => ({type: GET_BOUNTIES_BALANCE_FAILED})

    static getBountiesSuccess = (payload) => ({type: GET_BOUNTIES_BALANCE_SUCCESS, payload})

    static * getBounties() {
        try {
            const response = yield call(axios, {
                method: 'GET',
                url: Api.getBounties()
            })
    
            yield put(Bountie.getBountiesSuccess(response.data))
        } catch(e) {
            yield put(Bountie.getBountiesFailed())
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
    
            yield put(Bountie.postTransferSuccess(response.data))
    
        } catch (e) {
            yield put(Bountie.postTransferFailed())
        }   
    }
}

export function* saga() {
    yield takeEvery(GET_BOUNTIES_BALANCE_REQUEST, Bountie.getBounties)
    yield takeEvery(TRANSFER_BOUNTIES_REQUEST, Bountie.postTransferBounties)
}
