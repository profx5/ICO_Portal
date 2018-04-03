import {sendTransaction} from '../../web3'

import {
    SHOW_INVEST_FORM,
    HIDE_INVEST_FORM,
    SEND_TRANSACTION_INIT,
    SEND_TRANSACTION_SUCCESSFULL,
    SEND_TRANSACTION_FAILED
} from '../types/InvestTypes'

import {DepositsActions} from './DepositsActions'

import {cps, takeEvery, put} from 'redux-saga/effects'

export default class InvestActions {
    static showForm = () => ({type: SHOW_INVEST_FORM})

    static hideForm = () => ({type: HIDE_INVEST_FORM})

    static sendTransactionInit = (senderAccount, receiverAccount, value) => ({
        type: SEND_TRANSACTION_INIT,
        payload: {
            senderAccount, receiverAccount, value
        }
    })

    static sendTransactionSuccessfull = () => ({type: SEND_TRANSACTION_SUCCESSFULL})

    static sendTransactionFailed = () => ({type: SEND_TRANSACTION_FAILED})

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
    yield takeEvery(SEND_TRANSACTION_INIT, InvestActions.invest)
}