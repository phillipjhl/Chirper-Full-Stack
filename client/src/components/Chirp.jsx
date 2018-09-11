//Function Component that returns a Chirp using props passed in.
//Props: userName, chirpMsg

import React from 'react';

function Chirp(props) {
    return (
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title">{props.userName}</h5>
                <p className="card-text">{props.chirpMsg}</p>
            </div>
        </div>
    );
}

export default Chirp;