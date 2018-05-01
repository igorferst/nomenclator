import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, Form, Panel } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";

import { getAll } from './records';


class RecordSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchFragment: undefined,
      records: []
    };

    this.handleSearchFragmentChange = this.handleSearchFragmentChange.bind(this);
    this.onSearchFieldSubmit = this.onSearchFieldSubmit.bind(this);
  }

  handleSearchFragmentChange(searchFragment) {
    this.setState({searchFragment: searchFragment});
    getAll(searchFragment).then((records) => {
      this.setState({records: records});
    });
  }

  onSearchFieldSubmit (value) {
    if (this.state.records.length === 1) {
      const recordId = this.state.records[0].id;
      this.props.history.push('/records/' + recordId);
    } else if (this.state.records.length === 0) {
      this.props.history.push('/records/new', {name: value});
    }
  };

  componentDidMount() {
    this.handleSearchFragmentChange(this.state.searchFragment);
  };

  render() {
    return (
      <div>
        <SearchField
          searchFragment={this.state.searchFragment}
          onChange={this.handleSearchFragmentChange}
          onSubmit={this.onSearchFieldSubmit}
        />
        <RecordLinkList records={this.state.records} />
      </div>
    );
  }
};

class SearchField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    const newVal = event.target.value;
    this.setState({value: newVal});
    this.props.onChange(newVal);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} horizontal>
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
        {this.state.goToEdit && <Redirect push to={"/records/" + this.props.record.id}/>}
      </Col>
    )
  }

};

export default withRouter(RecordSearch);
