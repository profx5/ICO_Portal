import React from 'react'
import styled from 'styled-components';

const Button = ({text, className, clickHandler, submit}) => {
    const opts = {
        className: className,
        onClick: clickHandler
    }

    if (submit) {
        opts['type'] = 'submit'
    }

    return (<Btn {...opts}>{text}</Btn>)
}



export default Button;


const Btn = styled.button`
    border: solid 1px #4da1ffb3;
    background: 'transparent';
    height: 45px;
    width: 100%;
    border-radius: 2px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 300;
    text-align: center;
    position: relative;
    z-index: 1;
    cursor: pointer;
    &:before, &:after {
        content: '';
        display: ${props => props.background ? 'none' : 'block'};
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transition: all .25s ease;
    }
    &:before {
        background: linear-gradient(80deg, #54a0f5, #3172fd);
        z-index: -1;
    }
    &:after {
        background: linear-gradient(80deg, #3172fd, #54a0f5);
        z-index: -2;
    }
    &:hover:before {
        opacity: 0;
    }
    &.btn-white {
        background: white;
        color: #484643;
        font-weight: 600;
        border: none;
        &:before, &:after {
            content: unset;
            display: none;
        }
    }
`;
