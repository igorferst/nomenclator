import React, { Component } from 'react';
import { Grid, Panel, Row, Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { withRouter } from "react-router";

import { login } from './user';

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const password = this.input.value;
    login(password).then(
      () => {
        this.props.history.replace('/');
      },
      (err) => {
        console.error(err);
        alert('Unable to log in.');
      }
    )
    event.preventDefault();
  }

  render() {
    return (
    <Grid id="login-container">
        <Row>
            <Col smOffset={2} sm={8} mdOffset={3} md={6}>
              <Panel bsStyle="info">

                <Panel.Heading>
                  <h3 id="login-panel-heading">Nomenclator</h3>
                </Panel.Heading>

                <Panel.Body className="login-panel-body">
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup controlId="formPassword">
                        <Col xs={10}>
                          <FormControl type="password" placeholder="Password" inputRef={(input) => this.input = input} />
                        </Col>
                        <Col xs={2}>
                          <Button type="submit" className="pull-right">Sign In</Button>
                        </Col>
                      </FormGroup>
                    </Form>
                </Panel.Body>

              </Panel>
            </Col>
        </Row>
    </Grid>
    )
  }

}

export default withRouter(Login);
