import React from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const VerificationState = ({kycState,kycTicketId}) => {
    return (
        <Wrapper>
            {kycState === 'APPROVED' &&
                <Content className="state-approved">
                    <p>Verification successful!</p>
                </Content>
            }
            {kycState === 'WAITING' &&
                <Content className="state-waiting">
                <p>Thank you for your application! Our managers are validating your data now.</p>
                {kycTicketId &&
                <SLink to={`/user_office/support/ticket/${kycTicketId}`}>Check the status of your application
                    here!</SLink>}
            </Content>
            }
            {kycState === 'DECLINED' &&
                <Content className="state-declined">
                <p>Sorry, your application was declined.</p>
                {kycTicketId &&
                <SLink to={`/user_office/support/ticket/${kycTicketId}`}>Please contact our support via the ticket
                    system.</SLink>}
            </Content>
            }
        </Wrapper>
    )
}



export default VerificationState;

const Wrapper = styled.div`

`;

const SLink = styled(Link)`
    text-decoration: underline;
`;

const Content = styled.div`
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    line-height: 1.5;
    color: #323c47;
    padding: 20px 30px;
    &.state-approved {
        border: 2px solid #4FDDBE;
    }
    &.state-waiting {
        border: 1px solid #FECF33;
    }
    &.state-declined {
        border: 1px solid #ff1414;
    }
`;
