import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {media} from 'js/utils/media';

import Button from 'js/components/common/Button';
import CreateFileAttacher from 'js/components/common/CreateFileAttacher';
import AttachedFileRenderer from 'js/components/common/AttachedFileRenderer';

import * as FilesActions from 'js/actions/FilesActions';
import * as UIActions from 'js/actions/UIActions';


class IDFiles extends React.Component {

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

    render() {
        const {idDocumentFiles, utilityBillFiles, basisFiles, addIdDocumentFile, removeIdDocumentFile, showModal, errorMessage} = this.props;
        const ButtonAttacher = CreateFileAttacher(Button);

        return (
            <Wrapper className="files-section files-section-id">
                <SubTitle>Copy of identification document</SubTitle>
                    <p className="text">EU ID card, passport or driving licence bearing the name, photograph or facial
                    image, signature or image of signature and date of birth or personal identification code of the
                    holder</p>
                <ButtonWrapper>
                    {this.state.attacherReady && 
                        <ButtonAttacher text={'Attach file'} 
                                attach={true} 
                                name="id_document_photo"
                                limit={40000000} 
                                filesToValidate={[idDocumentFiles, utilityBillFiles, basisFiles]} 
                                errorMessage={errorMessage}
                                fileWrapper={this.fileWrapper} 
                                uploadFileHandler={addIdDocumentFile} 
                                showModal={showModal}
                                style={{height: 45}}/>
                    }
                </ButtonWrapper>
                <div className={`files-container ${idDocumentFiles.size > 0 ? "files-container-filled" : ''}`} ref={fileWrapper => this.fileWrapper = fileWrapper}>
                    <input className="file-input" type="file" name='id_document_photo' hidden/>
                    <p className="files-head">Uploaded:</p>
                    <AttachedFileRenderer files={idDocumentFiles} 
                        removeFileHandler={removeIdDocumentFile}
                        removable={true}/>
                </div>
            </Wrapper>
        )
    }
}


const mapStateToProps = ({KYC, Files}) => ({
    idDocumentFiles: Files.get('idDocumentFiles'),
    utilityBillFiles: Files.get('utilityBillFiles'),
    basisFiles: Files.get('basisFiles'),
})

const mapDispatchToProps = (dispatch) => ({
    addIdDocumentFile(payload) {
        dispatch(FilesActions.addIdDocumentFile(payload))
    },
    removeIdDocumentFile(payload) {
        dispatch(FilesActions.removeIdDocumentFile(payload))
    },
    showModal(payload) {
        dispatch(UIActions.showModal(payload))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(IDFiles)

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
    margin-bottom: 50px;
    margin-top: ${props => props.submitBtn ? '30px' : '0'};
    ${media.xs} {
        width: 100%;
        margin-bottom: 25px;
    }
`;
