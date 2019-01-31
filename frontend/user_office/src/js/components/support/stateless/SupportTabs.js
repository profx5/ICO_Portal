import React from 'react';
import styled from 'styled-components';
import {media} from 'js/utils/media';


const SupportTabs = ({ticketsAmount, activeTab, isTicketOpened, tabClickHandler}) => {
    return (
        <Wrapper>
            <Tab onClick={tabClickHandler.bind(this, 1)} active={!isTicketOpened && activeTab === 1 ? true : false}>New question</Tab>
            <Tab onClick={tabClickHandler.bind(this, 2)} active={isTicketOpened || activeTab === 2 ? true : false}>My questions {ticketsAmount.length}</Tab>
        </Wrapper>
    )
}


export default SupportTabs;

const Wrapper = styled.div`
    height: 56px;
    margin-top: 30px;
    ${media.xs} {
        display: flex;
        height: 45px;
    }
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
    ${media.xs} {
        font-size: 14px;
        line-height: 45px;
        width: 50%;
        flex-basis: 50%;
    }
`;
