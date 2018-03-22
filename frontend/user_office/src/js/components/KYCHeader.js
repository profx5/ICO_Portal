import React from 'react'

export const KYCHeaderAlert = ({investmentThreshold, onClick}) => (
    <div className="col-md-12">
        <div className="alert alert-warning" role="alert">
            <p>You did not pass KYC confirmation. Your invstment threshold is limited to {investmentThreshold}</p>
            <button className="btn btn-success" onClick={onClick}>
                Pass KYC
            </button>
        </div>
    </div>
)

export const KYCHeaderWaiting = () => (
    <div className="col-md-12">
        <div className="alert alert-primary" role="alert">
            <p>Your KYC is waiting for approval</p>
        </div>
    </div>
)

export const KYCHeaderDeclined = () => (
    <div className="col-md-12">
        <div className="alert alert-danger" role="alert">
            <p>Your KYC was declined</p>
        </div>
    </div>
)
