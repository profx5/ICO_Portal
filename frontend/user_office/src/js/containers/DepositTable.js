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
    BTC: 'https://www.blockchain.com/en/btc/tx/'
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

    _renderTitle = (item) => {
        let amount = item.get('payment').size > 0 ? parseFloat(item.getIn(['payment', '0', 'amount'])) +
            ' ' + item.getIn(['payment', '0', 'currency']) : '-';
        return (
            <div className='uk-accordion-title'>
                <FlexContainer className={item.getIn(['transfer', 'state']) === 'ACTUAL' ? 'prepared' : ''}>
                    <FlexItem
                        width={15}>{moment(item.get('created_at')).format('YYYY-MM-DD HH:mm:ss')} {item.get('id')}</FlexItem>
                    <FlexItem position={'relative'} width={40} failed={item.getIn(['transfer', 'state']) === 'FAILED'}>
                        <span className='txn'>{item.getIn(['transfer', 'txn_hash']).substr(0, 46)}...</span>
                        {item.getIn(['transfer', 'state']) !== 'FAILED' &&
                        <IconImgAbsolute right={1} src={iconCheckGreen}/> ||
                        <IconImgAbsolute className={'border'} right={1} src={iconReload}/>}

                    </FlexItem>
                    <FlexItem width={15} color>{amount}</FlexItem>
                    <FlexItem width={15} color>{item.get('usd_value', '-')}</FlexItem>
                    <FlexItemColor width={15} failed={item.getIn(['transfer', 'state']) === 'FAILED'}
                                   up={item.get('direction') === 'IN'}>
                        <span>{item.get('direction') === 'IN' && '+' || '-'}{item.get('amount')}</span>
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

    _renderContent = (item) => {
        const { openedTxn } = this.props;
        let content = false;
        if (item.get('payment').size > 0) {
            content = chainResolver[item.getIn(['payment', '0', 'currency'])] + item.getIn(['payment', '0', 'txn_id']);
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
                                <col width="89%"/>
                                <col width="2%"/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <td>Transfer:</td>
                                <td>https://etherscan.io/tx/{item.getIn(['transfer', 'txn_hash'])}</td>
                                <td><IconImg src={iconCheckGreen} alt=""/></td>
                            </tr>
                            {content &&
                            <tr>
                                <td>Payment:</td>
                                <td>{content}</td>
                                <td><IconImg src={iconCheckGreen} alt=""/></td>
                            </tr>
                            }
                            </tbody>
                        </Table>
                        <Divider/>
                        <FlexContainer>
                            <Block>
                                <Head>
                                    Calculated token amount
                                </Head>
                                <Content>
                                    2.123467 ETH x 576.38 USD = 1223.15 USD <br/>
                                    Phase №2 bonus = 50% <br/>
                                    Token base price = 1 USD <br/>
                                    Base tokens: 1223.15 USD/1 = 1223.15 VERA <br/>
                                    Bonus tokens: 1223.15 x 50% = 611.58 VERA <br/>
                                </Content>
                            </Block>
                            <Block>
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
                            </Block>
                        </FlexContainer>
                        <Divider/>
                        <Right>
                            Total: = <span>+1823.77 VERA</span>
                        </Right>
                        <br/>
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
