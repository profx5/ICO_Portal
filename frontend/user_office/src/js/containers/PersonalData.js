import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import $ from 'jquery';

import * as KYCActions from './../actions/KYCActions';

import FinalFormField from './../components/FinalFormField';
import FinalFormCheckbox from './../components/FinalFormCheckbox';
import FinalFormRadio from './../components/FinalFormRadio';


class PersonData extends React.Component {

    uploadOnClickHandler = (event) => {
        $(event.currentTarget).find('input[type="file"]').click();
    }

    render() {

        const {uploadedUserPhoto, uploadPhoto, removePhoto} = this.props;

        return (
            <Wrapper className="Verification__personData">
                <Title>Personal Data</Title>
                <InputSet>
                    <InputWrapper>
                        <FinalFormField placeholder="Your name" labelText="First Name" name="firstname"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your last name" labelText="Last Name" name="surname"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your place of birth" labelText="Place of birth" name="placeOfBirth"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="date / month / year" labelText="Date of birth" options={{date: true, datePattern: ['Y', 'm', 'd'], delimiters: ['/']}} name="dateOfBirth"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your personal identification code" labelText="Personal identification code" name="personalId"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your phone number" labelText="Phone number" options={{phone: true, phoneRegionCode: 'RU'}} name="phone"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your email" labelText="Email" name="email"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Address" labelText="Place of residence" name="placeOfResidence"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your profession" labelText="Profession of field of activity" name="profession"/>
                    </InputWrapper>
                </InputSet>

                <RadioSet className="RadioSet RadioSet-1">
                    <FinalFormCheckbox name="confirmInvestor" options={['I confirm that the investor is a beneficial owner']} values={['Yes']} />
                </RadioSet>

                <RadioSet className="RadioSet RadioSet-2">
                    <p className="text">Are you a <span>politically exposed person</span> (PEP), family member of PEP or person known to be close associate of PEP?</p>
                    <FinalFormRadio name="PEP" options={['Yes', 'No']} values={['Yes', 'No']} />
                </RadioSet>
            </Wrapper>
        )
    }
};


const mapStateToProps = ({ICOInfo, Timer, KYC}) => ({
    userPhoto: KYC.get('user_photo'),
    documentPhoto: KYC.get('document_photo'),
    uploadedUserPhoto: KYC.get('uploaded_user_photo'),
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonData)


const Wrapper = styled.div`
    flex: 1;
    height: auto;
    padding: 42px 50px 42px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
`;

const Title = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: #323c47;
    letter-spacing: 0.1px;
    margin-bottom: 45px;
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
`;

const RadioSet = styled.div`
    &.RadioSet {
        &-1 {
            margin: 33px 0;
        }
    }
    .text {
        font-size: 16px;
        color: #0a0a0a;
        letter-spacing: 0.5px;
        line-height: 1.44;
        margin-bottom: 15px;
        span {
            text-decoration: underline;
        }
    }
`;

const InputWrapper = styled.div`
    height: 45px;
    flex-basis: 48%;
    
    &:not(:last-child) {
        margin-bottom: 70px;
    }
    &:last-child {
        margin-bottom: 40px;
    }
`;