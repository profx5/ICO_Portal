import {
    GET_PHASE_REQUEST,
    GET_PHASE_SUCCESS,
} from '../types/PhaseTypes'

import {Map} from 'immutable'

const initialState = Map({
    name: "",
    begin_date: null,
    end_date: null,
    bonus_percents: 0
})

export function PhaseReducer(state=initialState, {type, payload, ...action}) {
    switch ( type ) {
        case GET_PHASE_REQUEST: {
            return state
        }
        case GET_PHASE_SUCCESS: {
            return state.merge(payload)
        }
        default: {
            return state
        }
    }
}
