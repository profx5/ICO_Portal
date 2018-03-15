import React from 'react'
import axios from 'axios'

import Api from '../../api'

class KYCForm extends React.Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();

        const data = new FormData(event.target);

        axios({
            method: 'POST',
            data: data,
            url: Api.kyc()
        }).then( ({data}) => {
            console.log({data})
        }).catch(error => {
            console.log("Cant create kyc")
        })
    }

    render () {
        return (
            <div className="modal" id="KYCForm" tabIndex="-1" style={{display: 'block'}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">KYC from</h5>
                            </div>
                            <div className="modal-body">
                                <div className="form-row">
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="firstName">First name</label>
                                        <input type="text" className="form-control" id="firstName" name="firstname" placeholder="First name" required />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="midName">Middle name</label>
                                        <input type="text" className="form-control" id="midName" name="midname" placeholder="Middle name" />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="lastName">Last name</label>
                                        <input type="text" className="form-control" id="lastName" name="surname" placeholder="Last name" required />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="birthDate">Birth date</label>
                                        <input type="date" className="form-control" id="birthDate" name="birthdate" placeholder="Birth date" required />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="country">Country</label>
                                        <input type="text" className="form-control" id="country" name="country" placeholder="Country" required />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="documentNo">Document no</label>
                                        <input type="text" className="form-control" id="documentNo" name="document_no" placeholder="Document" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="photo">Photo</label>
                                    <input type="file" className="form-control-file" id="photo" name="photo" />
                                </div>
                                <div className="form-group">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="agree" required />
                                        <label className="form-check-label" htmlFor="agree">
                                            Agree to terms and conditions
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Submit KYC</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

export default KYCForm;
