import React from 'react';
import styled from 'styled-components';

import copyIcon from './../../img/icon_copy.svg';


class ReferralList extends React.Component {

    render() {
      return (
            <Wrapper>
                <Title>Your referrals</Title>
                <Table>
                    <Header>
                        <Time>Date and time</Time>
                        <Status>Status</Status>
                    </Header>
                    <Row>
                        <Time>27.04.2018 15:44</Time>
                        <Status completed>Completed</Status>
                    </Row>
                    <Row>
                        <Time>27.04.2018 15:44</Time>
                        <Status pending>Pending</Status>
                    </Row>
                    <Row>
                        <Time>27.04.2018 15:44</Time>
                        <Status failure>Failure</Status>
                    </Row>
                </Table>
            </Wrapper>
        )
    }
}

export default ReferralList;


// FIXME that's a lot of copypasting
const Wrapper = styled.div`
    flex: 1;
    height: auto;
    padding: 42px 30px 42px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    margin: 0 30px 30px 0;
    width: 400px;
`;

const Title = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: #323c47;
    letter-spacing: 0.1px;
    margin-bottom: 45px;
`;

const Table = styled.div`
`;
const Row = styled.div`
    display: flex;
    padding: 10px 20px;
`;
const Header = styled(Row)`
    text-transform: uppercase;
    border-bottom: 1px solid black;
`;
const Col = styled.div`
    text-align: left;
`;
const Time = styled(Col)`
    width: 70%;
`;
const Status = styled(Col)`
    width: 30%;
    color: ${props => props.completed ? '#57a20b' : props.pending ? '#f4f142' : props.failure ? 'red' : 'black'};
`;