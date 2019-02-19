import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Timer = ({countdownTime, className}) => {

    return (
        <React.Fragment>
            <Head className={className}>End of the first phase:</Head>
            <Wrapper className={className}>
                <TimeBlock data-time-unit="days">{countdownTime.days}</TimeBlock>
                <TimeBlock data-time-unit="hours">{countdownTime.hours}</TimeBlock>
                <TimeBlock data-time-unit="min">{countdownTime.minutes}</TimeBlock>
                <TimeBlock data-time-unit="sec">{countdownTime.seconds}</TimeBlock>
            </Wrapper>
        </React.Fragment>
    )
}

Timer.propTypes = {
    countdownTime: PropTypes.object.isRequired,
}


export default Timer;

const Head = styled.span`
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    margin-top: 35px;
    margin-bottom: 15px;
    display: block;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 84px;
`;

const TimeBlock = styled.div`
    width: 65px;
    height: 65px;
    border-radius: 3px;
    background-color: rgb(52, 78, 172);
    position: relative;
    text-align: center;
    color: white;
    font-size: 26px;
    font-weight: 600;
    letter-spacing: 0.8px;
    padding-top: 7px;
    &:not(:first-of-type) {
        margin-left: 23px;
    }
    &:not(:first-of-type):before {
        content: ':';
        font-weight: 500;
        font-size: 24px;
        color: rgb(31, 31, 31);
        position: absolute;
        left: -15px;
        top: 50%;
        transform: translateY(-50%);
    }
    &:after {
        content: attr(data-time-unit);
        font-size: 12px;
        font-weight: 400;
        color: white;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        position: absolute;
        left: 50%;
        bottom: 9px;
        transform: translateX(-50%);
    }
`;
