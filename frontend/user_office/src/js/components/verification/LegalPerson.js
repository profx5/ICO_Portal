import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';

import LegalPersonData from './components/LegalPersonData';
import RepresentationFiles from './components/RepresentationFiles';
import LegalOwnerData from './components/LegalOwnerData';
import ConfirmLegalPEP from './components/ConfirmLegalPEP';

import * as FilesActions from './../../actions/FilesActions';
import * as UIActions from "./../../actions/UIActions";

const File = ({ input: {value: omitValue, ...inputProps }, meta: omitMeta, ...props }) => (
  <input type='file' {...inputProps} {...props} />
);


class LegalPerson extends React.Component {

    render() {
        const {
            representationFiles, 
            addRepresentationFile,
            removeRepresentationFile,
            onAttachClickHandler,
            showModal,
            errors,
            touched,
            values,
            is_pep
        } = this.props;

        return (
            <Wrapper className="Verification__personData">
                <Title>Legal Person Data</Title>

                <LegalPersonData errors={errors} touched={touched} values={values}/>
                <RepresentationFiles files={representationFiles} 
                    onAttachClickHandler={onAttachClickHandler.bind(this, 'basis_doc')} 
                    uploadFileHandler={addRepresentationFile} 
                    removeFileHandler={removeRepresentationFile} 
                    name="basis_doc" 
                    filesWrapper={document.querySelector('.files-section-basis')}/>
                <LegalOwnerData errors={errors} touched={touched} values={values} showModalHandler={showModal}/>
                <ConfirmLegalPEP errors={errors} touched={touched} is_pep={is_pep}/>

            </Wrapper>
        )
    }
};


const mapStateToProps = ({Files}) => ({
    representationFiles: Files.get('representationFiles'),
})

const mapDispatchToProps = (dispatch) => ({
    showModal(payload) {
        dispatch(UIActions.showModal(payload))
    },
    addRepresentationFile(payload) {
        dispatch(FilesActions.addRepresentationFile(payload))
    },
    removeRepresentationFile(payload) {
        dispatch(FilesActions.removeRepresentationFile(payload))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(LegalPerson)


const Wrapper = styled.div`
    flex: 1;
    height: auto;
    padding: 42px 50px 42px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    .files-container {
        margin-bottom: 35px;
        padding-bottom: 35px;
        border-bottom: solid 1px rgba(151, 151, 151,.25);
        display: none;
        overflow: auto;
        .files-head {
            margin-bottom: 13px;
        }
        &-filled {
            display: block;
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

const ButtonWrapper = styled.div`
    width: 190px;
    height: 45px;
    margin-bottom: 50px;
    margin-top: 15px;
`;
