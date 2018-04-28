import { createReducer } from 'redux-act';
import * as actions from './../actions/DepositsActions';
import {Map, List} from 'immutable';



const initialState = Map({
    isDepositsLoading: false,
    count: 0,
    pages: 0,
    current_page: 1,
    results: List()
});



export const DepositsReducer = createReducer({
    [actions.getDepositsRequest]: (state = initialState, payload) => state.set('isDepositsLoading', true),
    [actions.getDepositsSuccess]: (state = initialState, payload) => state.mergeDeep(payload).set('isDepositsLoading', false),
    [actions.depositsNextPage]: (state = initialState, payload) => state.update('current_page', page => page + 1),
    [actions.depositsPrevPage]: (state = initialState, payload) => state.update('current_page', page => page - 1)
}, initialState);
