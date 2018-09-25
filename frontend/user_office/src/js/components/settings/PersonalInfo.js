import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import ClipboardJS from 'clipboard';

import FieldText from './../common/FieldText';
import FieldTextSpan from './../common/FieldTextSpan';
import Button from './../common/Button';

import * as UserActions from './../../actions/UserActions';
import * as UIActions from './../../actions/UIActions';

import copyIcon from './../../../img/icon_copy.svg';


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
    margin-bottom: 10px;
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
