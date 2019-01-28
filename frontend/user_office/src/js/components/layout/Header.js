import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Link, withRouter} from 'react-router-dom';
import {media} from 'js/utils/media';

import HeaderNav from 'js/components/layout/stateless/HeaderNav';
import Balance from 'js/components/layout/stateless/Balance';
import Steps from 'js/components/layout/stateless/Steps';
import Dropdown from 'js/components/layout/stateless/Dropdown';

import * as UIActions from 'js/actions/UIActions';


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

    onClickHamburgerHandler = () => {
        this.props.openMobileSidebar();
    }

    render() {
        const {
            email,
            accountDropdownShown,
            ethAccount,
            kycState,
            tokensAmount,
        } = this.props;

        let stepOnePassed = (kycState === 'APPROVED' || kycState === 'WAITING' || kycState === 'DEPLOYING') && ethAccount ? true : false;
        let stepTwoPassed = stepOnePassed ? tokensAmount > 0 : false;

        let passedStepsNumber = [stepOnePassed, stepTwoPassed].reduce((acc, c) => acc + c);

        return (
            <React.Fragment>
                <HeaderBlock>
                    <NavWrapper>
                        <Logo to="/user_office">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 34" width="26">
                                <path fill="#3172FD" fill-rule="evenodd" d="M25.7943.4v7.392h-8.64V34h-7.68V7.792h-8.64V.4z"/>
                            </svg>
                        </Logo>
                        <Hamburger onClick={this.onClickHamburgerHandler}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M501.333 96H10.667C4.779 96 0 100.779 0 106.667s4.779 10.667 10.667 10.667h490.667c5.888 0 10.667-4.779 10.667-10.667S507.221 96 501.333 96zM501.333 245.333H10.667C4.779 245.333 0 250.112 0 256s4.779 10.667 10.667 10.667h490.667c5.888 0 10.667-4.779 10.667-10.667s-4.78-10.667-10.668-10.667zM501.333 394.667H10.667C4.779 394.667 0 399.445 0 405.333 0 411.221 4.779 416 10.667 416h490.667c5.888 0 10.667-4.779 10.667-10.667-.001-5.888-4.78-10.666-10.668-10.666z"/>
                            </svg>
                        </Hamburger>
                        <HeaderNav className="hidden-xs"/>
                    </NavWrapper>
    
                    <HeaderUser>
                        <Balance amount={tokensAmount}/>
                        <AccountInfo>
                            <Steps onClickHandler={this.dropdownAccountClickHandler} stepsPassed={passedStepsNumber}/>
                            {accountDropdownShown &&
                                <Dropdown email={email}
                                    stepOnePassed={stepOnePassed}
                                    stepTwoPassed={stepTwoPassed}
                                    dropdownAccountClickHandler={this.dropdownAccountClickHandler}
                                    stepsPassed={passedStepsNumber}/>
                            }
                        </AccountInfo>
                    </HeaderUser>
                </HeaderBlock>
                <HeaderNav className="hidden-smPlus"/>
            </React.Fragment>
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
    crowdsaleAddress: ICOInfo.get('crowdsale_address'),
    mobileSidebarOpened: UI.get('mobileSidebarOpened')
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
    openMobileSidebar() {
        dispatch(UIActions.openMobileSidebar())
    },
    closeMobileSidebar() {
        dispatch(UIActions.closeMobileSidebar())
    },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))

const Logo = styled(Link)`
    width: 36px;
    height: 45px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    ${media.xs} {
        display: none;
    }
`;

const Hamburger = styled.div`
    height: 35px;
    ${media.smPlus} {
        display: none;
    }
    svg {
        height: 100%;
        width: auto;
    }
`;

const HeaderBlock = styled.header`
    height: 90px;
    background: white;
    padding-left: 22px;
    padding-right: 55px;
    flex-basis: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e8f2;
    position: relative;
    z-index: 3;
    ${media.xs} {
        height: 64px;
        padding: 0 16px;
    }
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

const AccountInfo = styled.div`
    margin-left: 60px;
    position: relative;
    font-size: 15px;
    color: rgba(50,60,71,.6);
    ${media.xs} {
        margin-left: 0;
    }
    &:before {
        content: '';
        display: block;
        width: 1px;
        height: 69px;
        background: #3d57aa;
        opacity: .15;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -30px;
        ${media.xs} {
            height: 32px;
            width: 2px;
            left: 0;
            background: rgb(151, 151, 151);
        }
    }
`;
