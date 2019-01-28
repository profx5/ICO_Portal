import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import splitDigits from 'js/utils/splitDigits';
import {media} from 'js/utils/media';

import Countdown from 'js/components/common/Countdown';
import ProgressBar from 'js/components/dashboard/stateless/ProgressBar';
import Timer from 'js/components/dashboard/stateless/Timer';
import PhasesInfo from 'js/components/dashboard/stateless/PhasesInfo';
import CustomButton from 'js/components/common/CustomButton';
import Button from 'js/components/common/Button';

import * as ICOInfoActions from 'js/actions/ICOInfoActions';


class ICOProgress extends React.Component {

    constructor(props) {
        super(props);
        this.isCountdownSet = false
    }

    getPhasePercents = (current, goal) => current / goal * 100;

    render() {
        const {gainedMoney, startTime, endTime, tokenPrice} = this.props;

        const raisedAmountNum = Math.ceil(parseInt(gainedMoney, 10)) || 0;
        const raisedAmountStr = gainedMoney ? splitDigits(Math.ceil(parseInt(gainedMoney, 10)/100)) + ' USD' : 0.00;

        return (
            <Wrapper>
                <Header>
                    <Head>ICO Progress</Head>
                    <WrapperHeaderInfo>
                        <PartWrapper>
                            <DescHead>Base price:</DescHead>
                            <Desc blue bold>1 OGD = {tokenPrice} USD</Desc>
                        </PartWrapper>
                        <PartWrapper>
                            <DescHead>Deposit:</DescHead>
                            <Desc blue bold><span>Min deposit = </span>5 USD</Desc>
                        </PartWrapper>
                        <PartWrapper>
                            <DescHead>Funds raised:</DescHead>
                            <Desc bold>{raisedAmountStr}</Desc>
                        </PartWrapper>
                        <PartWrapper className="visible-smMinus">
                            <DescHead>Remaining:</DescHead>
                            <Countdown startTime={startTime} endTime={endTime}>
                                {(days, hours, minutes, seconds) => (
                                    <TimerWrapper>
                                        <TimeBlock bold>{days || '00'}d</TimeBlock>
                                        <TimeBlock bold>{hours || '00'}h</TimeBlock>
                                        <TimeBlock bold>{minutes || '00'}m</TimeBlock>
                                        <TimeBlock bold>{seconds || '00'}s</TimeBlock>
                                    </TimerWrapper>
                                )}
                            </Countdown>
                        </PartWrapper>
                    </WrapperHeaderInfo>
                </Header>
                <ProgressBar tokenPrice={tokenPrice} raisedAmountNum={raisedAmountNum}>
                    <Countdown startTime={startTime} endTime={endTime}>
                        {(days, hours, minutes, seconds) => (
                            <React.Fragment>
                                <Timer className="hidden-smMinus" countdownTime={{days, hours, minutes, seconds}}/>
                            </React.Fragment>
                        )}
                    </Countdown>
                    
                    <PhasesInfo rate={tokenPrice}/>
                </ProgressBar>
                <BonusInfoText>Bonuses are going to end up soon!</BonusInfoText>
                <ButtonWrapper to="/user_office/payment/verification">
                    <CustomButton className="hidden-smMinus" text="Buy token"/>
                    <Button className="visible-smMinus" text="Buy token"/>
                </ButtonWrapper>
            </Wrapper>
        )
    }
};


const mapStateToProps = ({Phase, ICOInfo, Timer, Invest}) => ({

    timerTime: Timer.get('timerTime'),
    phaseName: Phase.get('name'),
    gainedMoney: ICOInfo.get('total_supply'),
    hardCup: Phase.get('hard_cap'),
    startTime: Phase.get('begin_date'),
    endTime: Phase.get('end_date'),
    bonusPercents: Phase.get('bonus_percents'),
    countdownTime: ICOInfo.get('countdownTime'),
    tokenPrice: Invest.get('tokenPrice')
})

const mapDispatchToProps = (dispatch) => ({
    updateCountdown(payload) {
        dispatch(ICOInfoActions.updateCountdown(payload))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ICOProgress)

const Wrapper = styled.div`
    flex: 1;
    height: auto;
    margin-top: 20px;
    padding: 42px 50px 65px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    ${media.xs} {
        padding: 20px 16px 32px;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    ${media.smMinus} {
        flex-wrap: wrap;
        margin-bottom: 0;
    }
    ${media.xs} {
        font-size: 16px;
    }
`;

const WrapperHeaderInfo = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: flex-start;
    margin-bottom: 46px;
    ${media.smMinus} {
        flex-basis: 100%;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-bottom: 30px;
    }
`;

const Head = styled.h3`
    font-size: 20px;
    font-weight: 500;
    color: #323c47;
    letter-spacing: 0.1px;
    ${media.smMinus} {
        flex-basis: 100%;
        margin-bottom: 30px;
    }
`;

const PartWrapper = styled.div`
    margin-left: 50px;
    ${media.smMinus} {
        margin-left: 0;
        flex-basis: 50%;
    }
    &:nth-of-type(2) {
        border-left: 1px solid rgb(233, 233, 233);
        border-right: 1px solid rgb(233, 233, 233);
        padding: 0 45px;
        ${media.smMinus} {
            border: none;
            padding-right: 0;
        }
        ${media.xsh} {
            min-width: 155px;
            flex-basis: unset;
        }
    }
    &:nth-of-type(4) {
        padding: 0 45px;
        ${media.smMinus} {
            padding-right: 0;
        }
        ${media.xsh} {
            min-width: 155px;
            flex-basis: unset;
        }
    }
    &:nth-of-type(1), &:nth-of-type(2) {
        ${media.xs} {
            margin-bottom: 20px;
        }
    }
    &:nth-of-type(1), &:nth-of-type(3) {
        ${media.xs} {
            flex: 1;
        }
    }
    &:nth-of-type(2), &:nth-of-type(4) {
        ${media.xs} {
            padding: 0;
            flex-basis: 50%;
        }
    }
    &:nth-of-type(1), &:nth-of-type(2), &:nth-of-type(3), &:nth-of-type(4) {
        ${media.xsh} {
            flex: unset;
            flex-basis: 100%;
            margin-bottom: 20px;
        }
    }

`;

const DescHead = styled.div`
    font-size: 14px;
    color: #000000;
    padding-bottom: 5px;
    white-space: nowrap;
    ${media.xs} {
        font-size: 12px;
        padding-bottom: 0;
    }
`;

const Desc = styled.div`
    color: ${props => props.blue ? '#3476fc' : '#000000'};
    font-size: 18px;
    font-weight: ${props => props.bold ? '600' : '500'};
    white-space: nowrap;
    ${media.smMinus} {
        color: #3476fc;
    }
    ${media.xs} {
        font-size: 4vw;
    }
    ${media.xsh} {
        font-size: 14px;
    }
    & span {
        color: black;
        font-weight: ${props => props.bold ? '600' : '500'};
        ${media.smMinus} {
            color: #3476fc;
        }
    }
`;

const TimerWrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
`;

const TimeBlock = styled.div`
    font-weight: ${props => props.bold ? '600' : '500'};
    font-size: 18px;
    color: #3476fc;
    position: relative;
    ${media.xs} {
        font-size: 4vw;
    }
    ${media.xsh} {
        font-size: 14px;
    }
    &:not(:last-of-type) {
        padding-right: 15px;
        &:after {
            content: ':';
            display: block;
            color: #3476fc;
            position: absolute;
            top: -2px;
            right: 5px;
            ${media.xs} {
                top: -1px;
            }
        }
    }
`;

const BonusInfoText = styled.p`
    font-size: 18px;
    color: rgb(49, 114, 253);
    text-align: center;
    display: block;
    white-space: nowrap;
    margin-bottom: 17px;
    ${media.xs} {
        font-size: 14px;
    }
`;

const ButtonWrapper = styled(Link)`
    width: 250px;
    height: 68px;
    margin: 0 auto 0;
    display: block;
    ${media.xs} {
        height: 47px;
        width: 100%;
    }
`;
