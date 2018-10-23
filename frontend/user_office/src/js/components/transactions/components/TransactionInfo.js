import React, {Component} from 'react'
import styled from 'styled-components';

import iconCheckGreen from './../../../../img/check-green.svg';


const TransactionsInfo = ({transferHashLink, payementHashLink, amount, currency, rate_usdc, usdc_value, bonus_percent, tokens}) => {
    
    const rateUSD = (rate_usdc / 100).toFixed(2),
        USDValue = usdc_value.toFixed(2),
        baseTokens = (USDValue / 2).toFixed(2),
        bonusTokens = (USDValue / 2 * bonus_percent / 100).toFixed(2)

    return (
        <Wrapper>
            <InfoBlock>
                <div className="TransactionContent_head">Blockchain transactions</div>
                <div>
                    <div className="TransactionContent_info">
                        <div className="TransactionContent_propertyName">Payment:</div>
                        <div className="TransactionContent_propertyLink"><a target="_blank" href={payementHashLink}>{payementHashLink}</a></div>
                        <div className="TransactionContent_propertyIconWrapper"><img alt="" src={iconCheckGreen}/></div>
                    </div>
                    {transferHashLink && 
                        <div className="TransactionContent_info">
                            <div className="TransactionContent_propertyName">Transfer:</div>
                            <div className="TransactionContent_propertyLink"><a target="_blank" href={transferHashLink}>{transferHashLink}</a></div>
                            <div className="TransactionContent_propertyIconWrapper"><img alt="" src={iconCheckGreen}/></div>
                        </div>
                    }
                </div>
            </InfoBlock>
            
            <InfoBlock>
                <Part className="Info_part-1">
                    <div className="Info_head">Calculated token amount</div>
                    <div className="Info_partContent">

                        <div>{`${amount} ${currency} x ` + rateUSD + " USD = " + USDValue + " USD"}<br/></div>
                        <div>{"Phase bonus = " + bonus_percent + "%"}<br/></div>
                        <div>Token base price = 2 USD <br/></div>
                        <div>{"Base tokens: " + USDValue + " USD / 2 = " + baseTokens + " OGD"}<br/></div>
                        <div>{"Bonus tokens: " + baseTokens + " x " + bonus_percent + "% = " + bonusTokens + " OGD"}<br/></div>
                        <div>{"Total: " + tokens}<br/></div>

                    </div>
                </Part>
                <Part className="Info_part-2">
                    <div className="Info_head">Referral bonuses</div>
                    <div className="Info_partContent">—</div>
                </Part>
                <Part className="Info_part-3">
                    <div className="Info_head">Withdrawal</div>
                    <div className="Info_partContent">—</div>
                </Part>
            </InfoBlock>
        </Wrapper>
    )
}


export default TransactionsInfo;

const Wrapper = styled.div`
    flex-basis: 100%;
    border-left: 2px solid rgb(67, 129, 252);
    padding-left: 30px;
    display: flex;
    flex-flow: row wrap;
`;

const InfoBlock = styled.div`
    flex-basis: 100%;
    &:first-of-type {

    }
    &:last-of-type {
        display: flex;
        border-top: 1px solid rgba(151, 151, 151, .2);
        border-bottom: 1px solid rgba(151, 151, 151, .2);
        padding: 35px 0 10px;
        margin-top: 20px;
        margin-bottom: 35px;
    }
    .TransactionContent_head {
        font-weight: 600;
        margin-bottom: 20px;
        font-size: 18px;
    }

    .TransactionContent_info {
        flex-basis: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .TransactionContent_propertyName {
        min-width: 80px;
    }
    .TransactionContent_propertyLink {
        flex: 1;
    }
    .TransactionContent_propertyIconWrapper {
        width: 35px;
        img {
            width: 22px;
            height: auto;
            float: right;
        }
    }
`;

const Part = styled.div`
    flex-basis: 33.33333%;
    &.Info_part-1 {
        padding-right: 15px;
        .Info_partContent {
            div {
                margin-bottom: 10px;
            }
        }
    }
    &.Info_part-2 {
        border-left: 1px solid rgba(151, 151, 151, .2);
        border-right: 1px solid rgba(151, 151, 151, .2);
    }
    &.Info_part-3 {

    }
    &.Info_part-2, &.Info_part-3 {
        position: relative;
        .Info_head {
            padding-left: 35px;
        }
        .Info_partContent {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .Info_head {
        font-weight: 600;
        margin-bottom: 20px;
        font-size: 18px;
    }
    .Info_head ~ div {
        margin-bottom: 10px;
    }
`;
