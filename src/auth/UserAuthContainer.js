import React, { Component } from 'react';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getIsLoggedIn, getDisplayName } from './authReducer';
import * as authActions from './authActions';

import { BASENAME } from '../utils/constants/basename';

import './UserAuth.css';

class UserNavContainer extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    const { resetAuth, history } = this.props;
    resetAuth();
    if (history) {
      history.push('/login');
    }
  }
  render() {
    const { username, isLoggedIn } = this.props;
    return (
      <div className="pull-right">
        <span style={{ float: 'left' }} className="user-title">
          {username ? (
            <span>
              Signed in as: <strong>{username}</strong>
            </span>
          ) : (
            <span>
              Viewing as: <strong>Public</strong>
            </span>
          )}
        </span>
        <Nav pullRight>
          <NavDropdown
            title={
              <img
                src={`${BASENAME}/images/avatar.svg`}
                className="user"
                alt=""
              />
            }
            id="user-dropdown"
          >
            {isLoggedIn ? (
              <MenuItem onClick={this.logout}>Logout</MenuItem>
            ) : null}
          </NavDropdown>
        </Nav>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    username: getDisplayName(state),
    isLoggedIn: getIsLoggedIn(state)
  };
}
const mapDispatchToProps = dispatch => ({
  resetAuth: () => dispatch(authActions.resetAuth())
});
export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(UserNavContainer)
);
