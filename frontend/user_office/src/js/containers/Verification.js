import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {reduxForm} from 'redux-form';
import { Form, Field } from 'react-final-form'

import * as KYCActions from './../actions/KYCActions';

import PersonalData from './PersonalData';
import Address from './Address';
import Documents from './Documents';
import VerificationInfo from './VerificationInfo';


class Verification extends React.Component {

    onSubmitHandler = event => {
        event.preventDefault();
        // const data = new FormData(event.target);
        // this.props.submitForm(data);
        alert('bro')
    }

    render () {
        return (
            <Form 
                onSubmit={this.onSubmitHandler}
                render={() => (

                    <Wrapper onSubmit={(function(e){e.preventDefault()})} id="form" className="Verification">
                        <Head>Verification</Head>
                        <MainWrapper>
                            <PersonalData/>
                            <Address/>
                            <Documents/>
                        </MainWrapper>
                        <InfoWrapper>
                            <VerificationInfo 
                                btnText="Send data" 
                                verificationStages={['Verification__personalData','Verification__address','Verification__documents']} 
                                stages={['Personal Data', 'Registration address', 'Document']}
                            />
                        </InfoWrapper>
                    </Wrapper>
                )}
            />
        )
    }
};


const mapStateToProps = ({KYC}) => ({})

const mapDispatchToProps = (dispatch) => ({
    submitForm(payload) {
        dispatch(KYCActions.submitKYCRequest(payload))
    }
})

// Verification = reduxForm({
//     form: 'verification'
// })(Verification);

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
    margin-top: 34px;
    flex-basis: 100%;
    margin-bottom: 45px;
`;

const MainWrapper = styled.div`
    flex: 1;
    max-width: 620px;
`;

const InfoWrapper = styled.div`

`;
