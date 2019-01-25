import React from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {media} from 'js/utils/media';


const VerificationState = ({kycStatus, kycTicketId, className}) => {
    return (
        <Wrapper className={className}>
            {kycStatus === 'APPROVED' &&
                <Content className="state-approved">
                    <p>Verification successful!</p>
                </Content>
            }
            {kycStatus === 'WAITING' &&
                <Content className="state-waiting">
                    <p>Thank you for your application! Our managers are validating your data now.</p>
                    {kycTicketId &&
                    <StyledLink to={`/user_office/support/ticket/${kycTicketId}`}>Check the status of your application
                        here!</StyledLink>}
                </Content>
            }
            {kycStatus === 'DECLINED' &&
                <Content className="state-declined">
                    <p>Sorry, your application was declined.</p>
                    {kycTicketId &&
                    <StyledLink to={`/user_office/support/ticket/${kycTicketId}`}>Please contact our support via the ticket
                        system.</StyledLink>}
                </Content>
            }
        </Wrapper>
    )
}


export default VerificationState;

const Wrapper = styled.div`

`;

const StyledLink = styled(Link)`
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
