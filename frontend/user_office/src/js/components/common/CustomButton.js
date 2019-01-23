import React from 'react'
import styled from "styled-components"


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

const Btn = styled.button`
    background: rgb(49, 114, 253);
    background-size: 200% 100%;
    background-position: 0 0;
    width: 100%;
    height: 100%;
    text-transform: uppercase;
    font-size: 16px;
    color: white;
    text-align: center;
    font-weight: 500;
    position: relative;
    cursor: pointer;
    transition: background .25s ease;
    &:hover {
        background: rgb(49, 154, 253);
    }
`;
