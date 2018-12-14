import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import {media} from 'js/utils/media';

import Title from 'js/components/common/Title';
import AccountInfo from 'js/components/account/AccountInfo';
import Password from 'js/components/account/Password';
import VerificationInfo from 'js/components/account/VerificationInfo';


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
