import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import $ from 'jquery';

import * as KYCActions from './../actions/KYCActions';

import FinalFormField from './../components/FinalFormField';
import FinalFormRadio from './../components/FinalFormRadio';
import Button from './../components/Button';
import * as UIActions from "../actions/UIActions";


class LegalPersonData extends React.Component {

    uploadOnClickHandler = (event) => {
        $(event.currentTarget).find('input[type="file"]').click();
    }

    setOpenedTip = (id) => {
        const { setOpenedTip } = this.props;
        setOpenedTip(id);
    }

    render() {

        const {uploadedUserPhoto, uploadPhoto, removePhoto} = this.props;

        return (
            <Wrapper className="Verification__personData">
                <Title>Legal Person Data</Title>
                <InputSet>
                    <InputWrapper>
                        <FinalFormField placeholder="Your business name" labelText="Business name" name="business_name"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your registration number" labelText="Registration number" name="registration_number"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your date of registration" labelText="Date of registration" name="registration_date"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your phone number"  labelText="Phone number" options={{phone: true, phoneRegionCode: 'RU'}} name="phone_number"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your director first name" labelText="First name of director" name="director_firstname"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your director last name" labelText="Last Name of director" name="director_lastname"/>
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
                        <FinalFormField placeholder="Your field of activity" labelText="Field of activity" name="field_of_activity"/>
                    </InputWrapper>
                </InputSet>

                <InputSet>
                    <SubTitle><span onClick={this.setOpenedTip.bind(this, 2)}>Beneficial owner</span> data</SubTitle>
                    <InputWrapper>
                        <FinalFormField placeholder="Your name" labelText="Name" name="beneficial_fullname"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your personal identification code" labelText="Personal identification code" name="beneficial_personal_id"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your place of birth" labelText="Place of birth" name="beneficial_place_of_birth"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="date/month/year" labelText="Date of birth" options={{date: true, datePattern: ['Y', 'm', 'd'], delimiters: ['/']}} name="beneficial_birthdate"/>
                    </InputWrapper>
                    <InputWrapper fullWidth>
                        <FinalFormField placeholder="Your place of residence of the beneficial owner(s)" labelText="Place of residence of the beneficial owner(s)" name="beneficial_place_of_residence"/>
                    </InputWrapper>
                </InputSet>

                <RadioSet>
                    <p className="text">
                        Is the representative or any beneficial owner a politically exposed person (PEP), 
                        family member of PEP or person known to be close associate of PEP
                    </p>
                    <FinalFormRadio name="PEP" options={['Yes', 'No']} values={[true, false]}/>
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
    },
    setOpenedTip(id) {
        dispatch(UIActions.setOpenedTip(id))
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
        cursor: pointer;
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
