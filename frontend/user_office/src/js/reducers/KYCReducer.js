import { createReducer } from 'redux-act';
import * as actions from './../actions/KYCActions';
import {Map} from 'immutable'



const initialState = Map({
    state: "DECLINED",
    user_photo: null,
    firstname: "",
    midname: "",
    surname: "",
    gender: "",
    birthdate: "",
    country: "",
    city: "",
    registration_address: "",
    postcode: "",
    document_type: "",
    document_no: "",
    document_country: "",
    document_date: "",
    document_photo: null,
    decline_reason: null,

    uploaded_user_photo: null,
    uploaded_doc_photo: null,
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
    [actions.hideForm]: (state, payload) => state.set('showForm', false),

    [actions.uploadPhoto]: (state, payload) => {
        let {name, data} = payload;

        if (name === 'user_photo') return state.set('uploaded_user_photo', data)
        else if (name === 'document_photo') return state.set('uploaded_doc_photo', data)
    },
    [actions.removePhoto]: (state, payload) => {
        let name = payload;
        if (name === 'user_photo') return state.set('uploaded_user_photo', null);
        else if (name === 'document_photo') return state.set('uploaded_doc_photo', null);
    },
}, initialState);