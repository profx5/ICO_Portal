import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {compose} from 'redux';
import {Formik, Form} from 'formik';            
import $ from 'jquery';
import VerificationValidation from './utils/VerificationValidation';
import {media} from './../../utils/media';

import Title from './../common/Title';
import KYCTabs from './components/KYCTabs';
import VerificationState from './components/VerificationState';
import NaturalPerson from './NaturalPerson';
import LegalPerson from './LegalPerson';
import VerificationInfo from './VerificationInfo';
import InvestorsDocuments from './InvestorsDocuments';

import * as KYCActions from './../../actions/KYCActions';
import * as UIActions from './../../actions/UIActions';
import * as FilesActions from './../../actions/FilesActions';


class Verification extends React.Component {

    constructor() {
        super();
        this.currentFileId = 0;
    }

    getKYCTicket = () => {
        const { tickets } = this.props;

        return tickets.filter(item => item.title.startsWith('KYC request for user'));
    }

    getInitialValues = () => {
        const {
            state, type,
            firstname, middlename,
            lastname, place_of_birth,
            birthdate, personal_id,
            phone_number, email,
            place_of_residence, profession,
            business_name, registration_number,
            registration_date, address,
            field_of_activity, director_firstname,
            director_lastname, beneficial_fullname,
            beneficial_personal_id, beneficial_place_of_birth,
            beneficial_birthdate, beneficial_place_of_residence, is_pep
        } = this.props;
        return {
            state: state,
            type: type,
            firstname: firstname,
            middlename: middlename,
            lastname: lastname,
            place_of_birth: place_of_birth,
            birthdate: birthdate,
            personal_id: personal_id,
            phone_number: phone_number,
            email: email,
            place_of_residence: place_of_residence,
            profession: profession,

            business_name: business_name,
            registration_number: registration_number,
            registration_date: registration_date,
            address: address,
            field_of_activity: field_of_activity,
            director_firstname: director_firstname,
            director_lastname: director_lastname,

            beneficial_fullname: beneficial_fullname,
            beneficial_personal_id: beneficial_personal_id,
            beneficial_place_of_birth: beneficial_place_of_birth,
            beneficial_birthdate: beneficial_birthdate,
            beneficial_place_of_residence: beneficial_place_of_residence,
            is_pep: is_pep ? "True" : "False",
            
            confirmInvestor: !!type,
            confirm: !!type
        };
    };

    tabClickHandler = (callback, event) => {
        const {activateKycTab, changeType} = this.props;

        if (event.target.id === 'kycTab1') {
            activateKycTab({id: 1});
            changeType('NATURAL')
        } else if (event.target.id === 'kycTab2') {
            activateKycTab({id: 2});
            changeType('LEGAL');
        }
        callback();
    }

    onSubmitHandler = (e) => {
        const {activeKycTab, submitForm, showModal, state, attachments, clearIdDocumentFile, clearUtilityBillFile, clearRepresentationFile} = this.props;
        const form = document.querySelector('.VerificationForm');

        if (activeKycTab === 2) {
            if (!$('[name="basis_doc"]').val() && !attachments) {
                showModal({
                    modalHead: 'Warning',
                    modalContent: 'Please, check if you\'ve attached the basis for representation!'
                });
                return; 
            }
        }

        if (!$('[name="id_document_photo"]').val() && !attachments) {
            showModal({
                modalHead: 'Warning',
                modalContent: 'Please, check if you\'ve attached a copy of ID!'
            });
            return;
        } else if (!$('[name="bill_photo"]').val() && !attachments) {
            showModal({
                modalHead: 'Warning',
                modalContent: 'Please, check if you\'ve attached a copy of Utility bill!'
            });
            return;
        }

        submitForm({
            form: new FormData(form),
            state: state
        });
        compose(clearIdDocumentFile, clearUtilityBillFile, clearRepresentationFile)();
    }

    onAttachClickHandler = (name, event) => {
        event.preventDefault();
        const $filesBlock = $(event.target).closest('.files-section').find('.files-container');

        const $newFileInput = $(`<input class="file-input" id=${this.currentFileId++} type="file" name="${name}" hidden/>`);

        $filesBlock.prepend($newFileInput);
        $newFileInput.click();
    }

    render() {
        const {state, type, is_pep} = this.props;
        let {activeKycTab} = this.props;

        if (type) activeKycTab = type === 'LEGAL' ? 2 : 1;
        let kycTicket = this.getKYCTicket();
        let kycTicketId = null;
        if (kycTicket[0]) {
            kycTicketId = kycTicket[0].id;
        }
        let KYCStatus = type !== '' && state;

        return (
            <Formik
                initialValues={this.getInitialValues()} 
                validationSchema={activeKycTab === 1 ? VerificationValidation({type: 'Natural'}) : VerificationValidation({type: 'Legal'})} 
                validateOnChange={false} 
                validateOnBlur={true}
                enableReinitialize={true}
                onSubmit={this.onSubmitHandler} 
                render={({errors, touched, values, resetForm}) => (
                    <Wrapper state={state} id="form" className="VerificationForm">
                        <Header>
                            <HeaderInner>
                                <Title className="Verification_head">Verification (KYC)</Title>
                                <KYCTabs clickHandler={this.tabClickHandler.bind(this, resetForm)} activeTab={activeKycTab}/>
                            </HeaderInner>
                            <VerificationState className="visible-smMinus" kycState={KYCStatus} kycTicketId={kycTicketId}/>
                        </Header>
                        <MainWrapper>
                            {!type && activeKycTab === 1 && <NaturalPerson errors={errors} touched={touched} values={values} is_pep={is_pep}/>}
                            {!type && activeKycTab === 2 && <LegalPerson errors={errors} touched={touched} values={values} is_pep={is_pep} onAttachClickHandler={this.onAttachClickHandler}/>}
                            {type === "NATURAL" && <NaturalPerson errors={errors} touched={touched} values={values} is_pep={is_pep}/>}
                            {type === "LEGAL" && <LegalPerson errors={errors} touched={touched} values={values} is_pep={is_pep} onAttachClickHandler={this.onAttachClickHandler}/>}
                            <InvestorsDocuments errors={errors} touched={touched} values={values} onAttachClickHandler={this.onAttachClickHandler}/>
                        </MainWrapper>
                        <div>
                            <VerificationInfo
                                btnText="Send data"
                                verificationStages={['Verification__personData', 'Verification__investorsDocuments']}
                                stages={activeKycTab === 1 ? ['Personal Data', 'Investor\'s documents'] : ['Legal Person Data', 'Investor\'s documents']}
                                kycState={KYCStatus} 
                                kycTicketId={kycTicketId}/>
                        </div>
                    </Wrapper>
                )}
            />
        )
    }
};


const mapStateToProps = ({UI, KYC, user, tickets}) => ({
    state: KYC.get('state'),
    type: KYC.get('type'),
    activeKycTab: UI.get('activeKycTab'),
    openedTip: UI.get('openedTip'),
    firstname: KYC.get('firstname'),
    user_photo: KYC.get('user_photo'),
    lastname: KYC.get('lastname'),
    birthdate: KYC.get('birthdate'),
    country: KYC.get('country'),
    city: KYC.get('city'),
    registration_address: KYC.get('registration_address'),
    postcode: KYC.get('postcode'),
    document_type: KYC.get('document_type'),
    document_no: KYC.get('document_no'),
    document_country: KYC.get('document_country'),
    document_date: KYC.get('document_date'),
    document_photo: KYC.get('document_photo'),
    decline_reason: KYC.get('decline_reason'),
    uploaded_user_photo: KYC.get('uploaded_user_photo'),
    uploaded_doc_photo: KYC.get('uploaded_doc_photo'),
    place_of_birth: KYC.get('place_of_birth'),
    personal_id: KYC.get('personal_id'),
    place_of_residence: KYC.get('place_of_residence'),
    profession: KYC.get('profession'),
    business_name: KYC.get('business_name'),
    registration_number: KYC.get('registration_number'),
    registration_date: KYC.get('registration_date'),
    phone_number: KYC.get('phone_number'),
    director_firstname: KYC.get('director_firstname'),
    director_lastname: KYC.get('director_lastname'),
    basis_doc: KYC.get('basis_doc'),
    email: KYC.get('email'),
    address: KYC.get('address'),
    field_of_activity: KYC.get('field_of_activity'),
    beneficial_fullname: KYC.get('beneficial_fullname'),
    beneficial_personal_id: KYC.get('beneficial_personal_id'),
    beneficial_birthdate: KYC.get('beneficial_birthdate'),
    beneficial_place_of_birth: KYC.get('beneficial_place_of_birth'),
    beneficial_place_of_residence: KYC.get('beneficial_place_of_residence'),
    is_pep: KYC.get('is_pep'),
    attachments: KYC.get('attachments'),
    kyc_required: user.get('kyc_required'),
    tickets: tickets.get('results'),
});

const mapDispatchToProps = (dispatch) => ({
    submitForm(payload) {
        dispatch(KYCActions.submitKYCRequest(payload))
    },
    activateKycTab(payload) {
        dispatch(UIActions.activateKycTab(payload))
    },
    setOpenedTip(id) {
        dispatch(UIActions.setOpenedTip(id))
    },
    changeType(type) {
        dispatch(KYCActions.changeType(type))
    },
    showModal(payload) {
        dispatch(UIActions.showModal(payload))
    },
    clearIdDocumentFile() {
        dispatch(FilesActions.clearIdDocumentFile())
    },
    clearUtilityBillFile() {
        dispatch(FilesActions.clearUtilityBillFile())
    },
    clearRepresentationFile() {
        dispatch(FilesActions.clearRepresentationFile())
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Verification);

const Wrapper = styled(Form)`
    flex: 1;
    height: calc(100% - 100px);
    display: flex;
    flex-flow: row wrap;
    ${media.xs} {
        width: calc(100vw - 32px);
    }
    ${media.sm} {
        width: calc(100vw - 140px);
    }
    input, button, label {
        pointer-events: ${props => props.state === 'APPROVED' && 'none'};
    }
    input {
        color: ${props => props.state === 'APPROVED' && '#9D9D9D'};
    }
    button {
        background: ${props => props.state === 'APPROVED' && '#CACACA'};
        border: ${props => props.state === 'APPROVED' && 'none'};
        &:before, &:after {
            display: ${props => props.state === 'APPROVED' && 'none'};
        }
    }
`;

const Header = styled.div`
    flex-basis: 100%;
    ${media.smMinus} {
        max-width: 100%;
    }
`;

const HeaderInner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 720px;
    margin-top: 60px;
    margin-bottom: 40px;
    ${media.xs} {
        flex-wrap: wrap;
        margin-top: 15px;
        margin-bottom: 20px;
    }
    ${media.sm} {
        max-width: unset;
        margin-right: 60px;
    }
`;

const MainWrapper = styled.div`
    flex: 1;
    max-width: 720px;
    ${media.sm} {
        margin-right: 60px;
        max-width: unset;
    }
`;
