import React from 'react'
import styled from 'styled-components';
import {media} from './../../../utils/media';


const BonusSheet = () => {
    return (
        <Wrapper>
            <Head>Progressive bonus</Head>
            <TableWrapper>
                <div className="row">
                    <div className="part">Purchases from $150 to $999</div>
                    <div className="part">Get 20% bonus!</div>
                </div>
                <div className="row">
                    <div className="part">Purchases with the value of $1 000 +</div>
                    <div className="part">Get special bonus of 40%!</div></div>
            </TableWrapper>
        </Wrapper>
    )
}


export default BonusSheet;

const Wrapper = styled.div`
    flex: 1;
    height: auto;
    margin-top: 42px;
    padding: 42px 50px 65px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    ${media.xs} {
        margin-top: 12px;
        padding: 15px 17px 32px;
    }
`;

const Head = styled.h3`
    font-size: 20px;
    font-weight: 500;
    color: #323c47;
    letter-spacing: 0.1px;
    margin-bottom: 40px;
    ${media.xs} {
        font-size: 16px;
        margin-bottom: 27px;
    }
`;

const TableWrapper = styled.div`
    .row {
        display: flex;
        border-radius: 2px;
        ${media.sm} {
            height: 100px;
        }
        ${media.xs} {
            height: 64px;
        }
        ${media.smMinus} {
            flex-wrap: wrap;
            border: 1px solid #d6dfe6;
        }
        &:first-of-type {
            margin-bottom: 20px;
        }
        .part {
            flex-basis: 50%;
            padding-left: 32px;
            line-height: 70px;
            font-weight: 600;
            height: 70px;
            border: 1px solid #d6dfe6;
            ${media.smMinus} {
                flex-basis: 100%;
                border: none;
                text-align: center;
                line-height: unset;
                height: auto;
                padding-left: 0;
            }
            ${media.xs} {
                font-size: 13px;
            }
            &:first-of-type {
                color: #0a0a0a;
                border-top-left-radius: 2px;
                border-bottom-left-radius: 2px;
                ${media.sm} {
                    padding-top: 14px;
                }
                ${media.smMinus} {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                ${media.xs} {
                    padding-top: 7px;
                }
            }
            &:last-of-type {
                color: #3375fc;
                border-left: none;
                border-top-right-radius: 2px;
                border-bottom-right-radius: 2px;
            }
        }
    }
`;
