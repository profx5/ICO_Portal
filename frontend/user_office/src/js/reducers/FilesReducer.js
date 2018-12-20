import { createReducer } from 'redux-act';
import * as actions from 'js/actions/FilesActions';
import {Map, List} from 'immutable';


const initialState = Map({
    commentFiles: List(),
    newTicketFiles: List(),
    idDocumentFiles: List(),
    utilityBillFiles: List(),
    basisFiles: List(),
});


export const FilesReducer = createReducer({
    [actions.addCommentFile]: (state = initialState, payload) => {
        return state.update('commentFiles', commentFiles => commentFiles.push(payload))
    },
    [actions.addNewTicketFile]: (state = initialState, payload) => {
        return state.update('newTicketFiles', newTicketFiles => newTicketFiles.push(payload))
    },
    [actions.addIdDocumentFile]: (state = initialState, payload) => {
        return state.update('idDocumentFiles', idDocumentFiles => idDocumentFiles.push(payload))
    },
    [actions.addUtilityBillFile]: (state = initialState, payload) => {
        return state.update('utilityBillFiles', utilityBillFiles => utilityBillFiles.push(payload))
    },
    [actions.addBasisFile]: (state = initialState, payload) => {
        return state.update('basisFiles', basisFiles => basisFiles.push(payload))
    },

    [actions.removeCommentFile]: (state = initialState, payload) => {
        let updatedCommentFiles = state.get('commentFiles').filter(item => {
            return item.id !== payload;
        });
        return state.set('commentFiles', updatedCommentFiles);
    },
    [actions.removeNewTicketFile]: (state = initialState, payload) => {
        let updatedCommentFiles = state.get('newTicketFiles').filter(item => {
            return item.id !== payload;
        });
        return state.set('newTicketFiles', updatedCommentFiles);
    },
    [actions.removeIdDocumentFile]: (state = initialState, payload) => {
        let updatedCommentFiles = state.get('idDocumentFiles').filter(item => {
            return item.id !== payload;
        });
        return state.set('idDocumentFiles', updatedCommentFiles);
    },
    [actions.removeUtilityBillFile]: (state = initialState, payload) => {
        let updatedCommentFiles = state.get('utilityBillFiles').filter(item => {
            return item.id !== payload;
        });
        return state.set('utilityBillFiles', updatedCommentFiles);
    },
    [actions.removeBasisFile]: (state = initialState, payload) => {
        let updatedCommentFiles = state.get('basisFiles').filter(item => {
            return item.id !== payload;
        });
        return state.set('basisFiles', updatedCommentFiles);
    },

    [actions.clearCommentFiles]: (state = initialState) => {
        return state.update('commentFiles', commentFiles => commentFiles.clear())
    },
    [actions.clearNewTicketFiles]: (state = initialState) => {
        return state.update('newTicketFiles', newTicketFiles => newTicketFiles.clear())
    },
    [actions.clearIdDocumentFile]: (state = initialState) => {
        return state.update('idDocumentFiles', idDocumentFiles => idDocumentFiles.clear())
    },
    [actions.clearUtilityBillFile]: (state = initialState) => {
        return state.update('utilityBillFiles', utilityBillFiles => utilityBillFiles.clear())
    },
    [actions.clearBasisFile]: (state = initialState) => {
        return state.update('basisFiles', basisFiles => basisFiles.clear())
    },
}, initialState);
