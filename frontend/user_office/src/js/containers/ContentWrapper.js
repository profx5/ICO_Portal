import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {isMetamaskAvailable} from '../../web3';

import * as UserActions from '../actions/UserActions';
import * as ICOInfoActions from '../actions/ICOInfoActions';
import * as DepositsActions from '../actions/DepositsActions';
import * as KYCActions from '../actions/KYCActions';
import * as PhaseActions from './../actions/PhaseActions';
import * as CurrencyActions from './../actions/CurrencyActions';
import * as MetamaskActions from './../actions/MetamaskActions';
import * as TicketsActions from "../actions/TicketActions";



class ContentWrapper extends React.Component {

    componentDidMount() {
        let isMetamaskInstalled = isMetamaskAvailable();
        this.props.updateMetamaskStatus(isMetamaskInstalled);
    }

    componentWillMount() {
        const {getMe, getICOInfo, getKyc, getPhasesInfo, getDeposits, getCurrencies, getTickets} = this.props;

        compose(getMe, getKyc, getICOInfo, getPhasesInfo, getDeposits, getCurrencies, getTickets)();
    }

    render() {

        return (
            <Wrapper>
                {this.props.layout}
            </Wrapper>
        )
    }
};

const mapStateToProps = ({bountiesBalance}) => ({

})

const mapDispatchToProps = (dispatch) => ({
    getMe() {
        dispatch(UserActions.getUserRequest())
    },
    getICOInfo() {
         dispatch(ICOInfoActions.getICOInfoRequest())
    },
    getKyc() {
        dispatch(KYCActions.getKYCRequest())
    },
    getPhasesInfo() {
        dispatch(PhaseActions.getPhasesRequest())
    },
    getDeposits() {
        dispatch(DepositsActions.getDepositsRequest())
    },
    getTickets() {
        dispatch(TicketsActions.getTicketsRequest())
    },
    getCurrencies() {
        dispatch(CurrencyActions.getCurrenciesRequest())
    },
    updateMetamaskStatus(payload) {
        dispatch(MetamaskActions.updateMetamaskStatus(payload))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ContentWrapper);

const Wrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: stretch;
    min-height: 100%;
`;
