import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Utils from './../../utils/index';

import ProgressBar from './components/ProgressBar';
import Timer from './components/Timer';
import CustomButton from './../common/CustomButton';

import * as ICOInfoActions from './../../actions/ICOInfoActions';

import dotsIcon from './../../../img/dots.svg';


class ICOProgress extends React.Component {

    componentDidUpdate() {
        const {startTime, endTime, countdownTime, updateCountdown} = this.props;
        if (countdownTime === '') Utils.setTimer(startTime, endTime, updateCountdown);
    }

    getPhasePercents = (current, goal) => current / goal * 100;

    render() {
        const {gainedMoney, countdownTime} = this.props;

        const raisedAmountNum = Math.ceil(parseInt(gainedMoney, 10));
        const raisedAmountStr = Utils.splitDigits(Math.ceil(parseInt(gainedMoney, 10)/100)) + ' USD';

        return (
            <Wrapper>
                <Header>
                    <Head>ICO Progress</Head>
                    <WrapperHeaderInfo>
                        <PartWrapper>
                            <DescHead>Base price:</DescHead>
                            <Desc blue bold>1 OGD = 10 USD</Desc>
                        </PartWrapper>
                        <PartWrapper>
                            <DescHead>Deposit:</DescHead>
                            <Desc blue bold><span>Min deposit = </span>5 USD</Desc>
                        </PartWrapper>
                        <PartWrapper>
                            <DescHead>Funds raised:</DescHead>
                            <Desc bold>{raisedAmountStr}</Desc>
                        </PartWrapper>
                    </WrapperHeaderInfo>
                </Header>
                <ProgressBar raisedAmountNum={raisedAmountNum}>
                    <Timer countdownTime={countdownTime}/>
                </ProgressBar>
                <BonusInfoText>Bonuses are going to end up soon!</BonusInfoText>
                <ButtonWrapper to="/user_office/payment">
                    <CustomButton text="Buy token"/>
                </ButtonWrapper>
            </Wrapper>
        )
    }
};


const mapStateToProps = ({Phase, ICOInfo, Timer}) => ({

    timerTime: Timer.get('timerTime'),
    phaseName: Phase.get('name'),
    gainedMoney: ICOInfo.get('total_supply'),
    hardCup: Phase.get('hard_cap'),
    startTime: Phase.get('begin_date'),
    endTime: Phase.get('end_date'),
    bonusPercents: Phase.get('bonus_percents'),
    countdownTime: ICOInfo.get('countdownTime')
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
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
`;

const WrapperHeaderInfo = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: flex-start;
    margin-bottom: 46px;
`;

const Head = styled.h3`
    font-size: 20px;
    font-weight: 500;
    color: #323c47;
    letter-spacing: 0.1px;
`;

const PartWrapper = styled.div`
    margin-left: 50px;
    &:nth-of-type(2) {
        border-left: 1px solid rgb(233, 233, 233);
        border-right: 1px solid rgb(233, 233, 233);
        padding: 0 45px;
    }
`;

const DescHead = styled.div`
    font-size: 14px;
    color: #000000;
`;

const Desc = styled.div`
    color: ${props => props.blue ? '#3476fc' : '#000000'};
    font-size: 18px;
    font-weight: ${props => props.bold ? '600' : '500'};
    padding-top: 5px;
    & span {
        color: black;
        font-weight: ${props => props.bold ? '600' : '500'};
    }
`;

const BonusInfoText = styled.p`
    font-size: 18px;
    color: rgb(49, 114, 253);
    text-align: center;
    display: block;
    white-space: nowrap;
`;

const ButtonWrapper = styled(Link)`
    width: 250px;
    height: 68px;
    margin: 17px auto 0;
    display: block;
`;

const StyledButton = styled.button`
    background: rgb(248, 79, 119);
    width: 100%;
    height: 100%;
    text-transform: uppercase;
    border-radius: 100px;
    font-size: 16px;
    color: white;
    text-align: center;
    font-weight: 500;
    position: relative;
    cursor: pointer;
    &:after {
        content: url(${dotsIcon});
        position: absolute;
        top: 50%;
        right: 25px;
        transform: translateY(-50%);
    }
`;
