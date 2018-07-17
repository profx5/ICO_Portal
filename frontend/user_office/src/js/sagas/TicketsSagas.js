import axios from 'axios'
import Api from '../../api'
import {call, put, takeEvery} from 'redux-saga/effects';
import * as actions from './../actions/TicketActions';

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
}

export function* saga() {
    yield takeEvery(actions.getTicketsRequest, TicketsSagas.getTickets);
    yield takeEvery(actions.getTicketFull, TicketsSagas.getTicketFull);
}
