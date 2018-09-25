import { createReducer } from 'redux-act';
import * as actions from './../actions/TimerActions';
import {Map} from 'immutable';



const initialState = Map({
    timerTime: 0
});



export const TimerReducer = createReducer({
    [actions.updateTimerTime]: (state, payload) => {
        return state.merge(payload);
    }
}, initialState);
