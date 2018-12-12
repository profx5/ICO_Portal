import React from 'react'
import styled from 'styled-components';
import {media} from 'js/services/media';


const InputLabel = ({children, htmlFor}) => {

    return (
        <StyledLabel htmlFor={htmlFor}>
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
    ${media.xs} {
        font-size: 12px;
    }
`;
