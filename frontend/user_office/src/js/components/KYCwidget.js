import React from 'react'

const indicator = (props) => {
    return {
        backgroundColor: props.get('state') === "WAITING" && '#007bff' || props.get('state') === 'APPROVED' && '#28a745',
        width: '20px',
        height: '20px'
    }
}

export default ({kyc}) => {

    return (    
        <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={kyc.get('photo')} alt={kyc.get('firstname')}/>
            <div className="card-body">
                <h5 className="card-title">{kyc.get('firstname')} {kyc.get('surname')}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">midname: {kyc.get('midname')}</li>
                <li className="list-group-item">document_no: {kyc.get('document_no')}</li>
                <li className="list-group-item">country: {kyc.get('country')}</li>
                <li className="list-group-item">birdth day: {kyc.get('birthdate')}</li>
            </ul>
            <div className="card-body">
                {kyc.get('state') && <div style={indicator(kyc)}/>}
            </div>
        </div>
    )
}

