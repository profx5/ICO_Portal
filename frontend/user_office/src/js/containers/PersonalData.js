import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import $ from 'jquery';
import moment from 'moment';

import iconQuestion from './../../img/icons/icon_faq.svg';
import iconCheck from './../../img/icons/icon_check.svg';

import * as KYCActions from './../actions/KYCActions';
import * as UIActions from './../actions/UIActions';

import FinalFormField from './../components/FinalFormField';
import FinalFormCheckbox from './../components/FinalFormCheckbox';
import FinalFormRadio from './../components/FinalFormRadio';

class PersonData extends React.Component {

    constructor() {
        super();
        this.state = {
          dateOfBirth: moment()
        };
    }

    updateDate = (date) => {
        this.setState({
            dateOfBirth: date
        })
    }

    uploadOnClickHandler = (event) => {
        $(event.currentTarget).find('input[type="file"]').click();
    };

    setOpenedTip = (id, e) => {
        const {setOpenedTip} = this.props;
        setOpenedTip(id);
    };

    render() {

        const {uploadedUserPhoto, uploadPhoto, removePhoto, type, email} = this.props;

        return (
            <Wrapper className="Verification__personData">
                <Title>Personal Data</Title>
                <InputSet>
                    <input type="hidden" name='type' value='NATURAL'/>
                    <InputWrapper>
                        <FinalFormField placeholder="Your name" labelText="First Name" name="firstname" required options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your middle name" labelText="Middle Name" name="middlename" required options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your last name" labelText="Last Name" name="lastname" required options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your place of birth" labelText="Place of birth" name="place_of_birth" required options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Year - month - day" 
                                        labelText="Date of birth" 
                                        initialValue={this.state.dateOfBirth}
                                        onChangeHandler={this.updateDate} 
                                        name="birthdate" 
                                        required 
                                        type="date"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your personal identification code"
                                        labelText="Personal identification code" 
                                        name="personal_id" 
                                        required 
                                        options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="+7(999)999-99-99" labelText="Phone number"
                                        options={{numericOnly: true, prefix: '+', noImmediatePrefix: true}} 
                                        name="phone_number" 
                                        required/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your email" labelText="Email" value={email} type="email" name="email" required options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Address" labelText="Place of residence" name="place_of_residence" required options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your profession" labelText="Profession or field of activity" name="profession" required options={{delimiter: ''}}/>
                    </InputWrapper>
                </InputSet>

                <RadioSet className="RadioSet RadioSet-1">
                    <FinalFormCheckbox name="confirmInvestor" icon={iconQuestion}
                                       handler={this.setOpenedTip.bind(this, 1)}
                                       options={['I confirm that the investor is a beneficial owner']}
                                       values={['Yes']}
                                       required/>
                </RadioSet>

                <RadioSet className="RadioSet RadioSet-2">
                    <p className="text">Are you a <span onClick={this.setOpenedTip.bind(this, 3)}>politically exposed person</span> (PEP),
                        family member of PEP or person known to be close associate of PEP? <IconImg onClick={this.setOpenedTip.bind(this, 3)} src={iconQuestion}/></p>
                    <FinalFormRadio name="is_pep" options={['Yes', 'No']} values={["True", "False"]}/>
                </RadioSet>
            </Wrapper>
        )
    }
};

const mapStateToProps = ({ICOInfo, Timer, KYC}) => ({
    userPhoto: KYC.get('user_photo'),
    documentPhoto: KYC.get('document_photo'),
    uploadedUserPhoto: KYC.get('uploaded_user_photo'),
    fistname: KYC.get('fistname'),
    type: KYC.get('type'),
    email: user.get('email')
});


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
    position: relative;
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
            cursor: pointer;
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

const IconImg = styled.img`
    width: 16px;
    height: 16px;
    margin-left: 4px;
    position: relative;
    top: 3px;
    cursor: pointer;
`;
