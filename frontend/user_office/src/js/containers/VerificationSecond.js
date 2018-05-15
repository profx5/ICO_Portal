import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';

import * as KYCActions from './../actions/KYCActions';

import PersonalInfo from './PersonalInfo';
import Password from './Password';
import Sessions from './Sessions';
import VerificationInfo from './VerificationInfo';



class VerificationSecond extends React.Component {

    onSubmitHandler = (event) => {
        event.preventDefault()

        const data = new FormData(event.target)

        this.props.submitForm(data)
    }


    render () {

        return (
            <Wrapper onSubmit={this.onSubmitHandler} className="Verification">
                <Head>Verification</Head>
                <MainWrapper>
                    <PersonalInfo/>
                    <Password/>
                    <Sessions/>
                </MainWrapper>
                <InfoWrapper>
                    <VerificationInfo verificationStages={['Verification__personalData','Verification__password','Verification__sessions']} stages={['Personal Data', 'Password', 'My Sessions']}/>
                </InfoWrapper>
            </Wrapper>
        )
    }
};


const mapStateToProps = ({}) => ({

})

const mapDispatchToProps = (dispatch) => ({
    submitForm(payload) {
        dispatch(KYCActions.submitKYCRequest(payload))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(VerificationSecond);


const Wrapper = styled.form`
    flex: 1;
    height: calc(100% - 100px);
    margin-left: 60px;
    padding-bottom: 73px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
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
    max-width: 620px;
`;

const InfoWrapper = styled.div`
    
`;
