import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {extractAccount, sendTransaction, isMetamaskAvailable, icoWeb3, ethToWei} from '../../web3';

//components
import InvestForm from './../components/InvestForm';

//actions
import * as UIActions from './../actions/UIActions';
import * as DepositsActions from './../actions/DepositsActions';


class InvestOptions extends React.Component {


    metamaskPaymentHandler = () => {

        icoWeb3.eth.getAccounts().then(response => {

            let ethAccount = response[0];
            let contract = this.props.tokenAddress;
            let valueWei = ethToWei(this.props.investAmount);

            let callback = this.props.prepareDeposits({
                value: this.props.investAmount,
                txn_hash: ethAccount,
                currency: this.props.investCurrency
            });

            sendTransaction(ethAccount, contract, valueWei, callback);
        })

    } 

    render() {
        const {investOptionsShown, hideInvestOptions} = this.props;
        const isMetamaskInstalled = isMetamaskAvailable();
        return (
            <React.Fragment>
                { investOptionsShown && 
                    <PopupWrapper>
                        <Popup>
                            <BtnClose onClick={hideInvestOptions}>Close</BtnClose>
                            {isMetamaskInstalled && 
                                <div>
                                    <p onClick={this.metamaskPaymentHandler}>Do it via metamask!</p>
                                    <p>Do it without metamask!</p>
                                </div>
                            }
                        </Popup>
                    </PopupWrapper>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({UI, Metamask, ICOInfo, Invest, Currencies}) => ({
    investOptionsShown: UI.get('showInvestOptions'),
    tokenAddress: ICOInfo.get('token_address'),
    investAmount: Invest.get('investAmount'),
    investCurrency: Currencies.get('investCurrency'),
});

const mapDispatchToProps = (dispatch) => ({
    showInvestOptions() {
        dispatch(UIActions.showInvestOptions());
    },
    hideInvestOptions() {
        dispatch(UIActions.hideInvestOptions());
    },
    getDeposits() {
        dispatch(DepositsActions.getDepositsRequest())
    },
    prepareDeposits(payload) {
        dispatch(DepositsActions.createPreparedDepositRequest(payload))
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
`;

const BtnClose = styled.span`
    display: block;
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
`;