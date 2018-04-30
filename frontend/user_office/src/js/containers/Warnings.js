import React from 'react';
import styled from 'styled-components';

import foxIcon from './../../img/metamask.png';


class Warnings extends React.Component {


    render() {
        return (
            <Wrapper>
                <Img src={foxIcon}/>
                <Text>You did not pass KYS confirmation. Your invstment threshold is limited 10000</Text>
                <Button>Pass KYS</Button>
            </Wrapper>
        );
    }
}


export default Warnings;

const Wrapper = styled.div`
    width: 100%;
    height: 60px;
    background: #F6DD9C;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding-left: 161px;
`;

const Img = styled.img`
    margin-right: 24px;
`;

const Text = styled.p`
    color: #484643;
    font-weight: 600;
    margin-right: 24px;
`;

const Button = styled.button`
    width: 170px;
    height: 40px;
    border-radius: 2px;
    background: #ffffff;
    font-size: 14px;
    color: #233539;
`;