import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import Button from './../components/Button';
import FieldPassword from './../components/FieldPassword';

import * as UserActions from './../actions/UserActions';
import * as UIActions from './../actions/UIActions';


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
                        <FieldPassword errortext={errortext.old_password} labelText="Old password" name="old_password"/>
                    </InputWrapper>
                    <InputWrapper></InputWrapper>
                    <InputWrapper>
                        <FieldPassword equal={passwordsEqual} errortext={errortext.new_password1} labelText="New password" name="new_password1"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FieldPassword errortext={errortext.new_password2} equal={passwordsEqual} labelText="Confirm password" name="new_password2"/>
                    </InputWrapper>
                </InputSet>
                <ButtonWrapper>
                    <Button text="Change password" submit={true}/>
                </ButtonWrapper>
            </Wrapper>
        )
    }
};


const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch) => ({
    changePassword(data) {
        dispatch(UserActions.changePasswordRequest(data))
    },
    closeOpenedTip() {
        dispatch(UIActions.setOpenedTip(null))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Password)


const Wrapper = styled.form`
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

const ButtonWrapper = styled.div`
    width: 100%;
    height: 40px;
    border-radius: 2px;
    border: 1px solid #d6dfe6;
    position: relative;
`;