import { createReducer } from 'redux-act';
import * as actions from './../actions/DepositsActions';
import {Map, List} from 'immutable';



const initialState = Map({
    current_page: 1,
    results: List()
});



export const DepositsReducer = createReducer({
    [actions.getDepositsRequest]: (state = initialState, payload) => state.set('isDepositsLoading', true),
    [actions.getDepositsSuccess]: (state = initialState, payload) => state.mergeDeep(payload),
    [actions.executeIncrementCurrentPage]: (state = initialState, payload) => {
        let current_page = state.get('current_page');
        return state.set('current_page', 2);
    }
}, initialState);
