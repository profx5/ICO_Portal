import React from 'react'
import styled from 'styled-components';


const Steps = ({step}) => {

    return (
        <Wrapper>
            <Step passed={1 <= step} to_next={2<=step}>
                <div className="Step__head">Step 1</div>
                <div className="Step__desc">Select payment method</div>
            </Step>
            <Step passed={2 <= step} to_next={3<=step}>
                <div className="Step__head">Step 2</div>
                <div className="Step__desc">Buying tokens</div>
            </Step>
            <Step passed={3 <= step}>
                <div className="Step__head">Step 3</div>
                <div className="Step__desc">Transaction mining</div>
            </Step>
        </Wrapper>
    );
}


export default Steps;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-flow: row nowrap;
`;

const Step = styled.div`
    width: 190px
    &:nth-of-type(2) {
        margin: 0 250px;
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
    }
    &:not(:last-of-type) {
        position: relative;
        &:before {
            content: '';
            display: block;
            width: 387px;
            height: 2px;
            background: ${props => props.to_next ? '#1767f2': 'lightgrey'};
            position: absolute;
            bottom: 6px;
            left: calc(50% + 27px);
            transform: translateX(0);
        }
    }
`;
