import React from 'react'
import styled from 'styled-components';
import {media} from 'js/services/media';


const CurrencyCard = ({className, name, icon, rate, clickHandler, disabled}) => {

    rate = rate > 0.01 ? rate.toFixed(2) : rate.toFixed(4)

    return (
        <Card disabled={disabled} onClick={clickHandler} className={className}>
            <span className="currency-name">{name}</span>
            <span className={`${icon}-alt`}></span>
            <span className="currency-rate">{`${rate} $`}&nbsp;</span>
        </Card>
    )
}


export default CurrencyCard;

const Card = styled.div`
    min-height: 157px;
    width: 170px;
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
    position: relative;
    pointer-events: ${props => props.disabled ? 'none' : 'unset'};
    ${media.xs} {
        width: 46%;
        height: 112px;
        min-height: unset;
        margin-right: 0 !important;
    }
    &:not(:last-of-type) {
        margin-right: 3%;
    }
    &:hover {
        [class^="icon-"] {
            color: rgba(80,154,245,1) !important;
            transform: scale(1.05);
        }
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
        ${media.xs} {
            font-size: 14px;
            order: 2;
        }
    }
    [class^="icon-"] {
        font-size: 50px;
        margin: 20px 0 5px;
        color: rgba(80,154,245,.5);
        transition: all .25s ease;
        ${media.xs} {
            margin: 0 0 5px;
            order: 1;
        }
    }
    .currency-rate {
        font-size: 13px;
        color: rgba(50,60,71,.6);
        transition: color .25s ease;
        white-space: nowrap;
        ${media.xs} {
            font-size: 12px;
            order: 3;
        }
    }
    .CurrencyCard_head, .CurrencyCard_desc {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    .CurrencyCard_head {
        font-size: 16px;
        color: rgb(42,44,47);
        text-align: center;
        top: -35px;
    }
    .CurrencyCard_desc {
        font-size: 14px;
        color: rgba(42,44,47,.6);
        text-align: center;
        bottom: -50px;
    }
`;
