import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {media} from './../../utils/media';

import Button from './../common/Button';

import * as UserActions from './../../actions/UserActions';
import * as UIActions from './../../actions/UIActions';


class SetAccount extends Component {
    onSubmitHandler = event => {
        event.preventDefault();
        let data = this.input.value;
        this.props.setAccountRequest(data);
    }

    getMetaMaskAccount = () => {
        if (typeof window.web3 !== 'undefined') {
            return window.web3.eth.defaultAccount;
        }
    }

    render() {
        const {hidePopup, set_eth_error, eth_account} = this.props;
        let metamaskEthAccount = this.getMetaMaskAccount();
        return (
            <PopupWrapper>
                <Popup>
                    <BtnClose onClick={hidePopup}>Close</BtnClose>
                    <Label htmlFor="eth_account">Add your ETH account</Label>
                    <form>
                        <TextField value={metamaskEthAccount} type="text" id="eth_account" innerRef={input => this.input = input}/>
                        {set_eth_error &&
                            <ErrorSpan>{set_eth_error}</ErrorSpan>
                        }
                        {eth_account &&
                            <AllRightWrapper>
                                ETH account has been added!
                            </AllRightWrapper>
                        }
                        {!eth_account &&
                            <ButtonWrapper>
                                <Button clickHandler={this.onSubmitHandler} type="submit" text="Send"/>
                            </ButtonWrapper>
                        }

                    </form>

                    <Desc><span>IMPORTANT NOTICE:</span><br/>
                        ADD ONLY YOUR OWN ETH ACCOUNT YOU HAVE A SECRET KEY FROM! DO NOT ADD ACCOUNTS FROM
                        EXCHANGES, THIS WILL CAUSE YOU TO LOOSE ALL THE TOKENS!
                        ALSO YOUR WALLET SHOULD SUPPORT ERC 20 TOKENS!
                    </Desc>
                </Popup>
            </PopupWrapper>
        )
    }
}


const mapStateToProps = ({user, KYC, UI}) => ({
    set_eth_error: user.get('set_eth_error'),
    eth_account: user.get('eth_account')
})

const mapDispatchToProps = (dispatch) => ({
    setAccountRequest(address) {
        dispatch(UserActions.setAccountRequest(address));
    },
    hidePopup() {
        dispatch(UIActions.hideSetAccountPopup())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SetAccount);

const PopupWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(49,114,253,.3);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
`;

const Popup = styled.div`
    width: 485px;
    border-radius: 3px;
    background: white;
    position: relative;
    padding: 50px 30px;
    overflow-y: auto;
    ${media.xs} {
        width: calc(100vw - 32px);
        max-height: calc(100% - 96px);
        padding: 40px 16px 25px;
    }
`;

const BtnClose = styled.span`
    display: block;
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
    ${media.xs} {
        font-size: 14px;
    }
`;

const Label = styled.label`
    display: block;
    font-size: 18px;
    margin-bottom: 20px;
    ${media.xs} {
        font-size: 14px;
        margin-bottom: 10px;
    }
`;

const TextField = styled.input`
    display: block;
    width: 100%;
    height: 45px;
    border: 1px solid #d6dfe6;
    margin-bottom: 15px;
    padding: 0 10px;
`;

const Desc = styled.p`
    text-align: justify;
    font-weight: normal;
    font-size: 14px;
    letter-spacing: 0.5px;
    color: red;
    padding-top: 20px;
    ${media.xs} {
        font-size: 12px;
    }
    & span {
        font-weight: bold;
        font-size: 16px;
        display: block;
        ${media.xs} {
            font-size: 14px;
        }
    }
`;

const AllRightWrapper = styled.div`
    width: 100%;
    height: 40px;
    border-radius: 2px;
    border: 1px solid white;
    background: white;
    position: relative;
    line-height: 40px;
    text-align: center;
    color: #11cd56;
`;

const ErrorSpan = styled.span`
    color: red;
    font-size: 0.7em;
    margin-bottom: 15px;
    margin-top: 5px;
    display: block;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    height: 40px;
    border-radius: 2px;
    border: 1px solid #d6dfe6;
    position: relative;
`;
