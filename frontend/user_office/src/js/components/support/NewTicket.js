import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'
import $ from "jquery";

import NewTicketForm from './NewTicketForm';


class NewTicket extends React.Component {
    render() {
        return (
            <Wrapper>
                <Head>Technical support</Head>
                <NewTicketForm/>
            </Wrapper>
        )
    }
}


const mapStateToProps = ({}) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(NewTicket)

const Wrapper = styled.div`
    flex: 1;
    height: auto;
    padding: 42px 50px 65px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
`;

const Head = styled.h3`
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 0.1px;
    color: #323c47;
    text-align: center;
    margin-bottom: 30px;
`;
