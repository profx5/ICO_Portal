import React from 'react'
import styled from 'styled-components';
import Cleave from 'cleave.js/react';

const FieldText = ({labelText, placeholder, options}) => {

    return (
        <Wrapper>
            <StyledLabel>{labelText}</StyledLabel>
            <StyledInput placeholder={placeholder} className="Field" type="text" options={options}/>
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
    border: 1px solid #EAEFF2;
`;