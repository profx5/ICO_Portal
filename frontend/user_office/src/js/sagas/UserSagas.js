import Api from '../../api'
import axios from 'axios'
import {extractAccount} from '../../web3'
import {
    GET_USER_REQUEST,
    SET_ACCOUNT_REQUEST,
    EXTRACT_EXISTING_METAMASK_ACCOUNT,
    SET_GENERETED_ETHEREUM_ACCOUNT,
    DETECT_METAMASK_ACCOUT
} from '../types/UserTypes'
import {call, put, takeEvery, cps, select} from 'redux-saga/effects'
import {UserActions} from '../actions/UserActions'
import {MetaMaskActions} from '../actions/MetaMaskActions'
import utils from '../_utils'

export class UserSagas {
    static * setAccount({address}) {
        try {
            yield call(axios, {
                method: 'POST',
                url: Api.setEthAccount(),
                data: {
                    'eth_account': address
                }
            })

            yield put(UserActions.setAccountSuccessfull())
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

    static * extractMetaMaskAccount(action) {
        try {
            const accounts = yield cps(extractAccount)
            if (accounts.length !== 0) {
                yield put(UserActions.setMetaMaskAccountSuccessfull(accounts[0]))
            }
        } catch(e) {
            yield put(UserActions.setMetaMaskAccountFailed)
        }
    }

    static * detectMetaMaskAccount() {
        if(utils.path(window, 'web3')) {
            yield UserSagas.extractMetaMaskAccount({})
            const metamaskAcc = yield select( (state) => state.user.get('metamaskAccount') )

            if(typeof metamaskAcc === 'string' && metamaskAcc.length > 0) {
                yield put( MetaMaskActions.showModalWithOptionsForEthAccount() )
                return
            }
            yield put( MetaMaskActions.metamaskIsBlocked() )
            return
        }

        yield put( MetaMaskActions.showModalWithOptionsForEthAccount() )
        return
    }
}


export function* saga() {
    yield takeEvery(SET_GENERETED_ETHEREUM_ACCOUNT, UserSagas.setAccount)
    yield takeEvery(DETECT_METAMASK_ACCOUT, UserSagas.detectMetaMaskAccount)
    yield takeEvery(EXTRACT_EXISTING_METAMASK_ACCOUNT, UserSagas.extractMetaMaskAccount)
    yield takeEvery(GET_USER_REQUEST, UserSagas.getUser)
    yield takeEvery(SET_ACCOUNT_REQUEST, UserSagas.setAccount)
}
