import { createReducer } from 'redux-act';
import * as actions from './../actions/PhaseActions';
import {Map} from 'immutable';



const initialState = Map({
    name: "",
    begin_date: null,
    end_date: null,
    bonus_percents: 0,
    hard_cap: 0
});



export const PhasesReducer = createReducer({
    [actions.getPhasesRequest]: (state = initialState, payload) => state,
    [actions.getPhasesSuccess]: (state = initialState, payload) => {

        let currentPhase;
        payload.forEach(item => {
            if (item.current === true) currentPhase = item;
        })

        return state.merge(currentPhase);
    }
}, initialState);