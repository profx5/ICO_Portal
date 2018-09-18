import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import $ from 'jquery';

import FinalFormField from './../common/FinalFormField';
import FinalFormRadio from './../common/FinalFormRadio';
import Button from './../common/Button';

import * as KYCActions from './../../actions/KYCActions';
import * as UIActions from "./../../actions/UIActions";

const File = ({ input: {value: omitValue, ...inputProps }, meta: omitMeta, ...props }) => (
  <input type='file' {...inputProps} {...props} />
);


class LegalPersonData extends React.Component {

    constructor() {
        super()

        this.state = {
          dateOfRegistration: '',
          dateOfBirth: ''
        };

        let onRemoveFileHandler = this.onRemoveFileHandler;

        $(document).ready(function() {
            $('.Verification__personData').click(function(event) {
                if ($(event.target).hasClass('file-clear')) {
                    let parent = $(event.target).closest('.block-file');
                    onRemoveFileHandler(event.target, parent)
                }
            })
        })

    }

    updateDateOfRegistration = (date) => {
        this.setState({
            dateOfRegistration: date
        })
    }

    updateDateOfBirth = (date) => {
        this.setState({
            dateOfBirth: date
        })
    }

    onRemoveFileHandler = (target, parent) => {
        let id = $(target).data
        $(target).closest('.block-file').find('input[type="file"]').val('');

        $(target).closest('.visual-file-block').remove();

        let siblings = $(parent).find('.visual-file-block');

        if (siblings.length === 0) {
            $(parent).closest('.block-file').find('.block-file-result').removeClass('block-file-result-filled');
        }

    }

    setOpenedTip = (id) => {
        const { setOpenedTip } = this.props;
        setOpenedTip(id);
    }

    render() {

        const {uploadOnClickHandler} = this.props;

        return (
            <Wrapper className="Verification__personData">
                <Title>Legal Person Data</Title>
                <InputSet>
                    <input type="hidden" name='type' value='LEGAL'/>
                    <InputWrapper>
                        <FinalFormField placeholder="Apple" labelText="Business name" name="business_name" options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="3928818" labelText="Registration number" name="registration_number" options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="2011/03/08" 
                                        labelText="Date of registration" 
                                        name="registration_date" 
                                        options={{date: true, datePattern: ['Y', 'm', 'd'], delimiter: '-'}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="+15417543010"  labelText="Phone number" options={{numericOnly: true, prefix:'+', noImmediatePrefix: true}} name="phone_number"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Steve" labelText="First name of director" name="director_firstname" options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Jobs" labelText="Last Name of director" name="director_lastname" options={{delimiter: ''}}/>
                    </InputWrapper>

                    <div className="block-file">
                        <p className="text">Basis for representation</p>
                        <ButtonWrapper>
                            <input type="file" name='basis_doc' onChange={this.uploadFileHandler} hidden/>
                            <Button clickHandler={uploadOnClickHandler} text="Attach file"/>
                        </ButtonWrapper>
                        <div className="block-file-result">
                            <p className="files-head">Uploaded:</p>
                        </div>
                    </div>


                    <InputWrapper>

                        <FinalFormField placeholder="apple@gmail.com" labelText="Email" name="email" options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="4150 Sydney Place Washington, DC 20521-4150" labelText="Address" name="address" options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Production of electronics" labelText="Field of activity" name="field_of_activity" options={{delimiter: ''}}/>
                    </InputWrapper>
                </InputSet>

                <InputSet>
                    <SubTitle><span onClick={this.setOpenedTip.bind(this, 2)}>Beneficial owner</span> data</SubTitle>
                    <InputWrapper>
                        <FinalFormField placeholder="John" labelText="Name" name="beneficial_fullname" options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="915344722819" labelText="Personal identification code" name="beneficial_personal_id" options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Brookline, Massachusetts, United States" labelText="Place of birth" name="beneficial_place_of_birth" options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="1917/05/29" 
                                        labelText="Date of birth" 
                                        name="beneficial_birthdate" 
                                        options={{date: true, datePattern: ['Y', 'm', 'd'], delimiter: '-'}}/>
                    </InputWrapper>
                    <InputWrapper fullWidth>
                        <FinalFormField placeholder="4150 Sydney Place Washington, DC 20521-4150" labelText="Place of residence of the beneficial owner(s)" name="beneficial_place_of_residence" options={{delimiter: ''}}/>
                    </InputWrapper>
                </InputSet>

                <RadioSet>
                    <p className="text">
                        Is the representative or any beneficial owner a politically exposed person (PEP), 
                        family member of PEP or person known to be close associate of PEP
                    </p>
                    <FinalFormRadio name="is_pep" options={['Yes', 'No']} values={["True", "False"]}/>
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
        z-index: 0;
    }
    .block-file-result {
        display: none;
    }
    .block-file-result-filled {
        margin-bottom: 35px;
        border-bottom: solid 1px rgba(151, 151, 151,.25);
        display: block;
        overflow: auto;
        .files-head {
            margin-bottom: 13px;
        }
        .visual-file-block {
            display: block; 
            float: left; 
            clear: left; 
            font-size: 16px;
            height: 36px;
            line-height: 36px;
            min-width: 280px;
            background: #f5f5f5;
            padding: 0 40px 0 13px;
            margin-bottom: 5px;
            position: relative
            &:last-of-type {
                margin-bottom: 40px;
            }
            .file-name {
                color: #5c8df5;
                font-weight: 600;
                letter-spacing: 0.5px;
            }
            .file-size {
                color: #000000;
                font-weight: 400; 
            }
            .file-clear {
                position: absolute;
                top: 50%;
                right: 13px;
                transform: translateY(-50%);
                cursor: pointer;
                padding: 0 5px;
                svg {
                    pointer-events: none;
                }
            }
        }
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
