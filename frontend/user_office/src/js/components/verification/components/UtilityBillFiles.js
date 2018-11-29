import React from 'react'
import styled from 'styled-components';
import {media} from './../../../utils/media';

import Button from './../../common/Button';
import FilesAttacher from './../../../utils/FilesAttacher';


const UtilityBill = ({files, name, filesWrapper, onAttachClickHandler, uploadFileHandler, removeFileHandler}) => {

    return (
        <Wrapper className="files-section files-section-utility">
            <SubTitle>Utility bill</SubTitle>
            <p className="text">For rent, electricity, gas, water, telecommunication services or other similar
                services), bank or credit card statement, tax bill or notice or voter’s card or similar document
                bearing the investor’s name and address (the document must not be older than six months.</p>
            <ButtonWrapper>
                <Button clickHandler={onAttachClickHandler} text="Attach file" attach/>
            </ButtonWrapper>
            <div className={`files-container ${files.size > 0 ? "files-container-filled" : ''}`}>
                <input class="file-input" type="file" name={name} hidden/>
                <p className="files-head">Uploaded:</p>
                <FilesAttacher files={files} name={name} filesWrapper={filesWrapper} uploadFileHandler={uploadFileHandler} removeFileHandler={removeFileHandler}/>
            </div>
        </Wrapper>
    )
}


export default UtilityBill;

const Wrapper = styled.div`
    flex-basis: 100%;
    .text {
        font-size: 16px;
        color: #0a0a0a;
        letter-spacing: 0.5px;
        line-height: 1.44;
        ${media.xs} {
            font-size: 12px !important;
        }
    }
    .files-container {
        margin-bottom: 35px;
        padding-bottom: 35px;
        border-bottom: solid 1px rgba(151, 151, 151,.25);
        display: none;
        overflow: auto;
        .files-head {
            margin-bottom: 13px;
            ${media.xs} {
                font-size: 12px;
            }
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
    ${media.xs} {
        width: 100%;
        margin-bottom: 20px;
    }
`;
