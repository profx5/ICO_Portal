import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'
import { Formik, Field, Form } from "formik";
import ValidationSchema from './utils/TicketCommentFormValidation';

import Button from './../common/Button';
import FilesAttacher from './../../utils/FilesAttacher';
import ErrorMessage from './../common/ErrorMessage';

import * as TicketActions from './../../actions/TicketActions';
import * as FilesActions from './../../actions/FilesActions';


class TicketCommentForm extends React.Component {

    onSubmitHandler = (values, {resetForm}) => {
        const form = document.querySelector('.TicketCommentForm');
        const formData = new FormData(form);

        this.props.createNewComment(formData);
        resetForm({});
    };

    render() {
        const {selectedTicket, commentFiles, addCommentFile, removeCommentFile} = this.props;

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
                        <Form className="TicketCommentForm" encType={'multipart/form-data'}>
                            <input type="hidden" name={'ticket'} value={selectedTicket.id}/>

                            <FormGroup>
                                <CommentField component="textarea"
                                    className={errors.comment && "isInvalid"}  
                                    value={values.comment || ''} 
                                    placeholder="Your message here..." 
                                    name="comment"
                                />
                                {errors.comment && <ErrorMessage text={errors.comment}/>}
                            </FormGroup>

                            <div className="controls-container files-section files-section-comment">
                                <div className="files-container">
                                    <FilesAttacher files={commentFiles} 
                                            name="attachment" 
                                            filesWrapper={document.querySelector('.files-section-comment')} 
                                            uploadFileHandler={addCommentFile} 
                                            removeFileHandler={removeCommentFile}/>
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
                        </Form>
                    )}
                />
            </Wrapper>
        )
    }
}


const mapStateToProps = ({tickets, user, Files}) => ({
    selectedTicket: tickets.get('selectedTicket'),
    commentFiles: Files.get('commentFiles')
});

const mapDispatchToProps = (dispatch) => ({
    unselectTicket() {
        dispatch(TicketActions.unselectTicket())
    },
    addCommentFile(payload) {
        dispatch(FilesActions.addCommentFile(payload))
    },
    removeCommentFile(payload) {
        dispatch(FilesActions.removeCommentFile(payload))
    },
    createNewComment(payload) {
        dispatch(TicketActions.createNewComment(payload))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketCommentForm)

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

const CommentField = styled(Field)`
    display: block;
    height: 180px;
    width: 100%;
    padding: 15px;
    resize: none;
    font-size: 16px;
    background: rgb(246, 246, 246);
    border: solid 1px rgb(214, 223, 230);
    margin-bottom: 41px;
    &::placeholder {
        opacity: 0.4;
        font-size: 16px;
        font-weight: 400;
        color: #233539;
    }
    &.isInvalid {
        border-color: rgb(242, 109, 109);
    }
`;

const FormGroup = styled.div`
    position: relative;
`;
