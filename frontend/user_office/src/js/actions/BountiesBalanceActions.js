import axios from 'axios'
import Api from '../../api'

//types
import {
    GET_BOUNTIES_BALANCE_REQUEST,
    GET_BOUNTIES_BALANCE_SUCCESS,
} from '../types/BountiesBalanceTypes'

export default class BountiesBalanceActions {
    static get_bounties_request() {
        return {
            type: GET_BOUNTIES_BALANCE_REQUEST
        }
    }
    static get_bounties_success(payload) {
        return {
            type: GET_BOUNTIES_BALANCE_SUCCESS,
            payload
        }
    }
    static get_bounties() {
        return (dispatch) => {
            dispatch(BountiesBalanceActions.get_bounties_request())
            axios({
                method: 'GET',
                url: Api.get_off_cain_bounties_balance()
            }).then( ({data}) => {
                console.log("BountiesBalanceActions", {data})
                dispatch(BountiesBalanceActions.get_bounties_success(data))
            }).catch(error => {
                console.log("CANNOT FETCH bounties", {error})
            })
        }
    }
}
