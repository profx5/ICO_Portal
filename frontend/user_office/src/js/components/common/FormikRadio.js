import React from 'react'
import styled from 'styled-components';

import { Field } from 'formik';
import ErrorMessage from './ErrorMessage';

import iconCheck from './../../../img/icons/icon_check.svg';


const FormikRadio = ({labelText, name, values, options, is_pep}) => {
    function generateRadio(data, name) {
        return data.map((item, index) => {
            return (
                <React.Fragment key={index}>
                    <RadioInput component="input" 
                        type="radio" 
                        name={name} 
                        value={values[index]} 
                        hidden
                        id={`radio-${item}`} 
                        defaultChecked={(index === 0 && is_pep) || (index === 1 && !is_pep)} />
                    <RadioLabel htmlFor={`radio-${item}`}>{item}</RadioLabel>
                </React.Fragment>
            )
        });
    }

    return (
        <Wrapper>
            <InputsWrapper>
                {generateRadio(options, name)}
            </InputsWrapper>
        </Wrapper>
    );
}


export default FormikRadio;

const Wrapper = styled.div`
    position: relative;
    height: 100%;
`;

const InputsWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
`;

const RadioInput = styled(Field)`
    &:checked + label:before {
        background: url(${iconCheck}) no-repeat center;
    }
`;

const RadioLabel = styled.label`
    font-size: 16px;
    letter-spacing: 0.5px;
    color: #0a0a0a;
    margin-right: 20px;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    &:before {
        content: '';
        width: 20px;
        height: 20px;
        border: 1px solid #d6dfe6;
        margin-right: 8px;
    }
`;
