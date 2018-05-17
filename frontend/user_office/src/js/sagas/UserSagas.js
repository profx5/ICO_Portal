import Api from '../../api'
import axios from 'axios'
import {extractAccount} from '../../web3'
import {call, put, takeEvery, cps, select} from 'redux-saga/effects'
import * as actions from '../actions/UserActions'
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

    static * extractMetaMaskAccount(action) {
        try {
            const accounts = yield cps(extractAccount)
            if (accounts.length !== 0) {
                yield put(actions.setMetaMaskAccountSuccessfull(accounts[0]))
            }
        } catch(e) {
            yield put(actions.setMetaMaskAccountFailed)
        }
    }

    static * detectMetaMaskAccount() {
        if(utils.path(window, 'web3')) {
            yield UserSagas.extractMetaMaskAccount({})
            const metamaskAcc = yield select( (state) => state.user.get('metamaskAccount') )

            if(typeof metamaskAcc === 'string' && metamaskAcc.length > 0) {
                yield put( actions.showModalWithOptionsForEthAccount() )
                return
            }
            yield put( actions.metamaskIsBlocked() )
            return
        }

        yield put( actions.showModalWithOptionsForEthAccount() )
        return
    }
}


export function* saga() {
    yield takeEvery(actions.getUserRequest, UserSagas.getUser)
    yield takeEvery(actions.setAccountRequest, UserSagas.setAccount)
    yield takeEvery(actions.setMetaMaskAccountRequest, UserSagas.extractMetaMaskAccount)
}
