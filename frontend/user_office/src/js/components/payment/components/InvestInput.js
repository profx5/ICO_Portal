import React from 'react';
import styled from 'styled-components';


const InvestInput = ({value, type, onChangeHandler, header, currency}) => {

    return (
        <InputWrapper data-header={header} data-currency={currency}>
            <Input value={value} type={type} onChange={onChangeHandler}/>
        </InputWrapper>
    )
}


export default InvestInput;

const InputWrapper = styled.div`
    display: inline-block;
    width: 345px;
    height: 70px;
    border-radius: 2px;
    border: 1px solid #d6dfe6;
    position: relative;
    margin-right: 32px;
    &:before {
        content: attr(data-header);
        color: #0a0a0a;
        position: absolute;
        left: 0
        top: -35px;
        font-size: 16px;
    }
    &:after {
        content: attr(data-currency);
        color: rgba(10,10,10, 0.4);
        position: absolute;
        font-size: 18px;
        right: 27px;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const Input = styled.input`
    display: block;
    font-weight: 600;
    height: 100%;
    width: 100%;
    padding-left: 18px;
    padding-right: 67px;
`;
