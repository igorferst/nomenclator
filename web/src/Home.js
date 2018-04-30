import React, { Component } from 'react';
import { Grid, Navbar, Row, Col, FormGroup, FormControl, ControlLabel, Form, Panel, Button } from 'react-bootstrap';
import { Route, Link, Switch, Redirect } from "react-router-dom";

import { getAll, get, Record as RecordModel } from './records';
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
    getAll(searchFragment).then((records) => {
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
    this.state = {
      goToEdit: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      goToEdit: true
    })
  }

  render () {
    return (
      <Col xs={4} sm={3}>
        <Panel className="record-panel" onClick={this.handleClick}>
          <Panel.Body>{this.props.record.name}</Panel.Body>
        </Panel>
        {this.state.goToEdit && <Redirect to={"/records/" + this.props.record.id}/>}
      </Col>
    )
  }

}

class Record extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isNew: false,
      record: new RecordModel()
    }
  }

  componentDidMount() {
    if (this.props.isNew) {
      this.setState({
        isNew: true
      })
      return
    }

    const id = parseInt(this.props.recordId);
    if (isNaN(id)) {
      console.error('Bad record ID: ' + this.props.recordId);
      return;
    }

    get(this.props.recordId).then((record) => {
      this.setState({
        record: record
      })
    })
  }

  onFormSubmit (event) {
    event.preventDefault();
  }

  render() {
    return (
      <Grid>
        <h1>{this.props.isNew ? 'New' : 'Edit'} Record</h1>
        <Form onSubmit={this.onFormSubmit}>

          <Row>
            <Col sm={6}>
              <FormGroup controlId="formControlsName">
                <ControlLabel>Name</ControlLabel>
                <FormControl type="text" />
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup controlId="formControlsKeywords">
                <ControlLabel>Keywords</ControlLabel>
                <FormControl type="text" />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup controlId="formControlsNotes">
            <ControlLabel>Notes</ControlLabel>
            <FormControl componentClass="textarea" maxLength={1000} rows={6} />
          </FormGroup>

          <FormGroup>
            <Link to="/records"><Button>Back</Button></Link>
            <Button type="submit" bsStyle="primary" className="pull-right">Save</Button>
          </FormGroup>

        </Form>
      </Grid>
    )
  }

}

export default App;
