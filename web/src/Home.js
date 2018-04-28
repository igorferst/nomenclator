import React, { Component } from 'react';
import { Grid, Navbar, Row, Col, FormGroup, FormControl, ControlLabel, Form, Panel } from 'react-bootstrap';
import { Route, Link, Switch, Redirect } from "react-router-dom";

import get from './records';
import './Home.css';

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
              <Home />
            </div>
          } />
          <Route path='/records/new' render={() =>
            <div>
              <LocalNavbar />
              <Record isNew={true} />
            </div>
          } />
          <Route path='/records/:id' render={({match}) =>
            <div>
              <LocalNavbar />
              <Record recordId={match.params.id} />
            </div>
          } />
        </Switch>
      </div>
    )
  }
}

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchFragment: undefined,
      records: []
    };

    this.handleSearchFragmentChange = this.handleSearchFragmentChange.bind(this);
  }

  handleSearchFragmentChange(searchFragment) {
    this.setState({searchFragment: searchFragment});
    get(searchFragment).then((records) => {
      this.setState({records: records});
    });
  }

  componentDidMount() {
    this.handleSearchFragmentChange(this.state.searchFragment);
  }

  render() {
    return (
      <div>
        <SearchField
          searchFragment={this.state.searchFragment}
          onChange={this.handleSearchFragmentChange}
        />
        <RecordLinkList records={this.state.records} />
      </div>
    );
  }
};

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

class SearchField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  onChange(event) {
    const newVal = event.target.value;
    this.setState({value: newVal});
    this.props.onChange(newVal);
  }

  render() {
    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalSearch" bsSize="large">
          <Col xs={12} sm={6} smOffset={3}>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Start typing name or nickname"
              onChange={this.onChange.bind(this)}
            />
          </Col>
        </FormGroup>
      </Form>
    )
  }
};

class RecordLinkList extends Component {

  render() {

    const recElements = this.props.records.map((rec) =>
      <RecordLink record={rec} key={rec.id}/>
    );

    return (
      <Grid>
        <Row>
          {recElements}
        </Row>
      </Grid>
    )
  }

};

class RecordLink extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    alert('big town ' + id)
  }

  render () {
    const handleClick = this.handleClick.bind(this, this.props.record.id);

    return (
      <Col xs={4} sm={3}>
        <Panel className="record-panel" onClick={handleClick}>
          <Panel.Body>{this.props.record.name}</Panel.Body>
        </Panel>
      </Col>
    )
  }

}

class Record extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isNew: false,
      recordId: null
    }
  }

  componentDidMount() {
    if (this.props.isNew) {
      this.setState({
        isNew: true
      })
    }

    const id = parseInt(this.props.recordId);
    if (!isNaN(id)) {
      this.setState({
        recordId: id
      })
    }
  }

  render() {
    return (<h1>{this.state.recordId}</h1>)
  }

}

export default App;
