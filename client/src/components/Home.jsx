import React, { Component, Fragment } from 'react';
import ChirpInput from './ChirpInput';
import Chirp from './Chirp';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeline: []
        }

        //function binding
        this.handlePost = this.handlePost.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:3000/api/chirps")
            .then(res => res.json())
            .then(result => {
                let updatedTimeline = [];
                result.forEach(val => {
                    let data = {
                        id: val.id,
                        name: val.name,
                        text: val.text
                    }
                    updatedTimeline.push(data);
                });
                this.setState({
                    timeline: updatedTimeline
                });
            })
            .catch(err => console.log(err));
    }

    // method to handle timeline update that is called on render()
    chirpifyTimeline() {
        //maps over the state.timeline array to produce a list of Chirp Components
        let updatedTimeline = this.state.timeline.map(
            (val) => {
                return <Chirp key={val.id} id={val.id} userName={val.name} text={val.text} />
            });
        return updatedTimeline;
    }

    //method to handle the submitted user info and then add new object to the state.timeline array
    //prop userChirpInfo gets added to front of array
    handlePost() {
        fetch("http://localhost:3000/api/chirps")
            .then(res => res.json())
            .then(result => {
                let updatedTimeline = [];
                result.forEach(val => {
                    let data = {
                        id: val.id,
                        name: val.name,
                        text: val.text
                    }
                    updatedTimeline.push(data);
                });
                this.setState({
                    timeline: updatedTimeline
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Fragment>

                <div className="jumbotron jumbotron-fluid text-primary m-0">
                    <div className="container">
                        <h1 className="display-4">Chirper</h1>
                        <p className="lead">Welcome to Chirper. A site to post fun messages!</p>
                    </div>
                </div>

                <div id="userinput" className="container bg-primary p-4">
                    <div className="col-sm-10">
                        <ChirpInput onPost={this.handlePost} />
                    </div>
                </div>

                <div id="timeline" className="container bg-light p-4" >
                    <div className="col-sm-10">
                        {this.chirpifyTimeline()}
                    </div>
                </div>

            </Fragment>
        );
    }
}

export default App;