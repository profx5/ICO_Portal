import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import InputLabel from './components/InputLabel';
import InputText from './components/InputText';
import Button from './../common/Button';

import * as UserActions from './../../actions/UserActions';


class Password extends React.Component {

    constructor() {
        super();
        this.state = {
            errortext: {
                old_password: '',
                new_password1: '',
                new_password2: ''
            },
            passwordsEqual: false
        };
    }

    changePasswordHandler = (event) => {
        event.preventDefault();

        let isFormValid = true;

        const passwordFields = [
            document.querySelector('[name="new_password2"]'),
            document.querySelector('[name="new_password1"]'),
            document.querySelector('[name="old_password"]')
        ];

        if (passwordFields[0].value === passwordFields[1].value) {
            this.setState({
                errortext: {
                    new_password2: ''
                }
            })
        } else {
            this.setState({
                errortext: {
                    new_password2: 'Passwords do not match!'
                }
            });
            isFormValid = false;
            return false;
        }

        passwordFields.forEach(item => {
            if (item.value.length === 0) {
                this.setState({
                    errortext: {
                        [item.name]: 'The field is empty'
                    }
                });
                isFormValid = false;
            }
        })

        if (!isFormValid) return;

        const data = new FormData(event.target);
        this.props.changePassword(data);
    }

    render() {
        const {passwordsEqual, errortext} = this.state;

        return (
            <Wrapper className="Verification__password" onSubmit={this.changePasswordHandler}>
                <Title>Password</Title>
                <InputSet>
                    <InputWrapper>
                        <InputLabel>Old password</InputLabel>
                        <InputText type="password" errortext={errortext.old_password} name="old_password"/>
                    </InputWrapper>
                    <InputWrapper>
                        <InputLabel>New password</InputLabel>
                        <InputText type="password" equal={passwordsEqual} errortext={errortext.new_password1} name="new_password1"/>
                    </InputWrapper>
                    <InputWrapper>
                        <InputLabel>Confirm password</InputLabel>
                        <InputText type="password" errortext={errortext.new_password2} equal={passwordsEqual} name="new_password2"/>
                    </InputWrapper>
                    <InputWrapper>
                        <InputLabel>&nbsp;</InputLabel>
                        <Button text="Change password" submit={true}/>
                    </InputWrapper>
                </InputSet>
            </Wrapper>
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


const Wrapper = styled.form`
    flex: 1;
    height: auto;
    padding: 42px 30px 70px;
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
    &:nth-last-of-type(1), &:nth-last-of-type(2) {
        margin-bottom: 0;
    }
    input, button {
        min-height: 45px;
    }
`;
