import axios from 'axios'
import API from 'api'
import * as actions from 'js/actions/CurrencyActions'
import {takeEvery, call, put} from 'redux-saga/effects'

class CurrencySagas {
    static * getCurrencies() {
        try {
            const response = yield call(axios, {
                method: 'GET',
                url: API.getAvailableCurrencies()
            })

            yield put(actions.getCurrenciesSuccess(response.data))
        } catch(e) {
            yield put(actions.getCurrenciesFailed())
        }
    }
}

export function* saga() {
    yield takeEvery(actions.getCurrenciesRequest, CurrencySagas.getCurrencies)
}
