import { createReducer } from 'redux-act';
import * as actions from './../actions/TicketActions';
import {List, Map} from 'immutable';



const initialState = Map({
    results: List(),
    isTicketsLoading: false,
    selectedTicket: null,
    isSelectedTicketLoading: false
});



export const TicketsReducer = createReducer({
    [actions.getTicketsRequest]: (state = initialState, payload) => state.set('isTicketsLoading', true),
    [actions.getTicketsSuccess]: (state = initialState, payload) => state.set('results', payload),
    [actions.getSelectedTicket]: (state = initialState, payload) => state.set('isSelectedTicketLoading', true),
    [actions.getSelectedTicketSuccess]: (state = initialState, payload) => state.set('selectedTicket', payload).set('isSelectedTicketLoading', false),
    [actions.unselectTicket]: (state=initialState, payload) => state.set('selectedTicket', null),
}, initialState);
