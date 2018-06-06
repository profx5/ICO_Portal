import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import SessionsTable from './SessionsTable';



class Sessions extends React.Component {

    render() {

        return (
            <Wrapper id="Verification__sessions" className="Verification__sessions">
                <Title>My sessions</Title>
                <SessionsTable/>
            </Wrapper>
        )
    }
};


const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Sessions)


const Wrapper = styled.div`
    flex: 1;
    height: auto;
    padding: 42px 30px 42px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    overflow: hidden; 
`;

const Title = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: #323c47;
    letter-spacing: 0.1px;
    margin-bottom: 45px;
`;