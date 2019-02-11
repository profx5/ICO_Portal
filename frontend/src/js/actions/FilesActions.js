import { createAction } from 'redux-act';


export const addCommentFile = createAction('ADD_COMMENT_FILE');
export const removeCommentFile = createAction('REMOVE_COMMENT_FILE');
export const clearCommentFiles = createAction('CLEAR_COMMENT_FILES');

export const addNewTicketFile = createAction('ADD_NEW_TICKET_FILE');
export const removeNewTicketFile = createAction('REMOVE_NEW_TICKET_FILE');
export const clearNewTicketFiles = createAction('CLEAR_NEW_TICKET_FILES');

export const addIdDocumentFile = createAction('ADD_ID_DOCUMENT_FILE');
export const removeIdDocumentFile = createAction('REMOVE_ID_DOCUMENT_FILE');
export const clearIdDocumentFile = createAction('CLEAR_ID_DOCUMENT_FILE');

export const addUtilityBillFile = createAction('ADD_UTILITY_BILL_FILE');
export const removeUtilityBillFile = createAction('REMOVE_UTILITY_BILL_FILE');
export const clearUtilityBillFile = createAction('CLEAR_UTILITY_BILL_FILE');

export const addBasisFile = createAction('ADD_BASIS_FILE');
export const removeBasisFile = createAction('REMOVE_BASIS_FILE');
export const clearBasisFile = createAction('CLEAR_BASIS_FILE');
