import React from 'react'
import styled from 'styled-components';
import {media} from 'js/utils/media';


const VerificationStages = ({stages, boundSections, stageClickHandler}) => {
    return (
        <List>
            <ListItem onClick={stageClickHandler} data-bind-to={boundSections[0]} className="active">{stages[0]}</ListItem>
            <ListItem onClick={stageClickHandler} data-bind-to={boundSections[1]}>{stages[1]}</ListItem>
            {stages[2] && <ListItem onClick={stageClickHandler} data-bind-to={boundSections[2]}>{stages[2]}</ListItem>}
        </List>
    )
}


export default VerificationStages;

const List = styled.ul`
    border-radius: 4px;
    background: white;
    width: 315px;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    overflow: hidden; 
    margin-bottom: 25px;
    ${media.smMinus} {
        display: none;
    }
    @media (max-width: 1230px) {
        width: 260px;
    }
`;

const ListItem = styled.li`
    height: 56px;
    font-size: 16px;
    color: #323c47;
    border-left: 2px solid transparent;
    display: flex;
    align-items: center;
    padding: 0 25px;
    background: transparent;
    position: relative;
    cursor: pointer;
    &:not(:last-child) {
        border-bottom: 2px solid rgba(151,151,151,.2);
    }
    &:first-child {
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
    &:last-child {
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
    }
    &.active {
      color: #3172fd;
      border-left-color: #3172fd;
    }
`;
