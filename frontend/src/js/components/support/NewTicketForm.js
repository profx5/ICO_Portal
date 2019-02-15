import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'

import {media} from 'js/utils/media';
import getValidationSchema from 'js/utils/getValidationSchema';

import { Formik, Field, Form } from "formik";
import Button from 'js/components/common/Button';
import ErrorMessage from 'js/components/common/ErrorMessage';
import CreateFileAttacher from 'js/components/common/CreateFileAttacher';
import AttachedFileRenderer from 'js/components/common/AttachedFileRenderer';

import * as TicketActions from 'js/actions/TicketActions';
import * as FilesActions from 'js/actions/FilesActions';
import * as UIActions from 'js/actions/UIActions';


class NewTicketForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            attacherReady: false
        }
    }

    componentDidMount() {
        this.setState(() => {
            return {
                attacherReady: true
            }
        })
    }

    onSubmitHandler = (values, {resetForm}) => {
        const form = document.querySelector('.NewTicketForm');
        const formData = new FormData(form);

        this.props.createNewTicket(formData);
        resetForm({});
    };

    render() {
        const {newTicketFiles, addNewTicketFile, removeNewTicketFile, isSubmitting, showModal} = this.props;

        const ButtonAttacher = CreateFileAttacher(Button);

        return (

            <Wrapper>
                <Formik 
                    initialValues={{
                        title: '',
                        description: ''
                    }} 
                    validationSchema={getValidationSchema('newTicket')} 
                    onSubmit={this.onSubmitHandler} 
                    render={({errors, touched, values}) => (
                        <StyledForm className="NewTicketForm" encType='multipart/form-data'>
                            <FormGroup>
                                <label htmlFor="title">Subject</label>
                                <Field component="input" 
                                    className={errors.title && touched.title && "isInvalid"} 
                                    value={values.title || ''} 
                                    type="text" 
                                    placeholder="Please describe topic of your issue.." 
                                    name="title"
                                />
                                {errors.title && touched.title && <ErrorMessage text={errors.title}/>}
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="description">Detailed description</label>
                                <Field component="textarea" 
                                    className={errors.description && touched.description && "isInvalid"} 
                                    value={values.description || ''} 
                                    placeholder="Please describe your issue in details." 
                                    name="description"
                                />
                                {errors.description && touched.description && <ErrorMessage text={errors.description}/>}
                            </FormGroup>

                            <div className="controls-container files-section files-section-newTicket">
                                {newTicketFiles.size > 0 && <div className="files-header">Uploaded:</div>}
                                <div className="files-container" ref={fileWrapper => this.fileWrapper = fileWrapper}>
                                    <input className="file-input" type="file" name='attachment' hidden/>
                                    <AttachedFileRenderer files={newTicketFiles} removeFileHandler={removeNewTicketFile} removable={true}/>
                                </div>
                                <div className="buttons-container">
                                    <div className="button-wrapper">
                                        {this.state.attacherReady &&                                         
                                            <ButtonAttacher 
                                                text={'Attach file'} 
                                                attach={true} 
                                                transparent={true} 
                                                name="attachment"
                                                limit={40000000} 
                                                filesToValidate={[newTicketFiles]}
                                                fileWrapper={this.fileWrapper} 
                                                uploadFileHandler={addNewTicketFile}
                                                isReady={this.state.attacherReady}
                                                showModal={showModal}
                                                style={{height: 45}}/>
                                        }
                                    </div>
                                    <div className="button-wrapper">
                                        <Button type="submit" text="Send" isSubmitting={isSubmitting} style={{height: 45}}/>
                                    </div>
                                </div>
                            </div>
                        </StyledForm>  
                    )}
                />
            </Wrapper>
        )
    }
}


const mapStateToProps = ({tickets, user, Files, UI}) => ({
    email: user.get('email'),
    newTicketFiles: Files.get('newTicketFiles'),
    isSubmitting: tickets.get('isNewTicketSubmitting')
});

const mapDispatchToProps = (dispatch) => ({
    addNewTicketFile(payload) {
        dispatch(FilesActions.addNewTicketFile(payload))
    },
    removeNewTicketFile(payload) {
        dispatch(FilesActions.removeNewTicketFile(payload))
    },
    createNewTicket(payload) {
        dispatch(TicketActions.createNewTicketRequest(payload))
    },
    showModal(payload) {
        dispatch(UIActions.showModal(payload))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTicketForm)

const Wrapper = styled.div`
    padding: 42px 0 0;
    background: white;
    border-radius: 6px;
    ${media.xs} {
        padding: 35px 0 0;
    }
    .files-container {
        overflow: auto;
        ${media.smPlus} {
            float: left;
        }
        ${media.xs} {
            margin-bottom: 10px;
        }
    }
    .buttons-container {
        float: right;
        ${media.xs} {
            float: unset;
        }
        ${media.smPlus} {
            display: flex;
        }
    }
    .files-header {
        font-size: 14px;
        margin-bottom: 14px;
        ${media.smPlus} {
            display: none;
        }
        ${media.xs} {
            margin-top: 4px;
        }
    }
    .button-wrapper {
        display: inline-block;
        ${media.xs} {
            width: 100% !important;
            margin-right: 0 !important;
        }
        &:first-of-type {
            width: 190px;
            margin-right: 12px;
            ${media.xs} {
                margin-bottom: 16px;
            }
        }
        &:last-of-type {
            width: 165px;
            ${media.xs} {
                margin-bottom: 10px;
            }
        }
    }
`;

const StyledForm = styled(Form)`
    label, input, textarea {
        font-size: 16px;
        font-weight: 500;
        color: #0a0a0a;
        width: 100%;
    }
    input, textarea {
        padding: 0 15px;
        &.isInvalid {
            border-color: rgb(242, 109, 109);
        }
        &::placeholder {
            opacity: 0.4;
            font-family: Gilroy;
            font-size: 16px;
            font-weight: 400;
            color: #233539;
            ${media.xs} {
                font-size: 14px;
            }
        }
    }
    label {
        display: block;
        margin-bottom: 14px;
        ${media.xs} {
            font-size: 12px;
        }
    }
    input {
        display: block;
        height: 45px;
        border: 1px solid #d6dfe6;
    }
    textarea {
        display: block;
        height: 180px;
        border: 1px solid #d6dfe6;
        padding: 15px 15px;
        resize: none;
        ${media.xs} {
            height: 141px;
        }
    }
    input[type="file"] {
        display: none !important;
    }
`;

const FormGroup = styled.div`
    position: relative;
    margin-bottom: 40px;
    &:nth-of-type(1) {
        ${media.xs} {
            margin-bottom: 15px;
        }
    }
    &:nth-of-type(2) {
        ${media.xs} {
            margin-bottom: 10px;
        }
    }
`;
