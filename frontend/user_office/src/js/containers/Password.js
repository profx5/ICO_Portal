import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import Button from './../components/Button';
import FieldPassword from './../components/FieldPassword';
import * as UserActions from './../actions/UserActions';


class Password extends React.Component {
    changePasswordHandler = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        this.props.changePassword(data);
    }

    render() {
        return (
            <Wrapper className="Verification__password" onSubmit={this.changePasswordHandler}>
                <Title>Password</Title>
                <InputSet>
                    <InputWrapper>
                        <FieldPassword labelText="Old password" name="old_password"/>
                    </InputWrapper>
                    <InputWrapper></InputWrapper>
                    <InputWrapper>
                        <FieldPassword labelText="New password" name="new_password1"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FieldPassword labelText="Confirm password" name="new_password2"/>
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
    height: 70px;
    border-radius: 2px;
    border: 1px solid #d6dfe6;
    position: relative;
`;