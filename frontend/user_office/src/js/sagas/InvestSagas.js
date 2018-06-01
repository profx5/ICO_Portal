import {sendTransaction, ethToWei} from '../../web3';
import {cps, takeEvery, put} from 'redux-saga/effects';
import * as InvestActions from '../actions/InvestActions';
import * as DepositsActions from '../actions/DepositsActions';



export class InvestSagas {
    static * invest(action) {
        try {
            const {senderAccount,
                   receiverAccount,
                   value, currency} = action.payload;
            const valueWei = ethToWei(value);

            const txnHash = yield cps(sendTransaction, senderAccount, receiverAccount, valueWei);

            yield put(DepositsActions.createPreparedDepositRequest(value, txnHash, currency));
        } catch(e) {
            console.log("CANT PERFROM INVEST ACTION");
        }
    }
}

export function* saga() {
    yield takeEvery(InvestActions.sendTransactionInit, InvestSagas.invest);
}
