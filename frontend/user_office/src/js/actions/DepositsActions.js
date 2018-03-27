import axios from 'axios'
import Api from '../../api'
//types
import {
    GET_DEPOSITS_REQUEST,
    GET_DEPOSITS_SUCCESS,
} from '../types/DepositsTypes'

export default class DepositsActions {
    static getDepositsRequest() {
        return {
            type: GET_DEPOSITS_REQUEST
        }
    }

    static getDepositsSuccess(payload) {
        return {
            type: GET_DEPOSITS_SUCCESS,
            payload
        }
    }

    static getDeposits() {
        return (dispatch) => {
            dispatch(DepositsActions.getDepositsRequest())
            axios({
                method: 'GET',
                url: Api.getDeposits()
            }).then(({data}) => {
                dispatch(DepositsActions.getDepositsSuccess(data))
            }).catch(error => {
                console.log("Cant fetch  deposits")
            })
        }
    }
}
