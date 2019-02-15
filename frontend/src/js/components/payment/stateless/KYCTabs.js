import React from 'react'
import styled from 'styled-components';
import {media} from 'js/utils/media';


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
        left: 0;
    }
    ${media.xs} {
        margin-top: 12px;
        flex-basis: 100%;
    }
`;

const Tab = styled.div`
    width: 193px;
    height: 45px;
    border-radius: 100px;
    background: #EEEEEE;
    border: 1px solid #EEEEEE;
    color: #0a0a0a;
    letter-spacing: normal;
    font-size: 16px;
    line-height: 45px;
    text-align: center;
    cursor: pointer;
    ${media.smMinus} {
        font-size: 14px;
    }
    ${media.sm} {
        width: 170px;
    }
    ${media.xs} {
        width: 44.7vw;
        max-width: 220px;
        font-size: 12px;
    }
    &.active {
        background: white;
        color: rgb(49, 114, 253);
        border-color: rgb(49, 114, 253);
        z-index: 1;
    }
    &:last-of-type {
        position: relative;
        left: -33px;
        ${media.smMinus} {
            left: -28px;
        }
    }
`;
