import React from 'react';
import styled from 'styled-components';
import Cleave from 'cleave.js/react';

import { Field } from 'react-final-form';


const FinalFormField = ({labelText, placeholder, options, name, value, disabled}) => {

    let CleaveInput = (field) => (
        <Cleave />
    )

    return (
        <Wrapper>
            <StyledLabel htmlFor={name}>{labelText}</StyledLabel>
            <StyledInput 
                options={options} 
                className="Field" 
                component={Cleave} 
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
`;

const StyledLabel = styled.label`
    color: #0a0a0a;
    display: block;
    margin-bottom: 13px;
`;

const StyledInput = styled(Field)`
    color: #233539;
    font-weight: 600;
    padding: 0 20px;
    display: block;
    height: 100%;
    width: 100%;
    background: #ffffff;
    border: 1px solid #EAEFF2;
    &:read-only {
        color: rgba(35,53,57,.3);
    }
`;