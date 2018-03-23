import Api from '../../api'
import axios from 'axios'
//types
import {
    GET_USER_REQUEST,
    GET_USER_SUCCESSFULL,
    SHOW_SET_ACCOUNT_FORM,
    HIDE_SET_ACCOUNT_FORM,
    SET_ACCOUNT_REQUEST,
    SET_ACCOUNT_SUCCESSFULL
} from '../types/UserTypes'

export default class UserActions {
    static getUserRequest() {
        return {type: GET_USER_REQUEST}
    }

    static getUserSuccessfull(payload) {
        return {type: GET_USER_SUCCESSFULL, payload}
    }

    static getUser() {
        return (dispatch) => {
            dispatch(UserActions.getUserRequest())
            axios({
                url: Api.getMe(),
                method: 'GET'
            }).then(({data}) => {
                dispatch(UserActions.getUserSuccessfull(data))
            }).catch(error => {
                console.log("cant fetch user", {error})
            })
        }
    }

    static showSetAccountForm() {
        return (dispatch) => {
            dispatch({type: SHOW_SET_ACCOUNT_FORM})
        }
    }

    static hideSetAccountForm() {
        return (dispatch) => {
            dispatch({type: HIDE_SET_ACCOUNT_FORM})
        }
    }

    static setAccountRequest() {
        return {type: SET_ACCOUNT_REQUEST}
    }

    static setAccountSuccessfull() {
        return {type: SET_ACCOUNT_SUCCESSFULL}
    }

    static setAccount(accountValue) {
        return (dispatch) => {
            dispatch(UserActions.getUserRequest())
            return axios({
                method: 'POST',
                url: Api.setEthAccount(),
                data: {
                    'eth_account': accountValue
                }
            }).then(() => {
                dispatch(UserActions.setAccountSuccessfull())
            }).catch(error => {
                console.log('cant set user account', {error})
            })
        }
    }
}
