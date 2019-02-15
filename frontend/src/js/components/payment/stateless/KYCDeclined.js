import React from 'react'
import styled from 'styled-components';
import {media} from 'js/utils/media';
import {Link} from 'react-router-dom';

import Button from 'js/components/common/Button';


const KYCDeclined = () => {
    return (
        <Wrapper>
            <InfoWrapper>
                <div>Declined</div>
                <div>Your apply has been declined. Please, contact our managers!</div>
            </InfoWrapper>
            <ButtonWrapper to="/user_office/support">
                <Button text="Contact us"/>
            </ButtonWrapper>
        </Wrapper>
    )
}


export default KYCDeclined;

const Wrapper = styled.div`
    flex-basis: 100%;
`;

const InfoWrapper = styled.div`
    width: 1070px;
    padding: 30px 45px;
    background: white;
    border-radius: 6px;
    margin: 0 auto 50px;
    ${media.smMinus} {
        width: 100%;
    }
    ${media.xs} {
        padding: 30px 12px;
    }
    div {
        text-align: center;
    }
    div:nth-of-type(1) {
        font-size: 22px;
        color: #ff1414;
        letter-spacing: 0.2px;
        margin-bottom: 12px;
        ${media.xs} {
            font-size: 18px;
        }
    }
    div:nth-of-type(2) {
        font-size: 16px;
        ${media.xs} {
            font-size: 12px;
        }
    }
`;

const ButtonWrapper = styled(Link)`
    width: 250px;
    height: 68px;
    margin: 0 auto;
    display: block;
`;
