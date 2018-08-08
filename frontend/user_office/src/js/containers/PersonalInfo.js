import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import ClipboardJS from 'clipboard';

import * as KYCActions from './../actions/KYCActions';
import * as UserActions from './../actions/UserActions';
import * as UIActions from './../actions/UIActions';

import FieldText from './../components/FieldText';
import FieldTextSpan from './../components/FieldTextSpan';
import Button from './../components/Button';

import copyIcon from './../../img/icon_copy.svg';
import iconClose from './../../img/icon_close.svg';


class PersonalInfo extends React.Component {

    constructor() {
        super();
        this.state = {
            errortext: {
                email: ''
            }
        };
    }

    componentDidMount() {
        new ClipboardJS('.CopyBtn');
    }

    changeEmail = (event) => {
        event.preventDefault();

        let isFormValid = true;

        const emailField = document.querySelector('[name="email"]');

        if (emailField.value.length === 0) {
            this.setState({
                errortext: {
                    email: 'The field is empty'
                }
            })
            isFormValid = false;
        } else {
            this.setState({
                errortext: {
                    email: ''
                }
            });
        }

        if (!isFormValid) return;

        const data = new FormData(event.target);
        this.props.changeEmailRequest(data);
    }

    render() {

        const {email, ethAccount, showSetAccountPopup} = this.props;
        const {errortext} = this.state;

        return (
            <Wrapper className="Verification__personalData">
                <Title>Personal Data</Title>
                <form onSubmit={this.changeEmail}>
                    <InputSet>
                        <InputWrapper>
                            <FieldText disabled value={email} labelText="Email"/>
                        </InputWrapper>
                        <InputWrapper>
                            <FieldText errortext={errortext.email} labelText="New Email" type="email" name='email'/>
                        </InputWrapper>
                        <ButtonWrapper>
                            <Button text="Change Email" submit={true} />
                        </ButtonWrapper>
                    </InputSet>
                </form>
                <InputSet>
                    <InputWrapper fullWidth>
                        <FieldTextSpan
                            id="EthAccount"
                            children={<IconCopy className="CopyBtn" data-clipboard-target="#EthAccount" onClick={this.copyOnClickHandler}/>}
                            value={ethAccount}
                            labelText="Ethereum wallet address"
                            disabled
                        />
                    </InputWrapper>
                    {!ethAccount && 
                        <ButtonWrapper>
                            <Button text="Add ETH account" clickHandler={showSetAccountPopup} />
                        </ButtonWrapper>
                    }
                </InputSet>

            </Wrapper>
        )
    }
};


const mapStateToProps = ({user, UI}) => ({
    email: user.get('email'),
    ethAccount: user.get('eth_account')
});

const mapDispatchToProps = (dispatch) => ({
    updateKycData() {
        dispatch(KYCActions.submitKYCRequest())
    },
    changeEmailRequest(data) {
        dispatch(UserActions.changeEmailRequest(data))
    },
    showSetAccountPopup() {
        dispatch(UIActions.showSetAccountPopup())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo)


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

const InputSet = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    margin-bottom: 10px
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

const ModalWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    background: rgba(1, 7, 29, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    
`;

const Modal = styled.div`
    position: absolute;
    top: 10%;
    left: 20%;
    width: 60%;
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 9px 21px 0 rgba(173, 182, 217, 0.3);
    z-index: 100;
    max-height: 64vh;
    overflow: hidden;
    font-weight: normal;
`;

const ModalHeader = styled.div`
    padding: 18px;
    text-align: center;
    line-height: 1.45;
    height: 72px;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-align: center;
    color: #000000;
    background-color: #f5f6fa
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    & img {
        position: absolute;
        top: 26px;
        right: 26px;
        cursor: pointer;
    }
`;

const ModalContent = styled.div`
    padding: 32px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    text-align: justify;
    font-size: 16px;
    line-height: 1.44;
    letter-spacing: 0.2px;
    color: #0a0a0a;
    overflow-y: auto;
    max-height: 52.5vh;
    & span {
        font-weight: bold;
    }
    & p {
        margin-bottom: 10px;
    }
`;