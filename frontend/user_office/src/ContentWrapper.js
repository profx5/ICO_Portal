import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {media} from 'js/utils/media';

import * as UserActions from 'js/actions/UserActions';
import * as ICOInfoActions from 'js/actions/ICOInfoActions';
import * as DepositsActions from 'js/actions/DepositsActions';
import * as KYCActions from 'js/actions/KYCActions';
import * as PhaseActions from 'js/actions/PhaseActions';
import * as CurrencyActions from 'js/actions/CurrencyActions';
import * as TicketsActions from 'js/actions/TicketActions';



class ContentWrapper extends React.Component {

    componentDidMount() {
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
})

export default connect(mapStateToProps, mapDispatchToProps)(ContentWrapper);

const Wrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: stretch;
    min-height: 100%;
    ${media.xs} {
        width: 100vw;
    }
`;
