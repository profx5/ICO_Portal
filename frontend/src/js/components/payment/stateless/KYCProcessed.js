import React from 'react'
import styled from 'styled-components';
import {media} from 'js/utils/media';
import {Link} from 'react-router-dom';

import Loader from 'js/components/common/Loader';
import Button from 'js/components/common/Button';


const KYCProcessed = ({clickHandler}) => {
    return (
        <Wrapper>
            <InfoWrapper>
                <div>Processing...</div>
                <div>Our managers are processing your info...</div>
            </InfoWrapper>
            <LoaderWrapper>
                <Loader amount={12} size={18} bgColor="rgb(23, 103, 242)"/>
            </LoaderWrapper>
            <ButtonWrapper>
                <Button type="button" text="Check status" clickHandler={clickHandler} className={'Btn-checkKyc'}/>
            </ButtonWrapper>
        </Wrapper>
    )
}


export default KYCProcessed;

const Wrapper = styled.div`
    flex-basis: 100%;
`;

const InfoWrapper = styled.div`
    max-width: 1070px;
    padding: 30px 45px 0;
    margin: 0 auto 24px;
    div {
        text-align: center;
    }
    div:nth-of-type(1) {
        font-size: 24px;
        letter-spacing: 0.2px;
        margin-bottom: 12px;
    }
    div:nth-of-type(2) {
        font-size: 16px;
    }
`;

const LoaderWrapper = styled.div`
    background: white;
    border-radius: 18px;
    padding: 5px 7px;
    width: 720px;
    margin: 0 auto 50px;
    ${media.smMinus} {
        width: 100%;
    }
    ${media.xs} {
        width: 85%;
    }
`;

const ButtonWrapper = styled.div`
    width: 250px;
    height: 68px;
    margin: 0 auto;
    display: block;
`;
