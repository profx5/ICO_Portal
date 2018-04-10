import Api from '../../api'
import axios from 'axios'
import {extractAccount} from '../../web3'
import {
    GET_USER_REQUEST,
    SET_ACCOUNT_REQUEST,
    SET_METAMASK_ACCOUNT_REQUEST,
} from '../types/UserTypes'
import {call, put, takeEvery, cps} from 'redux-saga/effects'
import {UserActions} from '../actions/UserActions'

export class UserSagas {
    static * setAccount({data}) {
        try {
            yield call(axios, {
                method: 'POST',
                url: Api.setEthAccount(),
                data: {
                    'eth_account': data
                }
            })

            yield put(UserActions.setAccountSuccessfull())
            yield put(UserActions.hideSetAccountForm())
            yield put(UserActions.getUserRequest())
        } catch(e) {
            yield put(UserActions.setAccountFailed())
        }
    }

    static * getUser() {
        try {
            const response = yield call(axios, {
                url: Api.getMe(),
                method: 'GET'
            })

            yield put(UserActions.getUserSuccessfull(response.data))
        } catch(e) {
            yield put(UserActions.getUserFailed())
        }
    }

    static * extractMetaMaskAccount() {
        try {
            const accounts = yield cps(extractAccount)

            if (accounts.length !== 0) {
                yield put(UserActions.setMetaMaskAccountSuccessfull(accounts[0]))
            }
        } catch(e) {
            yield put(UserActions.setMetaMaskAccountFailed)
        }
    }
}

export function* saga() {
    yield takeEvery(GET_USER_REQUEST, UserSagas.getUser)
    yield takeEvery(SET_ACCOUNT_REQUEST, UserSagas.setAccount)
    yield takeEvery(SET_METAMASK_ACCOUNT_REQUEST, UserSagas.extractMetaMaskAccount)
}
