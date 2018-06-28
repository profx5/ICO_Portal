import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import * as UIActions from '../actions/UIActions';

import Balance from '../components/Balance';
import AccountInfo from '../components/AccountInfo';

class Header extends React.Component {

    dropdownClickHandler = () => {
        const {accountDropdownShown, showAccountDropdown, hideAccountDropdown} = this.props;
        if (!accountDropdownShown) {
            showAccountDropdown();
        } else hideAccountDropdown();
    }

    render () {
        const {
            email,
            tokensAmount,
            showInvestForm,
            decimals,
            accountDropdownShown
        } = this.props;

        let floatTokensAmount = '1';
        for (let i = 0; i < decimals; i++) {
            floatTokensAmount += '0';
        }
        floatTokensAmount = parseInt(floatTokensAmount, 10);

        return (
            <HeaderBlock>
                <HeaderUserBlock>
                    <Balance
                        currentAmount={tokensAmount / floatTokensAmount}
                        investClick={showInvestForm}
                    />
                    <AccountInfo
                        email={email}
                        isDropdownOpen={accountDropdownShown}
                        dropdownClickHandler={this.dropdownClickHandler}
                    />
                </HeaderUserBlock>
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
    accountDropdownShown: UI.get('accountDropdownShown')
})

const mapDispatchToProps = (dispatch) => ({
    showAccountDropdown() {
        dispatch(UIActions.showAccountDropdown())
    },
    hideAccountDropdown() {
        dispatch(UIActions.hideAccountDropdown())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)


const HeaderBlock = styled.header`
    height: 100px;
    background: #FAFBFC;
    padding-left: 55px;
    padding-right: 55px;
    flex-basis: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    border-bottom: 1px solid #e7e9ea;
    position: relative;
    z-index: 2;
`;

const HeaderUserBlock = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
`;