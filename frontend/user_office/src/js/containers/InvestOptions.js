import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {extractAccount, sendTransaction, isMetamaskAvailable, icoWeb3, ethToWei} from '../../web3';

//components
import InvestForm from './../components/InvestForm';

//actions
import * as UIActions from './../actions/UIActions';
import * as DepositsActions from './../actions/DepositsActions';
import * as InvestActions from './../actions/InvestActions';


class InvestOptions extends React.Component {


    metamaskPaymentHandler = () => {

        icoWeb3.eth.getAccounts().then(response => {

            const valueWei = ethToWei(this.props.investAmount);
            const {ethAccount, contract, investCurrency, invest} = this.props;
            const metamaskEthAccount = response[0];

            invest(metamaskEthAccount, contract, valueWei, investCurrency);
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

const mapStateToProps = ({UI, Metamask, ICOInfo, Invest, Currencies, user}) => ({
    investOptionsShown: UI.get('showInvestOptions'),
    contract: ICOInfo.get('token_address'),
    investAmount: Invest.get('investAmount'),
    investCurrency: Currencies.get('investCurrency'),
    // ethAccount: user.get('eth_account'),
    ethAccount: '0xB0a3f48478d84a497f930d8455711d9981B66a70',
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














// class InvestOptions extends React.Component {


//     metamaskPaymentHandler = () => {

//         let {tokenAddress, investAmount, prepareDeposits, investCurrency, ethAccount} = this.props;

//         icoWeb3.eth.getAccounts().then(response => {

//             let contract = tokenAddress;
//             let valueWei = ethToWei(investAmount);

//             let depositData = {
//                 value: investAmount,
//                 txn_hash: ethAccount,
//                 currency: investCurrency
//             };

//             sendTransaction(ethAccount, contract, valueWei, () => {
//                 alert(response[0])
//                 // prepareDeposits(depositData)
//             });
//         })

//     } 

//     render() {
//         const {investOptionsShown, hideInvestOptions} = this.props;
//         const isMetamaskInstalled = isMetamaskAvailable();
//         return (
//             <React.Fragment>
//                 { investOptionsShown && 
//                     <PopupWrapper>
//                         <Popup>
//                             <BtnClose onClick={hideInvestOptions}>Close</BtnClose>
//                             {isMetamaskInstalled && 
//                                 <div>
//                                     <p onClick={this.metamaskPaymentHandler}>Do it via metamask!</p>
//                                     <p>Do it without metamask!</p>
//                                 </div>
//                             }
//                         </Popup>
//                     </PopupWrapper>
//                 }
//             </React.Fragment>
//         );
//     }
// }

// const mapStateToProps = ({UI, Metamask, ICOInfo, Invest, Currencies, user}) => ({
//     investOptionsShown: UI.get('showInvestOptions'),
//     tokenAddress: ICOInfo.get('token_address'),
//     investAmount: Invest.get('investAmount'),
//     investCurrency: Currencies.get('investCurrency'),
//     ethAccount: user.get('eth_account'),
// });