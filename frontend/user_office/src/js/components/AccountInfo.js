import React from 'react';
import styled from 'styled-components';
import userPhoto from './../../img/user.svg';
//components

const AccountInfo = ({email }) => {
    return (
        <InfoWrapper>
            <UserImg src={userPhoto} />
            <EmailText>{email}</EmailText>
        </InfoWrapper>
    )
}

export default AccountInfo;


const InfoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const ConfirmLink = styled.a`
    color: #d44b4b;
    font-weight: 400;
    text-decoration: underline;
`
const UserImg = styled.img`
    margin-left: 25px;
`

const EmailText = styled.span`
    color: #222121;
    margin-left: 25px;
`