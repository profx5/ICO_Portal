import React from 'react'
import styled from 'styled-components';
import {media} from './../../../utils/media';


const Steps = ({step}) => {

    return (
        <Wrapper>
            <Step step={step} passed={1 <= step} to_next={2<=step}>
                <div className="Step__head">Step 1</div>
                <div className="Step__desc">Select payment method</div>
                <div className="Step__pointerBg"></div>
            </Step>
            <Step step={step} passed={2 <= step} to_next={3<=step}>
                <div className="Step__head">Step 2</div>
                <div className="Step__desc">Buying tokens</div>
                <div className="Step__pointerBg"></div>
            </Step>
            <Step step={step} passed={3 <= step}>
                <div className="Step__head">Step 3</div>
                <div className="Step__desc">Transaction mining</div>
                <div className="Step__pointerBg"></div>
            </Step>
        </Wrapper>
    );
}


export default Steps;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-flow: row nowrap;
    ${media.sm} {
        margin-top: 30px;
    }
    ${media.xs} {
        margin-top: 15px;
    }
`;

const Step = styled.div`
    width: 190px;
    position: relative;
    ${media.smMinus} {
        display: none;
        width: 100%;
    }
    &:nth-of-type(1) {
        ${media.smMinus} {
            display: ${props => props.step === 1 && 'block'};
        }
    }
    &:nth-of-type(2) {
        margin: 0 250px;
        ${media.smMinus} {
            margin: 0;
            display: ${props => props.step === 2 && 'block'};
        }
    }
    &:nth-of-type(3) {
        ${media.smMinus} {
            display: ${props => props.step === 3 && 'block'};
        }
    }
    .Step__head {
        color: #3679fc;
        font-size: 20px;
        font-weight: 500;
        letter-spacing: 0.5px;
        text-align: center;
        margin-bottom: 5px;
    }
    .Step__desc {
        color: #000000;
        letter-spacing: 0.4px;
        font-weight: 500;
        text-align: center;
        white-space: nowrap;
        padding-bottom: 25px;
        font-size: 16px;
    }
    .Step__pointerBg {
        width: 65px;
        height: 65px;
        border-radius: 50px;
        display: none;
        background: #F5F6FA;
        position: absolute;
        left: 50%;
        bottom: -57px;
        transform: translate(-50%, -50%);
        z-index: 1;
        ${media.smMinus} {
            display: block;
        }
    }
    &:after {
        content: '';
        display: block;
        width: 16px;
        height: 16px;
        background: ${props => props.passed ? '#1767f2': 'lightgrey'};
        border: 2px solid white;
        box-shadow: 0 0 0 12px rgba(23,103,242,0.07);
        border-radius: 100%;
        margin: 0 auto;
        z-index: 2;
        position: relative;
    }
    &:not(:last-of-type) {
        position: relative;
        &:before {
            content: '';
            display: block;
            width: 387px;
            height: 2px;
            background: ${props => props.to_next || media.isSmMinus ? '#1767f2': 'lightgrey'};
            position: absolute;
            bottom: 6px;
            left: calc(50% + 27px);
            transform: translateX(0);
            ${media.smMinus} {
                width: calc(100vw - 192px);;
                left: 50%;
                transform: translateX(-50%);
            }
            ${media.xs} {
                width: 130%;
                background: #419BF9;
            }
        }
    }
`;
