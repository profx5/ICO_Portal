import { createAction } from 'redux-act';



export const getTicketsRequest = createAction('GET_TICKETS_REQUEST');
export const getTicketsSuccess = createAction('GET_TICKETS_SUCCESS');
export const getTicketsFailed = createAction('GET_TICKETS_FAILED');

export const getTicketFull = createAction('GET_TICKET_FULL');
export const getTicketFullSuccess = createAction('GET_TICKET_FULL_SUCCESS');
export const getTicketFullFailed = createAction('GET_TICKET_FULL_FAILED');

export const setTicketFullNull = createAction('SET_TICKET_FULL_NULL');

export const sendNewTicket = createAction('SEND_NEW_TICKET');
export const sendNewTicketFailed = createAction("SEND_NEW_TICKET_FAILED");

export const sendNewComment = createAction('SEND_NEW_COMMENT');
export const sendNewCommentSuccess = createAction("SEND_NEW_COMMENT_SUCCESS");
export const sendNewCommentFailed = createAction("SEND_NEW_COMMENT_FAILED");
