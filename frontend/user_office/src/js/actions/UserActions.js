import {
    GET_USER_REQUEST,
    GET_USER_SUCCESSFULL,
    SET_ACCOUNT_REQUEST,
    SET_ACCOUNT_SUCCESSFULL,
    GET_USER_FAILED,
    SET_ACCOUNT_FAILED,
    EXTRACT_EXISTING_METAMASK_ACCOUNT,
    SET_METAMASK_ACCOUNT_SUCCESSFULL,
    SET_METAMASK_ACCOUNT_FAILED,
    SET_GENERETED_ETHEREUM_ACCOUNT,
    DETECT_METAMASK_ACCOUT
} from '../types/UserTypes'
import {generateEthereumAccount} from '../../web3'


export class UserActions {
    static getUserRequest = () => ({type: GET_USER_REQUEST})

    static getUserSuccessfull = (payload) => ({type: GET_USER_SUCCESSFULL, payload})

    static getUserFailed = () => ({type: GET_USER_FAILED})

    static setAccountRequest = (accountValue) => ({type: SET_ACCOUNT_REQUEST, address: accountValue})

    static setAccountSuccessfull = () => ({type: SET_ACCOUNT_SUCCESSFULL})

    static setAccountFailed = () => ({type: SET_ACCOUNT_FAILED})

    static setMetaMaskAccountRequest = () => ({type: EXTRACT_EXISTING_METAMASK_ACCOUNT})

    static detectMetamaskAccount = () => ({type: DETECT_METAMASK_ACCOUT})

    static setMetaMaskAccountSuccessfull = (account) => ({
        type: SET_METAMASK_ACCOUNT_SUCCESSFULL,
        payload: account
    })

    static setGeneretedAccount = () => {
        const {address, privateKey} = generateEthereumAccount()
        return {type: SET_GENERETED_ETHEREUM_ACCOUNT, address, privateKey }
    }

    static setMetaMaskAccountFailed = (account) => ({type: SET_METAMASK_ACCOUNT_FAILED})
}
