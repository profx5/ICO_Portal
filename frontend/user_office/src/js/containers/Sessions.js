import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import $ from 'jquery';
import PerfectScrollbar from 'perfect-scrollbar';

import * as KYCActions from './../actions/KYCActions';

import Utils from './../utils/index';

import SessionsTable from './SessionsTable';
import FieldText from './../components/FieldText';
import Button from './../components/Button';



class Sessions extends React.Component {

    componentDidMount() {
        
        const ps = new PerfectScrollbar('#Verification__sessions', {
          wheelSpeed: 2,
          wheelPropagation: true,
          minScrollbarLength: 20
        });
    }

    render() {

        return (
            <Wrapper id="Verification__sessions" className="Verification__sessions">
                <Title>My sessions</Title>
                <SessionsTable/>
            </Wrapper>
        )
    }
};


const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch) => ({
})

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

const DescHead = styled.h4`
    position: absolute;
    left: 0;
    top: 0;
    color: #0a0a0a;
    font-weight: 500;
    flex-basis: 100%;
`;

const InputSet = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
`;

const InputWrapper = styled.div`
    height: 45px;
    flex-basis: ${props => props.fullWidth ? '100%' : '48%'};
    
    &:not(:last-child) {
        margin-bottom: 70px;
    }
    &:last-child {
        margin-bottom: 40px;
    }
`;