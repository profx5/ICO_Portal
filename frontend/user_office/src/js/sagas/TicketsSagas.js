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
<<<<<<< HEAD
=======

    static* sendNewTicket(ticket) {
        try {
            const res = yield call(axios, {
                method: 'POST',
                url: Api.newTicket(),
                data: ticket.payload
            });
            yield put(actions.getTicketsRequest());
            yield history.push('/user_office/faq/ticket/' + res.data.id);
            yield put(actions.getTicketFull(res.data.id));
            yield put(uiactions.changeSelectedTab('my'));
        } catch (e) {
            yield put(actions.sendNewTicketFailed());
        }
    }

    static* sendNewComment(comment) {
        try {
            yield call(axios, {
                method: 'POST',
                url: Api.newComment(comment.payload.get('ticket')),
                data: {comment: comment.payload.get('comment')}
            });
            yield put(actions.sendNewCommentSuccess());
            yield put(actions.getTicketFull(comment.payload.get('ticket')))
        } catch (e) {
            yield put(actions.sendNewCommentFailed());
        }
    }
>>>>>>> 119c0e4... ICO-144 Update FAQ Feedback pages
}

export function* saga() {
    yield takeEvery(actions.getTicketsRequest, TicketsSagas.getTickets);
    yield takeEvery(actions.getTicketFull, TicketsSagas.getTicketFull);
}
