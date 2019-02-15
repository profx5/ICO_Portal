import React from 'react'
import styled from "styled-components"
import {media} from 'js/utils/media';


const ErrorMessage = ({text}) => {
    return (
        <Message>{text}</Message>
    )
}


export default ErrorMessage;

const Message = styled.span`
    display: block;
    flex-basis: 100%;
    margin-top: 10px;
    font-size: 14px;
    color: rgb(242, 109, 109);
    white-space: nowrap;
    ${media.xs} {
        font-size: 12px;
        margin-top: 5px;
        white-space: unset;
    }
`;
