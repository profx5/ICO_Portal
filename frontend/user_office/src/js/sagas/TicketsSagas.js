import axios from 'axios'
import Api from '../../api'
import {call, put, takeEvery} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as actions from './../actions/TicketActions';
import * as uiactions from './../actions/UIActions';
import history from './../utils/history';

export class TicketsSagas {
    static* getTickets() {
        try {
            const response = yield call(axios, {
                method: 'GET',
                url: Api.getTickets(),
            });
            yield put(actions.getTicketsSuccess(response.data))
        } catch (e) {
            yield put(actions.getTicketsFailed())
         }
    }

    static* getTicketFull(id) {
        try {
            const res = yield call(axios, {
                method: 'GET',
                url: Api.getTicket(id.payload),
            });
            yield put(actions.getTicketFullSuccess(res.data))
        } catch (e) {
            yield put(actions.getTicketFullFailed())
        }
    }


    static* sendNewTicket(ticket) {
        try {
            const res = yield call(axios, {
                method: 'POST',
                url: Api.newTicket(),
                data: ticket.payload
            });
            yield put(actions.getTicketsRequest());
            yield history.push('/user_office/support/ticket/' + res.data.id);
            yield put(actions.getTicketFull(res.data.id));
            yield put(uiactions.changeSelectedTab('my'));
            yield put(uiactions.setNewTicketFilesNull());
        } catch (e) {
            yield put(actions.sendNewTicketFailed());
        }
    }

    static* sendNewComment(comment) {
        try {
            yield call(axios, {
                method: 'POST',
                url: Api.newComment(comment.payload.get('ticket')),
                data: comment.payload
            });
            yield put(actions.sendNewCommentSuccess());
            yield put(actions.getTicketFull(comment.payload.get('ticket')));
            yield put(uiactions.setNewCommentFilesNull());
        } catch (e) {
            yield put(actions.sendNewCommentFailed());
        }
    }
}

export function* saga() {
    yield takeEvery(actions.getTicketsRequest, TicketsSagas.getTickets);
    yield takeEvery(actions.getTicketFull, TicketsSagas.getTicketFull);
    yield takeEvery(actions.sendNewTicket, TicketsSagas.sendNewTicket);
    yield takeEvery(actions.sendNewComment, TicketsSagas.sendNewComment);
}
