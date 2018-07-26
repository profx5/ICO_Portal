import React from 'react';
import styled from 'styled-components';
import Cleave from 'cleave.js/react';
import CleavePhone from 'cleave.js/dist/addons/cleave-phone.ru.js';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { Field } from 'react-final-form';



const FinalFormField = ({labelText, placeholder, options, name, value, disabled, required, type}) => {

    let CleaveInput = (field) => {
        const FORMAT = 'M/D/YYYY';

        if (type === 'date') {
            return <DayPickerInput inputProps={{
                    name: name,
                    readOnly: true,
                    placeholder: placeholder}}/>
        } else {
            return <StyledCleave {...field.input} placeholder={placeholder} type={type} required={required} options={field.options} />
        }
    }

    return (
        <Wrapper>
            <StyledLabel htmlFor={name}>{labelText}</StyledLabel>
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
