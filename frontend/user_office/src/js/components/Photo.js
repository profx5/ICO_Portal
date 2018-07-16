import React from 'react'
import styled from 'styled-components';

const Photo = ({path, isUploaded, removePhoto, photoName}) => {

    let removePhotoHandler = removePhoto.bind(this, photoName);

    return (
        <Wrapper>
            <PhotoWrapper src={path}/>
            {isUploaded &&
            <div>
                <SpanState>Загружено</SpanState>
                <SpanRemove onClick={removePhotoHandler}>Удалить</SpanRemove>
            </div>
            }
        </Wrapper>
    );
}



export default Photo;

const Wrapper = styled.div`
    height: 68px;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
`;

const PhotoWrapper = styled.div`
    width: 68px;
    flex-basis: 100%;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    margin-right: 15px;
    border-radius: 100%;
`;

const SpanState = styled.div`
    margin-bottom: 5px;
`;

const SpanRemove = styled.div`
    color: #0a0a0a;
    opacity: 0.2;
    text-decoration: underline;
    cursor: pointer;
`;

