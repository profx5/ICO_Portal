import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import formatFileSize from 'js/utils/formatFileSize';

import AttachedFile from 'js/components/common/AttachedFile';


class AttachedFileRenderer extends React.Component {

    render() {
        return this.props.files.map((file, index) => {
            return <AttachedFile 
                        id={file.id} 
                        key={index} 
                        fileName={file.name} 
                        fileSize={formatFileSize(file.size).size} 
                        sizeUnits={formatFileSize(file.size).units} 
                        removeHandler={this.removeFile.bind(this, file.id)} 
                        removable={this.props.removable}/>
        })
    }

    removeFile = (id) => {
        const {removeFileHandler} = this.props;
        const el = ReactDOM.findDOMNode(this).parentNode.querySelector(`input[id="${id}"]`);
        const wrapper = el.parentNode;

        wrapper.removeChild(el);
        removeFileHandler(id);
    }
}


AttachedFileRenderer.propTypes = {
    files: PropTypes.any.isRequired,
    removeFileHandler: PropTypes.func.isRequired,
    removable: PropTypes.bool
}

export default AttachedFileRenderer;
