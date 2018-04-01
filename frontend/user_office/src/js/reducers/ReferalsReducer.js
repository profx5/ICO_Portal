import {Map} from 'immutable'
import {
    GET_REFERAL_LINK_REQUEST,
    GET_REFERAL_LINK_SUCCESS,
    GET_REFERAL_LINK_FAILED,
} from '../types/ReferalsTypes'

const initialState = Map({
    link: Map({
        url: null,
        isLoading: false
    }),
})

export function ReferalsReducer(state=initialState, {type, payload, ...action}) {
    switch(type) {
        case GET_REFERAL_LINK_REQUEST:  {
            return state.setIn(['link', 'isLoading'], true)
        }
        case GET_REFERAL_LINK_SUCCESS:  {
            return state
                .setIn(['link', 'url'], payload)
                .setIn(['link', 'isLoading'], false)
        }
        case GET_REFERAL_LINK_FAILED:   {
            return state.setIn(['link', 'isLoading'], false)
            
        }
        default: {
            return state
        }
    }
}
