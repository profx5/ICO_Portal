import { createReducer } from 'redux-act';
import * as actions from 'js/actions/MetamaskActions';
import {Map} from 'immutable';


const initialState = Map({
    showOptionsForSettingAccount: false,
    metamaskIsBlocked: false
})


export const MetamaskReducer = createReducer({
    [actions.metamaskIsBlocked]: (state) => state.set('metamaskIsBlocked', true),
    [actions.showModalWithOptionsForEthAccount]: (state) => state.set('showOptionsForSettingAccount', true)
}, initialState);
