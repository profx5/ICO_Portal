import axios from 'axios'
import Api from '../../api'
//types
import {
    GET_ICO_INFO_SUCCESS,
    GET_ICO_INFO_REQUEST,
} from '../types/ICOInfoTypes.js'

export default class ICOInfoActions {
    static getICOInfoRequest() {
        return {
            type: GET_ICO_INFO_REQUEST
        }
    }

    static getICOInfoSuccess(payload) {
        return {
            type: GET_ICO_INFO_SUCCESS,
            payload
        }
    }

    static getICOInfo() {
        return (dispatch) => {
            dispatch(ICOInfoActions.getICOInfoRequest())
            axios({
                method: "GET",
                url: Api.getICOInfo()
            }).then( ({data})  => {
                dispatch(ICOInfoActions.getICOInfoSuccess(data))
            }).catch(error => {
                console.log("cant fetch ico info", {error})
            })
        }
    }
}
