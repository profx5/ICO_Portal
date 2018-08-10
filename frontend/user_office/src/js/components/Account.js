import React from 'react';
import styled from 'styled-components';

import userPlaceholder from './../../img/user.svg';
import arrowImg from './../../img/arrow-down.svg';
import exclaimIcon from './../../img/icons/icon_exclaim.svg';
import checkIcon from './../../img/check_mini_icon.svg';
import walletIcon from './../../img/icons/icon_wallet.svg';
import {Link} from 'react-router-dom';
import onClickOutside from 'react-onclickoutside'

class Account extends React.Component {

    handleClickOutside = evt => {
        const {dropdownAccountClickHandler, isDropdownAccountOpen} = this.props;
        if (isDropdownAccountOpen) {
            dropdownAccountClickHandler();
        }
    };

    render = () => {
        const {
            email, tokensAmount,
            isDropdownAccountOpen, isDropdownStepsOpen,
            dropdownAccountClickHandler, dropdownStepsClickHandler,
            stepOnePassed, stepTwoPassed, stepThreePassed,
            stepsPassed, showSetAccountPopup, showSetAccount
        } = this.props;

        return (
            <InfoWrapper>
                <Balance>
                    <img src={walletIcon}/>
                    <p>{(tokensAmount / 10 ** 18).toFixed(2)} <span>VERA</span></p>
                </Balance>

                <AccountInfo>
                    <AccountInfoText className="DropdownAccountTrigger" onClick={dropdownAccountClickHandler}>
                        <Steps>Steps completed: <span>{stepsPassed}/3</span></Steps>
                        <UserImg approved={stepsPassed === 3}/>
                        <ArrowImg up={isDropdownAccountOpen} src={arrowImg}/>
                    </AccountInfoText>
                    {isDropdownAccountOpen &&
                    <DropdownAccount className="DropdownAccount" id='modal-dropdown'>
                      
                      
                        <StepsList>
                            <StepsListItem passed={stepOnePassed}
                                           onClick={!stepOnePassed ? showSetAccountPopup : undefined}>1.&nbsp;&nbsp;Provide
                                your ETH address</StepsListItem>
                            <StepsListItem passed={stepOnePassed ? stepTwoPassed : false}>
                                <Link to='/user_office/verification/'>2.&nbsp;&nbsp;Submit KYC</Link>
                            </StepsListItem>
                            <StepsListItem passed={stepTwoPassed ? stepThreePassed : false}><Link to='/user_office/payment/'>3.&nbsp;&nbsp;Buy
                                tokens</Link></StepsListItem>
                        </StepsList>
                     
                     
                        <EmailInfo>
                            <div className="text">Your profile:</div>
                            <div className="email">{email}</div>
                        </EmailInfo>
                        <NavList>
                            <NavListItem onClick={dropdownAccountClickHandler}>
                                <Link to="/user_office/settings">Account settings</Link>
                            </NavListItem>
                            <NavListItem onClick={dropdownAccountClickHandler}>
                                {stepOnePassed &&
                                <Link to="/user_office/verification">Verification</Link>
                                }
                                {!stepOnePassed &&
                                <span onClick={showSetAccount}>Verification</span>
                                }
                            </NavListItem>
                        </NavList>
                        <LogoutLink href='/logout/'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20">
                                <g fill="#858B91" fillRule="nonzero" stroke="#979797" strokeWidth=".5">
                                    <path
                                        d="M9.3825 17.9686H4.486c-1.3307 0-2.4104-1.039-2.4104-2.3111V4.3425c0-1.2759 1.0837-2.311 2.4104-2.311h4.976c.2989 0 .5379-.2293.5379-.5158C10 1.2292 9.761 1 9.4622 1H4.486C2.5618 1 1 2.5013 1 4.3425v11.315C1 17.5025 2.5657 19 4.486 19h4.8965c.2988 0 .5378-.2292.5378-.5157 0-.2865-.243-.5157-.5378-.5157z"/>
                                    <path
                                        d="M17.8455 9.6131L14.5006 6.16c-.2066-.2133-.538-.2133-.7446 0s-.2066.5554 0 .7687l2.4483 2.5275H5.5263c-.2924 0-.5263.2414-.5263.5433 0 .3018.234.5433.5263.5433h10.678l-2.4483 2.5275c-.2066.2133-.2066.5554 0 .7687.1014.1047.2378.161.3704.161a.5057.5057 0 0 0 .3703-.161l3.345-3.4531c.2104-.2174.2104-.5635.0038-.7728z"/>
                                </g>
                            </svg>
                            Log out
                        </LogoutLink>
                    </DropdownAccount>
                    }
                </AccountInfo>
            </InfoWrapper>
        )
    }


}

export default onClickOutside(Account);


const InfoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    float: right;
`;

const AccountInfo = styled.div`
    margin-left: 60px;
    position: relative;
    font-size: 15px;
    color: rgba(50,60,71,.6);
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
    }
`;

const AccountInfoText = styled.div`
    display inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    z-index: 1;
    & * {
        pointer-events: none;
    }
`;

const UserImg = styled.div`
    width: 47px;
    height: 47px;
    margin-left: 20px;
    position: relative;
    z-index: 1;
    background: url(${userPlaceholder}) no-repeat center;
    background-size: cover;
    &:before {
        content: '';
        width: 18px;
        height: 18px;
        border-radius: 100%;
        background: url(${props => props.approved ? checkIcon : exclaimIcon}) no-repeat center, #f26d6d;
        position: absolute;
        bottom: -4px;
        right: 0px;
        border: 2px solid white;
    }
`;

const Balance = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 23px;
    img {
        margin-right: 15px;
    }
    a {
        color: #3172fd;
        font-weight: 600;
        font-size: 20px;
    }
    span {
        font-weight: 400;
    }
`;


const EmailInfo = styled.div`
    padding: 0 23px 18px;
    font-size: 16px;
    letter-spacing: 0.5px;
    color: #222121;
    border-bottom: 1px solid rgba(193,193,193,.3);
    margin-bottom: 8px;
    .text {
        opacity: .5;
    }
    .email {

    }
`;

const Steps = styled.p`
    color: #222121;
    user-select: none;
    span {
        color: #00da36;
        font-size: 16px;
        font-weight: 600;
    }
`;

const ArrowImg = styled.img`
    margin-left: 20px;
    position: relative;
    top: 1px;
    transform: ${props => props.up ? 'rotate(0)' : 'rotate(-180deg)'}
`;

const DropdownAccount = styled.div`
    width: calc(100% + 38px);
    position: absolute;
    left: 50%;
    top: -25px;
    padding: 75px 0 0;
    transform: translateX(-50%);
    border-radius: 6px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    z-index: 0;
`;

const StepsList = styled.ul`
    border-bottom: 1px solid rgba(193,193,193,.3);
    padding-bottom: 23px;
    margin-bottom: 20px;
    padding: 0 23px 23px;
`;

const StepsListItem = styled.li`
    font-size: 15px;
    color: ${props => props.passed ? '#11cd56' : 'rgba(50, 60, 71,.5)'};
    cursor: ${props => !props.passed ? 'pointer' : 'default'};
    margin-top: 16px;
`;


const LogoutLink = styled.a`
    height: 70px;
    align-items: center;
    display: flex;
    border-top: 1px solid rgba(193,193,193,.3);
    transition: all .25s ease;
    padding: 0 23px;
    svg {
        margin-right: 13px;
        g {
            transition: all .25s ease;
        }
    }
    &:hover {
        color: #dc3545;
        & svg g{
            stroke: #dc3545;
            fill: #dc3545;
        }
    }
`;

const NavList = styled.ul`
`;

const NavListItem = styled.li`
    line-height: 45px;
    padding: 0 23px;
    &:hover {
        background: rgba(216,216,216,.4);
    }
    &:last-of-type {
        margin-bottom: 7px;
    }
    a {
        height: 100%;
        display: block;
    }
`;
