import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import $ from 'jquery';

import FinalFormField from './../common/FinalFormField';
import FinalFormRadio from './../common/FinalFormRadio';
import FinalFormCheckbox from './../common/FinalFormCheckbox';

import * as KYCActions from './../../actions/KYCActions';
import * as UIActions from "./../../actions/UIActions";

import iconQuestion from './../../../img/icons/icon_faq.svg';


class PersonData extends React.Component {

    constructor() {
        super();
        this.state = {
          dateOfBirth: ''
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
        const {email, showModal} = this.props;

        return (
            <Wrapper className="Verification__personData">
                <Title>Personal Data</Title>
                <InputSet>
                    <input type="hidden" name='type' value='NATURAL'/>
                    <InputWrapper>
                        <FinalFormField placeholder="John" labelText="First Name" name="firstname" options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Fitzgerald" labelText="Middle Name" name="middlename" options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Kennedy" labelText="Last Name" name="lastname" options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Brookline, Massachusetts, United States" labelText="Place of birth" name="place_of_birth" options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="1917/05/29" 
                                        labelText="Date of birth" 
                                        name="birthdate"  
                                        options={{date: true, datePattern: ['Y', 'm', 'd'], delimiter: '-'}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="915344722819"
                                        labelText="Personal identification code" 
                                        name="personal_id"  
                                        options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="+15417543010" labelText="Phone number"
                                        options={{numericOnly: true, prefix: '+', noImmediatePrefix: true}} 
                                        name="phone_number"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="john@gmail.com" labelText="Email" value={email} type="email" name="email" options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="4150 Sydney Place Washington, DC 20521-4150" labelText="Place of residence" name="place_of_residence" options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Software developer" labelText="Profession or field of activity" name="profession" options={{delimiter: ''}}/>
                    </InputWrapper>
                </InputSet>

                <RadioSet className="RadioSet RadioSet-1">
                    <FinalFormCheckbox name="confirmInvestor" icon={iconQuestion}
                                       handler={showModal.bind(this, {
                                           modalHead: 'Beneficial owner',
                                           modalContent: `Beneficial owner means a natural person who, taking advantage of their influence,
                                           makes a transaction, act, action, operation or step or otherwise exercises control
                                           over a
                                           transaction, act, action, operation or step or over another person and in whose
                                           interests or favour or on whose account a transaction or act, action, operation or
                                           step is made.`
                                       })}
                                       options={['I confirm that the investor is a beneficial owner']}
                                       values={['Yes']}
                                       required/>
                </RadioSet>

                <RadioSet className="RadioSet RadioSet-2">
                    <p className="text">Are you a <span onClick={showModal.bind(this, {id: 1})}>politically exposed person</span> (PEP),
                        family member of PEP or person known to be close associate of PEP? <IconImg onClick={showModal.bind(this, {id: 1})} src={iconQuestion}/></p>
                    <FinalFormRadio name="is_pep" options={['Yes', 'No']} values={["True", "False"]}/>
                </RadioSet>
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
    },
    showModal(payload) {
        dispatch(UIActions.showModal(payload))
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
