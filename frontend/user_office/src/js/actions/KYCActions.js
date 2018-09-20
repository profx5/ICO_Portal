import { createAction } from 'redux-act';



export const showForm = createAction('SHOW_KYC_FORM');
export const hideForm = createAction('HIDE_KYC_FORM');

export const getKYCRequest = createAction('GET_KYC_REQUEST');
export const getKYCSuccessfull = createAction('GET_KYC_SUCCESSFULL');


export const uploadPhoto = createAction('UPLOAD_PHOTO');
export const removePhoto = createAction('REMOVE_PHOTO');


export const changeType = createAction('CHANGE_TYPE');


export const submitKYCRequest = createAction('SUBMIT_KYC_REQUEST');
export const submitKYCSuccessfull = createAction('SUBMIT_KYC_SUCCESSFULL');
export const submitKYCFailed = createAction('SUBMIT_KYC_FAILED');

export const submitKYC_and_retriveKYC_Request = createAction('SUBMIT_AND_GET_KYC_REQEUST');
