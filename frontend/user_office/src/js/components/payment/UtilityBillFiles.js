import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {media} from 'js/utils/media';

import Button from 'js/components/common/Button';
import CreateFileAttacher from 'js/components/common/CreateFileAttacher';
import AttachedFileRenderer from 'js/components/common/AttachedFileRenderer';

import * as FilesActions from 'js/actions/FilesActions';
import * as UIActions from 'js/actions/UIActions';


class UtilityBill extends React.Component {

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
        const {idDocumentFiles, utilityBillFiles, basisFiles, addUtilityBillFile, removeUtilityBillFile, showModal, errorMessage} = this.props;
        const ButtonAttacher = CreateFileAttacher(Button);

        return (
            <Wrapper className="files-section files-section-utility">
                <SubTitle>Utility bill</SubTitle>
                <p className="text">For rent, electricity, gas, water, telecommunication services or other similar
                    services), bank or credit card statement, tax bill or notice or voter’s card or similar document
                    bearing the investor’s name and address (the document must not be older than six months.</p>
                <ButtonWrapper>
                    {this.state.attacherReady && 
                        <ButtonAttacher text={'Attach file'} 
                                attach={true} 
                                name="bill_photo" 
                                limit={40000000} 
                                filesToValidate={[idDocumentFiles, utilityBillFiles, basisFiles]} 
                                errorMessage={errorMessage}
                                fileWrapper={this.fileWrapper} 
                                uploadFileHandler={addUtilityBillFile} 
                                showModal={showModal}
                                style={{height: 45}}
                                transparent/>
                    }
                </ButtonWrapper>
                <div className={`files-container ${utilityBillFiles.size > 0 ? "files-container-filled" : ''}`} ref={fileWrapper => this.fileWrapper = fileWrapper}>
                    <input className="file-input" type="file" name='bill_photo' hidden/>
                    <p className="files-head">Uploaded:</p>
                    <AttachedFileRenderer files={utilityBillFiles} 
                        removeFileHandler={removeUtilityBillFile}
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
    addUtilityBillFile(payload) {
        dispatch(FilesActions.addUtilityBillFile(payload))
    },
    removeUtilityBillFile(payload) {
        dispatch(FilesActions.removeUtilityBillFile(payload))
    },
    showModal(payload) {
        dispatch(UIActions.showModal(payload))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UtilityBill)

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
    ${media.xsh} {
        width: 168px;
    }
`;
