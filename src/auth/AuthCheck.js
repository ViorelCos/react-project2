import React from 'react';
import { withRouter, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

// `location` is provided by `withRouter` HOC
function AuthCheck({ isLoggedIn, renderOnSuccess, loginPath, loginComponent, location}) {
  console.log('AuthCheck');
  console.log({ isLoggedIn, renderOnSuccess, loginPath, loginComponent, location});
  const isOnLoginPath = loginPath === location.pathname
  console.log({isOnLoginPath});
  return isLoggedIn
          ? renderOnSuccess()
          : isOnLoginPath
            ? <Route path={loginPath} component={loginComponent}/>
            : <Redirect to={loginPath} state={{ from: location }}/>;
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
}

// This is a known issue in react-redux.
// Remove pure false when: https://github.com/reactjs/react-redux/issues/507 is merged!
export default withRouter(connect(mapStateToProps, null, null, {
  pure: false,
})(AuthCheck));
