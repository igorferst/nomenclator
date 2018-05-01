import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, Form, Panel } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

import { getAll } from './records';


class RecordSearch extends Component {

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
        {this.state.goToEdit && <Redirect push to={"/records/" + this.props.record.id}/>}
      </Col>
    )
  }

};

export default RecordSearch;
