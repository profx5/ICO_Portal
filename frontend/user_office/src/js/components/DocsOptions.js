import React from 'react'
import styled from 'styled-components';

const DocsOptions = ({tabsArray}) => {
    return (
        <List>
            <ListItem className="active">{tabsArray[0]}</ListItem>
            <ListItem>{tabsArray[1]}</ListItem>
            <ListItem>{tabsArray[2]}</ListItem>
        </List>
    )
}



export default DocsOptions;

const List = styled.ul`
    border-radius: 4px;
    padding: 6px;
    background: #F4F9FF;
    max-width: 263px;
`;

const ListItem = styled.li`
    height: 39px;
    display: flex;
    align-items: center;
    padding: 0 36px;
    background: transparent;
    position: relative;
    &.active {
        background: white;
    }
    &.active:before {
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 10px;
        background: #3374fd;
        margin-right: 8px;
    }
`;