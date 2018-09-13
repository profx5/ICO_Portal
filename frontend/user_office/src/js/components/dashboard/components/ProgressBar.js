import React from 'react';
import styled from 'styled-components';
import Utils from './../../../utils/index';


const ProgressBar = ({children, raisedAmountNum}) => {
    const raisedAmountPercents =  raisedAmountNum / 260000;

    return (
        <Wrapper>
            {children}
            <BarWrapper>
                <Bar>
                    <InnerBar width={raisedAmountPercents >= 100 ? 100 : raisedAmountPercents}>
                        <Point rate='1 OGD = 10 USD' data-raised-amount={Utils.splitDigits(Math.ceil(raisedAmountNum / 100)) + ' USD'}/>
                    </InnerBar>
                    <Stage>
                        <div className="StageDesc">
                            <StageName>65 000 USD</StageName>
                            <StageState>Phase 1</StageState>
                        </div>
                    </Stage>
                    <Stage>
                        <div className="StageDesc">
                            <StageName>130 000 USD</StageName>
                            <StageState>Phase 2</StageState>
                        </div>
                    </Stage>
                    <Stage>
                        <div className="StageDesc">
                            <StageName>195 000 USD</StageName>
                            <StageState>Phase 3</StageState>
                        </div>
                    </Stage>
                    <Stage>
                        <div className="StageDesc">
                            <StageName>260 000 USD</StageName>
                            <StageState>Hard cap</StageState>
                        </div>
                    </Stage>
                    <Stage>
                        <div className="StageDesc StageDesc-alignLeft">
                            <StageName>0 USD</StageName>
                            <StageState>Soft cap</StageState>
                        </div>
                    </Stage>
                </Bar>
            </BarWrapper>
        </Wrapper>
    )
}

export default ProgressBar;


const Wrapper = styled.div`
    border: 1px solid rgba(151,151,151,.2);
    margin-bottom: 80px;
    height: 350px;
    position: relative;
    background: #FAFCFF;
`;

const BarWrapper = styled.div`
    position: absolute;
    left: 50%;
    bottom: 120px;
    width: 92%;
    transform: translateX(-50%);
`;

const Bar = styled.div`
    width: 100%;
    height: 11px;
    background: rgba(49, 114, 253, .15);
    position: relative;
`;

const InnerBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.width ? props.width + '%' : '1%'};
    background: #397dff;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    transition: width .5s ease .5s;
`;

const Point = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 3px;
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background: white;
    box-shadow: 0 0 0 11px rgba(57, 125, 255, 0.16);
    &:after, &:before {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    &:before {
        content: 'Collected:';
        font-family: 'roboto';
        font-weight: 500;
        font-size: 14px;
        color: rgb(31, 31, 31);
        letter-spacing: 0.3px;
        white-space: nowrap;
        top: -65px;
    }
    &:after {
        content: attr(data-raised-amount);
        font-family: 'roboto';
        font-weight: 500;
        font-size: 16px;
        color: rgb(49, 114, 253);
        letter-spacing: 0.4px;
        white-space: nowrap;
        top: -45px;
    }
`;

const Stage = styled.div`
    width: 2px;
    height: 30px;
    background: rgb(49, 114, 253);
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    &:nth-child(1) {
        left: 0%;
    }
    &:nth-child(2) {
        left: 25%;
    }
    &:nth-child(3) {
        left: 50%;
    }
    &:nth-child(4) {
        left: 75%;
    }
    &:nth-child(5) {
        left: 100%;
    }
    .StageDesc {
        position: absolute;
        bottom: -50px;
        left: -50%;
        transform: translateX(calc(-100% + 3px));
        text-align: right;
        div {
            white-space: nowrap;
        }
        &-alignLeft {
            text-align: left;
            transform: translateX(0);
        }
    }
    &:nth-of-type(3) .StageDesc {
        // right: 0 !important;
        // left: unset !important;
    }
    &:before {
        content: attr(data-rate);
        font-size: 18px;
        color: ${props => props.colored ? '#397dff' : '#505050'};
        position: absolute;
        left: 0;
        top: -85px;
        white-space: nowrap;
    }
`;

const StageName = styled.div`
    color: rgb(31, 31, 31);
    letter-spacing: 0.2px;
    font-size: 16px;
    margin-bottom: 3px;
    font-weight: 600;
`;

const StageState = styled.div`
    color: rgb(31, 31, 31);
    font-size: 14px;
    letter-spacing: 0.3px;
    font-family: 'roboto';
    font-weight: 500;
`;
