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
                for (const id in result) {
                    if (result[id].name !== undefined) {
                        let data = {
                            name: result[id].name,
                            text: result[id].text
                        }
                        updatedTimeline.unshift(data);
                    };
                };
                this.setState({
                    timeline: updatedTimeline
                });
                console.log(this.state.timeline);
            })
            .catch(err => console.log(err));
    }

    // method to handle timeline update that is called on render()
    chirpifyTimeline() {
        //maps over the state.timeline array to produce a list of Chirp Components
        let updatedTimeline = this.state.timeline.map(
            (val, index) => {
                return <Chirp key={index} id={index} userName={val.name} text={val.text} />
            });
        return updatedTimeline;
    }

    //method to handle the submitted user info and then add new object to the state.timeline array
    //prop userChirpInfo gets added to front of array
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
                    {this.chirpifyTimeline()}
                </div>

            </Fragment>
        );
    }
}

export default App;