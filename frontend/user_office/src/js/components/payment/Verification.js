import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {compose} from 'redux';
import $ from 'jquery';

import {media} from 'js/utils/media';
import getValidationSchema from 'js/utils/getValidationSchema';

import {Formik, Form} from 'formik';
import NaturalPerson from 'js/components/payment/NaturalPerson';
import LegalPerson from 'js/components/payment/LegalPerson';
import VerificationInfo from 'js/components/payment/VerificationInfo';
import InvestorsDocuments from 'js/components/payment/InvestorsDocuments';
import AddWallet from 'js/components/payment/AddWallet';
import IDFiles from 'js/components/payment/IDFiles';
import UtilityBillFiles from 'js/components/payment/UtilityBillFiles';
import BasisFiles from 'js/components/payment/BasisFiles';
import KYCApproved from 'js/components/payment/stateless/KYCApproved';
import KYCProcessed from 'js/components/payment/stateless/KYCProcessed';
import KYCDeclined from 'js/components/payment/stateless/KYCDeclined';

import * as KYCActions from 'js/actions/KYCActions';
import * as UserActions from 'js/actions/UserActions';
import * as UIActions from 'js/actions/UIActions';
import * as FilesActions from 'js/actions/FilesActions';


class Verification extends React.Component {

    constructor() {
        super();
        this.state = {
            basisFilesError: '',
            idFilesError: '',
            utiliyBillFilesError: '',
        }
    }

    componentDidMount() {
        const { setStep } = this.props;
        setStep(1);
    }

    componentWillUnmount() {
        const {clearIdDocumentFile, clearUtilityBillFile, clearBasisFile} = this.props;

        compose(clearIdDocumentFile, clearUtilityBillFile, clearBasisFile)();
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
            confirm: !!type,
            eth_account: this.getEthAccount(),
        };
    };

    getKYCTicket = () => {
        const { tickets } = this.props;

        return tickets.filter(item => item.title.startsWith('KYC request for user'));
    }

    updateKYCStatus = () => {
        const {getKyc, isLoading} = this.props;

        if (!isLoading) getKyc();
    }

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

    btnClickHandler = (e) => {
        this.validateUploadedFiles();
    }

    getEthAccount = () => {
        const {eth_account} = this.props;

        if (eth_account) return eth_account
            else if (typeof window.web3 !== 'undefined' && !eth_account) return window.web3.eth.defaultAccount;
                return '';
    }

    validateUploadedFiles = () => {
        const {activeKycTab} = this.props;
        let isValid = true;
        if (activeKycTab === 2) {
            if (!$('[name="basis_doc"]').val()) {
                isValid = false;
                this.setState(() => {
                    return {
                        basisFilesError: 'You must attach a basis for representation!'
                    }
                })
            }
        }

        if (!$('[name="id_document_photo"]').val()) {
            isValid = false;
            this.setState(() => {
                return {
                    idFilesError: 'You must attach a photo of your ID!'
                }
            })
        }
      
        if (!$('[name="bill_photo"]').val()) {
            isValid = false;
            this.setState(() => {
                return {
                    utiliyBillFilesError: 'You must attach a copy of Utility bill!'
                }
            })
        }

        return isValid;
    }

    onSubmitHandler = (e) => {
        const {submitForm, setAccountRequest, state, clearIdDocumentFile, clearUtilityBillFile, clearBasisFile, eth_account} = this.props;
        const form = document.querySelector('.VerificationForm');

        const data = new FormData(form);

        if (this.validateUploadedFiles()) {
            
            if (!eth_account) setAccountRequest(data.get('eth_account'));
            submitForm({
                form: new FormData(form),
                state: state
            });
            this.setState(() => {
                return {
                    basisFilesError: '',
                    idFilesError: '',
                    utiliyBillFilesError: ''
                }
            })
            compose(clearIdDocumentFile, clearUtilityBillFile, clearBasisFile)();
        }
    }

    render() {
        const {state, type, is_pep, isSubmiting, basisFiles, idDocumentFiles, utilityBillFiles, isLoading} = this.props;
        let {activeKycTab} = this.props;

        if (type) activeKycTab = type === 'LEGAL' ? 2 : 1;
        let kycTicket = this.getKYCTicket();
        let kycTicketId = null;
        if (kycTicket[0]) {
            kycTicketId = kycTicket[0].id;
        }
        let KYCState = type !== '' && state;

        return (
            <Formik
                initialValues={this.getInitialValues()} 
                validationSchema={activeKycTab === 1 ? getValidationSchema('kycNatural') : getValidationSchema('kycLegal')} 
                validateOnChange={false} 
                validateOnBlur={true}
                enableReinitialize={true}
                onSubmit={this.onSubmitHandler} 
                render={({errors, touched, values}) => (
                    <Wrapper state={state} id="form" className="VerificationForm">
                        {state === 'APPROVED' && <KYCApproved/>}
                        {state === 'DECLINED' && <KYCDeclined/>}
                        {(state === 'WAITING' || state === 'DEPLOYING') && <KYCProcessed clickHandler={this.updateKYCStatus}/>}
                        {!isLoading && !state && 
                            <React.Fragment>
                                <MainWrapper>
                                    {!type && activeKycTab === 1 && <NaturalPerson tabClickHandler={this.tabClickHandler} errors={errors} touched={touched} values={values} is_pep={is_pep} kycStatus={KYCState}/>}
                                    {!type && activeKycTab === 2 && 
                                        <LegalPerson tabClickHandler={this.tabClickHandler} errors={errors} touched={touched} values={values} is_pep={is_pep}>
                                            <BasisFiles errorMessage={!basisFiles.size && this.state.basisFilesError}/>
                                        </LegalPerson>
                                    }
                                    {type === "NATURAL" && <NaturalPerson tabClickHandler={this.tabClickHandler} kycStatus={KYCState} errors={errors} touched={touched} values={values} is_pep={is_pep}/>}
                                    {type === "LEGAL" && 
                                        <LegalPerson tabClickHandler={this.tabClickHandler} errors={errors} touched={touched} values={values} is_pep={is_pep}>
                                            <BasisFiles errorMessage={!basisFiles.size && this.state.basisFilesError}/>
                                        </LegalPerson>
                                    }
                                    <InvestorsDocuments 
                                        errors={errors} 
                                        touched={touched} 
                                        values={values}>
                                        <IDFiles errorMessage={!idDocumentFiles.size && this.state.idFilesError}/>
                                        <UtilityBillFiles errorMessage={!utilityBillFiles.size && this.state.utiliyBillFilesError}/>
                                    </InvestorsDocuments>
                                    <AddWallet errors={errors} touched={touched} values={values}/>
                                </MainWrapper>
                                <VerificationInfoWrapper>
                                    <VerificationInfo
                                        btnText="Send data"
                                        isSubmiting={isSubmiting}
                                        verificationStages={['Verification__personData', 'Verification__investorsDocuments', 'Verification_addEth']}
                                        stages={activeKycTab === 1 ? ['Personal Data', 'Investor\'s documents', 'ETH account'] : ['Legal Person Data', 'Investor\'s documents', 'ETH account']}
                                        kycStatus={KYCState} 
                                        kycTicketId={kycTicketId}
                                        clickHandler={this.btnClickHandler}/>
                                </VerificationInfoWrapper>
                            </React.Fragment>
                        }
                    </Wrapper>
                )}
            />
        )
    }
};


const mapStateToProps = ({UI, KYC, user, tickets, Files}) => ({
    state: KYC.get('state'),
    type: KYC.get('type'),
    activeKycTab: UI.get('activeKycTab'),
    firstname: KYC.get('firstname'),
    lastname: KYC.get('lastname'),
    birthdate: KYC.get('birthdate'),
    registration_address: KYC.get('registration_address'),
    document_type: KYC.get('document_type'),
    document_no: KYC.get('document_no'),
    document_country: KYC.get('document_country'),
    document_date: KYC.get('document_date'),
    document_photo: KYC.get('document_photo'),
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
    tickets: tickets.get('results'),
    isSubmiting: KYC.get('isSubmiting'),
    basisFiles: Files.get('basisFiles'),
    idDocumentFiles: Files.get('idDocumentFiles'),
    utilityBillFiles: Files.get('utilityBillFiles'),
    eth_account: user.get('eth_account'),
    isLoading: KYC.get('isLoading'),
});

const mapDispatchToProps = (dispatch) => ({
    setStep(step) {
        dispatch(UIActions.setStep(step));
    },
    submitForm(payload) {
        dispatch(KYCActions.submitKYCRequest(payload))
    },
    setAccountRequest(address) {
        dispatch(UserActions.setAccountRequest(address));
    },
    activateKycTab(payload) {
        dispatch(UIActions.activateKycTab(payload))
    },
    changeType(type) {
        dispatch(KYCActions.changeType(type))
    },
    clearIdDocumentFile() {
        dispatch(FilesActions.clearIdDocumentFile())
    },
    clearUtilityBillFile() {
        dispatch(FilesActions.clearUtilityBillFile())
    },
    clearBasisFile() {
        dispatch(FilesActions.clearBasisFile())
    },
    getKyc() {
        dispatch(KYCActions.getKYCRequest())
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
        width: calc(100vw - 189px);
    }
    input, label, button:not([type="submit"]):not([type="button"]) {
        pointer-events: ${props => props.state === 'WAITING' || props.state === 'DEPLOYING' || props.state === 'APPROVED' ? 'none' : 'auto'};
    }
    input {
        color: ${props => (props.state === 'WAITING' || props.state === 'DEPLOYING' || props.state === 'APPROVED') && '#9D9D9D'};
    }
`;

const MainWrapper = styled.div`
    flex: 1;
    max-width: 720px;
    ${media.sm} {
        max-width: unset;
    }
`;

const VerificationInfoWrapper = styled.div`
    ${media.smMinus} {
        flex-basis: 100%;
    }
`;
