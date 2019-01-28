import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import {media} from 'js/utils/media';

import KYCTabs from 'js/components/payment/stateless/KYCTabs';
import LegalPersonData from 'js/components/payment/stateless/LegalPersonData';
import LegalOwnerData from 'js/components/payment/stateless/LegalOwnerData';
import ConfirmLegalPEP from 'js/components/payment/stateless/ConfirmLegalPEP';

import * as UIActions from "js/actions/UIActions";


class LegalPerson extends React.Component {

    render() {
        const {
            showModal,
            errors,
            touched,
            values,
            is_pep,
            tabClickHandler
        } = this.props;

        return (
            <Wrapper className="Verification__personData">
                <Header>
                    <Head>Legal Person Data</Head>
                    <KYCTabs clickHandler={tabClickHandler} activeTab={2}/>
                </Header>
                <LegalPersonData errors={errors} touched={touched} values={values}/>
                {this.props.children}
                <LegalOwnerData errors={errors} touched={touched} values={values} showModalHandler={showModal}/>
                <ConfirmLegalPEP errors={errors} touched={touched} is_pep={is_pep}/>

            </Wrapper>
        )
    }
};


const mapStateToProps = ({Files}) => ({
    basisFiles: Files.get('basisFiles'),
})

const mapDispatchToProps = (dispatch) => ({
    showModal(payload) {
        dispatch(UIActions.showModal(payload))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LegalPerson)


const Wrapper = styled.div`
    flex: 1;
    height: auto;
    padding: 42px 50px 42px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    ${media.xs} {
        padding: 20px 16px;
        max-width: calc(100vw - 32px);
    }
    .files-container {
        margin-bottom: 35px;
        padding-bottom: 35px;
        border-bottom: solid 1px rgba(151, 151, 151,.25);
        display: none;
        overflow: auto;
        .files-head {
            margin-bottom: 13px;
        }
        &-filled {
            display: block;
        }
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 45px;
    ${media.xs} {
        margin-bottom: 35px;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
`;

const Head = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: #323c47;
    letter-spacing: 0.1px;
    white-space: nowrap;
    ${media.xs} {
        font-size: 16px;
    }
`;
