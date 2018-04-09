import {sendTransaction} from '../../web3'
import {
    SEND_TRANSACTION_INIT,
} from '../types/InvestTypes'
import {cps, takeEvery, put} from 'redux-saga/effects'
import InvestActions from '../actions/InvestActions'
import {DepositsActions} from '../actions/DepositsActions'

export class InvestSagas {
    static * invest(action) {
        try {
            const {senderAccount,
                   receiverAccount,
                   value} = action.payload

            const txnHash = yield cps(sendTransaction, senderAccount, receiverAccount, value)

            yield put(DepositsActions.createPreparedDepositRequest(value, txnHash))
            yield put(InvestActions.hideForm())
        } catch(e) {
            console.log("CANT PERFROM INVEST ACTION")
        }
    }
}

export function* saga() {
    yield takeEvery(SEND_TRANSACTION_INIT, InvestSagas.invest)
}
