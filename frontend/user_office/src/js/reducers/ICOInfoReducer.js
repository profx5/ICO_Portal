import {
    GET_ICO_INFO_REQUEST,
    GET_ICO_INFO_SUCCESS,
} from '../types/ICOInfoTypes'

import {Map} from 'immutable'

const initialState = Map({
    USDcPerETHRate: 0,
    USDcRaised: 0,
    totalHardCapUSDc: 0,
    crowdSaleAddress: "",
    tokenAddress: "",
    currentPhase: Map({
        name: "",
        discountPercent: 0,
        startTime: 0,
        endTime: 0,
        softCapUSDc: 0,
        hardCapUSDc: 0
    })
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
