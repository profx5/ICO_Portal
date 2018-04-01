import axios from 'axios'
import api from '../../api'
import {
    GET_REFERAL_LINK_REQUEST,
    GET_REFERAL_LINK_SUCCESS,
    GET_REFERAL_LINK_FAILED,
} from '../types/ReferalsTypes'
import {takeLatest, put, call, take} from 'redux-saga/effects'


export class Referal {

    static getReferalLinkRequest = () => ({type: GET_REFERAL_LINK_REQUEST})

    static getReferalLinkFailed = () => ({type: GET_REFERAL_LINK_FAILED})

    static getReferalLinkSuccess = (payload) => ({type: GET_REFERAL_LINK_SUCCESS, payload})

    static * getReferalLink(action) {
        try {
            const response = yield call(axios, {
                url: api.getReferalLink(),
                method: 'GET'
            })
    
            yield put(Referal.getReferalLinkSuccess(response.data))
    
        } catch(e) {
            yield put(Referal.getReferalLinkFailed())
        }
    }
}

export function* saga() {
    yield takeLatest(GET_REFERAL_LINK_REQUEST, Referal.getReferalLink)
}
