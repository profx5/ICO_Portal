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
                <HeaderInner>
                    <Title>Account setup</Title>
                </HeaderInner>
                <MainWrapper>
                    <AccountInfo/>
                    <Password/>
                </MainWrapper>
                <div>
                    <VerificationInfo
                        verificationStages={['Settings__accountInfo', 'Settings__password']} 
                        stages={['Account information', 'Password']}/>
                </div>
            </Wrapper>
        )
    }
};


const mapStateToProps = ({}) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const Wrapper = styled.div`
    flex: 1;
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
`;

const HeaderInner = styled.div`
    flex-basis: 100%;
    margin-top: 60px;
    margin-bottom: 40px;
`;

const MainWrapper = styled.div`
    flex: 1;
    max-width: 720px;
`;
