import React from 'react';

import KYCForm from './KYCForm';


class KYCHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showForm: false
        };

        this.showForm = this.showForm.bind(this);
    }

    showForm() {
        this.setState({
            showForm: true,
        });
    }

    render() {
        const {investmentThreshold} = this.props;

        return (
            <div className="col-md-12">
                <div className="alert alert-warning" role="alert">
                    <p>You did not pass KYC confirmation. Your invstment threshold is limited to {investmentThreshold}</p>
                    <button className="btn btn-success" onClick={this.showForm}>
                        Pass KYC
                    </button>
                </div>
                {this.state.showForm ? <KYCForm /> : null}
            </div>
        )
    }
}

export default KYCHeader
