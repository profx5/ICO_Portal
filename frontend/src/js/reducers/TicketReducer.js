import { createReducer } from 'redux-act';
import * as actions from 'js/actions/TicketActions';
import {List, Map} from 'immutable';


const initialState = Map({
    results: List(),
    selectedTicket: null,
    isNewTicketSubmitting: false,
    isNewCommentSubmitting: false
});


export const TicketsReducer = createReducer({
    [actions.getTicketsSuccess]: (state = initialState, payload) => state.set('results', payload),
    [actions.getSelectedTicketSuccess]: (state = initialState, payload) => state.set('selectedTicket', payload),
    [actions.unselectTicket]: (state=initialState) => state.set('selectedTicket', null),
    [actions.createNewTicketRequest]: (state=initialState) => state.set('isNewTicketSubmitting', true),
    [actions.createNewTicketSuccess]: (state=initialState) => state.set('isNewTicketSubmitting', false),
    [actions.createNewCommentRequest]: (state=initialState) => state.set('isNewCommentSubmitting', true),
    [actions.createNewCommentSuccess]: (state=initialState) => state.set('isNewCommentSubmitting', false),
}, initialState);
