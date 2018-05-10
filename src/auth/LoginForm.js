import React from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Well,
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  Glyphicon,
  Button
} from 'react-bootstrap';

import './LoginForm.css';

export default function LoginForm({ errors, onChange, onLogin }) {
  return (
    <form className="login" onSubmit={onLogin}>
      {errors && (
        <Row className="text-center">
          <Col xsOffset={3} xs={6}>
            <div className="error-prompt">
              <div className="alert alert-danger error-box">
                <strong>Error:&nbsp;</strong>
                <span className="error-message">{errors}</span>
              </div>
            </div>
          </Col>
        </Row>
      )}
      <Row>
        <Col xs={12}>
          <h2>Sign in to Brackets</h2>
        </Col>
        <Col xsOffset={3} xs={6}>
          <Well>
            <FormGroup controlId="username">
              <ControlLabel>Username</ControlLabel>
              <InputGroup>
                <InputGroup.Addon>
                  <Glyphicon glyph="user" />
                </InputGroup.Addon>
                <FormControl
                  type="text"
                  name="username"
                  placeholder="User ID"
                  onChange={onChange}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup controlId="password">
              <ControlLabel>Password</ControlLabel>
              <InputGroup>
                <InputGroup.Addon>
                  <Glyphicon glyph="lock" />
                </InputGroup.Addon>
                <FormControl
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={onChange}
                />
              </InputGroup>
            </FormGroup>
            <div>
              <input
                type="checkbox"
                className="remember"
                name="remember"
                onChange={onChange}
              />
              <label htmlFor="Remember me">Remember me</label>
            </div>
            (If this is a personal computer)
            <div>
              <Button type="submit" bsStyle="success" block>
                Sign In
              </Button>
            </div>
          </Well>

          <Col xs={12} className="text-center">
            <Link
              to={'/signup'}
              className="btn"
              style={{
                backgroundColor: '#70A9D7',
                color: 'white',
                marginLeft: '10px'
              }}
            >
              Signup today!
            </Link>
          </Col>
        </Col>
      </Row>
    </form>
  );
}
