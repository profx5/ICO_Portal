import React from 'react';
import styled from 'styled-components';
import {media} from 'js/utils/media';


const InvestInput = ({children, value, type, onChangeHandler, onPasteHandler, investLabelText, currency, errorMessage}) => {

    return (
        <InputWrapper data-currency={currency}>
            <Label htmlFor="investInput">{investLabelText}</Label>
            <Input value={value} type={type} onChange={onChangeHandler} onPaste={onPasteHandler} name='invest_input' id="invest_input"/>
            {children}
        </InputWrapper>
    )
}


export default InvestInput;

const InputWrapper = styled.div`
    display: inline-block;
    width: 345px;
    height: 70px;
    border-radius: 2px;
    position: relative;
    margin-right: 32px;
    ${media.smMinus} {
        width: 100%;
        margin: 0 0 15px;
        height: auto;
    }
    ${media.xs} {
        font-size: 14px;
    }
    &:after {
        content: attr(data-currency);
        color: rgba(10,10,10, 0.4);
        position: absolute;
        font-size: 18px;
        right: 27px;
        top: 27px;
        ${media.xs} {
            font-size: 14px;
            top: 18px;
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
    height: 70px;
    width: 100%;
    padding-left: 18px;
    padding-right: 67px;
    border: 1px solid #d6dfe6;
    ${media.xs} {
        height: 49px;
    }
`;
