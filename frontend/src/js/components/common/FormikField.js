import React from 'react';
import styled from 'styled-components';
import Cleave from 'cleave.js/react';
import {media} from 'js/utils/media';

import { Field } from 'formik';
import ErrorMessage from 'js/components/common/ErrorMessage';


const FormikField = ({errors, touched, labelText, placeholder, className, options, name, required}) => {

    return (
        <Wrapper>
            <StyledLabel htmlFor={name}>{labelText}{required && <span> *</span>}</StyledLabel>
            <Field
                name={name}
                render={({field}) => (
                    <StyledCleave className={`${(errors && errors[name] && touched[name]) && 'isInvalid'} ${className}`} id={name} {...field} placeholder={placeholder} type="text" options={options || {delimiter: ''}}/>
                )}
            />
            {errors && errors[name] && touched[name] && <ErrorMessage text={errors[name]}/>}
        </Wrapper>
    );
}


export default FormikField;

const Wrapper = styled.div`
    position: relative;
    height: 100%;
    label + div {
       height: 100%;
       input {
            color: #233539;
            font-size: 16px;
            font-weight: 500;
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
    white-space: nowrap;
    ${media.xs} {
        font-size: 12px;
    }
    span {
        color: red;
    }
`;

const StyledCleave = styled(Cleave)`
    color: #233539;
    font-size: 16px;
    font-weight: 500;
    padding: 0 20px;
    display: block;
    height: 100%;
    width: 100%;
    background: #ffffff;
    border: 1px solid #d6dfe6;
    border-radius: 2px;
    ${media.xs} {
        font-size: 14px;
    }
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
