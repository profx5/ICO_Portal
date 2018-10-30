import React from 'react'
import styled from "styled-components"


const ErrorMessage = ({text}) => {
    return (
        <Message>{text}</Message>
    )
}


export default ErrorMessage;

const Message = styled.span`
    display: block;
    font-size: 14px;
    color: rgb(242, 109, 109);
    position: absolute;
    left: 0;
    bottom: -28px;
`;
