import { createReducer } from 'redux-act';
import * as actions from './../actions/KYCActions';
import {Map} from 'immutable'



const initialState = Map({
    state: "DECLINED",
    firstname: "",
    midname: "",
    surname: "",
    birthdate: "",
    document_no: "",
    document_type: "",
    country: "",
    photo: null,
    selfie: null
})



export const KYCReducer = createReducer({
    [actions.getKYCRequest]: (state, payload) => state,
    [actions.getKYCSuccessfull]: (state, payload) => {
        return state.merge(payload).set('isFetched', true)
    },

    [actions.submitKYCRequest]: (state, payload) => state.set('isSubmiting', true),
    [actions.submitKYCSuccessfull]: (state, payload) => {
        return state
            .set('isSubmiting', false)
            .set('showForm', false)
    },

    [actions.showForm]: (state, payload) => state.set('showForm', true),
    [actions.hideForm]: (state, payload) => state.set('showForm', false)
}, initialState);