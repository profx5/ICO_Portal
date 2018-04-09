import {
    GET_USER_REQUEST,
    GET_USER_SUCCESSFULL,
    SHOW_SET_ACCOUNT_FORM,
    HIDE_SET_ACCOUNT_FORM,
    SET_ACCOUNT_REQUEST,
    SET_ACCOUNT_SUCCESSFULL,
    GET_USER_FAILED,
    SET_ACCOUNT_FAILED,
    SET_METAMASK_ACCOUNT_REQUEST,
    SET_METAMASK_ACCOUNT_SUCCESSFULL,
    SET_METAMASK_ACCOUNT_FAILED
} from '../types/UserTypes'

export class UserActions {
    static getUserRequest = () => ({type: GET_USER_REQUEST})

    static getUserSuccessfull = (payload) => ({type: GET_USER_SUCCESSFULL, payload})

    static getUserFailed = () => ({type: GET_USER_FAILED})

    static showSetAccountForm = () => ({type: SHOW_SET_ACCOUNT_FORM})

    static hideSetAccountForm = () => ({type: HIDE_SET_ACCOUNT_FORM})

    static setAccountRequest = (accountValue) => ({type: SET_ACCOUNT_REQUEST, data: accountValue})

    static setAccountSuccessfull = () => ({type: SET_ACCOUNT_SUCCESSFULL})

    static setAccountFailed = () => ({type: SET_ACCOUNT_FAILED})

    static setMetaMaskAccountRequest = () => ({type: SET_METAMASK_ACCOUNT_REQUEST})

    static setMetaMaskAccountSuccessfull = (account) => ({
        type: SET_METAMASK_ACCOUNT_SUCCESSFULL,
        payload: {
            metaMaskAccount: account
        }
    })

    static setMetaMaskAccountFailed = (account) => ({type: SET_METAMASK_ACCOUNT_FAILED})
}
