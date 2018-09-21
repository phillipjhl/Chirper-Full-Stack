import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

class ChirpPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        fetch(`http://localhost:3000/api/chirps/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    data: {
                        name: result[0].name,
                        text: result[0].text
                    }
                });
            })
            .catch(err => console.log(err));
    }

    handleClick() {
        fetch(`http://localhost:3000/api/chirps/${this.props.match.params.id}`,
            { method: 'DELETE' })
            .then(res => {
                if (res.ok) {
                    this.props.history.push('/');
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container" >
                <div className="card" >
                    <div className="card-body">
                        <button type="button" className="close d-inline" onClick={this.handleClick} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
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