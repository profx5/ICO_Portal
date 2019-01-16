import { createReducer } from 'redux-act';
import * as actions from 'js/actions/DepositsActions';
import {Map, List} from 'immutable';


const initialState = Map({
    current_page: '',
    pages: '',
    results: List(),
    isDepositsLoading: false,
});


export const DepositsReducer = createReducer({
    [actions.getDepositsRequest]: (state = initialState) => state.set('isDepositsLoading', true),
    [actions.getDepositsSuccess]: (state = initialState, payload) => state.mergeDeep(payload),
    [actions.executeIncrementCurrentPage]: (state = initialState) => {
        let current_page = state.get('current_page');
        let pages = state.get('pages');
        if (current_page < pages) {
            current_page += 1;
            return state.set('current_page', current_page);
        } else return state;
    },
    [actions.executeDecrementCurrentPage]: (state = initialState) => {
        let current_page = state.get('current_page');
        if (current_page > 1) {
            current_page -= 1;
            return state.set('current_page', current_page);
        } else return state;
    }
}, initialState);
