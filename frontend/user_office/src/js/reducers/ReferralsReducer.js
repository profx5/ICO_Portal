import { createReducer } from 'redux-act';
import * as actions from 'js/actions/ReferralsActions';
import {Map} from 'immutable'


const initialState = Map({
    link: Map({
        url: null,
        isLoading: false
    }),
});


export const ReferralsReducer = createReducer({
    [actions.getReferralLinkRequest]: (state = initialState) => state.setIn(['link', 'isLoading'], true),
    [actions.getReferralLinkSuccess]: (state = initialState, payload) => {
        return state
            .setIn(['link', 'url'], payload)
            .setIn(['link', 'isLoading'], false)
    },
    [actions.getReferralLinkFailed]: (state = initialState) => state.setIn(['link', 'isLoading'], false)
}, initialState);
