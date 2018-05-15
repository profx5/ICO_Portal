import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import $ from 'jquery';

import * as KYCActions from './../actions/KYCActions';

import Utils from './../utils/index';

import Photo from './../components/Photo';
import FileUpload from './../components/FileUpload';
import PhotoUpload from './../components/PhotoUpload';
import FieldText from './../components/FieldText';
import FieldRadio from './../components/FieldRadio';
import Button from './../components/Button';



class PersonalData extends React.Component {

    uploadOnClickHandler = (event) => {
        $(event.currentTarget).find('input[type="file"]').click();
    }

    onUploadHandler = (event) => {
        let file = event.currentTarget.files[0];
        if (!file) return;
        this.props.updateKycData()
    }

    render() {

        return (
            <Wrapper className="Verification__personalData">
                <Title>Personal Data</Title>
                <PhotoFileUpload>
                    <PhotoWrapper>
                        <DescHead>Your photo</DescHead>
                        <Photo/>
                    </PhotoWrapper>
                    <UploadWrapper>
                        <DescHead>Choose uploading way</DescHead>
                        <PhotoUpload/>
                        <FileUpload name="selfie" onUploadHandler={this.onUploadHandler} onClickHandler={this.uploadOnClickHandler}/>
                    </UploadWrapper>
                </PhotoFileUpload>
                <InputSet>
                    <InputWrapper>
                        <FieldText labelText="First Name" name="firstname"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FieldText labelText="Last Name" name="surname"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FieldText labelText="Middle Name" name="midname"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FieldRadio labelText="Gender" options={['Male', 'Female']}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FieldText labelText="Date of birth" options={{date: true, datePattern: ['Y', 'm', 'd']}} name="birthdate"/>
                    </InputWrapper>
            </InputSet>
            </Wrapper>
        )
    }
};


const mapStateToProps = ({ICOInfo, Timer}) => ({

})

const mapDispatchToProps = (dispatch) => ({
    updateKycData() {
        dispatch(KYCActions.submitKYCRequest())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalData)


const Wrapper = styled.div`
    flex: 1;
    height: auto;
    padding: 42px 30px 42px;
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
`;


const PhotoFileUpload = styled.div`
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 70px;
`;

const PhotoWrapper = styled.div`
    flex-basis: 50%;
    display: inline-flex;
    flex-flow: row wrap;
    align-items: center;
    position: relative;
    padding-top: 60px;
`;

const UploadWrapper = styled.div`
    width: 285px;
    display: inline-flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding-top: 60px;
`;


const InputSet = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    border-top: 1px solid rgba(151,151,151,0.25);
    padding-top: 55px;
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