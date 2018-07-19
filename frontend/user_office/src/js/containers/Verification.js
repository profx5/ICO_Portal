import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {reduxForm} from 'redux-form';
import { Form, Field } from 'react-final-form'

import * as KYCActions from './../actions/KYCActions';
import * as UIActions from './../actions/UIActions';

import PersonalData from './PersonalData';
import LegalPersonData from './LegalPersonData';

import VerificationInfo from './VerificationInfo';
import InvestorsDocuments from './InvestorsDocuments';

import KYCTabs from './../components/KYCTabs';


class Verification extends React.Component {

    componentWillUnmount() {
        const {activeKycTab, activateKycTab} = this.props;

        if (activeKycTab === 2) {
            activateKycTab({id: 1});
        }
    }

    onSubmitHandler = event => {
        event.preventDefault();
        alert('bro')
    }

    tabClickHandler = (event) => {
        const {activateKycTab} = this.props;

        if (event.target.id === 'kycTab1') activateKycTab({id: 1})
            else if (event.target.id === 'kycTab2') activateKycTab({id: 2});
    }

    render () {
        const {activeKycTab} = this.props;

        return (
            <Form 
                onSubmit={this.onSubmitHandler}
                render={() => (

                    <Wrapper onSubmit={(function(e){e.preventDefault()})} id="form" className="Verification">
                        <Header>
                            <HeaderInner>
                                <Head>Verification (KYC)</Head>
                                <KYCTabs clickHandler={this.tabClickHandler} activeTab={activeKycTab}/>
                            </HeaderInner>
                        </Header>
                        <MainWrapper>
                            {activeKycTab === 1 && <PersonalData/>}
                            {activeKycTab === 2 && <LegalPersonData/>}
                            <InvestorsDocuments/>
                        </MainWrapper>
                        <InfoWrapper>
                            <VerificationInfo 
                                btnText="Send data" 
                                verificationStages={['Verification__personData', 'Verification__investorsDocuments']} 
                                stages={['Personal Data', 'Investor\`s documents']}
                            />
                        </InfoWrapper>
                    </Wrapper>
                )}
            />
        )
    }
};


const mapStateToProps = ({UI}) => ({
    activeKycTab: UI.get('activeKycTab')
})

const mapDispatchToProps = (dispatch) => ({
    submitForm(payload) {
        dispatch(KYCActions.submitKYCRequest(payload))
    },
    activateKycTab(payload) {
        dispatch(UIActions.activateKycTab(payload))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Verification);


const Wrapper = styled.form`
    flex: 1;
    height: calc(100% - 100px);
    margin-left: 60px;
    padding-bottom: 73px;
    display: flex;
    flex-flow: row wrap;
`;

const Header = styled.div`
    flex-basis: 100%;
`;

const HeaderInner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 720px;
`;

const Head = styled.h2`
    font-size: 38px;
    line-height: 1;
    font-weight: 400;
    color: #233539;
    letter-spacing: 0.8px;
    margin-top: 40px;
    margin-bottom: 40px;
`;


const MainWrapper = styled.div`
    flex: 1;
    max-width: 720px;
`;

const InfoWrapper = styled.div`

`;
