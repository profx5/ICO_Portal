import { createReducer } from 'redux-act';
import * as actions from './../actions/KYCActions';
import {Map} from 'immutable'



const initialState = Map({
    state: "DECLINED",
    user_photo: null,
    type: '',
    firstname: "",
    lastname: null,
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
    place_of_birth: null,
    personal_id: null,
    place_of_residence: null,
    profession: null,
    business_name: null,
    registration_number: null,
    registration_date: null,
    phone_number: null,
    director_firstname: null,
    director_lastname: null,
    basis_doc: null,
    email: null,
    address: null,
    field_of_activity: null,
    beneficial_fullname: null,
    beneficial_personal_id: null,
    beneficial_birthdate: null,
    beneficial_place_of_birth: null,
    beneficial_place_of_residence: null,
    is_pep: null,
});


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
    [actions.changeType]: (state, payload) => state.set('showForm', payload),

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
