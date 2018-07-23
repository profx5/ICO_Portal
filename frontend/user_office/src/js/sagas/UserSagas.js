import Api from '../../api'
import axios from 'axios'
import {extractAccount} from '../../web3'
import {call, put, takeEvery, cps, select} from 'redux-saga/effects'
import * as UserActions from '../actions/UserActions'
import * as UIActions from '../actions/UIActions'
import * as MetamaskActions from '../actions/MetamaskActions'
import Utils from '../utils/index'

export class UserSagas {
    static * setAccount(action) {
        try {
            yield call(axios, {
                method: 'POST',
                url: Api.setEthAccount(),
                data: {
                    'eth_account': action.payload
                }
            })

            yield put(UserActions.setAccountSuccessfull())
            yield put(UIActions.hideSetAccountPopup())
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
        if(Utils.path(window, 'web3')) {
            yield UserSagas.extractMetaMaskAccount({})
            const metamaskAcc = yield select( (state) => state.user.get('metamaskAccount') )

            if(typeof metamaskAcc === 'string' && metamaskAcc.length > 0) {
                yield put( MetamaskActions.showModalWithOptionsForEthAccount() )
                return
            }
            yield put( MetamaskActions.metamaskIsBlocked() )
            return
        }

        yield put( MetamaskActions.showModalWithOptionsForEthAccount() )
        return
    }

    static * changePassowrd(action) {
        const response = yield call(axios, {
            url: Api.changePassword(),
            method: 'POST',
            data: action.payload
        })

        if (response.data.success) {
            yield put(UserActions.changePasswordSuccessfull())
        } else {
            yield put(UserActions.changePasswordFailed())
        }
    }

    static * changeEmail(action) {
        const response = yield call(axios, {
            url: Api.changeEmail(),
            method: 'POST',
            data: action.payload
        })

        if (response.data.success) {
            yield put(UserActions.changeEmailSuccessfull())
            yield put(UserActions.changeEmailRequest())
        } else {
            yield put(UserActions.changeEmailFailed())
        }
    }
}


export function* saga() {
    yield takeEvery(UserActions.getUserRequest, UserSagas.getUser)
    yield takeEvery(UserActions.setAccountRequest, UserSagas.setAccount)
    yield takeEvery(UserActions.setMetaMaskAccountRequest, UserSagas.extractMetaMaskAccount)
    yield takeEvery(UserActions.changePasswordRequest, UserSagas.changePassowrd)
    yield takeEvery(UserActions.changeEmailRequest, UserSagas.changeEmail)
}
