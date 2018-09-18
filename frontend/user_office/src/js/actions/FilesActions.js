import { createAction } from 'redux-act';



export const addCommentFile = createAction('ADD_COMMENT_FILE');
export const removeCommentFile = createAction('REMOVE_COMMENT_FILE');
export const clearCommentFiles = createAction('CLEAR_COMMENT_FILES');

export const addNewTicketFile = createAction('ADD_NEW_TICKET_FILE');
export const removeNewTicketFile = createAction('REMOVE_NEW_TICKET_FILE');
export const clearNewTicketFiles = createAction('CLEAR_NEW_TICKET_FILES');
