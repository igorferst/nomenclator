import React, { Component } from 'react';
import { Grid, Navbar, Row, Col, FormGroup, FormControl, ControlLabel, Form, Panel } from 'react-bootstrap';

import get from './records';
import './Home.css';

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
        <LocalNavbar />
        <SearchField
          searchFragment={this.state.searchFragment}
          onChange={this.handleSearchFragmentChange}
        />
        <RecordList records={this.state.records} />
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

class RecordList extends Component {

  render() {

    const recElements = this.props.records.map((rec) =>
      <Record record={rec} key={rec.id}/>
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

class Record extends Component {

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

export default Home;
