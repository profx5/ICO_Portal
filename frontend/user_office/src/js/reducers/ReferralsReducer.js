import {Map} from 'immutable'
import {
    GET_REFERRAL_LINK_REQUEST,
    GET_REFERRAL_LINK_SUCCESS,
    GET_REFERRAL_LINK_FAILED,
} from '../types/ReferralsTypes'

const initialState = Map({
    link: Map({
        url: null,
        isLoading: false
    }),
})

export function ReferralsReducer(state=initialState, {type, payload, ...action}) {
    switch(type) {
        case GET_REFERRAL_LINK_REQUEST:  {
            return state.setIn(['link', 'isLoading'], true)
        }
        case GET_REFERRAL_LINK_SUCCESS:  {
            return state
                .setIn(['link', 'url'], payload)
                .setIn(['link', 'isLoading'], false)
        }
        case GET_REFERRAL_LINK_FAILED:   {
            return state.setIn(['link', 'isLoading'], false)

        }
        default: {
            return state
        }
    }
}
