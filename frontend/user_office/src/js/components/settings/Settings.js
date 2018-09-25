import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';

import PersonalInfo from './PersonalInfo';
import Password from './Password';


class Settings extends React.Component {

    render() {

        return (
            <Wrapper className="Verification">
                <Head>Settings</Head>
                <MainWrapper>
                    <PersonalInfo/>
                    <Password/>
                </MainWrapper>
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
    padding-bottom: 73px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
`;

const Head = styled.h2`
    font-size: 38px;
    line-height: 1;
    font-weight: 500;
    color: #233539;
    letter-spacing: -1.1px;
    margin-top: 34px;
    flex-basis: 100%;
    margin-bottom: 45px;
`;

const MainWrapper = styled.div`
    flex: 1;
    max-width: 620px;
`;
