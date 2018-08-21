import Api from '../../api'
import axios from 'axios'
import {extractAccount} from '../../web3'
import {call, cps, put, select, takeEvery} from 'redux-saga/effects'
import * as UserActions from '../actions/UserActions'
import * as UIActions from '../actions/UIActions'
import * as MetamaskActions from '../actions/MetamaskActions'
import Utils from '../utils/index'

export class UserSagas {
    static* setAccount(action) {
        try {
            yield call(axios, {
                method: 'POST',
                url: Api.setEthAccount(),
                data: {
                    'eth_account': action.payload
                }
            })

            yield put(UserActions.setAccountSuccessfull());
            // yield put(UIActions.hideSetAccountPopup());
            yield put(UserActions.getUserRequest());
        } catch (e) {
            let error;
            if (e.response.data.error.includes('Duplicate entry')) {
                error = 'ETH Account already exists.';
            } else if (e.response.data.error.includes('hexadecimal')) {
                error = 'Invalid account address.'
            } else {
                error = 'Something went wrong, please try again later.'
            }
            yield put(UserActions.setAccountFailed(error));
        }
    }

    static* getUser() {
        try {
            const response = yield call(axios, {
                url: Api.getMe(),
                method: 'GET'
            })

            yield put(UserActions.getUserSuccessfull(response.data))

        } catch (e) {
            yield put(UserActions.getUserFailed())
        }
    }

    static* extractMetaMaskAccount(action) {
        try {
            const accounts = yield cps(extractAccount)
            if (accounts.length !== 0) {
                yield put(UserActions.setMetaMaskAccountSuccessfull(accounts[0]))
            }
        } catch (e) {
            yield put(UserActions.setMetaMaskAccountFailed)
        }
    }

    static* detectMetaMaskAccount() {
        if (Utils.path(window, 'web3')) {
            yield UserSagas.extractMetaMaskAccount({})
            const metamaskAcc = yield select((state) => state.user.get('metamaskAccount'))

            if (typeof metamaskAcc === 'string' && metamaskAcc.length > 0) {
                yield put(MetamaskActions.showModalWithOptionsForEthAccount())
                return
            }
            yield put(MetamaskActions.metamaskIsBlocked())
            return
        }

        yield put(MetamaskActions.showModalWithOptionsForEthAccount())
        return
    }

    static* changePassowrd(action) {
        try {
            const response = yield call(axios, {
                url: Api.changePassword(),
                method: 'POST',
                data: action.payload
            })

            yield put(UserActions.changePasswordSuccessfull())
            yield put(UIActions.setOpenedTip(9));
        } catch (e) {
            yield put(UserActions.changePasswordFailed())
            yield put(UIActions.setOpenedTip(8));
        }
    }

    static * changeEmail(action) {
        try {
            yield call(axios, {
                url: Api.changeEmail(),
                method: 'POST',
                data: action.payload
            })

            yield put(UserActions.changeEmailSuccessfull())
            yield put(UserActions.getUserRequest())
            yield put(UIActions.setOpenedTip(10));
        } catch (e) {
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
