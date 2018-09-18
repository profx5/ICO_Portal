import { createAction } from 'redux-act';



export const getTicketsRequest = createAction('GET_TICKETS_REQUEST');
export const getTicketsSuccess = createAction('GET_TICKETS_SUCCESS');
export const getTicketsFailed = createAction('GET_TICKETS_FAILED');

export const getSelectedTicket = createAction('GET_SELECTED_TICKET');
export const getSelectedTicketSuccess = createAction('GET_SELECTED_TICKET_SUCCESS');
export const getSelectedTicketFailed = createAction('GET_SELECTED_TICKET_FAILED');

export const unselectTicket = createAction('UNSELECT_TICKET');

export const createNewTicket = createAction('CREATE_NEW_TICKET');
export const createNewTicketFailed = createAction("CREATE_NEW_TICKET_FAILED");


export const createNewComment = createAction('CREATE_NEW_COMMENT');
export const createNewCommentSuccess = createAction("CREATE_NEW_COMMENT_SUCCESS");
export const createNewCommentFailed = createAction("CREATE_NEW_COMMENT_FAILED");
