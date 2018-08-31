import React from 'react'
import styled, { keyframes } from "styled-components"

import dotsIcon from './../../img/dots.svg';


const CustomButton = ({text, className, clickHandler, submit, disabled, icon}) => {
    const opts = {
        className: className,
        onClick: clickHandler,
        disabled: disabled
    }

    if (submit) {
        opts['type'] = 'submit'
    }

    return (
        <Btn {...opts}>
            {text}
        </Btn>
    )
}

export default CustomButton;

const bgpin = keyframes`
  from {
      background-position: 0 0;
  }
  to {
      background-position: -100% 0;
  }
`;

const bgout = keyframes`
    from {
        background-position: -100% 0;
    }
    to {
        background-position: -200% 0;
    }
`;

const Btn = styled.button`
    background: rgb(248, 79, 119);
    background: linear-gradient(90deg,rgb(248, 79, 119) 50%,#397DFF 0);
    background-size: 200% 100%;
    background-position: 0 0;
    width: 100%;
    height: 100%;
    text-transform: uppercase;
    border-radius: 100px;
    font-size: 16px;
    color: white;
    text-align: center;
    font-weight: 500;
    position: relative;
    cursor: pointer;
    animation: ${bgout} .3s;
    &:after {
        content: url(${dotsIcon});
        position: absolute;
        top: 50%;
        right: 25px;
        transform: translateY(-50%);
    }
    &:hover {
        animation: ${bgpin} .3s;
        animation-fill-mode: forwards;
    }
`;