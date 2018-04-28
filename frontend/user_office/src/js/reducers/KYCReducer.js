import { createReducer } from 'redux-act';
import * as actions from './../actions/KYCActions';
import {Map} from 'immutable'



const initialState = Map({
    status: null,
    isSubmiting: false,
    showForm: false,
    isFetched: false,
    kyc: Map({
        birthdate: null,
        country: null,
        document_no: null,
        document_type: null,
        firstname: null,
        midname: null,
        photo: null,
        surname: null
    })
})



export const KYCReducer = createReducer({
    [actions.getKYCRequest]: (state, payload) => state,
    [actions.getKYCSuccessfull]: (state, payload) => {
        return state.merge({
            status: payload.state,
            kyc: state.get('kyc').merge(payload)
        }).set('isFetched', true)
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