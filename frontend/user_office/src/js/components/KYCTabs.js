import React from 'react'
import styled from 'styled-components';

const KYCTabs = ({clickHandler, activeTab}) => {


    return (

        <Wrapper>
            <Tab onClick={clickHandler} id="kycTab1" className={activeTab === 1 ? 'active' : ''}>Natural Person</Tab>
            <Tab onClick={clickHandler} id="kycTab2" className={activeTab === 2 ? 'active' : ''}>Legal Person</Tab>
        </Wrapper>
    )
}

export default KYCTabs;

const Wrapper = styled.div`
    display: flex;
    position: relative;
    left: 33px;
`;

const Tab = styled.div`
    width: 193px;
    height: 45px;
    border-radius: 100px;
    background> transparent;
    border: 1px solid #3273fd;
    color: #0a0a0a;
    letter-spacing: 0.5px;
    font-size: 16px;
    line-height: 45px;
    text-align: center;
    cursor: pointer;
    &.active {
        background: linear-gradient(81deg, #54a0f5, #3172fd);
        color: white;
    }
    &:last-of-type {
        position: relative;
        left: -33px;
    }
`;