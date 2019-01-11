import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {media} from 'js/utils/media';

import Button from 'js/components/common/Button';
import CreateFileAttacher from 'js/components/common/CreateFileAttacher';
import AttachedFileRenderer from 'js/components/common/AttachedFileRenderer';

import * as FilesActions from 'js/actions/FilesActions';
import * as UIActions from 'js/actions/UIActions';


class BasisFiles extends React.Component {

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
        const {idDocumentFiles, utilityBillFiles, basisFiles, addBasisFile, removeBasisFile, showModal, errorMessage} = this.props;
        const ButtonAttacher = CreateFileAttacher(Button);

        return (
            <Wrapper className="files-section files-section-basis">
                <SubTitle>Basis for representation</SubTitle>
                <ButtonWrapper>
                {this.state.attacherReady && 
                    <ButtonAttacher text={'Attach file'} 
                            attach={true} 
                            name="basis_doc"
                            limit={40000000} 
                            filesToValidate={[idDocumentFiles, utilityBillFiles, basisFiles]} 
                            errorMessage={errorMessage}
                            fileWrapper={this.fileWrapper} 
                            uploadFileHandler={addBasisFile} 
                            showModal={showModal}
                            style={{height: 45}}/>
                }
                </ButtonWrapper>
                <div className={`files-container ${basisFiles.size > 0 ? "files-container-filled" : ''}`} ref={fileWrapper => this.fileWrapper = fileWrapper}>
                    <input className="file-input" type="file" name='basis_doc' hidden/>
                    {basisFiles.size > 0 && <p className="files-head">Uploaded:</p>}
                    <AttachedFileRenderer files={basisFiles} 
                        removeFileHandler={removeBasisFile}
                        removable={true}/>
                </div>
            </Wrapper>
        )
    }
}


const mapStateToProps = ({KYC, Files}) => ({
    status: KYC.get('state'),
    type: KYC.get('type'),
    idDocumentFiles: Files.get('idDocumentFiles'),
    utilityBillFiles: Files.get('utilityBillFiles'),
    basisFiles: Files.get('basisFiles'),
})

const mapDispatchToProps = (dispatch) => ({
    addBasisFile(payload) {
        dispatch(FilesActions.addBasisFile(payload))
    },
    removeBasisFile(payload) {
        dispatch(FilesActions.removeBasisFile(payload))
    },
    showModal(payload) {
        dispatch(UIActions.showModal(payload))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BasisFiles)

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
