import React from 'react'
import styled from 'styled-components';
import {media} from 'js/services/media';


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
    ${media.xs} {
        margin-top: 12px;
        flex-basis: 100%;
        left: 0;
    }
`;

const Tab = styled.div`
    width: 193px;
    height: 45px;
    border-radius: 100px;
    background: transparent;
    border: 1px solid #3273fd;
    color: #0a0a0a;
    letter-spacing: 0.5px;
    font-size: 16px;
    line-height: 45px;
    text-align: center;
    cursor: pointer;
    ${media.smMinus} {
        font-size: 14px;
    }
    ${media.sm} {
        width: 164px;
    }
    ${media.xs} {
        width: 49.3vw;
        max-width: 220px;
        font-size: 13px;
    }
    &.active {
        background: linear-gradient(81deg, #54a0f5, #3172fd);
        color: white;
        z-index: 1;
    }
    &:last-of-type {
        position: relative;
        left: -33px;
        ${media.xs} {
            left: -27px;
        }
    }
`;
