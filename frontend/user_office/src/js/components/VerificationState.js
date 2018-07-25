import React from 'react'
import styled from 'styled-components';

import approvedIcon from './../../img/icon_exclamation_green.svg';
import waitingIcon from './../../img/icon_exclamation_yellow.svg';
import declinedIcon from './../../img/icon_exclamation_red.svg';

const VerificationState = ({kycState}) => {
    return (
        <Wrapper>
            {kycState === 'APPROVED' &&
                <Content className="state-approved">
                    <p>Verification successful!</p>
                </Content>
            }
            {kycState === 'WAITING' &&
                <Content className="state-waiting">
                    <p>Thank you for application! Our managers are validating your data. Soon the status will be updated!</p>
                </Content>
            }
            {kycState === 'DECLINED' &&
                <Content className="state-declined">
                    <p>Your account is not verified yet. Please add and submit valid data.</p>
                </Content>
            }
        </Wrapper>
    )
}



export default VerificationState;

const Wrapper = styled.div`

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
