import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Form} from 'react-final-form'

import * as KYCActions from './../actions/KYCActions';
import * as UIActions from './../actions/UIActions';

import PersonalData from './PersonalData';
import LegalPersonData from './LegalPersonData';
import iconClose from './../../img/icon_close.svg';
import VerificationInfo from './VerificationInfo';
import InvestorsDocuments from './InvestorsDocuments';

import KYCTabs from './../components/KYCTabs';


class Verification extends React.Component {
    transformValues = values => {
        const data = {...values};
        data.is_pep = data.is_pep ? "True" : "False";
        return data;
    }

    load = () => {
        const {
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
        });
    };

    componentDidMount = () => {
        this.data = this.load()
    };

    componentWillUnmount() {
        const {activeKycTab, activateKycTab} = this.props;

        if (activeKycTab === 2) {
            activateKycTab({id: 1});
        }
    }

    onSubmitHandler = event => {
        event.preventDefault();
        alert('bro')
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

    closeTip = () => {
        const {setOpenedTip} = this.props;
        setOpenedTip(null);
    }

    render() {
        const {activeKycTab, openedTip, submitForm, kyc_required} = this.props;
        const initial = this.load();

        return (
            <div>
                {openedTip &&
                <ModalWrapper>
                    {openedTip === 1 &&
                    <Modal>
                        <ModalHeader>
                            Beneficial owner
                            <img onClick={this.closeTip} src={iconClose} alt=""/>
                        </ModalHeader>
                        <ModalContent>
                            Beneficial owner means a natural person who, taking advantage of their influence,
                            makes a transaction, act, action, operation or step or otherwise exercises control
                            over a
                            transaction, act, action, operation or step or over another person and in whose
                            interests or favour or on whose account a transaction or act, action, operation or
                            step is made.
                        </ModalContent>
                    </Modal>
                    }
                    {openedTip === 2 &&
                    <Modal>
                        <ModalHeader>
                            Beneficial owner
                            <img onClick={this.closeTip} src={iconClose} alt=""/>
                        </ModalHeader>
                        <ModalContent>
                            Beneficial owner means a natural person who ultimately owns or controls a legal
                            person through direct or indirect ownership of a sufficient percentage (25 per cent
                            plus one) of the shares or voting rights or ownership interest (more than 25 per
                            cent) in that person, including through bearer shareholdings, or through control via
                            other means.
                        </ModalContent>
                    </Modal>
                    }
                    {openedTip === 3 &&
                    <Modal>
                        <ModalHeader>
                            Beneficial owner
                            <img onClick={this.closeTip} src={iconClose} alt=""/>
                        </ModalHeader>
                        <ModalContent>
                            <p><span>Politically exposed person</span> means a natural person who is or who has
                                been entrusted
                                with prominent public functions including a head of state, head of government,
                                minister or deputy or assistant minister; a member of parliament or of a similar
                                legislative body, a member of a governing body of a political party, a member of
                                a
                                supreme court, a member of a court of auditors or of the board of a central
                                bank; an
                                ambassador, a chargé d'affaires or a high-ranking officer in the armed forces; a
                                member of an administrative, management or supervisory body of a state-owned
                                enterprise; a director, deputy director or member of the board or equivalent
                                function of an international organisation, except middle-ranking or more junior
                                officials.
                            </p>
                            <p><span>Family member of a politically exposed person</span> means the spouse, or a
                                person
                                considered to be equivalent to a spouse, of a politically exposed person; a
                                child
                                and their spouse, or a person considered to be equivalent to a spouse, of a
                                politically exposed person; or a parent of a politically exposed person.</p>
                            <p>
                                <span>Person known to be close associate of a politically exposed person</span> means
                                a natural
                                person who is known to be the beneficial owner or to have joint beneficial
                                ownership
                                of a legal person or a legal arrangement, or any other close business relations,
                                with a politically exposed person; or a natural person who has sole beneficial
                                ownership of a legal entity or legal arrangement which is known to have been set
                                up
                                for the de facto benefit of a politically exposed person.</p>
                        </ModalContent>
                    </Modal>
                    }
                </ModalWrapper>
                }
                <Form
                    onSubmit={this.onSubmitHandler}
                    initialValues={initial}
                    render={() => (
                        <Wrapper onSubmit={(function (e) {
                            e.preventDefault();
                            let data = new FormData(e.target);
                            submitForm(data);
                        })} id="form" className="Verification">
                            <Header>
                                <HeaderInner>
                                    <Head>Verification (KYC)</Head>
                                    <KYCTabs clickHandler={this.tabClickHandler} activeTab={activeKycTab}/>
                                </HeaderInner>
                            </Header>
                            <MainWrapper>
                                {activeKycTab === 1 && <PersonalData/>}
                                {activeKycTab === 2 && <LegalPersonData/>}
                                <InvestorsDocuments/>
                            </MainWrapper>
                            <InfoWrapper>
                                <VerificationInfo
                                    btnText="Send data"
                                    verificationStages={['Verification__personData', 'Verification__investorsDocuments']}
                                    stages={['Personal Data', 'Investor\`s documents']}
                                />
                            </InfoWrapper>
                        </Wrapper>
                    )}
                />
            </div>
        )
    }
};


const mapStateToProps = ({UI, KYC, user}) => ({
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Verification);

const ModalWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    background: rgba(1, 7, 29, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    
`;

const Modal = styled.div`
    position: absolute;
    top: 10%;
    left: 20%;
    width: 60%;
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 9px 21px 0 rgba(173, 182, 217, 0.3);
    z-index: 100;
    max-height: 64vh;
    font-weight: normal;
`;

const ModalHeader = styled.div`
    padding: 18px;
    text-align: center;
    line-height: 1.45;
    height: 72px;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-align: center;
    color: #000000;
    background-color: #f5f6fa
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    & img {
        position: absolute;
        top: 26px;
        right: 26px;
        cursor: pointer;
    }
`;

const ModalContent = styled.div`
    padding: 32px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    text-align: justify;
    font-size: 16px;
    line-height: 1.44;
    letter-spacing: 0.2px;
    color: #0a0a0a;
    overflow-y: auto;
    max-height: 52.5vh;
    & span {
        font-weight: bold;
    }
    & p {
        margin-bottom: 10px;
    }
`;


const Wrapper = styled.form`
    flex: 1;
    height: calc(100% - 100px);
    margin-left: 60px;
    padding-bottom: 73px;
    display: flex;
    flex-flow: row wrap;
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

const InfoWrapper = styled.div`

`;
