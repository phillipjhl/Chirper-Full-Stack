import React, { Component } from 'react';

class ChirpEdit extends Component {
    
    componentDidMount() {
        console.log(this.props.match);
    }
    
    render() {
        return (
            <h1>ChirpEditPage</h1>
        );
    }
}

export default ChirpEdit;