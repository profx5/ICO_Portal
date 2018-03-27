import axios from 'axios'
import Api from '../../api'
//types
import {
    SHOW_KYC_FORM,
    HIDE_KYC_FORM,
    GET_KYC_REQUEST,
    GET_KYC_SUCCESSFULL,
    SUBMIT_KYC_REQUEST,
    SUBMIT_KYC_SUCCESSFULL,
    SUBMIT_AND_GET_KYC_REQEUST
} from '../types/KYCTypes'

import {call, put, takeEvery, take} from 'redux-saga/effects'

export function showForm() {
    return {type: SHOW_KYC_FORM}
}

export function hideForm() {
    return {type: HIDE_KYC_FORM}
}

export function getKYCRequest() {
    return {type: GET_KYC_REQUEST}
}

function getKYCSuccessfull(payload) {
    return {type: GET_KYC_SUCCESSFULL, payload}
}

function* getKYC() {
    try {
        const response = yield call(axios, {
            url: Api.kyc(),
            method: 'GET'
        })

        yield put(getKYCSuccessfull(response.data))
    } catch(e) {

    }
}

export function submitKYCRequest(data) {
    return {type: SUBMIT_KYC_REQUEST, data}
}

function submitKYCSuccessfull() {
    return {type: SUBMIT_KYC_SUCCESSFULL}
}

function* submitKYC(action) {
    try {
        yield call(axios, {
            url: Api.kyc(),
            method: 'POST',
            data: action.data
        })
        yield put(submitKYCSuccessfull())

    } catch(e) {
        yield put("SUBMIT_KYC_FAILED")
    }
}

export function submitKYC_and_retriveKYC_Request(data) {
    return {
        type: SUBMIT_AND_GET_KYC_REQEUST,
        data
    }
}

export function* submitKYC_and_retriveKYC(data) {
    try {
        yield call(submitKYC, data)
        yield call(getKYC)
    } catch(e) {
        console.log("CANT SUBMIT AND FETCH KYC")
    }
}

export function* saga() {
    yield takeEvery(GET_KYC_REQUEST, getKYC)
    yield takeEvery(SUBMIT_KYC_REQUEST, submitKYC)
    yield takeEvery(SUBMIT_AND_GET_KYC_REQEUST, submitKYC_and_retriveKYC)
}
