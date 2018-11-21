import React from 'react'
import styled from 'styled-components';
import {media} from './../../utils/media';

const Title = ({children, className}) => {
    return (
        <StyledTitle className={className}>{children}</StyledTitle>
    )
}


export default Title;

const StyledTitle = styled.h2`
    font-size: 38px;
    line-height: 1;
    font-weight: 400;
    color: #233539;
    letter-spacing: 0.8px;
    margin-top: 60px;
    flex-basis: 100%;
    &.Verification_head {
        margin-top: 0;
    }
    ${media.xs} {
        font-size: 20px;
        letter-spacing: 0.4px;
        margin-top: 10px;
    }
    ${media.sm} {
        font-size: 29px;
    }
`;
