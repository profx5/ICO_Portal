import axios from 'axios'
import Api from '../../api'
//types
import {
    GET_DEPOSITE_REQUEST,
    GET_DEPOSITE_SUCCESS,
} from '../types/DepositTypes'

export default class DepositsActions {
    static getDepositRequest() {
        return {
            type: GET_DEPOSITE_REQUEST
        }
    }

    static getDepositSuccess(payload) {
        return {
            type: GET_DEPOSITE_SUCCESS,
            payload
        }
    }

    static getDeposite() {
        return (dispatch) => {
            dispatch(DepositsActions.getDepositRequest())
            axios({
                method: 'GET',
                url: Api.getDeposits()
            }).then(({data}) => {
                dispatch(DepositsActions.getDepositSuccess(data))
            }).catch(error => {
                console.log("Cant fetch  deposites")
            })
        }
    }
}
