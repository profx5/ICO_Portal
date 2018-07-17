import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components';
import moment from "moment";
import {Accordion} from 'react-uikit3';
import iconCheckGreen from './../../img/check-green.svg';
import iconQuestion from './../../img/icons/icon_faq.svg';


let deposits = [
    {
        transfer: {
            txn_hash: '0x23fjaasfi3rjf8knfj7wg74tsegnzjh47u304',
            state: 'ACTUAL',
        },
        amount: '2',
        usd: '700',
        vera: '1231.12',
        created_at: new Date(),
        success: true
    },
    {
        transfer: {
            txn_hash: '0x23fjaasfi3rjf8knfj7wg74tsegnzjh47u304',
            state: 'ACTUAL',
        },
        amount: '2',
        usd: '700',
        vera: '2312.72',
        created_at: new Date(),
        success: false
    },
    {
        transfer: {
            txn_hash: '0x23fjaasfi3rjf8knfj7wg74tsegnzjh47u304',
            state: 'ACTUAL',
        },
        amount: '2',
        usd: '700',
        vera: '-1825.23',
        created_at: new Date(),
        success: true
    },
];

class DepositTable extends Component {

    _renderAccordionItems = (deposits) => {
        return deposits.map((item, index) => {
            if (index === 3) return;
            return (
                <li key={index}>
                    {this._renderTitle(item, index)}
                    {this._renderContent({})}
                </li>
            )
        })
    };

    _renderTitle = (item, index) => {
        return (
            <div className='uk-accordion-title'>
                <FlexContainer key={index} className={item.transfer.state === 'ACTUAL' ? 'prepared' : ''}>
                    <FlexItem width={6}>{moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}</FlexItem>
                    <FlexItem position={'relative'} width={3} failed={!item.success}>
                        {item.transfer.txn_hash}
                        {item.success &&
                        <IconImgAbsolute right={7} src={iconCheckGreen}/>}
                        {!item.success &&
                        // ToDo change icon
                        <IconImgAbsolute right={7} src={iconQuestion}/>}
                    </FlexItem>
                    <FlexItem width={6} color>{item.amount} BTC</FlexItem>
                    <FlexItem width={6} color>{item.usd}</FlexItem>
                    <FlexItemColor width={6} failed={!item.success} up={item.vera > 0}>
                        {item.vera > 0 && '+'}{item.vera}
                        <IconImgAbsolute right={20} src={iconQuestion}/>
                    </FlexItemColor>
                </FlexContainer>
            </div>
        )

    };

    _renderContent = (body) => {
        return (
            <div className='uk-accordion-content'>
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
                                <td>Payment:</td>
                                <td>https://www.blockchain.com/en/btc/tx/50fe4d94baa49dcf39c77fed722740b52edc339e1bdbb7269cc189e2d6c493d4</td>
                                <td>
                                    <IconImg src={iconCheckGreen} alt=""/>
                                </td>
                            </tr>
                            <tr>
                                <td>Mint:</td>
                                <td>https://etherscan.io/tx/0x570c59648d993ed8df658fcddb79dcb8f51e80f21f0517f582f25502aaf72566</td>
                                <td><IconImg src={iconCheckGreen} alt=""/></td>
                            </tr>
                            <tr>
                                <td>Transfer:</td>
                                <td>https://etherscan.io/tx/0x570c59648d993ed8df658fcddb79dcb8f51e80f21f0517f582f25502aaf72566</td>
                                <td><IconImg src={iconCheckGreen} alt=""/></td>
                            </tr>
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
            </div>
        )
    };

    render() {
        return (
            <Wrapper>
                <FlexContainer>
                    <FlexItem className={'head'} width={6}>Time</FlexItem>
                    <FlexItem className={'head'} width={3}>Transaction</FlexItem>
                    <FlexItem className={'head'} width={6}>Amount</FlexItem>
                    <FlexItem className={'head'} width={6}>USD value</FlexItem>
                    <FlexItem className={'head'} width={6}>Vera&nbsp;Tokens</FlexItem>
                </FlexContainer>
                <Accordion multiple={true} toggle={'.info'}>
                    {this._renderAccordionItems(deposits)}
                </Accordion>
            </Wrapper>
        )
    }
}

const mapStateToProps = ({deposits}) => ({
    deposits: deposits.get('results'),
    currentPage: deposits.get('current_page')
})

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DepositTable)

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
    width: ${props => props.width ? 'calc(100% /' + props.width + ')' : 'auto'};
    text-align: center;
    flex-shrink: 0;
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 500;
    line-height: 66px;
    letter-spacing: 0.1px;
    color: ${props => props.color ? '#031949' : props => props.failed ? 'rgba(0,0,0,0.2)' : '#000000'};
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
        color: #0a0a0a;
        height: 66px;
    }
`;

const FlexItemColor = styled.div`
    width: ${props => props.width ? 'calc(100% /' + props.width + ')' : 'auto'};
    text-align: center;
    flex-shrink: 0;
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 66px;
    letter-spacing: 0.1px;
    position: relative;
    color: ${props => props.failed ? '#031949' : props => props.up ? '#11cd56' : '#ef2028'};
    border-top: 1px solid rgba(150, 150, 150, 0.2);
    height: 66px;
`;
