import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';

import Utils from './../utils/index';

import * as ICOInfoActions from './../actions/ICOInfoActions';
import * as TimerActions from './../actions/TimerActions';

import clockImg from './../../img/icon_progress.svg';
import Button from './../components/Button';



class ICOProgress extends React.Component {

    componentWillMount () {
        this.props.getICOInfo();
    }

    componentDidUpdate() {
        const {startTime, endTime, countdownTime, updateCountdown} = this.props;
        if (countdownTime === '') Utils.setTimer(startTime, endTime, updateCountdown);
    }

    getPhasePercents = (current, goal) => current / goal * 100;


    render() {
        const {
            USDcRaised,
            phaseName,
            discountPercent,
            hardCapUSDc,
            countdownTime,
            updateCountdown
        } = this.props;

        const raisedAmountString = USDcRaised + '';
        let phaseRaisedPercents = this.getPhasePercents(USDcRaised, hardCapUSDc);
        return (
            <Wrapper>
                <Header>
                    <Head>ICO Progress</Head>
                    <WrapperHeaderInfo>
                        <Text>Current phase: <Span>{phaseName}</Span></Text>
                        <Text>Current bonus: <Span>{discountPercent}%</Span></Text>
                        <Text>Funds raised: <Span colored>{Utils.splitDigits(raisedAmountString)} USD</Span></Text>
                    </WrapperHeaderInfo>
                </Header>
                <Content>
                    <ContentPart>
                        {<ContentProgressCell noBorderBottom progress={phaseRaisedPercents === 0 ? '2%' : phaseRaisedPercents + '%'}>
                            {Utils.formatMoney(USDcRaised)} USD / {Utils.formatMoney(hardCapUSDc)} USD
                        </ContentProgressCell>}

                        <ContentCell bold noBorderBottom>{phaseName}</ContentCell>
                        <ContentCell noBorderBottom>Current bonus: {discountPercent}%</ContentCell>
                        <ContentCell>Remaining:
                            <Span colored>&nbsp;{countdownTime}</Span>
                        </ContentCell>
                    </ContentPart>
                    <ContentPart>
                        <ContentCell noBorderBottom background="#ececec">Expectation</ContentCell>
                        <ContentCell noBorderBottom>ICO phase 1</ContentCell>
                        <ContentCell noBorderBottom>ICO phase 2</ContentCell>
                        <ContentCell noBorderBottom>ICO phase 3</ContentCell>
                        <ContentCell statusCell></ContentCell>
                        <ContentCell statusCell></ContentCell>
                        <ContentCell statusCell></ContentCell>
                    </ContentPart>
                </Content>
                <ButtonWrapper>
                    <Button text='Buy TKN'/>
                </ButtonWrapper>
            </Wrapper>
        )
    }
};


const mapStateToProps = ({ICOInfo, Timer}) => ({

    timerTime: Timer.get('timerTime'),
    USDcRaised: ICOInfo.get('USDcRaised'),
    phaseName: ICOInfo.getIn(['currentPhase', 'name']),
    discountPercent: ICOInfo.getIn(['currentPhase', 'discountPercent']),
    startTime: ICOInfo.getIn(['currentPhase', 'startTime']),
    endTime: ICOInfo.getIn(['currentPhase', 'endTime']),
    hardCapUSDc: ICOInfo.getIn(['currentPhase', 'hardCapUSDc']),
    countdownTime: ICOInfo.get('countdownTime')
})

const mapDispatchToProps = (dispatch) => ({
    getICOInfo() {
        dispatch(ICOInfoActions.getICOInfoRequest())
    },
    updateCountdown(payload) {
        dispatch(ICOInfoActions.updateCountdown(payload))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ICOProgress)


const Wrapper = styled.div`
    flex: 1;
    height: auto;
    margin-top: 42px;
    padding: 42px 30px 34px;
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
    align-items: center;
    margin-bottom: 46px;
`;

const Head = styled.h3`
    font-size: 20px;
    font-weight: 500;
    color: #323c47;
    letter-spacing: 0.1px;
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

const ContentCell = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: ${props => props.bold ? '600' : '500'}

    color: ${props => props.color || '#233539'}

    height: ${props => props.statusCell ? '90px' : '45px'};

    background: ${props => props.statusCell ? `url(${clockImg}) no-repeat center` : props.background || 'unset'};

    border-top: ${props => props.noBorderTop ? 'none' : 'solid 1px #d6dfe6'};
    border-right: ${props => props.noBorderRight ? 'none' : 'solid 1px #d6dfe6'};
    border-bottom: ${props => props.noBorderBottom ? 'none' : 'solid 1px #d6dfe6'};

`;

const ContentProgressCell = ContentCell.extend`
    position: relative;
    z-index: 1;
    color: #ffffff;
    background: rgba(79,221,190,.55);
    &:before {
        content: '';
        background: linear-gradient(to right, #87f0e0, #4fddbe);
        z-index: -1;
        display: block;
        position: absolute
        left: 0;
        top: 0;
        height: 100%;
        width: ${props => props.progress || '0%'};
    }
`;

const ButtonWrapper = styled.div`
    width: 165px;
    margin-left: auto;
    margin-top: 30px;
`;