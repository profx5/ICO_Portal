import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';

import Roadmap from './Roadmap';

import Utils from './../utils/index';

import * as ICOInfoActions from './../actions/ICOInfoActions';

import clockImg from './../../img/icon_progress.svg';
import Button from './../components/Button';

import { Link } from 'react-router-dom';



class ICOProgress extends React.Component {

    componentDidUpdate() {
        const {startTime, endTime, countdownTime, updateCountdown} = this.props;
        if (countdownTime === '') Utils.setTimer(startTime, endTime, updateCountdown);
    }

    getPhasePercents = (current, goal) => current / goal * 100;

    render() {
        const {
            gainedMoney,
            hardCup,
            phaseName,
            bonusPercents,
            countdownTime,
        } = this.props;

        const raisedAmountString = Math.round(parseInt(gainedMoney, 10)/100) + ' USD';
        let hardCupNumber = parseInt(hardCup, 10);
        let phaseRaisedPercents = this.getPhasePercents(gainedMoney, hardCupNumber);

        return (
            <Wrapper>
                <Header>
                    <Head>ICO Progress</Head>
                    <WrapperHeaderInfo>
                        <PartWrapper>
                            <DescHead>Base price:</DescHead>
                            <Desc blue bold>1 Vera = 2 USD</Desc>
                        </PartWrapper>
                        <PartWrapper>
                            <DescHead>Minimal deposit:</DescHead>
                            <Desc blue><span>Min deposit = </span>10$</Desc>
                        </PartWrapper>
                        <PartWrapper>
                            <DescHead>Bonuses:</DescHead>
                            <Desc blue><span>From 8000$ = </span>20% <span>Bonus!</span></Desc>
                            <Desc blue><span>From 20000$ = </span>30% <span>Bonus!</span></Desc>
                        </PartWrapper>
                        <PartWrapper>
                            <DescHead>Funds raised:</DescHead>
                            <Desc>{raisedAmountString}</Desc>
                        </PartWrapper>
                    </WrapperHeaderInfo>
                </Header>
                <Roadmap/>
                <ButtonWrapper to="/user_office/payment">
                    <Button text='Buy tokens'/>
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
`;

const DescHead = styled.div`
    font-size: 14px;
    color: #000000;
`;

const Desc = styled.div`
    color: ${props => props.blue ? '#3476fc' : '#000000'};
    font-size: 20px;
    font-weight: ${props => props.bold ? '600' : '500'};
    padding-top: 5px;
    & span {
        color: black;
        font-weight: 500;
    }
`;

const Text = styled.p`
    &:not(:only-child):not(:first-child):before {
        content: '';
        display: inline-block;
        width: 1px;
        height: 20px;
        margin: 0 23px;
        opacity: 0.3;
        background: #282b2a;
        position: relative;
        top: 4px;
    }
`;

const Span = styled.span`
    font-weight: 600;
    letter-spacing: normal;
    color: ${props => props.colored ? '#4fddbe' : '#323c47'};
`;

const Content = styled.div`
    display: flex;
    flex-flow: row nowrap;
`;

const ContentPart = styled.div`
    display: inline-flex;
    flex-flow: row wrap;
    align-items: flex-start;
    &:first-of-type {
        flex-basis: 57%;
        border-left: solid 1px #d6dfe6;
        div {
            flex-basis: 100%;
        }
    }
    &:last-of-type {
        flex-basis: 43%;
        div {
            &:first-of-type {
                flex-basis: 100%;
            }
            &:not(:first-of-type) {
                flex-basis: 33.33%;
            }
        }
    }
`;

const BottomText = styled.p`
    text-align: center;
    color: #3577fc;
`;

const ButtonWrapper = styled(Link)`
    width: 250px;
    height: 68px;
    margin: 17px auto 0;
    display: block;
`;
