import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import PasswordValidationSchema from './utils/PasswordValidationSchema';
import {media} from './../../utils/media';

import { Formik, Form } from "formik";
import InputLabel from './components/InputLabel';
import InputText from './components/InputText';
import Button from './../common/Button';

import * as UserActions from './../../actions/UserActions';


class Password extends React.Component {

    onSubmitHandler = () => {
        let data = new FormData();
        const values = [{
            name: 'old_password',
            value: document.getElementById('old_password').value
        }, {
            name: 'new_password1',
            value: document.getElementById('new_password1').value
        }, {
            name: 'new_password2',
            value: document.getElementById('new_password2').value
        }];

        for(let {name, value} of values) {
            data.append(name, value);
        }

        this.props.changePassword(data);
    }

    render() {

        return (
            <Formik
            initialValues={{
                old_password: '',
                new_password1: '',
                new_password2: ''
            }} 
            validationSchema={PasswordValidationSchema} 
            enableReinitialize={true}
            onSubmit={this.onSubmitHandler} 
            render={({errors, touched}) => (
                <Wrapper className="Settings__password">
                    <Title>Password</Title>
                    <InputSet>
                        <InputWrapper>
                            <InputLabel htmlFor="old_password">Old password</InputLabel>
                            <InputText errors={errors} touched={touched} type="password" name="old_password"/>
                        </InputWrapper>
                        <InputWrapper>
                            <InputLabel htmlFor="old_password1">New password</InputLabel>
                            <InputText errors={errors} touched={touched} type="password" name="new_password1"/>
                        </InputWrapper>
                        <InputWrapper>
                            <InputLabel htmlFor="old_password2">Confirm password</InputLabel>
                            <InputText errors={errors} touched={touched} type="password" name="new_password2"/>
                        </InputWrapper>
                        <InputWrapper>
                            <InputLabel>&nbsp;</InputLabel>
                            <Button text="Change password" submit={true}/>
                        </InputWrapper>
                    </InputSet>
                </Wrapper>
            )}/>
        )
    }
};


const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch) => ({
    changePassword(data) {
        dispatch(UserActions.changePasswordRequest(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Password)


const Wrapper = styled(Form)`
    flex: 1;
    height: auto;
    padding: 42px 55px 70px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    ${media.xs} {
        padding: 20px 16px;
    }
`;

const Title = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: #323c47;
    letter-spacing: 0.1px;
    margin-bottom: 45px;
    ${media.xs} {
        font-size: 16px;
        margin-bottom: 35px;
    }
`;

const InputSet = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
`;

const InputWrapper = styled.div`
    flex-basis: ${props => props.fullWidth ? '100%' : '48%'};
    margin-bottom: 40px;
    position: relative;
    ${media.xs} {
        flex-basis: 100%;
        margin-bottom: 16px;
    }
    &:nth-last-of-type(1), &:nth-last-of-type(2) {
        margin-bottom: 0;
    }
    &:nth-last-of-type(2) {
        ${media.xs} {
            margin-bottom: 16px;
        }
    }
    &:last-of-type {
        label {
            ${media.xs} {
                display: none;
            }
        }
    }
    input, button {
        min-height: 45px;
    }
`;
