import React from 'react';
import styled from 'styled-components';
import Cleave from 'cleave.js/react';

import { Field } from 'formik';
import ErrorMessage from './ErrorMessage';


const FormikField = ({errors, touched, labelText, placeholder, options, name, value, disabled, required, onChangeHandler}) => {

    return (
        <Wrapper>
            <StyledLabel htmlFor={name}>{labelText}{required && <span> *</span>}</StyledLabel>
            <Field
                name={name}
                render={({field}) => (
                    <StyledCleave className={(errors[name] && touched[name]) && 'isInvalid'} id={name} {...field} placeholder={placeholder} type="text" options={options || {delimiter: ''}}/>
                )}
            />
            {errors[name] && touched[name] && <ErrorMessage text={errors[name]}/>}
        </Wrapper>
    );
}


export default FormikField;

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
    &.isInvalid {
        border-color: rgb(242, 109, 109);
    }
`;
