//Component for User Input
//Posting adds new Chirp to timeline

import React, { Component } from 'react';

class ChirpInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    //method to handle the text input and change state
    handleChange(e) {
        this.setState({ msg: e.target.value })
    };

    //method to handle the submission of the text input
    //uses property onPost to send userChirpInfo to App.handlePost() method
    handlePost(e) {
        e.preventDefault();
        let userChirpInfo = {
            name: 'Phillip',
            chirpMsg: this.state.msg
        }
        this.setState({ msg: '' });
        this.props.onPost(userChirpInfo);
    };

    render() {
        return (
            <form className="form-group" onSubmit={this.handlePost} >
                <label for="chirpinput" className="text-white" >Post Your Message Here</label>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        id="chirpinput"
                        value={this.state.msg}
                        onChange={this.handleChange}
                        placeholder="How are you feeling today?"
                    />
                    <div className="input-group-append">
                        <button type="button" onClick={this.handlePost} className="btn btn-secondary" >Post</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default ChirpInput;