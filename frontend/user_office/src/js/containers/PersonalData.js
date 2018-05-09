import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';

import Utils from './../utils/index';

import Photo from './../components/Photo';
import FileUpload from './../components/FileUpload';
import PhotoUpload from './../components/PhotoUpload';
import InputText from './../components/InputText';
import Button from './../components/Button';



class PersonalData extends React.Component {

    render() {

        return (
            <Wrapper>
                <Title>Personal Data</Title>
                <PhotoFileUpload>
                    <PhotoWrapper>
                        <DescHead>Your photo</DescHead>
                        <Photo/>
                    </PhotoWrapper>
                    <UploadWrapper>
                        <DescHead>Choose uploading way</DescHead>
                        <PhotoUpload/>
                        <FileUpload/>
                    </UploadWrapper>
                </PhotoFileUpload>
                <InputSet>
                    <InputWrapper>
                        <InputText labelText="First Name"/>
                    </InputWrapper>
                    <InputWrapper>
                        <InputText labelText="Last Name"/>
                    </InputWrapper>
                    <InputWrapper>
                        <InputText labelText="Middle Name"/>
                    </InputWrapper>
                    <InputWrapper>
                        <InputText labelText="Gender"/>
                    </InputWrapper>
                    <InputWrapper>
                        <InputText labelText="Date of birth"/>
                    </InputWrapper>
            </InputSet>
            </Wrapper>
        )
    }
};


const mapStateToProps = ({ICOInfo, Timer}) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalData)


const Wrapper = styled.div`
    flex: 1;
    height: auto;
    margin-top: 42px;
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
    margin-bottom: 40px;
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
    padding-top: 90px;
`;

const UploadWrapper = styled.div`
    width: 285px;
    display: inline-flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding-top: 90px;
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