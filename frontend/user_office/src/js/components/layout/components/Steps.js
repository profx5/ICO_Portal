import React from 'react';
import styled from 'styled-components';

import arrowImg from './../../../../img/arrow-down.svg';
import exclaimIcon from './../../../../img/icons/icon_exclaim.svg';
import checkIcon from './../../../../img/check_mini_icon.svg';
import userPlaceholder from './../../../../img/user.svg';


const Steps = ({stepsPassed, onClickHandler, isDropdownAccountOpen}) => {
    return (
        <Wrapper className="DropdownAccountTrigger" onClick={onClickHandler}>
            <StyledSteps>Steps completed: <span>{stepsPassed}/3</span></StyledSteps>
            <UserImg approved={stepsPassed === 3}/>
            <ArrowImg up={isDropdownAccountOpen} src={arrowImg}/>
        </Wrapper>
    )
}


export default Steps;

const Wrapper = styled.div`
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    z-index: 1;
    & * {
        pointer-events: none;
    }
`;

const StyledSteps = styled.p`
    color: #222121;
    user-select: none;
    span {
        color: #00da36;
        font-size: 16px;
        font-weight: 600;
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

const ArrowImg = styled.img`
    margin-left: 20px;
    position: relative;
    top: 1px;
    transform: ${props => props.up ? 'rotate(0)' : 'rotate(-180deg)'};
`;
