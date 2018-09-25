import axios from 'axios'
import Api from '../../api'
import {call, put, takeEvery} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as ticketActions from './../actions/TicketActions';
import * as UIActions from './../actions/UIActions';
import * as FilesActions from './../actions/FilesActions';
import history from './../utils/history';

export class UISagas {
    static * ChangeSupportTab() {
        try {
            yield put(ticketActions.unselectTicket())
            yield put(FilesActions.clearCommentFiles())
            yield put(FilesActions.clearNewTicketFiles())
        } catch (e) {}
    }
}

export function* saga() {
    yield takeEvery(UIActions.changeActiveTab, UISagas.ChangeSupportTab);
}
