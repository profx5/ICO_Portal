import React from 'react';
import styled from 'styled-components';
import $ from "jquery";


const SupportTabs = ({ticketsAmount, activeTab, tabClickHandler}) => {
    return (
        <Wrapper>
            <Tab onClick={tabClickHandler.bind(this, 1)} active={activeTab === 1 ? true : false}>New question</Tab>
            <Tab onClick={tabClickHandler.bind(this, 2)} active={activeTab === 2 ? true : false}>My questions {ticketsAmount.length}</Tab>
        </Wrapper>
    )
}

export default SupportTabs;


const Wrapper = styled.div`
    height: 56px;
`;

const Tab = styled.div`
    width: 220px;
    height: 100%;
    line-height: 56px;
    text-align: center;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    display: inline-block;
    color: ${props => props.active ? '#3172fd' : '#323c47'};
    background: ${props => props.active ? '#fff' : 'transparent'};
    cursor: pointer;
`;
