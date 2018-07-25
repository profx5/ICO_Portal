import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import FinalFormCheckbox from './../components/FinalFormCheckbox';
import Button from './../components/Button';
import $ from "jquery";

import Utils from './../utils/index';

class InvestorsDocuments extends React.Component {

    constructor() {
        super()
        this.renderedFiles = 0;

        let onRemoveFileHandler = this.onRemoveFileHandler;

        $(document).ready(function() {
            $('.Verification__investorsDocuments').click(function(event) {
                if ($(event.target).hasClass('file-clear')) {
                    onRemoveFileHandler(event.target)
                }
            })
        })
    }


    buildVisualFile = (target, obj) => {
        let name = obj.name,
            size = obj.size,
            id = $(target).attr('id');

        

        $(target)
            .closest('div')
            .siblings('.block-file-result')
            .append(`
                <div class="visual-file-block" data-bind-to='${id}'>
                    <span class="file-name">${name}</span> (<span class="file-size">${Utils.formatFileSize(size).size} ${Utils.formatFileSize(size).units})</span>
                    <div class="file-clear">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                            <g fill="#C8C8C8" fill-rule="evenodd">
                                <path d="M.05 1.464L1.464.05 9.95 8.536 8.536 9.95z"/>
                                <path d="M1.464 9.95L.05 8.536 8.536.05 9.95 1.464z"/>
                            </g>
                        </svg>
                    </div>

                </div>
            `);
    }

    onRemoveFileHandler = (target) => {
        let id = $(target).data
        this.renderedFiles -= 1;
        $(target).closest('.block-file').find('input[type="file"]').val('');

        if (this.renderedFiles === 0) {
            $(target).closest('.block-file-result').removeClass('block-file-result-filled');
        }
        $(target).closest('.visual-file-block').remove();

    }

    uploadOnClickHandler = (event) => {
        event.preventDefault();

        $(event.currentTarget).closest('div').find('input[type="file"]').each((index, item) => {
            if ($(item).val() == '') {
                $(item).click();

                return false;
            }
        })
    }

    uploadFileHandler = (event) => {
        var input = event.target;
        var reader = new FileReader();

        let callback = (target, obj) => {
            this.buildVisualFile(target, obj);
            this.incrementRenderedFiles();

            $(target).closest('.block-file').find('.block-file-result').addClass('block-file-result-filled');
        }

        if (input.files && input.files[0]) {

            reader.onload = function (e) {

            callback(input, {
                name: input.files[0].name,
                size: input.files[0].size
            })




            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    incrementRenderedFiles = () => {
        this.renderedFiles = this.renderedFiles + 1;
    }

    render() {

        return (
            <Wrapper className="Verification__investorsDocuments">
                <Title>Investor's documents</Title>
                <div className="block-file">
                    <SubTitle>Copy of identification document</SubTitle>
                    <p className="text">EU ID card, passport or driving licence bearing the name, photograph or facial
                        image, signature or image of signature and date of birth or personal identification code of the
                        holder</p>
                    <ButtonWrapper>
                        <input type="file" name='id_document_photo' onChange={this.uploadFileHandler} hidden/>
                        <Button clickHandler={this.uploadOnClickHandler} text="Attach file"/>
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
                        <input type="file" name='bill_photo' onChange={this.uploadFileHandler} hidden/>
                        <Button clickHandler={this.uploadOnClickHandler} text="Attach file"/>
                    </ButtonWrapper>
                    <div className="block-file-result">
                        <p className="files-head">Uploaded:</p>
                    </div>
                </div>
                <FinalFormCheckbox name="confirm"
                                   options={['I confirm that all the data and documents submitted are correct.']}
                                   values={['Yes']}
                                   required/>
            </Wrapper>
        )
    }
}

const mapStateToProps = ({}) => ({})

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
    color: 30a0a0a;
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
`;