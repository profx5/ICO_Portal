import Api from '../../api'
import axios from 'axios'
import {tryExtractAccount} from '../../web3'
//types
import {
    GET_USER_REQUEST,
    GET_USER_SUCCESSFULL,
    SHOW_SET_ACCOUNT_FORM,
    HIDE_SET_ACCOUNT_FORM,
    SET_ACCOUNT_REQUEST,
    SET_ACCOUNT_SUCCESSFULL,
    SET_METAMASK_ACCOUNT,
    GET_USER_FAILED,
    SET_ACCOUNT_FAILED
} from '../types/UserTypes'

import {call, take, put, takeEvery} from 'redux-saga/effects'

export class User {

    static getUserRequest = () => ({type: GET_USER_REQUEST})

    static getUserSuccessfull = (payload) => ({type: GET_USER_SUCCESSFULL, payload})

    static getUserFailed = () => ({type: GET_USER_FAILED})

    static * getUser() {
        try {
            const response = yield call(axios, {
                url: Api.getMe(),
                method: 'GET'
            })
    
            yield put(User.getUserSuccessfull(response.data))
        } catch(e) {
            yield put(User.getUserFailed())
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
    
            yield put(User.setAccountSuccessfull())
    
        } catch(e) {
            yield put(User.setAccountFailed())
        }
    
    }
}

export default class UserActions {
    static extractMetaMaskAccount() {
        return (dispatch) => {
            tryExtractAccount((account) => dispatch({
                type: SET_METAMASK_ACCOUNT,
                payload: {
                    metaMaskAccount: account
                }
            }))
        }
    }
}

export function* saga() {
    yield takeEvery(GET_USER_REQUEST, User.getUser)
    yield takeEvery(SET_ACCOUNT_REQUEST, User.setAccount)
}

