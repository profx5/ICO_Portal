import {
    GET_KYC_REQUEST,
    GET_KYC_SUCCESSFULL,
    SUBMIT_KYC_REQUEST,
    SUBMIT_KYC_SUCCESSFULL,
    SHOW_KYC_FORM,
    HIDE_KYC_FORM
} from '../types/KYCTypes'
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

export function KYCReducer(state = initialState, {
    type,
    payload,
    ...action
}) {
    switch (type) {
        case GET_KYC_REQUEST:
            return state

        case GET_KYC_SUCCESSFULL:
        console.log({payload})
            return state.merge({
                status: payload.state,
                kyc: state.get('kyc').merge(payload)
            }).set('isFetched', true)

        case SUBMIT_KYC_REQUEST:
            return state.set('isSubmiting', true)

        case SUBMIT_KYC_SUCCESSFULL:
            return state
                .set('isSubmiting', false)
                .set('showForm', false)

        case SHOW_KYC_FORM:
            return state.set('showForm', true)
        case HIDE_KYC_FORM:
            return state.set('showForm', false)

        default:
            return state
    }
}
