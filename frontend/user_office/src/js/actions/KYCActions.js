import axios from 'axios'
import Api from '../../api'

import {
    SHOW_KYC_FORM,
    HIDE_KYC_FORM,
    GET_KYC_REQUEST,
    GET_KYC_SUCCESSFULL,
    SUBMIT_KYC_REQUEST,
    SUBMIT_KYC_SUCCESSFULL,
    SUBMIT_KYC_FAILED,
    SUBMIT_AND_GET_KYC_REQEUST
} from '../types/KYCTypes'

import {call, put, takeEvery} from 'redux-saga/effects'

export class KYCActions {
    static showForm = () => ({type: SHOW_KYC_FORM})

    static hideForm = () => ({type: HIDE_KYC_FORM})

    static getKYCRequest = () => ({type: GET_KYC_REQUEST})

    static getKYCSuccessfull = (payload) => ({type: GET_KYC_SUCCESSFULL, payload})

    static * getKYC() {
        try {
            const response = yield call(axios, {
                url: Api.kyc(),
                method: 'GET'
            })
            console.log({response})
            yield put(KYCActions.getKYCSuccessfull(response.data))
        } catch(e) {
            console.log("CANT GET KYC", {e})
        }
    }

    static submitKYCRequest = (data) => ({type: SUBMIT_KYC_REQUEST, data})

    static submitKYCSuccessfull = () => ({type: SUBMIT_KYC_SUCCESSFULL})

    static submitKYCFailed = () => ({type: SUBMIT_KYC_FAILED})

    static * submitKYC(action) {
        try {
            yield call(axios, {
                url: Api.kyc(),
                method: 'POST',
                data: action.data
            })
            yield put(KYCActions.submitKYCSuccessfull())

        } catch(e) {
            yield put(KYCActions.submitKYCFailed())
        }
    }

    static submitKYC_and_retriveKYC_Request(data) {
        return {
            type: SUBMIT_AND_GET_KYC_REQEUST,
            data
        }
    }

    static * submitKYC_and_retriveKYC(data) {
        try {
            yield call(KYCActions.submitKYC, data)
            yield call(KYCActions.getKYC)
        } catch(e) {
            console.log("CANT SUBMIT AND FETCH KYC")
        }
    }
}

export function* saga() {
    yield takeEvery(GET_KYC_REQUEST, KYCActions.getKYC)
    yield takeEvery(SUBMIT_KYC_REQUEST, KYCActions.submitKYC)
    yield takeEvery(SUBMIT_AND_GET_KYC_REQEUST, KYCActions.submitKYC_and_retriveKYC)
}
