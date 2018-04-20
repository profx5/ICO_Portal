import {all} from 'redux-saga/effects'

import {saga as BountiesBalanceSaga} from './js/sagas/BountiesBalanceSagas'
import {saga as DepositsSaga} from './js/sagas/DepositsSagas'
import {saga as ICOInfoSaga} from './js/sagas/ICOInfoSagas'
import {saga as InvestSaga} from './js/sagas/InvestSagas'
import {saga as KYCSaga} from './js/sagas/KYCSagas'
import {saga as ReferralsSaga} from './js/sagas/ReferralsSagas'
import {saga as UserSaga} from './js/sagas/UserSagas'
import {saga as PhaseSaga} from './js/sagas/PhaseSagas'

export default function* rootSaga() {
    yield all([
        ICOInfoSaga(),
        BountiesBalanceSaga(),
        DepositsSaga(),
        UserSaga(),
        KYCSaga(),
        ReferralsSaga(),
        InvestSaga(),
        PhaseSaga()
    ])
}
