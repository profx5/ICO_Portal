import React from 'react'
import styled from 'styled-components';

const FetchButton = ({amount, spread, onClickHandler}) => {
    return (<Button onClick={onClickHandler}>{spread === false ? 'View more' : 'Hide'} {amount} currencies</Button>)
}



export default FetchButton;


const Button = styled.button`
    height: 45px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px rgba(228, 232, 234, 0.25);
    background: white;
    box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: transform .25s ease;
`;
