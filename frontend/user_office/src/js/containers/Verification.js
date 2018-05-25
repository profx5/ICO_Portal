import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Field, reduxForm} from 'redux-form';

import * as KYCActions from './../actions/KYCActions';

import PersonalData from './PersonalData';
import Address from './Address';
import Documents from './Documents';
import VerificationInfo from './VerificationInfo';



class Verification extends React.Component {

    onSubmitHandler = values => {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

        return sleep(500).then(() => {
            alert(JSON.stringify(values))
        })

    }

    render () {

        const {onSubmitHandler, handleSubmit} = this.props;

        return (
            <Wrapper onSubmit={handleSubmit(onSubmitHandler)} id="form" className="Verification">
                <Head>Verification</Head>
                <MainWrapper>
                    <PersonalData/>
                    <Address/>
                    <Documents/>
                </MainWrapper>
                <InfoWrapper>
                    <VerificationInfo verificationStages={['Verification__personalData','Verification__address','Verification__documents']} stages={['Personal Data', 'Registration address', 'Document']}/>
                </InfoWrapper>
            </Wrapper>
        )
    }
};


const mapStateToProps = ({}) => ({})

const mapDispatchToProps = (dispatch) => ({
    submitForm(payload) {
        dispatch(KYCActions.submitKYC_and_retriveKYC_Request(payload))
    }
})

Verification = reduxForm({
    form: 'verification'
})(Verification);

export default connect(mapStateToProps, mapDispatchToProps)(Verification);


const Wrapper = styled.form`
    flex: 1;
    height: calc(100% - 100px);
    margin-left: 60px;
    padding-bottom: 73px;
    display: flex;
    flex-flow: row wrap;
`;

const Head = styled.h2`
    font-size: 38px;
    line-height: 1;
    font-weight: 500;
    color: #233539;
    letter-spacing: -1.1px;
    margin-top: 45px;
    flex-basis: 100%;
    margin-bottom: 45px;
`;

const MainWrapper = styled.div`
    flex: 1;
`;

const InfoWrapper = styled.div`
    
`;
