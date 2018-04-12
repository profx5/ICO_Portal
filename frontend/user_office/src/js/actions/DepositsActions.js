import {
    GET_DEPOSITS_REQUEST,
    GET_DEPOSITS_SUCCESS,
    GET_DEPOSITE_FAILED,
    CREATE_PREPARED_DEPOSIT_REQUEST,
    CREATE_PREPARED_DEPOSIT_SUCCESS,
    CREATE_PREPARED_DEPOSIT_FAILED,
    DEPOSITS_NEXT_PAGE,
    DEPOSITS_PREV_PAGE
} from '../types/DepositsTypes'

export class DepositsActions {
    static getDepositsRequest = () => ({ type: GET_DEPOSITS_REQUEST })

    static getDepositsSuccess = (payload) => ({ type: GET_DEPOSITS_SUCCESS, payload })

    static getDepositsFailed = () => ({type: GET_DEPOSITE_FAILED})

    static createPreparedDepositRequest = (value, txnHash) => ({
        type: CREATE_PREPARED_DEPOSIT_REQUEST,
        payload: {value, txnHash}
    })

    static createPreparedDepositSuccess = () => ({type: CREATE_PREPARED_DEPOSIT_SUCCESS})

    static createPreparedDepositFailed = () => ({type: CREATE_PREPARED_DEPOSIT_FAILED})

    static depositsNextPage = () => ({type: DEPOSITS_NEXT_PAGE})

    static depositsPrevPage = () => ({type: DEPOSITS_PREV_PAGE})
}
