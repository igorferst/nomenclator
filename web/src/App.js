import React, { Component } from 'react';
import { Grid, Navbar } from 'react-bootstrap';
import { Route, Switch, Redirect } from "react-router-dom";

import RecordForm from './RecordForm';
import RecordSearch from './RecordSearch';
import { get as getUser } from './user';
import './App.css';

class App extends Component {

  render () {
    return (
      <div>

        <Switch>
          <Route exact={true} path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route exact={true} path='/records' render={() =>
            <div>
              <LocalNavbar />
              <RecordSearch />
            </div>
          } />
          <Route path='/records/new' render={() =>
            <div>
              <LocalNavbar />
              <RecordForm isNew={true} />
            </div>
          } />
          <Route path='/records/:id' render={({match}) =>
            <div>
              <LocalNavbar />
              <RecordForm recordId={match.params.id} />
            </div>
          } />
        </Switch>
      </div>
    )
  }
}

class LocalNavbar extends Component {

  render () {
    return (
      <Navbar inverse>
        <Grid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Nomenclator</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Grid>
      </Navbar>
    )
  }

}

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      goToLogin: false,
      goToMain: false
    };
  }

  componentDidMount() {
    getUser().then(
      () => {this.setState({goToMain: true})},
      () => {this.setState({goToLogin: true})}
    );
  }

  render() {
    return (
      <div>
        {this.state.goToLogin && <Redirect to='/login'/>}
        {this.state.goToMain && <Redirect to='/records'/>}
      </div>
    )
  }

}

class Login extends Component {

  render() {
    return (
      <h1>Log In Please</h1>
    )
  }

}

export default App;
