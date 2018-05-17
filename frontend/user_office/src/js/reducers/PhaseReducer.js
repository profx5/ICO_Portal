import { createReducer } from 'redux-act';
import * as actions from './../actions/PhaseActions';
import {Map} from 'immutable';



const initialState = Map({
    name: "",
    begin_date: null,
    end_date: null,
    bonus_percents: 0
});



export const PhaseReducer = createReducer({
    [actions.getPhaseRequest]: (state = initialState, payload) => state,
    [actions.getPhaseSuccess]: (state = initialState, payload) => state.merge(payload)
}, initialState);