import { createReducer } from 'redux-act';
import * as actions from './../actions/KYCActions';
import {Map} from 'immutable'



const initialState = Map({
    isModalOpened: false
})



export const ModalWindowReducer = createReducer({
    [actions.showForm]: (state = initialState, payload) => state.set('isModalOpened', true),
    [actions.hideForm]: (state = initialState, payload) => state.set('isModalOpened', false)
}, initialState);