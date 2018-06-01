import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {extractAccount, sendTransaction, isMetamaskAvailable, icoWeb3, ethToWei} from '../../web3';

//components
import InvestForm from './../components/InvestForm';
import PaymentDetails from './../components/PaymentDetails';

//actions
import * as UIActions from './../actions/UIActions';
import * as DepositsActions from './../actions/DepositsActions';
import * as InvestActions from './../actions/InvestActions';


class InvestOptions extends React.Component {


    metamaskPaymentHandler = () => {

        icoWeb3.eth.getAccounts().then(response => {

            const value = this.props.investAmount;
            const {ethAccount, crowdsaleAddress, contract, investCurrency, invest} = this.props;
            const metamaskEthAccount = response[0];

            invest(metamaskEthAccount, crowdsaleAddress, value, investCurrency);
        })
    }

    noMetamaskPaymentHandler = () => {
        this.props.disableMetamaskOption();
    }

    hideInvestPopup = () => {
        this.props.hideInvestOptions();
        this.props.enableMetamaskOption();
    }

    render() {
        const {
            investOptionsShown,
            investCurrency, 
            crowdsaleAddress,
            isMetamaskEnabled} = this.props;

        const isMetamaskInstalled = isMetamaskAvailable();

        return (
            <React.Fragment>
                { investOptionsShown && 
                    <PopupWrapper>
                        <Popup>
                            <BtnClose onClick={this.hideInvestPopup}>Close</BtnClose>
                            {investCurrency === 'ETH' && isMetamaskInstalled && isMetamaskEnabled && 
                                <div>
                                    <TextOption onClick={this.metamaskPaymentHandler}>Do it via metamask!</TextOption>
                                    <TextOption onClick={this.noMetamaskPaymentHandler}>Do it without metamask!</TextOption>
                                </div>
                            }
                            {investCurrency === 'ETH' && !isMetamaskEnabled && <PaymentDetails address={crowdsaleAddress}/>}
                            {investCurrency !== 'ETH' && <PaymentDetails address={crowdsaleAddress}/>}

                        </Popup>
                    </PopupWrapper>
                }
            </React.Fragment>
        );
    }
}


const mapStateToProps = ({UI, Metamask, ICOInfo, Invest, Currencies, user}) => ({
    investOptionsShown: UI.get('showInvestOptions'),
    contract: ICOInfo.get('token_address'),
    investAmount: Invest.get('investAmount'),
    investCurrency: Currencies.get('investCurrency'),
    ethAccount: user.get('eth_account'),
    crowdsaleAddress: ICOInfo.get('crowdsale_address'),
    isMetamaskEnabled: Invest.get('isMetamaskEnabled')
});

const mapDispatchToProps = (dispatch) => ({
    showInvestOptions() {
        dispatch(UIActions.showInvestOptions());
    },
    hideInvestOptions() {
        dispatch(UIActions.hideInvestOptions());
    },
    invest(senderAccount, receiverAccount, value, currency) {
        dispatch(InvestActions.sendTransactionInit(senderAccount, receiverAccount, value, currency))
    },
    enableMetamaskOption() {
        dispatch(InvestActions.enableMetamaskOption())
    },
    disableMetamaskOption() {
        dispatch(InvestActions.disableMetamaskOption())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InvestOptions);


const PopupWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(49,114,253,.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
`;

const Popup = styled.div`
    width: 400px;
    height: 400px;
    border-radius: 3px;
    background: white;
    position: relative;
    padding: 50px 30px;
`;

const BtnClose = styled.span`
    display: block;
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
`;

const TextOption = styled.p`
    cursor: pointer;
    text-decoration: underline;
    margin-bottom: 30px;
`;

const PaymentAddress = styled.p`
    word-break: break-word;
`;