import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import $ from 'jquery';

import * as KYCActions from './../actions/KYCActions';

import FinalFormField from './../components/FinalFormField';
import FinalFormRadio from './../components/FinalFormRadio';
import Button from './../components/Button';


class LegalPersonData extends React.Component {

    uploadOnClickHandler = (event) => {
        $(event.currentTarget).find('input[type="file"]').click();
    }

    render() {

        const {uploadedUserPhoto, uploadPhoto, removePhoto} = this.props;

        return (
            <Wrapper className="Verification__personData">
                <Title>Legal Person Data</Title>
                <InputSet>
                    <InputWrapper>
                        <FinalFormField placeholder="Your name" labelText="Business name" name="businessName"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your last name" labelText="Registration number" name="registrationNumber"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your place of birth" labelText="Date of registration" name="dateOfRegistration"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="date/month/year"  labelText="Phone number" options={{date: true, datePattern: ['Y', 'm', 'd'], delimiters: ['/']}} name="phone"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your personal identification code" labelText="First name of director" name="directorFirstName"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your phone number" labelText="Last Name of director" options={{phone: true, phoneRegionCode: 'RU'}} name="directorLastName"/>
                    </InputWrapper>


                    <div className="block-file">
                        <p className="text">Basis for representation</p>
                        <ButtonWrapper>
                            <Button text="Attach file"/>
                        </ButtonWrapper>
                    </div>


                    <InputWrapper>
                        <FinalFormField placeholder="Your email" labelText="Email" name="email"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your address" labelText="Address" name="address"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your field of activity" labelText="Field of activity" name="activity"/>
                    </InputWrapper>
                </InputSet>

                <InputSet>
                    <SubTitle><span>Beneficial owner</span> data</SubTitle>
                    <InputWrapper>
                        <FinalFormField placeholder="Your name" labelText="Name" name="businessName"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your last name" labelText="Personal identification code" name="registrationNumber"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your place of birth" labelText="Date of birth" name="dateOfRegistration"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="date/month/year" labelText="Place of birth" options={{date: true, datePattern: ['Y', 'm', 'd'], delimiters: ['/']}} name="phone"/>
                    </InputWrapper>
                    <InputWrapper fullWidth>
                        <FinalFormField placeholder="Your place of residence of the beneficial owner(s)" labelText="Place of residence of the beneficial owner(s)" name="phone"/>
                    </InputWrapper>
                </InputSet>

                <RadioSet>
                    <p className="text">
                        Is the representative or any beneficial owner a politically exposed person (PEP), 
                        family member of PEP or person known to be close associate of PEP
                    </p>
                    <FinalFormRadio name="PEP" options={['Yes', 'No']} values={['Yes', 'No']}/>
                </RadioSet>


            </Wrapper>
        )
    }
};


const mapStateToProps = ({ICOInfo, Timer, KYC}) => ({
    userPhoto: KYC.get('user_photo'),
    documentPhoto: KYC.get('document_photo'),
    uploadedUserPhoto: KYC.get('uploaded_user_photo')
})

const mapDispatchToProps = (dispatch) => ({
    updateKycData() {
        dispatch(KYCActions.submitKYCRequest())
    },
    uploadPhoto(payload) {
        dispatch(KYCActions.uploadPhoto(payload))
    },
    removePhoto(payload) {
        dispatch(KYCActions.removePhoto(payload))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LegalPersonData)


const Wrapper = styled.div`
    flex: 1;
    height: auto;
    padding: 42px 50px 42px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    .block-file {
        flex-basis: 100%;
    }
`;

const Title = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: #323c47;
    letter-spacing: 0.1px;
    margin-bottom: 45px;
`;

const SubTitle = styled.h4`
    font-size: 16px;
    color: #0a0a0a;
    letter-spacing: 0.5px;
    flex-basis: 100%;
    margin-bottom: 30px;
    span {
        text-decoration: underline;
    }
`;

const DescHead = styled.h4`
    position: absolute;
    left: 0;
    top: 0;
    color: #0a0a0a;
    font-weight: 500;
    flex-basis: 100%;
    @media (max-width: 1300px) {
        text-align: center
        width: 100%;
    }
`;

const InputSet = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(151,151,151,.25);
    margin-bottom: 40px;
`;

const RadioSet = styled.div`
    .text {
        font-size: 16px;
        color: #0a0a0a;
        letter-spacing: 0.5px;
        line-height: 1.44;
        margin-bottom: 15px;
    }
`;

const InputWrapper = styled.div`
    height: 45px;
    flex-basis: ${props => props.fullWidth ? '100%' : '48%'};
    
    &:not(:last-child) {
        margin-bottom: 70px;
    }
    &:last-child {
        margin-bottom: 40px;
    }
`;

const ButtonWrapper = styled.div`
    width: 190px;
    height: 45px;
    margin-bottom: 50px;
    margin-top: 15px;
`;
