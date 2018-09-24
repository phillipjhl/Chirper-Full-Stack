/**
 * Function Component that returns a Chirp using props passed in.
 * Props: userName, chirpMsg
 **/
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'; 

function Chirp(props) {
    return (
        <div className="card m-2" >
            <div className="card-body">
                <h5 className="card-title">{props.userName}</h5>
                <p className="card-text">{props.text}</p>
                <Link to={`/chirp/${props.id}`} className="btn btn-sm btn-secondary" >See Details</Link>
            </div>
        </div>
    );
}

export default Chirp;