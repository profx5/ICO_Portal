import React from 'react'
import styled from 'styled-components';
import {media} from 'js/utils/media';

import {Field} from 'formik';
import ErrorMessage from 'js/components/common/ErrorMessage';

import iconCheck from 'img/icons/icon_check.svg';


const FormikCheckbox = ({value, name, labelText, errorStyle, errors, touched, options, icon, handler}) => {

    function handle(handler, event) {
        event.preventDefault();
        handler(1);
    }

    return (
        <Wrapper>
            <InputsWrapper>
                <CheckboxInput component="input" type="checkbox" checked={value} name={name} id={`checkbox-${name}`}/>
                <CheckboxLabel htmlFor={`checkbox-${name}`} className={(errors[name] && touched[name]) ? 'isInvalid' : ''}>
                    {labelText}
                    {icon &&
                        <IconImg onClick={handle.bind(this, handler)} src={icon}/>
                    }
                </CheckboxLabel>
                {errors[name] && touched[name] && <ErrorMessage {...errorStyle} text={errors[name]}/>}
            </InputsWrapper>
        </Wrapper>
    );
}


export default FormikCheckbox;

const Wrapper = styled.div`
    position: relative;
    height: 100%;
`;

const InputsWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-flow: row wrap;
`;

const CheckboxInput = styled(Field)`
    opacity: 0;
    pointer-events: none;
    position: absolute;
    margin-left: 3px;
    margin-top: 3px;
    &:checked + label:before {
        background: url(${iconCheck}) no-repeat center;
    }
`;

const CheckboxLabel = styled.label`
    font-size: 16px;
    letter-spacing: 0.5px;
    color: #0a0a0a;
    margin-right: 20px;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    ${media.xs} {
        font-size: 12px;
    }
    &:before {
        content: '';
        width: 20px;
        min-width: 20px;
        height: 20px;
        min-height: 20px;
        border: 1px solid #d6dfe6;
        margin-right: 8px;
    }
    &.isInvalid:before {
        border-color: rgb(242,109,109);
    }
`;

const IconImg = styled.img`
    width: 16px;
    height: 16px;
    margin-left: 5px;
`;
