import {
    GET_ICO_PHASE_STATS_REQUEST,
    GET_ICO_PHASE_STATS_SUCCESS,
} from '../types/ICOPhaseStatsTypes'

import {Map} from 'immutable'

const initialState = Map({
    bonus_percents: null,
    currency_from: null,
    currency_to: null,
    end_date: null,
    name: null,
    token_price: null,
})

export function ICOPhaseStatsReducer(state=initialState, {type, payload, ...action}) {
    switch ( type ) {
        case GET_ICO_PHASE_STATS_REQUEST: {
            return state
        }
        case GET_ICO_PHASE_STATS_SUCCESS: {
            return state.merge({
                ...payload
            })
        }
        default: {
            return state
        }
    }
}
