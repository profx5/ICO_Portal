import { createReducer } from 'redux-act';
import * as actions from './../actions/FilesActions';
import {Map, List} from 'immutable';


const initialState = Map({
    commentFiles: List(),
    newTicketFiles: List()
});


export const FilesReducer = createReducer({
    [actions.addCommentFile]: (state = initialState, payload) => {
        return state.update('commentFiles', commentFiles => commentFiles.push(payload))
    },
    [actions.removeCommentFile]: (state = initialState, payload) => {
        let updatedCommentFiles = state.get('commentFiles').filter((item, index) => {
            return item.id !== payload;
        });
        return state.set('commentFiles', updatedCommentFiles);
    },
    [actions.clearCommentFiles]: (state = initialState, payload) => {
        return state.update('commentFiles', commentFiles => commentFiles.clear())
    },
    [actions.addNewTicketFile]: (state = initialState, payload) => {
        return state.update('newTicketFiles', newTicketFiles => newTicketFiles.push(payload))
    },
    [actions.removeNewTicketFile]: (state = initialState, payload) => {
        let updatedCommentFiles = state.get('newTicketFiles').filter((item, index) => {
            return item.id !== payload;
        });
        return state.set('newTicketFiles', updatedCommentFiles);
    },
    [actions.clearNewTicketFiles]: (state = initialState, payload) => {
        return state.update('newTicketFiles', newTicketFiles => newTicketFiles.clear())
    },
}, initialState);
