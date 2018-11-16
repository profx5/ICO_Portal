import React from 'react';
import styled, { keyframes } from "styled-components"
import {Link} from 'react-router-dom';
import {media} from './../../../utils/media';


const Dropdown = ({email, stepOnePassed, stepTwoPassed, stepThreePassed, stepsPassed, showSetAccount, showSetAccountPopup, dropdownAccountClickHandler}) => {
    return (
        <Wrapper className="DropdownAccount" id='modal-dropdown'>
            <StyledSteps>Steps completed: <span>{stepsPassed}/3</span></StyledSteps>
            <StepsList>
                <StepsListItem passed={stepOnePassed} onClick={!stepOnePassed ? showSetAccountPopup : undefined}>
                    <span>1.&nbsp;&nbsp;Provide your ETH address</span>
                </StepsListItem>
                <StepsListItem passed={stepOnePassed ? stepTwoPassed : false}>
                    {stepOnePassed && <Link onClick={dropdownAccountClickHandler} to='/user_office/verification/'><span>2.&nbsp;&nbsp;Submit KYC</span></Link>}
                    {!stepOnePassed && <span onClick={showSetAccount}>2.&nbsp;&nbsp;Submit KYC</span>}
                </StepsListItem>
                <StepsListItem passed={stepTwoPassed ? stepThreePassed : false}>
                    <Link onClick={dropdownAccountClickHandler} to='/user_office/payment/'>
                        <span>3.&nbsp;&nbsp;Buy tokens</span>
                    </Link>
                </StepsListItem>
            </StepsList>
            
            
            <EmailInfo>
                <div className="text">Your profile:</div>
                <div className="email">{email}</div>
            </EmailInfo>
            <NavList>
                <NavListItem onClick={dropdownAccountClickHandler}>
                    <Link to="/user_office/account">Account settings</Link>
                </NavListItem>
                <NavListItem onClick={dropdownAccountClickHandler}>
                    {stepOnePassed && <Link to="/user_office/verification">Verification</Link>}
                    {!stepOnePassed && <span onClick={showSetAccount}>Verification</span>}
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



        </Wrapper>
    )
}


export default Dropdown;

const reveal = keyframes`
    from {
        opacity: 0;
        transform: translate3d(-50%,50px,0);
    }
    to {
        opacity: 1;
        transform: translate3d(-50%,0,0);
    }
`;

const Wrapper = styled.div`
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
    animation: ${reveal} .3s ease;
    ${media.xs} {
        width: 274px;
        left: unset;
        right: -16px;
        padding-top: 40px;
        transform: unset;
        animation: unset;
    }
`;

const StyledSteps = styled.p`
    color: #222121;
    user-select: none;
    padding-left: 22px;
    margin-bottom: 32px;
    span {
        color: #00da36;
        font-size: 16px;
        font-weight: 600;
    }
    ${media.smPlus} {
        display: none;
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
