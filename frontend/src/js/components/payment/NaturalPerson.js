import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import {media} from 'js/utils/media';

import KYCTabs from 'js/components/payment/stateless/KYCTabs';
import NaturalPersonData from 'js/components/payment/stateless/NaturalPersonData';
import ConfirmNaturalPEP from 'js/components/payment/stateless/ConfirmNaturalPEP';
import ConfirmAsInvestor from 'js/components/payment/stateless/ConfirmAsInvestor';

import * as UIActions from "js/actions/UIActions";

import iconQuestion from 'img/icons/icon_faq.svg';


class NaturalPerson extends React.Component {

    render() {
        const {tabClickHandler, email, showModal, errors, touched, values, is_pep, kycStatus} = this.props;

        return (
            <Wrapper className="Verification__personData">
                <Header>
                    <Head>Personal Data</Head>
                    <KYCTabs clickHandler={tabClickHandler} activeTab={1}/>
                </Header>
                <NaturalPersonData errors={errors} touched={touched} values={values} email={email} kycStatus={kycStatus}/>
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
    ${media.xs} {
        padding: 20px 16px;
        max-width: calc(100vw - 32px);
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 45px;
    ${media.xs} {
        margin-bottom: 35px;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
`;

const Head = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: #323c47;
    letter-spacing: 0.1px;
    white-space: nowrap;
    ${media.xs} {
        font-size: 16px;
    }
`;

