import React, { Component } from 'react';
import { Grid, Navbar } from 'react-bootstrap';
import { Route, Switch, Redirect } from "react-router-dom";

import RecordForm from './RecordForm';
import RecordSearch from './RecordSearch';
import './App.css';

class App extends Component {

  render () {
    return (
      <div>

        <Switch>
          <Route exact={true} path='/' render={() =>
            <Redirect to="/records" />
          } />
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

export default App;
