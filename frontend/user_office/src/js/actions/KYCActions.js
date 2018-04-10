import {
    SHOW_KYC_FORM,
    HIDE_KYC_FORM,
    GET_KYC_REQUEST,
    GET_KYC_SUCCESSFULL,
    SUBMIT_KYC_REQUEST,
    SUBMIT_KYC_SUCCESSFULL,
    SUBMIT_KYC_FAILED,
    SUBMIT_AND_GET_KYC_REQEUST
} from '../types/KYCTypes'

export class KYCActions {
    static showForm = () => ({type: SHOW_KYC_FORM})

    static hideForm = () => ({type: HIDE_KYC_FORM})

    static getKYCRequest = () => ({type: GET_KYC_REQUEST})

    static getKYCSuccessfull = (payload) => ({type: GET_KYC_SUCCESSFULL, payload})

    static submitKYCRequest = (data) => ({type: SUBMIT_KYC_REQUEST, data})

    static submitKYCSuccessfull = () => ({type: SUBMIT_KYC_SUCCESSFULL})

    static submitKYCFailed = () => ({type: SUBMIT_KYC_FAILED})

    static submitKYC_and_retriveKYC_Request(data) {
        return {
            type: SUBMIT_AND_GET_KYC_REQEUST,
            data
        }
    }
}
