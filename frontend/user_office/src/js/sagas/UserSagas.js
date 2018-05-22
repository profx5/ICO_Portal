import Api from '../../api'
import axios from 'axios'
import {extractAccount} from '../../web3'
import {call, put, takeEvery, cps, select} from 'redux-saga/effects'
import * as UserActions from '../actions/UserActions'
import * as MetamaskActions from '../actions/MetamaskActions'
import Utils from '../utils/index'

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
}


export function* saga() {
    yield takeEvery(UserActions.getUserRequest, UserSagas.getUser)
    yield takeEvery(UserActions.setAccountRequest, UserSagas.setAccount)
    yield takeEvery(UserActions.setMetaMaskAccountRequest, UserSagas.extractMetaMaskAccount)
}
