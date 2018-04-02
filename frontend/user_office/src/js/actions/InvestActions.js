import Api from '../../api'
import axios from 'axios'
import {sendTransaction} from '../../web3'
//types
import {
    SHOW_INVEST_FORM,
    HIDE_INVEST_FORM,
    SEND_TRANSACTION_INIT,
    SEND_TRANSACTOIN_SUCCESSFULL
} from '../types/InvestTypes'

import {DepositAction} from './DepositsActions'

export default class InvestActions {
    static showForm() {
        return (dispatch) => {
            dispatch({type: SHOW_INVEST_FORM})
        }
    }

    static hideForm() {
        return (dispatch) => {
            dispatch({type: HIDE_INVEST_FORM})
        }
    }

    static sendTransactionInit() {
        return (dispatch) => {
            dispatch({type: SEND_TRANSACTION_INIT})
        }
    }

    static sendTransactoinSuccessfull() {
        return (dispatch) => {
            dispatch({type: SEND_TRANSACTOIN_SUCCESSFULL})
        }
    }

    static postInvest(dispatch, txnHash, value) {
        InvestActions.hideForm()(dispatch)
        axios({
            url: Api.prepareDeposit(),
            method: 'POST',
            data: {value: value,
                   txn_hash: txnHash}
        }).then( ({data}) => {
            dispatch(DepositAction.getDepositsRequest())
        }).catch(error => {
            console.log("cant execute postInvest", {error})
        })
    }

    static invest(value) {
        return (dispatch, getState) => {
            dispatch(InvestActions.sendTransactionInit())

            const from = getState().user.eth_account,
                  to = getState().ICOInfo.crowdSaleAddress

            sendTransaction(from, to, value, (txnHash) => InvestActions.postInvest(dispatch, txnHash, value))
        }
    }
}
