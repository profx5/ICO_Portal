import Api from '../../api'
import axios from 'axios'
import {extractAccount} from '../../web3'
import {call, put, takeEvery, cps} from 'redux-saga/effects'
import * as actions from '../actions/UserActions'

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

            yield put(actions.setAccountSuccessfull())
            yield put(actions.hideSetAccountForm())
            yield put(actions.getUserRequest())
        } catch(e) {
            yield put(actions.setAccountFailed())
        }
    }

    static * getUser() {
        try {
            const response = yield call(axios, {
                url: Api.getMe(),
                method: 'GET'
            })

            yield put(actions.getUserSuccessfull(response.data))

        } catch(e) {
            yield put(actions.getUserFailed())
        }
    }

    static * extractMetaMaskAccount() {
        try {
            const accounts = yield cps(extractAccount)

            if (accounts.length !== 0) {
                yield put(actions.setMetaMaskAccountSuccessfull(accounts[0]))
            }
        } catch(e) {
            yield put(actions.setMetaMaskAccountFailed)
        }
    }
}

export function* saga() {
    yield takeEvery(actions.getUserRequest, UserSagas.getUser)
    yield takeEvery(actions.setAccountRequest, UserSagas.setAccount)
    yield takeEvery(actions.setMetaMaskAccountRequest, UserSagas.extractMetaMaskAccount)
}
