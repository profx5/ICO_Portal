import React from 'react'
import styled from 'styled-components';


const InputLabel = ({children}) => {

    return (
        <StyledLabel>
            {children}
        </StyledLabel>
    );
}


export default InputLabel;

const StyledLabel = styled.label`
    font-size: 16px;
    color: #0a0a0a;
    display: block;
    margin-bottom: 13px;
`;
