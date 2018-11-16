import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';

import NaturalPersonData from './components/NaturalPersonData';
import ConfirmNaturalPEP from './components/ConfirmNaturalPEP';
import ConfirmAsInvestor from './components/ConfirmAsInvestor';

import * as UIActions from "./../../actions/UIActions";

import iconQuestion from './../../../img/icons/icon_faq.svg';


class NaturalPerson extends React.Component {

    render() {
        const {email, showModal, errors, touched, values, is_pep} = this.props;

        return (
            <Wrapper className="Verification__personData">
                <Head>Personal Data</Head>
                <NaturalPersonData errors={errors} touched={touched} values={values} email={email}/>

                <ConfirmAsInvestor errors={errors} touched={touched} values={values} showModalHandler={showModal} iconQuestion={iconQuestion} labelText="I confirm that the investor is a beneficial owner"/>
                <ConfirmNaturalPEP showModalHandler={showModal} iconQuestion={iconQuestion} is_pep={is_pep}/>

            </Wrapper>
        )
    }
};

const mapStateToProps = ({ICOInfo, Timer, KYC, user}) => ({
    userPhoto: KYC.get('user_photo'),
    documentPhoto: KYC.get('document_photo'),
    uploadedUserPhoto: KYC.get('uploaded_user_photo'),
    fistname: KYC.get('fistname'),
    type: KYC.get('type'),
    email: user.get('email')
});

const mapDispatchToProps = (dispatch) => ({
    showModal(payload) {
        dispatch(UIActions.showModal(payload))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NaturalPerson)


const Wrapper = styled.div`
    flex: 1;
    height: auto;
    padding: 42px 50px 42px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
`;

const Head = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: #323c47;
    letter-spacing: 0.1px;
    margin-bottom: 45px;
`;

