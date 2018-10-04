import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Form} from 'react-final-form'
import $ from 'jquery';

import KYCTabs from './components/KYCTabs';
import NaturalPerson from './NaturalPerson';
import LegalPerson from './LegalPerson';
import VerificationInfo from './VerificationInfo';
import InvestorsDocuments from './InvestorsDocuments';

import * as KYCActions from './../../actions/KYCActions';
import * as UIActions from './../../actions/UIActions';


class Verification extends React.Component {
    transformValues = values => {
        const data = {...values};
        data.is_pep = data.is_pep && data.is_pep !== null ? "True" : "False";
        return data;
    }

    load = () => {
        const {
            state,
            type,
            firstname,
            user_photo,
            lastname,
            birthdate,
            country,
            city,
            registration_address,
            postcode,
            document_type,
            document_no,
            document_country,
            document_date,
            document_photo,
            decline_reason,
            uploaded_user_photo,
            uploaded_doc_photo,
            place_of_birth,
            personal_id,
            place_of_residence,
            profession,
            business_name,
            registration_number,
            registration_date,
            phone_number,
            director_firstname,
            director_lastname,
            basis_doc,
            email,
            address,
            field_of_activity,
            beneficial_fullname,
            beneficial_personal_id,
            beneficial_birthdate,
            beneficial_place_of_birth,
            beneficial_place_of_residence,
            is_pep
        } = this.props;
        return this.transformValues({
            state: state,
            type: type,
            firstname: firstname,
            user_photo: user_photo,
            lastname: lastname,
            birthdate: birthdate,
            country: country,
            city: city,
            registration_address: registration_address,
            postcode: postcode,
            document_type: document_type,
            document_no: document_no,
            document_country: document_country,
            document_date: document_date,
            document_photo: document_photo,
            decline_reason: decline_reason,
            uploaded_user_photo: uploaded_user_photo,
            uploaded_doc_photo: uploaded_doc_photo,
            place_of_birth: place_of_birth,
            personal_id: personal_id,
            place_of_residence: place_of_residence,
            profession: profession,
            business_name: business_name,
            registration_number: registration_number,
            registration_date: registration_date,
            phone_number: phone_number,
            director_firstname: director_firstname,
            director_lastname: director_lastname,
            basis_doc: basis_doc,
            email: email,
            address: address,
            field_of_activity: field_of_activity,
            beneficial_fullname: beneficial_fullname,
            beneficial_personal_id: beneficial_personal_id,
            beneficial_birthdate: beneficial_birthdate,
            beneficial_place_of_birth: beneficial_place_of_birth,
            beneficial_place_of_residence: beneficial_place_of_residence,
            is_pep: is_pep,
            confirmInvestor: !!type,
            confirm: !!type
        });
    };

    tabClickHandler = (event) => {
        const {activateKycTab, changeType} = this.props;

        if (event.target.id === 'kycTab1') {
            activateKycTab({id: 1});
            changeType('NATURAL')
        } else if (event.target.id === 'kycTab2') {
            activateKycTab({id: 2});
            changeType('LEGAL');
        }
    }

    onSubmitHandler = (e) => {
        const {activeKycTab, submitForm, showModal, state} = this.props;

        e.preventDefault();

        if (activeKycTab === 2) {
            if (!$('[name="basis_doc"]').val()) {
                showModal({
                    modalHead: 'Warning',
                    modalContent: 'Please, check if you\'ve attached the basis for representation!'
                });
                return; 
            }
        }

        if (!($('[name="id_document_photo"]').val() && $('[name="bill_photo"]').val())) {

            showModal({
                modalHead: 'Warning',
                modalContent: 'Please, check if you\'ve attached a copy of ID and Utility bill!'
            });
            return;
        }

        let data = new FormData(e.target);
        submitForm({
            form: data,
            state: state
        });
    }

    onAttachClickHandler = (name, event) => {
        event.preventDefault();
        const $filesBlock = $(event.target).closest('.files-section').find('.files-container');

        const $newFileInput = $(`<input class="file-input" id=${Math.floor(Math.random() * (10000000 - 0 + 1)) + 0} type="file" name="${name}" hidden/>`);

        $filesBlock.append($newFileInput);
        $newFileInput.click();
    }

    render() {
        const {activeKycTab, state} = this.props;
        const initial = this.load();

        return (
            <div>
                <Form
                    onSubmit={this.onSubmitHandler}
                    initialValues={initial}
                    render={() => (
                        <Wrapper onSubmit={this.onSubmitHandler} state={state} id="form" className="Verification">
                            <Header>
                                <HeaderInner>
                                    <Head>Verification (KYC)</Head>
                                    <KYCTabs clickHandler={this.tabClickHandler} activeTab={activeKycTab}/>
                                </HeaderInner>
                            </Header>
                            <MainWrapper>
                                {activeKycTab === 1 && <NaturalPerson/>}
                                {activeKycTab === 2 && <LegalPerson onAttachClickHandler={this.onAttachClickHandler}/>}
                                <InvestorsDocuments onAttachClickHandler={this.onAttachClickHandler}/>
                            </MainWrapper>
                            <div>
                                <VerificationInfo
                                    btnText="Send data"
                                    verificationStages={['Verification__personData', 'Verification__investorsDocuments']}
                                    stages={['Personal Data', 'Investor\'s documents']}
                                />
                            </div>
                        </Wrapper>
                    )}
                />
            </div>
        )
    }
};


const mapStateToProps = ({UI, KYC, user}) => ({
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
    kyc_required: user.get('kyc_required'),
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Verification);

const Wrapper = styled.form`
    flex: 1;
    height: calc(100% - 100px);
    margin-left: 60px;
    padding-bottom: 73px;
    display: flex;
    flex-flow: row wrap;
    input, button {
        pointer-events: ${props => props.state === 'APPROVED' && 'none'};
    }
`;

const Header = styled.div`
    flex-basis: 100%;
`;

const HeaderInner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 720px;
`;

const Head = styled.h2`
    font-size: 38px;
    line-height: 1;
    font-weight: 400;
    color: #233539;
    letter-spacing: 0.8px;
    margin-top: 40px;
    margin-bottom: 40px;
`;

const MainWrapper = styled.div`
    flex: 1;
    max-width: 720px;
`;
