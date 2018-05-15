import React from 'react'
import styled from 'styled-components';

const DocsOptions = ({tabsArray}) => {
    return (
        <List>
            <InputRadio type="radio" id="document_type_1" name="document_type" value={tabsArray[0]} hidden checked/>
            <StyledLabel htmlFor="document_type_1">{tabsArray[0]}</StyledLabel>
            <InputRadio type="radio" id="document_type_2" name="document_type" value={tabsArray[1]} hidden/>
            <StyledLabel htmlFor="document_type_2">{tabsArray[1]}</StyledLabel>
            <InputRadio type="radio" id="document_type_3" name="document_type" value={tabsArray[2]} hidden/>
            <StyledLabel htmlFor="document_type_3">{tabsArray[2]}</StyledLabel>
        </List>
    )
}



export default DocsOptions;

const List = styled.div`
    border-radius: 4px;
    padding: 6px;
    background: #F4F9FF;
    max-width: 263px;
    margin-right: 35px;
`;

const InputRadio = styled.input`
    &:checked {
        background: white;
    }
    &:checked + label:before {
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 10px;
        background: #3374fd;
        margin-right: 8px;
    }
`;

const StyledLabel = styled.label`
    height: 39px;
    display: flex;
    align-items: center;
    padding: 0 36px;
    background: transparent;
    position: relative;
    cursor: pointer;
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