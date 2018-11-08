import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import ClipboardJS from 'clipboard';
import EmailValidationSchema from './utils/EmailValidationSchema';

import { Formik, Form } from "formik";
import InputText from './components/InputText';
import InputLabel from './components/InputLabel';
import Button from './../common/Button';

import * as UserActions from './../../actions/UserActions';
import * as UIActions from './../../actions/UIActions';

import copyIcon from './../../../img/icon_copy.svg';


class AccountInfo extends React.Component {

    componentDidMount() {
        new ClipboardJS('.CopyBtn');
    }

    onSubmitHandler = () => {
        const value = document.getElementById('email').value;
        let data = new FormData();
        data.append('email', value);

        this.props.changeEmail(data);
    }

    render() {

        const {email, ethAccount, showSetAccountPopup} = this.props;

        return (
            <Wrapper className="Settings__accountInfo">
                <Title>Account information</Title>
                <Formik 
                    initialValues={{
                        email: '',
                        old_email: email
                    }} 
                    validationSchema={EmailValidationSchema(email)}
                    enableReinitialize={true} 
                    onSubmit={this.onSubmitHandler} 
                    render={({errors, touched}) => (
                        <React.Fragment>
                            <Form>
                                <InputSet>
                                    <InputWrapper>
                                        <InputLabel htmlFor="old_email">Email</InputLabel>
                                        <InputText errors={errors} touched={touched} disabled name="old_email" id="old_email"/>
                                    </InputWrapper>
                                    <InputWrapper>
                                        <InputLabel htmlFor="email">New Email</InputLabel>
                                        <InputText errors={errors} touched={touched} name='email'/>
                                    </InputWrapper>
                                    <InputWrapper></InputWrapper>
                                    <InputWrapper>
                                        <Button text="Change Email" submit={true}/>
                                    </InputWrapper>
                                </InputSet>
                            </Form>
                            <InputSet>
                                <InputWrapper fullWidth>
                                    <InputLabel>Ethereum wallet address</InputLabel>
                                    <StyledTextField className="field-ethAccount" id="EthAccount">
                                        {ethAccount || 'No address has been added!'}
                                        {ethAccount && <IconCopy className="CopyBtn" data-clipboard-target="#EthAccount" onClick={this.copyOnClickHandler}/>}
                                    </StyledTextField>
                                </InputWrapper>
                                {!ethAccount && 
                                    <React.Fragment>
                                        <InputWrapper></InputWrapper>
                                        <InputWrapper>
                                            <Button text="Add ETH account" clickHandler={showSetAccountPopup} />
                                        </InputWrapper>
                                    </React.Fragment>
                                }
                            </InputSet>
                            </React.Fragment>
                    )}

                />

            </Wrapper>
        )
    }
};


const mapStateToProps = ({user, UI}) => ({
    email: user.get('email'),
    ethAccount: user.get('eth_account')
});

const mapDispatchToProps = (dispatch) => ({
    changeEmail(data) {
        dispatch(UserActions.changeEmailRequest(data))
    },
    showSetAccountPopup() {
        dispatch(UIActions.showSetAccountPopup())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo)

const Wrapper = styled.div`
    flex: 1;
    height: auto;
    padding: 42px 55px 50px;
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
    &:only-child {
        margin-bottom: 0;
    }
    input, button {
        min-height: 45px;
    }
`;

const StyledTextField = styled.div`
    font-weight: 600;
    font-size: 16px;
    color: rgba(35,53,57,.3);
    padding-left: 20px;
    padding-right: 48px;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    background: #ffffff;
    border: 1px solid #EAEFF2;
    position: relative;
    word-break: break-all;
    min-height: 45px;
`;


const IconCopy = styled.span`
    display: block;
    position: absolute;
    top: 50%;
    right: 17px;
    transform: translateY(-50%);
    cursor: pointer;
    width: 16px;
    height: 20px;
    background: url(${copyIcon}) no-repeat center;
    background-size: contain;
`;
