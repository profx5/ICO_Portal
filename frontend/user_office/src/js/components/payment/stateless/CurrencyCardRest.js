import React from 'react'
import styled from 'styled-components';
import {media} from 'js/services/media';


const CurrencyCard = ({className, name, icon, rate, clickHandler}) => {

    let currencyRate = rate > 0.01 ? rate.toFixed(2) : rate.toFixed(4)

    return (
        <Card onClick={clickHandler} className={className}>
            <span className="currency-name">{name}</span>
            <span className={`${icon}-alt`}></span>
            <span className="currency-rate">{`${currencyRate} $`}</span>
        </Card>
    )
}


export default CurrencyCard;

const Card = styled.div`
    width: 110px;
    padding: 14px 16px;
    margin-bottom: 18px;
    display: inline-flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-between;
    border: solid 1px rgba(228, 232, 234, 0.25);
    box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.05);
    transition: all .25s ease;
    cursor: pointer;
    will-change: transform;
    ${media.xs} {
        width: 46.7%;
        height: 163px;
        min-height: unset;
        margin-right: 0 !important;
    }
    &:hover {
        [class^="icon-"] {
            color: rgba(80,154,245,1) !important;
            transform: scale(1.05);
        }
    }
    &:not(:nth-child(5n)) {
        margin-right: 3.37%;
    }
    &.active {
        box-shadow: 0 2px 25px 0 rgba(63, 123, 244, 0.33);
        transform: scale(1.05);
        [class^="icon-"] {
            color: rgba(80,154,245,1) !important;
            transform: scale(1.05);
        }
        .currency-name {
            opacity: 1;
        }
    }
    .currency-name {
        font-size: 18px;
        color: rgb(42,44,47);
        opacity: .5;
        text-align: center;
    }
    [class^="icon-"] {
        font-size: 50px;
        margin: 12px 0;
        color: rgba(80,154,245,.5);
        transition: all .25s ease;
    }
    .currency-rate {
        font-size: 13px;
        color: rgba(50,60,71,.6);
        transition: color .25s ease;
        white-space: nowrap;
    }
`;
