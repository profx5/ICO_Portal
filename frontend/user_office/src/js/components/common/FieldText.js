import React from 'react'
import styled from 'styled-components';
import Cleave from 'cleave.js/react';


const FieldText = ({labelText, placeholder, options, name, value, disabled, type, errortext}) => {

    return (
        <Wrapper>
            <StyledLabel>{labelText}</StyledLabel> 
            <StyledInput 
                value={value} 
                placeholder={placeholder} 
                className="Field" 
                type={type || 'text'} 
                name={name} 
                errortext={errortext} 
                readOnly={disabled === true ? true : false} 
                options={options}/> 
            <StyledError>{errortext}</StyledError>
        </Wrapper>
    );
}


export default FieldText;

const Wrapper = styled.div`
    position: relative;
    height: 100%;
`;

const StyledLabel = styled.label`
    color: #0a0a0a;
    display: block;
    margin-bottom: 13px;
`;

const StyledInput = styled(Cleave)`
    color: #233539;
    font-weight: 600;
    padding: 0 20px;
    display: block;
    height: 100%;
    width: 100%;
    background: #ffffff;
    border: 1px solid ${props => props.errortext ? 'rgb(242, 109, 109)' : '#EAEFF2'};
    &:read-only {
        color: rgba(35,53,57,.3);
    }
`;

const StyledError = styled.div`
    font-size: 14px;
    color: rgb(242, 109, 109);
    margin-top: 10px;
`;
