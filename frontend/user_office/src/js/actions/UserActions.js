import Api from '../../api'
import axios from 'axios'
//types
import {
    GET_USER_REQUEST,
    GET_USER_SUCCESSFULL,
    SHOW_SET_ACCOUNT_FORM,
    HIDE_SET_ACCOUNT_FORM,
    SET_ACCOUNT_REQUEST,
    SET_ACCOUNT_SUCCESSFULL
} from '../types/UserTypes'

import {call, take, put, takeEvery} from 'redux-saga/effects'

export function getUserRequest() {
    return {type: GET_USER_REQUEST}
}

function getUserSuccessfull(payload) {
    return {
        type: GET_USER_SUCCESSFULL, 
        payload
    }
}

function* getUser() {
    try {
        const response = yield call(axios, {
            url: Api.getMe(),
            method: 'GET'
        })

        yield put(getUserSuccessfull(response.data))
    } catch(e) {
        yield take("GET_USER_FAILED")
    }
}

export function showSetAccountForm() {
   return {type: SHOW_SET_ACCOUNT_FORM}
}

export function hideSetAccountForm() {
    return {type: HIDE_SET_ACCOUNT_FORM}
}

export function setAccountRequest(accountValue) {
    return {
        type: SET_ACCOUNT_REQUEST,
        data: accountValue
    }
}

function setAccountSuccessfull() {
    return {type: SET_ACCOUNT_SUCCESSFULL}
}

function* setAccount({data}) {
    try {
        yield call(axios, {
            method: 'POST',
            url: Api.setEthAccount(),
            data: {
                'eth_account': data
            }
        })

        yield put(setAccountSuccessfull())

    } catch(e) {
        yield take("SET_ACCOUNT_FAILED")
    }
}

export function* saga() {
    yield takeEvery(GET_USER_REQUEST, getUser)
    yield takeEvery(SET_ACCOUNT_REQUEST, setAccount)
}
