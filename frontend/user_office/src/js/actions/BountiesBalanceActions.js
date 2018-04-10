import {
    GET_BOUNTIES_BALANCE_REQUEST,
    GET_BOUNTIES_BALANCE_SUCCESS,
    GET_BOUNTIES_BALANCE_FAILED,
    TRANSFER_BOUNTIES_REQUEST,
    TRANSFER_BOUNTIES_SUCCESS,
    TRANSFER_BOUNTIES_FAILED,
} from '../types/BountiesBalanceTypes'

export class BountiesActions {
    static getBountiesRequest = () => ({type: GET_BOUNTIES_BALANCE_REQUEST})

    static getBountiesFailed = () => ({type: GET_BOUNTIES_BALANCE_FAILED})

    static getBountiesSuccess = (payload) => ({type: GET_BOUNTIES_BALANCE_SUCCESS, payload})

    static postTransferRequest = () => ({type: TRANSFER_BOUNTIES_REQUEST})

    static postTransferSuccess = (payload) => ({type: TRANSFER_BOUNTIES_SUCCESS, payload})

    static postTransferFailed = () => ({type: TRANSFER_BOUNTIES_FAILED})

}
