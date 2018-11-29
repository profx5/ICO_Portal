import { createReducer } from 'redux-act';
import * as actions from './../actions/PhaseActions';
import {Map} from 'immutable';


const initialState = Map({
    name: "",
    begin_date: '2018-08-29T15:10:47+00:00',
    end_date: '2018-12-09T15:10:47+00:00',
    bonus_percents: 0,
    hard_cap: 0
});


export const PhasesReducer = createReducer({
    [actions.getPhasesRequest]: (state = initialState) => state,
    [actions.getPhasesSuccess]: (state = initialState, payload) => {

        let currentPhase;
        payload.forEach(item => {
            if (item.current === true) currentPhase = item;
        })

        return state.merge(currentPhase);
    }
}, initialState);
