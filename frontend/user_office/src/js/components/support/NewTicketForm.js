import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'
import { Formik, Field, Form } from "formik";
import ValidationSchema from './utils/NewTicketFormValidation';

import Button from './../common/Button';
import ErrorMessage from './../common/ErrorMessage';
import FilesAttacher from './../../utils/FilesAttacher';

import * as TicketActions from './../../actions/TicketActions';
import * as FilesActions from './../../actions/FilesActions';


class NewTicketForm extends React.Component {

    onSubmitHandler = (values, {resetForm}) => {
        const form = document.querySelector('.NewTicketForm');
        const formData = new FormData(form);

        this.props.createNewTicket(formData);
        resetForm({});
    };

    render() {
        const {newTicketFiles, addNewTicketFile, removeNewTicketFile} = this.props;

        return (

            <Wrapper>
                <Formik
                    initialValues={{
                        title: '',
                        description: ''
                    }} 
                    validationSchema={ValidationSchema} 
                    onSubmit={this.onSubmitHandler} 
                    render={({errors, touched, values}) => (
                        <StyledForm className="NewTicketForm" encType='multipart/form-data'>

                            <FormGroup>
                                <label htmlFor="title">Subject</label>
                                <Field component="input" 
                                    className={errors.title && "isInvalid"} 
                                    value={values.title || ''} 
                                    type="text" 
                                    placeholder="Please describe topic of your issue.." 
                                    name="title"
                                />
                                {errors.title && <ErrorMessage text={errors.title}/>}
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="description">Detailed description</label>
                                <Field component="textarea" 
                                    className={errors.description && "isInvalid"} 
                                    value={values.description || ''} 
                                    placeholder="Please describe your issue in details." 
                                    name="description"
                                />
                                {errors.description && <ErrorMessage text={errors.description}/>}
                            </FormGroup>

                            <div className="controls-container files-section files-section-newTicket">
                                <div className="files-container">
                                    <FilesAttacher files={newTicketFiles} 
                                        name="attachment" 
                                        filesWrapper={document.querySelector('.files-section-newTicket')} 
                                        uploadFileHandler={addNewTicketFile} 
                                        removeFileHandler={removeNewTicketFile}/>
                                </div>
                                <div className="buttons-container">
                                    <div className="button-wrapper">
                                        <Button text="Attach file" clickHandler={this.props.onAttachClickHandler.bind(this,'attachment')} attach transparent/>
                                    </div>
                                    <div className="button-wrapper">
                                        <Button type="submit" text="Send"/>
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


const mapStateToProps = ({tickets, user, Files}) => ({
    email: user.get('email'),
    newTicketFiles: Files.get('newTicketFiles')
});

const mapDispatchToProps = (dispatch) => ({
    addNewTicketFile(payload) {
        dispatch(FilesActions.addNewTicketFile(payload))
    },
    removeNewTicketFile(payload) {
        dispatch(FilesActions.removeNewTicketFile(payload))
    },
    createNewTicket(payload) {
        dispatch(TicketActions.createNewTicket(payload))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTicketForm)

const Wrapper = styled.div`
    padding: 42px 0 65px;
    background: white;
    border-radius: 6px;
    .controls-container {
        overflow: auto;
    }
    .files-container {
        float: left;
        overflow: auto;
    }
    .buttons-container {
        float: right;
    }
    .button-wrapper {
        height: 45px;
        border-radius: 2px;
        display: inline-block;
        &:first-of-type {
            width: 190px;
            margin-right: 12px;
        }
        &:last-of-type {
            width: 165px;
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
        margin-bottom: 40px;
        &.isInvalid {
            border-color: rgb(242, 109, 109);
        }
    }
    label {
        display: block;
        margin-bottom: 14px;
    }
    input {
        display: block;
        height: 45px;
        border: 1px solid #d6dfe6;
        &::placeholder {
            opacity: 0.4;
            font-family: Gilroy;
            font-size: 16px;
            font-weight: 400;
            color: #233539;
        }
    }
    textarea {
        display: block;
        height: 180px;
        border: 1px solid #d6dfe6;
        padding: 15px 15px;
        resize: none;
        &::placeholder {
            opacity: 0.4;
            font-family: Gilroy;
            font-size: 16px;
            font-weight: 400;
            color: #233539;
        }
    }
    input[type="file"] {
        display: none !important;
    }
`;

const FormGroup = styled.div`
    position: relative;
`;
