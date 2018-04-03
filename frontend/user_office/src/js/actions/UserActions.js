import Api from '../../api'
import axios from 'axios'
import {extractAccount} from '../../web3'

import {
    GET_USER_REQUEST,
    GET_USER_SUCCESSFULL,
    SHOW_SET_ACCOUNT_FORM,
    HIDE_SET_ACCOUNT_FORM,
    SET_ACCOUNT_REQUEST,
    SET_ACCOUNT_SUCCESSFULL,
    GET_USER_FAILED,
    SET_ACCOUNT_FAILED,
    SET_METAMASK_ACCOUNT_REQUEST,
    SET_METAMASK_ACCOUNT_SUCCESSFULL,
    SET_METAMASK_ACCOUNT_FAILED
} from '../types/UserTypes'

import {call, put, takeEvery, cps} from 'redux-saga/effects'

export class UserActions {
    static getUserRequest = () => ({type: GET_USER_REQUEST})

    static getUserSuccessfull = (payload) => ({type: GET_USER_SUCCESSFULL, payload})

    static getUserFailed = () => ({type: GET_USER_FAILED})

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

    static showSetAccountForm = () => ({type: SHOW_SET_ACCOUNT_FORM})

    static hideSetAccountForm = () => ({type: HIDE_SET_ACCOUNT_FORM})

    static setAccountRequest = (accountValue) => ({type: SET_ACCOUNT_REQUEST, data: accountValue})

    static setAccountSuccessfull = () => ({type: SET_ACCOUNT_SUCCESSFULL})

    static setAccountFailed = () => ({type: SET_ACCOUNT_FAILED})

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

    static setMetaMaskAccountRequest = () => ({type: SET_METAMASK_ACCOUNT_REQUEST})

    static setMetaMaskAccountSuccessfull = (account) => ({
        type: SET_METAMASK_ACCOUNT_SUCCESSFULL,
        payload: {
            metaMaskAccount: account
        }
    })

    static setMetaMaskAccountFailed = (account) => ({type: SET_METAMASK_ACCOUNT_FAILED})

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
    yield takeEvery(GET_USER_REQUEST, UserActions.getUser)
    yield takeEvery(SET_ACCOUNT_REQUEST, UserActions.setAccount)
    yield takeEvery(SET_METAMASK_ACCOUNT_REQUEST, UserActions.extractMetaMaskAccount)
}
