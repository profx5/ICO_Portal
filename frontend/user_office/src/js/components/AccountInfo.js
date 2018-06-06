import React from 'react';
import styled from 'styled-components';

import userPhoto from './../../img/user.svg';
import arrowImg from './../../img/arrow-down.svg';

import { Link } from 'react-router-dom';

const AccountInfo = ({email, isDropdownOpen, dropdownClickHandler}) => {
    return (
        <InfoWrapper>
            <UserImg src={userPhoto} />
            <EmailInfo>
                <EmailTextWrapper onClick={dropdownClickHandler}>
                    <EmailText>{email}</EmailText>
                    <ArrowImg up={isDropdownOpen} src={arrowImg} />
                </EmailTextWrapper>
                {isDropdownOpen && 
                    <Dropdown>
                        <ul>
                            <ListItem>
                                <Link to="/settings">Account settings</Link>
                            </ListItem>
                            <ListItem>
                                <Link to="/verification">Verification</Link>
                            </ListItem>

                        </ul>
                        <LogoutLink>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20">
                              <g fill="#858B91" fill-rule="nonzero" stroke="#979797" stroke-width=".5">
                                <path d="M9.3825 17.9686H4.486c-1.3307 0-2.4104-1.039-2.4104-2.3111V4.3425c0-1.2759 1.0837-2.311 2.4104-2.311h4.976c.2989 0 .5379-.2293.5379-.5158C10 1.2292 9.761 1 9.4622 1H4.486C2.5618 1 1 2.5013 1 4.3425v11.315C1 17.5025 2.5657 19 4.486 19h4.8965c.2988 0 .5378-.2292.5378-.5157 0-.2865-.243-.5157-.5378-.5157z"/>
                                <path d="M17.8455 9.6131L14.5006 6.16c-.2066-.2133-.538-.2133-.7446 0s-.2066.5554 0 .7687l2.4483 2.5275H5.5263c-.2924 0-.5263.2414-.5263.5433 0 .3018.234.5433.5263.5433h10.678l-2.4483 2.5275c-.2066.2133-.2066.5554 0 .7687.1014.1047.2378.161.3704.161a.5057.5057 0 0 0 .3703-.161l3.345-3.4531c.2104-.2174.2104-.5635.0038-.7728z"/>
                              </g>
                            </svg>
                            Log out
                        </LogoutLink>
                    </Dropdown>
                }
            </EmailInfo>
        </InfoWrapper>
    )
}

export default AccountInfo;


const InfoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const UserImg = styled.img`
    margin-left: 25px;
    position: relative;
    z-index: 1;
`;

const EmailInfo = styled.span`
    margin-left: 25px;
    position: relative;
    font-size: 15px;
    color: rgba(50,60,71,.6);
`;

const EmailText = styled.p`
    color: #222121;
    user-select: none;
`;

const ArrowImg = styled.img`
    margin-left: 20px;
    position: relative;
    top: 1px;
    transform: ${props => props.up ? 'rotate(0)' : 'rotate(-180deg)'}
`;

const EmailTextWrapper = styled.div`
    cursor: pointer;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    z-index: 1;
`;

const Dropdown = styled.div`
    width: calc(100% + 30px);
    position: absolute;
    left: 50%;
    top: -14px;
    padding: 75px 15px 0;
    transform: translate3d(-50%,0,0);
    border-radius: 6px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    z-index: 0;
`;

const LogoutLink = styled.a`
    height: 70px;
    align-items: center;
    display: flex;
    border-top: 1px solid rgba(193,193,193,.3);
    transition: all .25s ease;
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

const ListItem = styled.li`
    margin-bottom: 14px;
    &:last-of-type {
        margin-bottom: 37px;
    }
`;