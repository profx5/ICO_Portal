import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {media} from 'js/utils/media';

import ConfirmCorrectness from 'js/components/verification/stateless/ConfirmCorrectness';
import Button from 'js/components/common/Button';

import IDFiles from 'js/components/verification/stateless/IDFiles';
import UtilityBillFiles from 'js/components/verification/stateless/UtilityBillFiles';

import * as FilesActions from 'js/actions/FilesActions';


class InvestorsDocuments extends React.Component {

    render() {
        const {
            idDocumentFiles, utilityBillFiles, 
            addIdDocumentFile, addUtilityBillFile,
            removeIdDocumentFile, removeUtilityBillFile,
            onAttachClickHandler, status,
            errors, touched, values
        } = this.props;

        return (
            <Wrapper className="Verification__investorsDocuments">
                <Head>Investor's documents</Head>
                <IDFiles files={idDocumentFiles} 
                    onAttachClickHandler={onAttachClickHandler.bind(this, 'id_document_photo')} 
                    uploadFileHandler={addIdDocumentFile} 
                    removeFileHandler={removeIdDocumentFile} 
                    name="id_document_photo"
                    filesWrapper={document.querySelector('.files-section-id')}/>
                <UtilityBillFiles files={utilityBillFiles} 
                    onAttachClickHandler={onAttachClickHandler.bind(this, 'bill_photo')} 
                    uploadFileHandler={addUtilityBillFile} 
                    removeFileHandler={removeUtilityBillFile} 
                    name="bill_photo"
                    filesWrapper={document.querySelector('.files-section-utility')}/>

                <ConfirmCorrectness values={values} errors={errors} touched={touched} labelText="I confirm that all the data and documents submitted are correct."/>
                
                {status !== 'APPROVED' && 
                    <ButtonWrapper submitBtn>
                        <Button type="submit" text={status === 'WAITING' ? 'Update data' : 'Send data'}/>
                    </ButtonWrapper>
                }
            </Wrapper>
        )
    }
}


const mapStateToProps = ({KYC, Files}) => ({
    status: KYC.get('state'),
    type: KYC.get('type'),
    idDocumentFiles: Files.get('idDocumentFiles'),
    utilityBillFiles: Files.get('utilityBillFiles'),
    representationFiles: Files.get('representationFiles'),
})

const mapDispatchToProps = (dispatch) => ({
    addIdDocumentFile(payload) {
        dispatch(FilesActions.addIdDocumentFile(payload))
    },
    addUtilityBillFile(payload) {
        dispatch(FilesActions.addUtilityBillFile(payload))
    },
    removeIdDocumentFile(payload) {
        dispatch(FilesActions.removeIdDocumentFile(payload))
    },
    removeUtilityBillFile(payload) {
        dispatch(FilesActions.removeUtilityBillFile(payload))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(InvestorsDocuments)


const Wrapper = styled.div`
    flex: 1;
    height: auto;
    padding: 42px 50px 42px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    margin-top: 20px;
    ${media.xs} {
        padding: 20px 16px;
        max-width: calc(100vw - 32px);
    }
    .text {
        font-size: 16px;
        color: #0a0a0a;
        letter-spacing: 0.5px;
        line-height: 1.44;
    }
    .block-file {
        flex-basis: 100%;
    }
    .files-container-filled {
        margin-bottom: 35px;
        border-bottom: solid 1px rgba(151, 151, 151,.25);
        display: block;
        overflow: auto;
        .files-head {
            margin-bottom: 13px;
        }
    }
`;

const Head = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: #323c47;
    letter-spacing: 0.1px;
    margin-bottom: 45px;
    ${media.xs} {
        font-size: 16px;
        margin-bottom: 30px;
    }
`;

const ButtonWrapper = styled.div`
    width: 190px;
    height: 45px;
    margin-bottom: 50px;
    margin-top: ${props => props.submitBtn ? '30px' : '0'};
    ${media.xs} {
        margin-bottom: 20px;
        width: 100%;
    }
`;
