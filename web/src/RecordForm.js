import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import { get, save, Record as RecordModel } from './records';

class RecordForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isNew: false,
      record: new RecordModel()
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.isNew) {
      this.setState({
        isNew: true
      })
      return
    }

    const id = parseInt(this.props.recordId, 10);
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

  onPropertyChange (propertyName, event) {
    const newValue = event.target.value;
    this.setState((prevState) => {
      prevState.record[propertyName] = newValue;
      return prevState;
    });
  }

  onFormSubmit (event) {
    event.preventDefault();
    save(this.state.record).then(
      () => {
        this.props.history.push('/records');
      },
      (err) => {
        console.error('Failed to save record', err);
      }
    )
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
                <FormControl
                  type="text"
                  value={this.state.record.name}
                  onChange={this.onPropertyChange.bind(this, 'name')}
                />
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup controlId="formControlsKeywords">
                <ControlLabel>Keywords</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.record.keywords}
                  onChange={this.onPropertyChange.bind(this, 'keywords')}
                />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup controlId="formControlsNotes">
            <ControlLabel>Notes</ControlLabel>
            <FormControl
              componentClass="textarea"
              value={this.state.record.notes}
              onChange={this.onPropertyChange.bind(this, 'notes')}
              maxLength={1000}
              rows={6}
            />
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

export default withRouter(RecordForm);
