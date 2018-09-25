import { createReducer } from 'redux-act';
import * as actions from './../actions/MetamaskActions';
import {Map} from 'immutable';


const initialState = Map({
    showOptionsForSettingAccount: false,
    metamaskIsBlocked: false
})


export const MetamaskReducer = createReducer({
    [actions.metamaskIsBlocked]: (state, payload) => state.set('metamaskIsBlocked', true),
    [actions.showModalWithOptionsForEthAccount]: (state, payload) => state.set('showOptionsForSettingAccount', true)
}, initialState);
