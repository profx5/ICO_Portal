import React from 'react'
import {connect} from 'react-redux'
import {canSendTransaction, ethToWei} from '../../web3'
//components
import InvestForm from '../components/InvestForm'
//actions
import * as InvestActions from '../actions/InvestActions'

class Invest extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tokensAmount: '0',
            formula: this.makeFormula('0', this.getBonus()),
            ethValue: 0
        }
    }

    getRate = () =>  Number(this.props.USDcPerETHRate) / 100
    getBonus = () => Number(this.props.bonusPercents)

    calcTokensAmount = (value) => {
        const parsedValue = Math.floor(Number(value.replace(',', '.')) * 100) / 100

        if (!isNaN(parsedValue)) {
            const rate = this.getRate(),
                  bonus = this.getBonus(),
                  tokensAmount = parsedValue * rate,
                  formula = this.makeFormula(tokensAmount, bonus)

            this.setState({tokensAmount: tokensAmount,
                           formula: formula,
                           ethValue: parsedValue})
        }
    }

    makeFormula = (tokensAmount, bonusAmount) => {
        let tokens = Number(tokensAmount),
            bonus = bonusAmount

        let bonusAsNumber = (tokens * bonus) / 100
        let result = tokens + bonusAsNumber

        if (tokens % 1 !== 0) tokens = tokens.toFixed(2)
        if (result % 1 !== 0) result = result.toFixed(2)


        return `${tokens} LTY tokens + ${bonus}% = ${result} LTY`
    }

    handleInvest = () => {
        const valueWei = ethToWei(this.state.ethValue)
        const {ethAccount,
               contract} = this.props

        this.props.invest(ethAccount, contract, valueWei)
    }

    render() {
        const {
            showForm,
            contract,
            hideForm,
            ethAccount
        } = this.props

        const {
            formula
        } = this.state

        const [showSubmit, reason] = canSendTransaction(ethAccount)

        return (
            <div>
                {showForm && <InvestForm price={this.getRate()} tokensAmount={formula} contract={contract} amountChange={this.calcTokensAmount} handleInvest={this.handleInvest} showSubmit={showSubmit} reason={reason} hideForm={hideForm} />}
            </div>
        )
    }
}

const mapStateToProps = ({user, ICOInfo, Phase, Invest}) => ({
    showForm: Invest.get('showInvestForm'),
    contract: ICOInfo.get('token_address'),
    USDcPerETHRate: ICOInfo.get('usd_c_per_eth'),
    bonusPercents: Phase.get('bonus_percents'),
    ethAccount: user.get('eth_account')
})

const mapDispatchToProps = (dispatch) => ({
    invest(senderAccount, receiverAccount, value) {
        dispatch(InvestActions.sendTransactionInit(senderAccount, receiverAccount, value))
    },
    hideForm() {
        dispatch(InvestActions.hideForm())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Invest)