import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ChirpPage from './ChirpPage';
import ChirpEdit from './ChirpEdit';
import Home from './Home';
import NavBar from './NavBar';

class App extends Component {

    render() {
        return (
        <Router>
            <Fragment>
                <NavBar />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/chirp/:id' component={ChirpPage} />
                    <Route exact path='/chirp/:id/edit' component={ChirpEdit} />
                </Switch>
            </Fragment>
        </Router>
        );
    }
}

export default App;