import axios from 'axios'
import Api from '../../api'
//types
import {
    GET_BOUNTIES_BALANCE_REQUEST,
    GET_BOUNTIES_BALANCE_SUCCESS,
} from '../types/BountiesBalanceTypes'

export default class BountiesBalanceActions {
    static getBountiesRequest() {
        return {
            type: GET_BOUNTIES_BALANCE_REQUEST
        }
    }

    static getBountiesSuccess(payload) {
        return {
            type: GET_BOUNTIES_BALANCE_SUCCESS,
            payload
        }
    }

    static getBounties() {
        return (dispatch) => {
            dispatch(BountiesBalanceActions.getBountiesRequest())
            axios({
                method: 'GET',
                url: Api.getOffChainBountiesBalance()
            }).then( ({data}) => {
                console.log("BountiesBalanceActions", {data})
                dispatch(BountiesBalanceActions.getBountiesSuccess(data))
            }).catch(error => {
                console.log("CANNOT FETCH bounties", {error})
            })
        }
    }
}
