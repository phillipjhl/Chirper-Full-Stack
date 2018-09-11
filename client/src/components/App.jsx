import React, { Component, Fragment } from 'react';
import ChirpInput from './ChirpInput';
import Chirp from './Chirp';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeline: [
                {
                    name: "Katrina",
                    chirpMsg: "Hello World!"
                },
                {
                    name: "Norah",
                    chirpMsg: "Isn't it a nice day!?"
                },
                {
                    name: "Mowgli",
                    chirpMsg: "Meow."
                }
            ]
        }

        this.handlePost = this.handlePost.bind(this);
    }

    //method to handle timeline update that is called on render()
    //maps over the new state.timeline to create a list of Chirps
    updateTimeline() {
        //maps over the state.timeline array to produce a list of Chirp Components
        let updatedTimeline = this.state.timeline.map(
            (val, index) => {
                return <Chirp key={index} userName={val.name} chirpMsg={val.chirpMsg} />
            });
        return updatedTimeline;
    } 

    //method to handle the submitted user info and then add new object to the state.timeline
    handlePost(userChirpInfo) {
        let userTimeline = this.state.timeline;
        userTimeline.unshift(userChirpInfo);
        this.setState({ timeline: userTimeline })

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

                <div id="userinput" className="bg-primary p-4">
                    <ChirpInput onPost={this.handlePost} />
                </div>

                <div id="timeline" className="bg-light p-4" >
                    {this.updateTimeline()}
                </div>

            </Fragment>
        );
    }
}

export default App;