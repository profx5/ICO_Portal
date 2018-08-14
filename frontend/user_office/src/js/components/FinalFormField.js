import React from 'react';
import styled from 'styled-components';
import Cleave from 'cleave.js/react';
import CleavePhone from 'cleave.js/dist/addons/cleave-phone.ru.js';

import { Field } from 'react-final-form';



const FinalFormField = ({labelText, placeholder, options, name, value, disabled, required, type, onChangeHandler, initialValue}) => {

    let CleaveInput = (field) => {

        return <StyledCleave {...field.input} placeholder={placeholder} type={type} required={required} options={field.options} />
    }

    return (
        <Wrapper>
            <StyledLabel htmlFor={name}>{labelText}{required && <span> *</span>}</StyledLabel>
            <Field
                options={options}
                className="Field"
                component={CleaveInput}
                placeholder={placeholder}
                value={value}
                type="text"
                name={name}/>
        </Wrapper>
    );
}



export default FinalFormField;

const Wrapper = styled.div`
    position: relative;
    height: 100%;
    label + div {
       height: 100%;
       .react-datepicker-wrapper, .react-datepicker__input-container {
            display: block;
            height: 100%;
       }
       input {
            color: #233539;
            font-size: 16px;
            font-weight: 600;
            padding: 0 20px;
            display: block;
            height: 100%;
            width: 100%;
            background: #ffffff;
            border: 1px solid #d6dfe6;
            border-radius: 2px;
            &::-webkit-input-placeholder {
                color: rgba(10,10,10,.4);
            }
       }
    }
    .DayPickerInput {
        display: block;
        height: 100%;
        input {
            color: #233539;
            font-size: 16px;
            font-weight: 600;
            padding: 0 20px;
            display: block;
            height: 100%;
            width: 100%;
            background: #ffffff;
            border: 1px solid #d6dfe6;
            border-radius: 2px;
            &::-webkit-input-placeholder {
                color: rgba(10,10,10,.4);
            }
        }
    }
`;

const StyledLabel = styled.label`
    color: #0a0a0a;
    font-size: 16px;
    display: block;
    margin-bottom: 13px;
    span {
        color: red;
    }
`;

const StyledCleave = styled(Cleave)`
    color: #233539;
    font-size: 16px;
    font-weight: 600;
    padding: 0 20px;
    display: block;
    height: 100%;
    width: 100%;
    background: #ffffff;
    border: 1px solid #d6dfe6;
    border-radius: 2px;
    &:read-only {
        color: rgba(35,53,57,.3);
    }
    &::-webkit-input-placeholder {
        color: rgba(10,10,10,.4);
    }
`;
