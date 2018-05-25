import React from 'react'
import styled from 'styled-components';
import {Field} from 'redux-form';

const ReduxFormField = ({labelText, placeholder, options, name, value, disabled}) => {

    return (
        <Wrapper>
            <StyledLabel htmlFor={name}>{labelText}</StyledLabel> 
            <StyledInput 
                value={value} 
                placeholder={placeholder} 
                className="Field" 
                type="text" 
                name={name} 
                component="input"
            />
        </Wrapper>
    );
}



export default ReduxFormField;

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