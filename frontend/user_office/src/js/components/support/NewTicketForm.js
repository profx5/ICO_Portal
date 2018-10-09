import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'

import Button from './../common/Button';
import FilesAttacher from './../../utils/FilesAttacher';

import * as TicketActions from './../../actions/TicketActions';
import * as FilesActions from './../../actions/FilesActions';


class NewTicketForm extends React.Component {

    onSubmitHandler = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        this.props.createNewTicket(data);
        e.target.reset();
    };

    render() {
        const {newTicketFiles, addNewTicketFile, removeNewTicketFile} = this.props;

        return (
            <Wrapper>
                <Form onSubmit={this.onSubmitHandler} encType='multipart/form-data'>
                    <label>Subject</label>
                    <input type="text" placeholder="Please describe topic of your issue.." name="title" required/>
                    <label>Detailed description</label>
                    <textarea placeholder="Please describe your issue in details." name="description" required></textarea>
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
                                <Button text="Send"/>
                            </div>
                        </div>
                    </div>
                </Form>
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

const Form = styled.form`
    label, input, textarea {
        font-size: 16px;
        font-weight: 500;
        color: #0a0a0a;
        width: 100%;
    }
    input, textarea {
        padding: 0 15px;
        margin-bottom: 40px;
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
