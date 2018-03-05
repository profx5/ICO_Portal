import {
    GET_ICO_PHASES_STATS_REQUEST,
    GET_ICO_PHASES_STATS_SUCCESS,
} from '../types/ICOPhasesStatsTypes'

const initialState = {
    bonus_percents: null,
    currency_from: null,
    currency_to: null,
    end_date: null,
    name: null,
    token_price: null,
}

export function ICOPhasesStatsReducer(state=initialState, {type, payload, ...action}) {
    switch ( type ) {

        case GET_ICO_PHASES_STATS_REQUEST: {
            return {...state}
        }

        case GET_ICO_PHASES_STATS_SUCCESS: {
            return {
                ...state,
                ...payload
            }
        }
        
        default: {
            return state
        }
    }

    return state
}
