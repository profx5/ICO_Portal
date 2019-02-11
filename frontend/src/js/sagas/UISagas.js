import {put, takeEvery} from 'redux-saga/effects';
import * as ticketActions from 'js/actions/TicketActions';
import * as UIActions from 'js/actions/UIActions';
import * as FilesActions from 'js/actions/FilesActions';

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
