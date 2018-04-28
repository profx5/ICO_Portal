import React from 'react';

import styled from 'styled-components';


class Warnings extends React.Component {


    render() {
        return (
            <Wrapper/>
        );
    }
}


export default Warnings;

const Wrapper = styled.div`
    width: 100%;
    height: 100px;
    background: pink;
`;