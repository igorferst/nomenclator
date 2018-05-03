import React, { Component } from 'react';
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';
import { Route, Switch, Redirect } from "react-router-dom";
import { withRouter } from "react-router";

import RecordForm from './RecordForm';
import RecordSearch from './RecordSearch';
import Login from './Login';
import { get as getUser, logout } from './user';

class App extends Component {

  render () {
    return (
      <div>

        <Switch>
          <Route exact={true} path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route exact={true} path='/records' render={() =>
            <div>
              <LocalNavbarWithRouter />
              <RecordSearch />
            </div>
          } />
          <Route path='/records/new' render={() =>
            <div>
              <LocalNavbarWithRouter />
              <RecordForm isNew={true} />
            </div>
          } />
          <Route path='/records/:id' render={({match}) =>
            <div>
              <LocalNavbarWithRouter />
              <RecordForm recordId={match.params.id} />
            </div>
          } />
        </Switch>
      </div>
    )
  }
}

class LocalNavbar extends Component {

  logout() {
    logout().then(
      () => {
        this.props.history.push('/');
      },
      (err) => {
        alert('Unable to log out');
        console.error(err);
      }
    )
  }

  render () {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Nomenclator</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Nav pullRight onSelect={this.logout.bind(this)}>
          <NavItem>
            Log Out
          </NavItem>
        </Nav>
      </Navbar>
    )
  }

}

const LocalNavbarWithRouter = withRouter(LocalNavbar);

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

export default App;
