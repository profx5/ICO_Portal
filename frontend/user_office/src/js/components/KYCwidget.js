import React from 'react'

const indicator = (status) => {
    return {
        backgroundColor: status === "WAITING" && '#007bff' || status === 'APPROVED' && '#28a745',
        width: '20px',
        height: '20px'
    }
}

export default({
    photo,
    surname,
    midname,
    firstname,
    document_no,
    country,
    birthdate,
    status
}) => (
    <div className="card" style={{
        width: '18rem'
    }}>
        <img className="card-img-top" src={photo} alt={firstname}/>
        <div className="card-body">
            <h5 className="card-title">{firstname} {surname}</h5>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">midname: {midname}</li>
            <li className="list-group-item">document_no: {document_no}</li>
            <li className="list-group-item">country: {country}</li>
            <li className="list-group-item">birdth day: {birthdate}</li>
        </ul>
        <div className="card-body">
            {status && <div style={indicator(status)}/>}
        </div>
    </div>
)
