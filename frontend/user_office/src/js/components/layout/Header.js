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

    showSetAccount = () => {
        const {showSetAccountPopup} = this.props;
        showSetAccountPopup();
    };

    onClickHamburgerHandler = () => {
        this.props.openMobileSidebar();
    }

    render() {
        const {
            email,
            accountDropdownShown,
            showSetAccountPopup,
            ethAccount,
            kycState,
            tokensAmount,
        } = this.props;

        let stepOnePassed = ethAccount ? true : false;
        let stepTwoPassed = stepOnePassed ? kycState !== 'DECLINED': false;
        let stepThreePassed = stepTwoPassed ? tokensAmount > 0 : false;

        let passedStepsNumber = [stepOnePassed, stepTwoPassed, stepThreePassed].reduce((acc, c) => acc + c);

        return (
            <React.Fragment>
                <HeaderBlock>
                    <NavWrapper>
                        <Logo to="/user_office">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                                <g fill="#3172FD" fillRule="nonzero">
                                    <path d="M20 8.889c2.689 0 4.889-2 4.889-4.445C24.889 2 22.689 0 20 0s-4.889 2-4.889 4.444c0 2.445 2.2 4.445 4.889 4.445z"/>
                                    <path d="M27.097.889c0 .255.716 1.828.716 4.052 0 1.51-.326 2.825-.977 3.945.724.456 1.577 1.37 2.08 1.84 2.41 2.4 3.614 5.52 3.614 9.119s-1.205 6.718-3.614 9.118c-2.41 2.399-5.302 3.599-8.916 3.599-3.614 0-6.506-1.2-8.916-3.6-2.41-2.399-3.614-5.518-3.614-9.117 0-3.6 1.205-6.719 3.614-9.118.482-.48 1.576-1.267 1.876-1.461-.977-1.73-1.465-3.261-1.465-4.595 0-1.333.322-2.594.965-3.782-2.41.96-4.75 2.4-6.677 4.319C1.928 9.287 0 14.086 0 19.845c0 5.518 1.928 10.317 5.783 14.396C9.64 38.081 14.458 40 20 40s10.361-1.92 14.217-5.759C38.072 30.402 40 25.603 40 19.845c0-5.52-1.928-10.318-5.783-14.157-1.956-1.814-4.535-3.757-7.12-4.8z"/>
                                </g>
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
                                    stepThreePassed={stepThreePassed}
                                    showSetAccount={this.showSetAccount}
                                    showSetAccountPopup={showSetAccountPopup}
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
    showSetAccountPopup() {
        dispatch(UIActions.showSetAccountPopup())
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
    width: 42px;
    height: 45px;
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
