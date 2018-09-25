import React from 'react'
import styled from 'styled-components';

import Button from './../../common/Button';
import FilesAttacher from './../../../utils/FilesAttacher';


const ID = ({files, name, filesWrapper, onAttachClickHandler, uploadFileHandler, removeFileHandler}) => {

    return (
        <Wrapper className="files-section files-section-basis">
            <SubTitle>Basis for representation</SubTitle>
            <ButtonWrapper>
                <Button clickHandler={onAttachClickHandler} text="Attach file" attach/>
            </ButtonWrapper>
            <div className={`files-container ${files.size > 0 ? "files-container-filled" : ''}`}>
                {files.size > 0 && <p className="files-head">Uploaded:</p>}
                <FilesAttacher files={files} name={name} filesWrapper={filesWrapper} uploadFileHandler={uploadFileHandler} removeFileHandler={removeFileHandler}/>
            </div>
        </Wrapper>
    )
}


export default ID;

const Wrapper = styled.div`
    flex-basis: 100%;
    .text {
        font-size: 16px;
        color: #0a0a0a;
        letter-spacing: 0.5px;
        line-height: 1.44;
    }
    .files-container {
        margin-bottom: 35px;
        padding-bottom: 35px;
        border-bottom: solid 1px rgba(151, 151, 151,.25);
        display: none;
        overflow: auto;
        .files-head {
            margin-bottom: 13px;
        }
        &-filled {
            display: block;
        }
    }
`;

const SubTitle = styled.h4`
    font-size: 16px;
    color: #0a0a0a;
    letter-spacing: 0.5px;
    margin-bottom: 13px;
    & + .text {
        margin-bottom: 20px;
    }
`;

const ButtonWrapper = styled.div`
    width: 190px;
    height: 45px;
    margin-bottom: 50px;
    margin-top: ${props => props.submitBtn ? '30px' : '0'};
`;
