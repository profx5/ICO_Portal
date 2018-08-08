import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import * as UIActions from '../actions/UIActions';

import HeaderNav from '../components/HeaderNav';
import Account from '../components/Account';
import {Link} from 'react-router-dom';

class Header extends React.Component {

    dropdownAccountClickHandler = () => {
        const {accountDropdownShown, showAccountDropdown, hideAccountDropdown} = this.props;
        if (!accountDropdownShown) {
            showAccountDropdown();
        } else hideAccountDropdown();
    }

    dropdownStepsClickHandler = () => {
        const {stepsDropdownShown, showStepsDropdown, hideStepsDropdown} = this.props;
        if (!stepsDropdownShown) {
            showStepsDropdown();
        } else hideStepsDropdown();
    }

    showSetAccount = () => {
        const {showSetAccountPopup} = this.props;
        showSetAccountPopup();
    };

    render() {
        const {
            email,
            showInvestForm,
            decimals,
            accountDropdownShown,
            stepsDropdownShown,
            showSetAccountPopup,
            ethAccount,
            kycState,
            tokensAmount,
            tokenAddress,
            crowdsaleAddress
        } = this.props;

        let floatTokensAmount = '1';
        for (let i = 0; i < decimals; i++) {
            floatTokensAmount += '0';
        }
        floatTokensAmount = parseInt(floatTokensAmount, 10);

        let stepOnePassed = ethAccount ? true : false;
        let stepTwoPassed = kycState !== 'DECLINED';
        let stepThreePassed = tokensAmount > 0;

        let stepsPassedNumber = stepOnePassed + stepTwoPassed + stepThreePassed;


        return (
            <HeaderBlock>
                <NavWrapper>
                    <VeraLogo to="/user_office">Vera</VeraLogo>
                    <HeaderNav/>
                </NavWrapper>
                <HeaderUser>
                    <Account
                        email={email}
                        tokensAmount={tokensAmount}
                        isDropdownAccountOpen={accountDropdownShown}
                        isDropdownStepsOpen={stepsDropdownShown}
                        dropdownAccountClickHandler={this.dropdownAccountClickHandler}
                        dropdownStepsClickHandler={this.dropdownStepsClickHandler}
                        stepOnePassed={stepOnePassed}
                        stepTwoPassed={stepTwoPassed}
                        stepThreePassed={stepThreePassed}
                        stepsPassed={stepsPassedNumber}
                        showSetAccountPopup={showSetAccountPopup}
                        showSetAccount={this.showSetAccount} 
                        tokenAddress={tokenAddress} 
                        crowdsaleAddress={crowdsaleAddress}
                    />
                </HeaderUser>
            </HeaderBlock>
        )
    }
}

const mapStateToProps = ({user, ICOInfo, KYC, Invest, UI}) => ({
    email: user.get('email'),
    decimals: ICOInfo.get('token_decimals'),
    KYCStatus: KYC.get('status'),
    userId: user.get('eth_account'),
    showInvestForm: Invest.get('showInvestForm'),
    accountDropdownShown: UI.get('accountDropdownShown'),
    stepsDropdownShown: UI.get('stepsDropdownShown'),
    ethAccount: user.get('eth_account'),
    kycState: KYC.get('state'),
    tokensAmount: user.get('tokens_amount'),
    tokenAddress: ICOInfo.get('token_address'),
    crowdsaleAddress: ICOInfo.get('crowdsale_address')
})

const mapDispatchToProps = (dispatch) => ({
    showAccountDropdown() {
        dispatch(UIActions.showAccountDropdown())
    },
    hideAccountDropdown() {
        dispatch(UIActions.hideAccountDropdown())
    },
    showStepsDropdown() {
        dispatch(UIActions.showStepsDropdown())
    },
    hideStepsDropdown() {
        dispatch(UIActions.hideStepsDropdown())
    },
    showSetAccountPopup() {
        dispatch(UIActions.showSetAccountPopup())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)

const VeraLogo = styled(Link)`
    width: 98px;
    height: 45px;
    font-family: Gilroy;
    font-size: 45px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 1px;
    color: #000000;
    margin-top: -15px;
`;

const HeaderBlock = styled.header`
    height: 90px;
    background: white;
    padding-left: 55px;
    padding-right: 55px;
    flex-basis: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e8f2;
    position: relative;
    z-index: 2;
`;

const NavWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

const HeaderUser = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
`;
