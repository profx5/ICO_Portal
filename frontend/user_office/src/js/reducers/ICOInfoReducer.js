import {
    GET_ICO_INFO_REQUEST,
    GET_ICO_INFO_SUCCESS,
} from '../types/ICOInfoTypes'

import {Map} from 'immutable'

const initialState = Map({
    token_address: "",
    total_supply: 0,
    usd_c_per_eth: 0
})

export function ICOInfoReducer(state=initialState, {type, payload, ...action}) {
    switch ( type ) {
        case GET_ICO_INFO_REQUEST: {
            return state
        }
        case GET_ICO_INFO_SUCCESS: {
            return state.merge(payload)
        }
        default: {
            return state
        }
    }
}
