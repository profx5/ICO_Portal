import Api from '../../api'
import axios from 'axios'
//types
import {
    GET_USER_REQUEST,
    GET_USER_SUCCESSFULL
} from '../types/UserTypes'

export default class UserActions {
    static get_user_request() {
        return {
            type: GET_USER_REQUEST
        }
    }

    static get_user_successfull(payload) {
        return {
            type: GET_USER_SUCCESSFULL,
            payload
        }
    }

    static get_user() {
        return (dispatch) => {
            dispatch(UserActions.get_user_request())
            axios({
                url: Api.get_me(),
                method: 'GET'
            }).then( ({data}) => {

                dispatch(UserActions.get_user_successfull(data))
                
            }).catch(error => {
                console.log("cant fetch user", {error})
            })
            
        }
    }
}
