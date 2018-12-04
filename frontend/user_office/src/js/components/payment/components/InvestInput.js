import React from 'react';
import styled from 'styled-components';
import {media} from './../../../utils/media';


const InvestInput = ({value, type, onChangeHandler, onPasteHandler, investLabelText, currency}) => {

    return (
        <InputWrapper data-currency={currency}>
            <Label htmlFor="invest_input">{investLabelText}</Label>
            <Input value={value} type={type} onChange={onChangeHandler} onPaste={onPasteHandler} id="invest_input"/>
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
    ${media.smMinus} {
        width: 100%;
        margin: 0 0 15px;
    }
    ${media.xs} {
        font-size: 14px;
        height: 49px;
    }
    &:after {
        content: attr(data-currency);
        color: rgba(10,10,10, 0.4);
        position: absolute;
        font-size: 18px;
        right: 27px;
        top: 50%;
        transform: translateY(-50%);
        ${media.xs} {
            font-size: 14px;
        }
    }
`;

const Label = styled.label`
    color: #0a0a0a;
    position: absolute;
    left: 0;
    top: -35px;
    font-size: 16px;
    ${media.xs} {
        font-size: 12px;
        top: -30px;
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
