import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

class ChirpPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        };
    }

    componentWillMount() {
        fetch(`http://localhost:3000/api/chirps/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    data: {
                        name: result.name,
                        text: result.text
                    }
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container" >
                <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">{this.state.data.name}</h5>
                        <p className="card-text">{this.state.data.text}</p>
                        <Link to={`/chirp/${this.props.match.params.id}/edit`} className="btn btn-sm btn-secondary" >Edit</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChirpPage;