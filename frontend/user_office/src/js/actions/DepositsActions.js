import axios from 'axios'
import Api from '../../api'
//types
import {
    GET_DEPOSITE_REQUEST,
    GET_DEPOSITE_SUCCESS,
} from '../types/DepositTypes'

export default class DepositsActions {
    static get_deposit_request() {
        return {
            type: GET_DEPOSITE_REQUEST
        }
    }
    static get_deposit_success(payload) {
        return {
            type: GET_DEPOSITE_SUCCESS, 
            payload
        }
    }

    static get_deposite() {
        return (dispatch) => {
            dispatch(DepositsActions.get_deposit_request())
            axios({
                method: 'GET',
                url: Api.get_deposits()
            }).then( ({data}) => {
                console.log({data})
                dispatch(DepositsActions.get_deposit_success(data))
            }).catch(error => {
                console.log("Cant fetch  deposites")
            })
        }
    }
}
