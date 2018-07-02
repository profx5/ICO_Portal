import { createReducer } from 'redux-act';
import * as actions from './../actions/ReferralsActions';
import {Map} from 'immutable'

const initialState = Map({
    link: Map({
        url: null,
        isLoading: false
    }),
});



export const ReferralsReducer = createReducer({
    [actions.getReferralLinkRequest]: (state = initialState, payload) => state.setIn(['link', 'isLoading'], true),
    [actions.getReferralLinkSuccess]: (state = initialState, payload) => {
        return state
            .setIn(['link', 'url'], payload)
            .setIn(['link', 'isLoading'], false)
    },
    [actions.getReferralLinkFailed]: (state = initialState, payload) => state.setIn(['link', 'isLoading'], false)
}, initialState);