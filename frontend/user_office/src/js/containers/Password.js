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



class Password extends React.Component {

    render() {

        return (
            <Wrapper className="Verification__password">
                <Title>Password</Title>
                <InputSet>
                    <InputWrapper>
                        <FieldText labelText="Old password" name="firstname"/>
                    </InputWrapper>
                    <InputWrapper></InputWrapper>
                    <InputWrapper>
                        <FieldText labelText="New password" name="firstname"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FieldText labelText="Confirm password" name="firstname"/>
                    </InputWrapper>
                </InputSet>
            </Wrapper>
        )
    }
};


const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Password)


const Wrapper = styled.div`
    flex: 1;
    height: auto;
    padding: 42px 30px 42px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    margin-bottom: 30px;
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

const InputSet = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
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