import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components';
import moment from "moment";
import iconCheckGreen from './../../img/check-green.svg';
import iconReload from './../../img/shape.svg';
import iconQuestion from './../../img/icons/icon_faq.svg';
import * as UIActions from './../actions/UIActions';

const chainResolver = {
    ETH: 'https://etherscan.io/tx/',
    BTC: 'https://www.blockchain.com/en/btc/tx/',
    LTCT: 'https://chain.so/tx/LTCTEST/'
};


class DepositTable extends Component {

    _renderAccordionItems = (deposits) => {
        return deposits.map(item => {
            return (
                <li key={item.get('id')}>
                    {this._renderTitle(item)}
                    {this._renderContent(item)}
                </li>
            )
        })
    };

    _getAmount = (item) => {
        return item.get('payment').size > 0 ? parseFloat(item.getIn(['payment', '0', 'amount'])) : 0
    }
    _getAmountString = (item) => {
        return this._getAmount(item) > 0 ? this._getAmount(item) + ' ' + item.getIn(['payment', '0', 'currency']) : '-'
    }

    _getUSDValue = (item) => {
        return item.get('payment').size > 0 ? parseFloat(item.getIn(['payment', '0', 'usdc_value'])) / 100 : 0
    }
    _getUSDValueString = (item) => {
        return this._getUSDValue(item) > 0 ? this._getUSDValue(item).toFixed(2) : '-'
    }

    _getTransferTxnHash = (item) => {
        return item.getIn(['transfer', 'txn_hash'])
    }

    _getState = (item) => {
        return item.getIn(['transfer', 'state'])
    }

    _getTransferLinkAddress = (item) => {
        return chainResolver['ETH'] + this._getTransferTxnHash(item)
    }
    _getTransferLink = (item) => {
        const txnHash = this._getTransferTxnHash(item)

        if (txnHash) {
            return (
                <a href={chainResolver['ETH'] + txnHash} target="_blank">{txnHash}</a>
            )
        } else {
            return '-'
        }
    }

    _getTokensString = (item) => {
        return (parseFloat(item.get('amount')) / 10 ** 18).toFixed(2)

    }
    _getTokensWSign = (item) => {
        const tokensAmount = parseFloat(item.get('amount')),
              direction = item.get('direction')
        if (tokensAmount > 0) {
            if (direction === 'IN') {
                return '+' + (tokensAmount / 10 ** 18).toFixed(2)
            } else {
                return '-' + (tokensAmount / 10 ** 18).toFixed(2)
            }
        } else {
            return '0.00'
        }
    }

    _renderTitle = (item) => {
        const failed = this._getState(item) === 'FAILED'
        return (
            <div className='uk-accordion-title'>
                <FlexContainer>
                    <FlexItem failed={failed}
                              width={15}>{moment(item.get('created_at')).format('YYYY-MM-DD HH:mm:ss')} {item.get('id')}
                    </FlexItem>
                    <FlexItem position={'relative'} width={35} failed={failed} overflow_x='scroll'>
                        <span className='txn'>{this._getTransferLink(item)}</span>
                    </FlexItem>
                    <FlexItem width={5} failed={failed}>
                        {item.getIn(['transfer', 'state']) === 'ACTUAL' &&
                         <IconImg right={1} src={iconCheckGreen}/> ||
                         <IconImg right={1} src={iconReload}/>}

                    </FlexItem>
                    <FlexItem width={15} color>{this._getAmountString(item)}</FlexItem>
                    <FlexItem width={15} color>{this._getUSDValueString(item)}</FlexItem>
                    <FlexItemColor width={15} ffailed={failed}
                                   up={item.get('direction') === 'IN'}>
                        <span>{this._getTokensWSign(item)}</span>
                        <IconImgAbsolute className='more' onClick={this.toggleContent.bind(this, item.get('id'))} right={25} src={iconQuestion}/>
                    </FlexItemColor>
                </FlexContainer>
            </div>
        )
    };

    toggleContent = (id) => {
        const { setOpenedTxn, openedTxn } = this.props;
        if (openedTxn == null || (openedTxn !== id)) {
            setOpenedTxn(id);
        } else {
            setOpenedTxn(null);
        }
    };

    _get_calculations = (item) => {
        const {
            amount,
            currency,
            rate_usdc,
            usdc_value,
            bonus_percent
        } = item.get('payment').get(0).toJS();

        const paymentAmount = this._getAmountString(item),
              rateUSD = parseFloat(rate_usdc) / 100,
              rateUSDString = rateUSD.toFixed(2),
              USDValue = parseFloat(usdc_value) / 100,
              USDValueString = this._getUSDValueString(item),
              baseTokens = (USDValue / 2),
              baseTokensString = (USDValue / 2).toFixed(2),
              bonusTokens = baseTokens * bonus_percent / 100,
              bonusTokensString = bonusTokens.toFixed(2),
              total = this._getTokensString(item)
        return (
            <Content>
                {paymentAmount + " x " + rateUSDString + " USD = " + USDValueString + " USD"}<br/>
            {"Phase bonus = " + bonus_percent + "%"}<br/>
            Token base price = 2 USD <br/>
            {"Base tokens: " + USDValueString + " USD / 2 = " + baseTokensString + " VERA"}<br/>
            {"Bonus tokens: " + baseTokensString + " x " + bonus_percent + "% = " + bonusTokensString + " VERA"}<br/>
            {"Total: " + total}<br/>
            </Content>
        )
    }

    _renderContent = (item) => {
        const { openedTxn } = this.props;
        let paymentLink = false;

        const transferLink = this._getTransferLinkAddress(item)

        const paymentExists = item.get('payment').size > 0;
        if (paymentExists) {
            paymentLink = chainResolver[item.getIn(['payment', '0', 'currency'])] + item.getIn(['payment', '0', 'txn_id']);
        }

        return (
            <AccordionContent className='uk-accordion-content' active={openedTxn === item.get('id')}>
                <ContentWrapper>
                    <TxInfoWrapper>
                        <Head>
                            Blockchain transactions
                        </Head>
                        <Table>
                            <colgroup>
                                <col width="9%"/>
                                {/* <col width="89%"/>
                                    <col width="2%"/> */}
                            </colgroup>
                            <tbody>
                                {this._getTransferTxnHash(item) &&
                                 <tr>
                                     <td>Transfer:</td>
                                     <td><a href={transferLink} target="_blank">{transferLink}</a></td>
                                     {transferLink !== '-' &&
                                      <td><IconImg src={iconCheckGreen} alt=""/></td>}
                                 </tr>
                                }
                                {paymentExists &&
                                 <tr>
                                     <td>Payment:</td>
                                     <td><a href={paymentLink} target="_blank">{paymentLink}</a></td>
                                     <td><IconImg src={iconCheckGreen} alt=""/></td>
                                 </tr>
                                }
                            </tbody>
                        </Table>
                        <Divider/>
                        <FlexContainer>
                            {paymentExists && this._getState(item) === "ACTUAL" &&
                             <Block>
                                 <Head>
                                     Calculated token amount
                                 </Head>
                                 {this._get_calculations(item)}
                             </Block>
                            }

                            {/* <Block>
                                <Head>
                                Referal bonuses
                                </Head>
                                <Content>
                                -
                                </Content>
                                </Block>
                                <Block>
                                <Head>Withdrawal</Head>
                                <Content>
                                -
                                </Content>
                                </Block> */}
                        </FlexContainer>
                        {/* <Divider/>
                            <Right>
                            Total: = <span>+1823.77 VERA</span>
                            </Right>
                            <br/> */}
                    </TxInfoWrapper>
                </ContentWrapper>
            </AccordionContent>
        )
    };

    render() {
        const { deposits } = this.props;
        return (
            <Wrapper>
                <FlexContainer>
                    <FlexItem className={'head'} width={15}>Time</FlexItem>
                    <FlexItem className={'head'} width={40}>Transaction</FlexItem>
                    <FlexItem className={'head'} width={15}>Amount</FlexItem>
                    <FlexItem className={'head'} width={15}>USD value</FlexItem>
                    <FlexItem className={'head'} width={15}>Vera&nbsp;Tokens</FlexItem>
                </FlexContainer>
                {deposits.size > 0 &&
                <Accordion>
                    {this._renderAccordionItems(deposits)}
                </Accordion>
                }
                {deposits.size === 0 &&
                <NoTransactionsDiv>
                    You have no transactions yet
                </NoTransactionsDiv>
                }

            </Wrapper>
        )
    }
}

const mapStateToProps = ({deposits, UI}) => ({
    deposits: deposits.get('results'),
    currentPage: deposits.get('current_page'),
    openedTxn: UI.get('openedTxn')
});

const mapDispatchToProps = (dispatch) => ({
    setOpenedTxn(id) {
        dispatch(UIActions.setOpenedTxn(id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DepositTable)
const NoTransactionsDiv = styled.div`
    background-color: #f6f6f6;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.56;
    color: #233539;
    padding: 10px;
`;
const Accordion = styled.ul`
    list-style: none;
    & li.active > .uk-accordion-title {
        color: #4381fc;
    }
`;

const AccordionContent = styled.div`
    height: ${props => props.active ? 'auto': '0'};
    overflow-y: auto;
`;

const Right = styled.div`
    float: right;
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.88;
    letter-spacing: 0.4px;
    & span{
      color: #11cd56;
    }
`;

const IconImgAbsolute = styled.img`
    width: 22px;
    height: 22px;
    position: absolute;
    top: 20px;
    right: ${props => props.right ? props.right + '%' : '5%'};
    &.more {
        cursor: pointer;
    }
    &.border {
        border: solid 1px rgba(151,151,151,0.5);
        border-radius: 50%;
    }
`;

const IconImg = styled.img`
    width: 22px;
    height: 22px;
`;
const Content = styled.div`
        font-family: Gilroy;
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.88;
    letter-spacing: 0.4px;
    color: #000000;
`;

const Table = styled.table`
  height: 101px;
  font-family: Gilroy;
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.88;
  letter-spacing: 0.4px;
  color: #000000;
`;

const Block = styled.div`
    border-right: 1px solid rgba(151,151,151,0.2);
    width: 33%;
    margin-right: 20px;
    &:last-child {
        border-right: none;
    }
`;
const Head = styled.h3`
    font-family: Gilroy;
    font-size: 18px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.1px;
    color: #323c47;
    margin-bottom: 23px;
`;

const ContentWrapper = styled.div`
    background: rgba(174, 200, 255, 0.07);
    padding: 38px 0;
    width: 100%;
`;

const TxInfoWrapper = styled.div`
    margin-left: 85px;
    border-left: 3px solid #4381fc;
    padding-left: 29px;
    width: 88%
`;


const Divider = styled.hr`
    width: 100%;
    color: #979797;
    opacity: 0.2;
     margin: 25px 0;
`;

const Wrapper = styled.div`
    border-radius: 6px;
    background-color: #ffffff;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    padding-top: 42.2px;
    margin-top: 30px
`;

const FlexContainer = styled.div`
    display: flex;
`;

const FlexItem = styled.div`
    width: ${props => props.width ? props.width + '%' : 'auto'};
    text-align: center;
    flex-shrink: 0;
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 500;
    line-height: 66px;
    letter-spacing: 0.1px;
    // color: ${props => props.color ? '#031949' : props => props.failed ? 'rgba(0,0,0,0.2)' : '#000000'};
    border-top: 1px solid rgba(150, 150, 150, 0.2);
    height: 66px;
    position: ${props => props.position ? props.position : 'inherit' }
    overflow-x: ${props => props.overflow_x ? props.overflow_x : 'inherit' }
    &.head {
        border-top: none;
        opacity: 0.4;
        font-family: Gilroy;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 66px;
        letter-spacing: normal;
        text-align: center;
        // color: #0a0a0a;
        height: 66px;
    }
    .txn {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        -moz-binding: url('assets/xml/ellipsis.xml#ellipsis');
    }
`;

const FlexItemColor = styled.div`
    width: ${props => props.width ? props.width + '%' : 'auto'};
    text-align: left;
    flex-shrink: 0;
    font-size: 16px;
    font-weight: 500;
    line-height: 66px;
    letter-spacing: 0.1px;
    position: relative;
    color: ${props => props.failed ? '#031949' : props => props.up ? '#11cd56' : '#ef2028'};
    border-top: 1px solid rgba(150, 150, 150, 0.2);
    height: 66px;
    & span {
        margin-left: 45px;
    }
`;
