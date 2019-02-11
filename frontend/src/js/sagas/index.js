import {all} from 'redux-saga/effects'

import {saga as DepositsSaga} from 'js/sagas/DepositsSagas'
import {saga as ICOInfoSaga} from 'js/sagas/ICOInfoSagas'
import {saga as InvestSaga} from 'js/sagas/InvestSagas'
import {saga as KYCSaga} from 'js/sagas/KYCSagas'
import {saga as UserSaga} from 'js/sagas/UserSagas'
import {saga as CurrencySaga} from 'js/sagas/CurrencySagas'
import {saga as PhasesSaga} from 'js/sagas/PhasesSagas'
import {saga as TicketsSagas} from "js/sagas/TicketsSagas";
import {saga as UISagas} from "js/sagas/UISagas";

export default function* rootSaga() {
    yield all([
        ICOInfoSaga(),
        DepositsSaga(),
        UserSaga(),
        KYCSaga(),
        InvestSaga(),
        CurrencySaga(),
        PhasesSaga(),
        TicketsSagas(),
        UISagas()
    ])
}
