import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import * as UIActions from '../actions/UIActions';

import HeaderNav from '../components/HeaderNav';
import AccountInfo from '../components/AccountInfo';

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

    render() {
        const {
            email,
            tokensAmount,
            showInvestForm,
            decimals,
            accountDropdownShown,
            stepsDropdownShown
        } = this.props;

        let floatTokensAmount = '1';
        for (let i = 0; i < decimals; i++) {
            floatTokensAmount += '0';
        }
        floatTokensAmount = parseInt(floatTokensAmount, 10);

        return (
            <HeaderBlock>
                <NavWrapper>
                    <VeraLogo>Vera</VeraLogo>
                    <HeaderNav/>
                </NavWrapper>
                <HeaderUser>
                    <AccountInfo
                        email={email}
                        isDropdownAccountOpen={accountDropdownShown}
                        isDropdownStepsOpen={stepsDropdownShown}
                        dropdownAccountClickHandler={this.dropdownAccountClickHandler}
                        dropdownStepsClickHandler={this.dropdownStepsClickHandler}
                    />
                </HeaderUser>
            </HeaderBlock>
        )
    }
}

const mapStateToProps = ({user, ICOInfo, KYC, Invest, UI}) => ({
    email: user.get('email'),
    tokensAmount: user.get('tokens_amount'),
    decimals: ICOInfo.get('token_decimals'),
    KYCStatus: KYC.get('status'),
    userId: user.get('eth_account'),
    showInvestForm: Invest.get('showInvestForm'),
    accountDropdownShown: UI.get('accountDropdownShown'),
    stepsDropdownShown: UI.get('stepsDropdownShown')
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)

const VeraLogo = styled.div`
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
