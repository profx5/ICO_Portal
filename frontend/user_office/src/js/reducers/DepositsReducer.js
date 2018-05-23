import { createReducer } from 'redux-act';
import * as actions from './../actions/DepositsActions';
import {Map, List} from 'immutable';



const initialState = Map({
    count: 0,
    pages: 0,
    current_page: 1,
    results: List()
});



export const DepositsReducer = createReducer({
    [actions.getDepositsRequest]: (state = initialState, payload) => state.set('isDepositsLoading', true),
    [actions.getDepositsSuccess]: (state = initialState, payload) => state.mergeDeep(payload),
}, initialState);
