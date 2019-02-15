import React from 'react'
import {connect} from 'react-redux';
import styled, {keyframes} from 'styled-components';
import {media} from 'js/utils/media';


const Loader = ({amount = 5, size = 15, bgColor = "#36b"}) =>  {

    const createBubles = () => {
        let elems = [];

        for (let i = 1; i <= amount; i++) {
            elems.push(<Bubble key={i}><Circle animationDelay={i * 0.1} bgColor={bgColor} size={size}></Circle></Bubble>)
        }

        return elems;
    } 

    return(
        <Wrapper>
            {createBubles()}
        </Wrapper>
    )
}

export default Loader;

const Pulse = keyframes`
    0% { 
        transform: scale3d(1, 1, 1);
    }
    50% {
        transform: scale3d(0.2, 0.2, 0.2); 
        opacity:0.75;
    }
    100%{
        transform: scale3d(1, 1, 1);
    }
`;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Bubble = styled.div`

`;

const Circle = styled.div`
    border-radius: 100px;
    background: ${props => props.bgColor};
    animation: ${Pulse} 1.5s infinite ${props => props.animationDelay}s;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    ${media.xs} {
        width: ${props => props.size / 2.2}px;
        height: ${props => props.size / 2.2}px;
    }
`;
