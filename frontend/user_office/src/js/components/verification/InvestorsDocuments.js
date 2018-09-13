import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import $ from "jquery";

import FinalFormCheckbox from './../common/FinalFormCheckbox';
import Button from './../common/Button';


class InvestorsDocuments extends React.Component {

    constructor() {
        super()
        this.renderedFiles = 0;

        let onRemoveFileHandler = this.onRemoveFileHandler;

        $(document).ready(function () {
            $('.Verification__investorsDocuments').click(function (event) {
                if ($(event.target).hasClass('file-clear')) {
                    let parent = $(event.target).closest('.block-file');
                    onRemoveFileHandler(event.target, parent)
                }
            })
        })
        
    }

    onRemoveFileHandler = (target, parent) => {
        let $fileInput = $(target).closest('.block-file').find('input[type="file"]');
        
        if ($fileInput.length <= 1) $fileInput.val('');
        else $fileInput[$fileInput.length - 1].remove();

        $(target).closest('.visual-file-block').remove();

        let siblings = $(parent).find('.visual-file-block');

        if (siblings.length === 0) {
            $(parent).closest('.block-file').find('.block-file-result').removeClass('block-file-result-filled');
        }

    }

    render() {
        const {type, status, uploadOnClickHandler} = this.props;

        return (
            <Wrapper className="Verification__investorsDocuments">
                <Title>Investor's documents</Title>
                <div className="block-file">
                    <SubTitle>Copy of identification document</SubTitle>
                    <p className="text">EU ID card, passport or driving licence bearing the name, photograph or facial
                        image, signature or image of signature and date of birth or personal identification code of the
                        holder</p>
                    <ButtonWrapper>
                        <input type="file" name='id_document_photo' hidden/>
                        <Button clickHandler={uploadOnClickHandler} text="Attach file"/>
                    </ButtonWrapper>
                    <div className="block-file-result">
                        <p className="files-head">Uploaded:</p>
                    </div>
                </div>
                <div className="block-file">
                    <SubTitle>Utility bill</SubTitle>
                    <p className="text">For rent, electricity, gas, water, telecommunication services or other similar
                        services), bank or credit card statement, tax bill or notice or voter’s card or similar document
                        bearing the investor’s name and address (the document must not be older than six months.</p>
                    <ButtonWrapper>
                        <input type="file" name='bill_photo' hidden/>
                        <Button clickHandler={uploadOnClickHandler} text="Attach file"/>
                    </ButtonWrapper>
                    <div className="block-file-result">
                        <p className="files-head">Uploaded:</p>
                    </div>
                </div>
                <FinalFormCheckbox name="confirm"
                                   options={['I confirm that all the data and documents submitted are correct.']}
                                   values={['Yes']}
                                   required/>
                {status !== 'APPROVED' &&
                
                <ButtonWrapper submitBtn>
                    <Button type="submit" text={status === 'WAITING' ? 'Update data' : 'Send data'}/>
                </ButtonWrapper>
                }
            </Wrapper>
        )
    }
}

const mapStateToProps = ({KYC}) => ({
    status: KYC.get('state'),
    type: KYC.get('type')
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(InvestorsDocuments)

const Wrapper = styled.div`
    flex: 1;
    height: auto;
    padding: 42px 50px 42px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    margin-top: 20px;
    .text {
        font-size: 16px;
        color: #0a0a0a;
        letter-spacing: 0.5px;
        line-height: 1.44;
    }
    .block-file {
        flex-basis: 100%;
    }
    .block-file-result {
        display: none;
    }
    .block-file-result-filled {
        margin-bottom: 35px;
        border-bottom: solid 1px rgba(151, 151, 151,.25);
        display: block;
        overflow: auto;
        .files-head {
            margin-bottom: 13px;
        }
        .visual-file-block {
            display: block; 
            float: left; 
            clear: left; 
            font-size: 16px;
            height: 36px;
            line-height: 36px;
            min-width: 280px;
            background: #f5f5f5;
            padding: 0 40px 0 13px;
            margin-bottom: 5px;
            position: relative
            &:last-of-type {
                margin-bottom: 40px;
            }
            .file-name {
                color: #5c8df5;
                font-weight: 600;
                letter-spacing: 0.5px;
            }
            .file-size {
                color: #000000;
                font-weight: 400; 
            }
            .file-clear {
                position: absolute;
                top: 50%;
                right: 13px;
                transform: translateY(-50%);
                cursor: pointer;
                svg {
                    pointer-events: none;
                }
            }
        }
    }
`;

const Title = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: #323c47;
    letter-spacing: 0.1px;
    margin-bottom: 45px;
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
