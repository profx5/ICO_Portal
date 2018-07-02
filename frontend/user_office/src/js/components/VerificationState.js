import React from 'react'
import styled from 'styled-components';

import approvedIcon from './../../img/icon_exclamation_green.svg';
import waitingIcon from './../../img/icon_exclamation_yellow.svg';
import declinedIcon from './../../img/icon_exclamation_red.svg';

const VerificationState = ({kycState}) => {
    return (
        <Wrapper>
            {kycState === 'APPROVED' &&
                <Content>
                    <img src={approvedIcon}/>
                    <p>Вы успешно прошли верификацию</p>
                </Content>
            }
            {kycState === 'WAITING' &&
                <Content>
                    <img src={waitingIcon}/>
                    <p>Ваши данные находятся на рассмотрении у модераторов или кто они там</p>
                </Content>
            }
            {kycState === 'DECLINED' &&
                <Content>
                    <img src={declinedIcon}/>
                    <p>Комментарий, о том, что не прошли верификацию и свяжитесь пожалуйста с тех. поддержкой:</p>
                </Content>
            }
        </Wrapper>
    )
}



export default VerificationState;

const Wrapper = styled.div`

`;

const Content = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    img {
        margin-right: 16px;
    }
`;
