import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import formatFileSize from 'js/utils/formatFileSize';

import ErrorMessage from 'js/components/common/ErrorMessage';


function CreateFileAttacher (Component) {
    return class extends React.Component {
        
        constructor(props) {
            super(props);
            
            this.state = {
                filesSize: 0,
                errorMessage: ''
            }
        }
        
        render() {

            return (
                <React.Fragment>
                    <Component text={this.props.text} attach={this.props.attach} transparent={this.props.transparent} clickHandler={this.clickHandler} style={this.props.style}/>
                    {this.state.errorMessage && <ErrorMessage text={this.state.errorMessage}/>}
                </React.Fragment>
            );
        }

        componentDidMount() {
            $(`body`).on(`change.${this.props.name}`, (event) => {
                if (event.target.name === this.props.name) this.uploadFile(this.props.uploadFileHandler, event);
            });
            this.countFilesSize();
            if (this.props.errorMessage) {
                this.setState(() => {
                    return {
                        errorMessage: this.props.errorMessage
                    }
                })
            }
        };

        componentWillUnmount() {
            $(`body`).unbind(`change.${this.props.name}`);
        }

        clickHandler= (e) => {
            e.preventDefault();
            this.injectInput();
        }

        injectInput = () => {
            const {name, fileWrapper} = this.props;
            let newFileInput = document.createElement('input');

            let attr = {
                type: 'file',
                class: 'file-input',
                name: name,
                id: `${name}_${Math.random() * (999999999 - 1) + 1}`,
                hidden: true
            };

            for(let key in attr) {
                newFileInput.setAttribute(key, attr[key]);
            };

            fileWrapper.prepend(newFileInput);
            newFileInput.click();
        }

        uploadFile = (callback, event) => {
            const inputEl = event.target;
            const file = inputEl.files[0];
            const id = inputEl.id;
            const reader = new FileReader();
            const {limit} = this.props;
            let {filesSize} = this.state;
            
            if (file && /(jpeg|png|pdf|doc|docx|zip)/g.test(file.type)) {
                this.setErrorText('');

                if (filesSize + file.size >= limit) {
                    this.showErrorModal();
                    this.props.fileWrapper.removeChild(inputEl);
                    return false;
                }

                reader.addEventListener('load', () => {
                    callback({
                        name: file.name,
                        size: file.size,
                        id: id
                    })
                }, {once: true})

                reader.readAsDataURL(file);
            } else {
                this.setErrorText('Available formats: jpeg, png, pdf, doc, docs, zip')
                this.props.fileWrapper.removeChild(inputEl);
            }
        }

        countFilesSize = () => {
            let {filesToValidate} = this.props;
            let totalSize = 0;

            filesToValidate.forEach(arr => {
                for(let i = 0, length = arr.size; i < length ; i++) {
                    totalSize += arr.toJS()[i].size
                }
            })

            this.setState(() => {
                return {
                    filesSize: totalSize
                }
            })
        }

        showErrorModal = () => {
            this.props.showModal({
                modalHead: 'Warning',
                modalContent: `The total size of attached files must be less than ${formatFileSize(this.props.limit).size}${formatFileSize(this.props.limit).units}!`
            })
        }

        setErrorText  = (data) => {
            this.setState(() => {
                return {
                    errorMessage: data
                }
            })
        }
    }
}


CreateFileAttacher.propTypes = {
    name: PropTypes.string.isRequired,
    fileWrapper: PropTypes.any.isRequired,
    uploadFileHandler: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    limit: PropTypes.number,
    filesToValidate: PropTypes.array,
    errorText: PropTypes.string
}

export default CreateFileAttacher;
