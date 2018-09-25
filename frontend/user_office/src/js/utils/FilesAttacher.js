import React from 'react';
import AttachedFile from './../components/common/AttachedFile';
import $ from 'jquery';


class FilesAttacher extends React.Component {

    componentDidMount() {
        $(`body`).on(`change.${this.props.name}`, (event) => {
            if (event.target.name === this.props.name) this.uploadFileHandler(this.props.uploadFileHandler, event);
        });
    };

    componentWillUnmount() {
        $(`body`).unbind(`change.${this.props.name}`);
    }

    onRemoveFileHandler = (id ,event) => {
        const {removeFileHandler, filesWrapper} = this.props;

        $(filesWrapper).find(`.file-input[id="${id}"]`).remove();
        removeFileHandler(id);
    }

    renderAttachedFiles = (files) => {

        return files.map((file, index) => {
            return <AttachedFile onRemoveHandler={this.onRemoveFileHandler.bind(this, file.id)} fileName={file.name} fileSize={file.size} id={file.id} key={index} removable/>
        })
    }

    uploadFileHandler = (callback, event) => {

        var fileInput = event.target;
        var id = +fileInput.id;
        var reader = new FileReader();
        var file = fileInput.files[0];


        if (file && /(jpeg|png|pdf|doc|docx|zip)/g.test(file.type)) {

            reader.addEventListener('load', function(e) {
 
                callback({
                    name: file.name,
                    size: file.size,
                    id: id
                })
            }, {once: true})

            reader.readAsDataURL(file);
        } else {
            $(fileInput).remove();
        }
    }

    render() {

        return (
            <React.Fragment>
                {this.renderAttachedFiles(this.props.files)}
            </React.Fragment>
        )
    }
}

export default FilesAttacher;
