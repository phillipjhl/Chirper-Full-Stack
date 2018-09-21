import React, { Component, Fragment } from 'react';

class ChirpEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
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

    handleTextChange(e) {
        this.setState({
            data: {
                name: this.state.data.name,
                text: e.target.value
            }
        })
    };

    handleUpdate(e) {
        e.preventDefault();
        fetch(`http://localhost:3000/api/chirps/${this.props.match.params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(this.state.data)
        }).catch(err => console.log(err));
        this.props.history.replace('/');
    }

    render() {
        return (
            <Fragment>

                <div className="jumbotron jumbotron-fluid text-primary m-0">
                    <div className="container">
                        <h1 className="display-4">Edit Your Chirp</h1>
                    </div>
                </div>

                <div className="container">
                    <form className="sm-10" onSubmit={this.handleUpdate}>
                        <h3>{this.state.data.name}</h3>

                        <div className="form-group" >
                            <label for="chirp-edit-text">Chirp:</label>
                            <input
                                type="text"
                                name="text"
                                className="form-control"
                                id="chirp-edit-text"
                                onChange={this.handleTextChange}
                                val={`${this.state.data.text}`}
                                placeholder={`${this.state.data.text}`}>
                            </input>
                        </div>

                        <button className="btn btn-primary" onClick={this.handleUpdate}>Update</button>

                    </form>
                </div>

            </Fragment>
        );
    }
}

export default ChirpEdit;