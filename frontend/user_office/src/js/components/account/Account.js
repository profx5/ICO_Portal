import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import {media} from './../../utils/media';

import Title from './../common/Title';
import AccountInfo from './AccountInfo';
import Password from './Password';
import VerificationInfo from './VerificationInfo';


class Settings extends React.Component {

    render() {

        return (
            <Wrapper className="Verification">
                <Title>Account setup</Title>
                <MainWrapper>
                    <AccountInfo/>
                    <Password/>
                </MainWrapper>
                <VerificationInfoWrapper>
                    <VerificationInfo className="hidden-xs hidden-sm"
                        verificationStages={['Settings__accountInfo', 'Settings__password']} 
                        stages={['Account information', 'Password']}/>
                </VerificationInfoWrapper>
            </Wrapper>
        )
    }
};


const mapStateToProps = ({}) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const Wrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    /* flex: 1;
    height: calc(100% - 100px);
    margin-left: 60px;
    padding-bottom: 90px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    ${media.xs} {
        margin: 0 16px;
        padding-bottom: 50px;
    }
    ${media.sm} {
        margin-right: 60px;
    } */
`;

const MainWrapper = styled.div`
    flex: 1;
    max-width: 720px;
    margin-top: 30px;
    ${media.xs} {
        margin-top: 14px;
    }
`;

const VerificationInfoWrapper = styled.div`
    margin-top: 30px;
`;
