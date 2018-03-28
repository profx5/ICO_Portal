import React from 'react'

const InvestForm = ({
    price,
    tokensAmount,
    contract,
    amountChange,
    handleInvest,
    showSubmit,
    hideForm,
    reason
}) => {
    const _amountChange = (event) => {
            if (event.target.value) {
                amountChange(event.target.value)
            }
        }

        return (
            <div className="modal" id="InvestForm" tabIndex="-1" style={{display: 'block'}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Invest form</h5>
                            <button type="button" className="close" onClick={hideForm}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-row">
                                <div className="col-md-6">
                                    <label htmlFor="amount">Amount (ETH)</label>
                                    <input type="text" className="form-control" id="amount" autoComplete="off" onChange={_amountChange}/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="price">Current ETH price</label>
                                    <input type="text" className="form-control" id="price" value={price} readOnly/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-12">
                                    <label htmlFor="tokens">Tokens</label>
                                    <input type="text" className="form-control" id="tokens" value={tokensAmount} readOnly />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-12">
                                    <label htmlFor="contract">Crowdsale contract</label>
                                    <input type="text" className="form-control" id="contract" value={contract} readOnly />
                                </div>
                            </div>
                        </div>
                        {showSubmit && <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" onClick={handleInvest}>Invest</button>
                        </div>}
                        {!showSubmit && <small id="emailHelp" className="form-text text-muted">{reason}</small>}
                    </div>
                </div>
            </div>
        )
}

export default InvestForm
