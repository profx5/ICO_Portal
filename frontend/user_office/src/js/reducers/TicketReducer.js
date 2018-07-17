import { createReducer } from 'redux-act';
import * as actions from './../actions/TicketActions';
import {List, Map} from 'immutable';



const initialState = Map({
    results: List(),
    isTicketsLoading: false,
    ticketFull: null,
    isTicketFullLoading: false,
});



export const TicketsReducer = createReducer({
    [actions.getTicketsRequest]: (state = initialState, payload) => state.set('isTicketsLoading', true),
    [actions.getTicketsSuccess]: (state = initialState, payload) => state.set('results', payload),
    [actions.getTicketFull]: (state = initialState, payload) => state.set('isTicketFullLoading', true),
    [actions.getTicketFullSuccess]: (state = initialState, payload) => state.set('ticketFull', payload).set('isTicketFullLoading', false),
    [actions.setTicketFullNull]: (state=initialState, payload) => state.set('ticketFull', null),
}, initialState);
