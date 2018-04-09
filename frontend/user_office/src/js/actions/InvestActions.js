import {
    SHOW_INVEST_FORM,
    HIDE_INVEST_FORM,
    SEND_TRANSACTION_INIT,
    SEND_TRANSACTION_SUCCESSFULL,
    SEND_TRANSACTION_FAILED
} from '../types/InvestTypes'

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
}
