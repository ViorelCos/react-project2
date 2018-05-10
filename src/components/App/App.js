import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router } from 'react-router-dom';
// import ThemeLayout from 'rcomp-theme-skuchain';
import LoginFormContainer from '../../auth/LoginFormContainer';
import AuthCheck from '../../auth/AuthCheck';
import Dashboard from '../dashboard/Dashboard';
import { BASENAME } from '../../utils/constants/basename';

class App extends Component {
  render() {
    return (
      <Router basename={BASENAME}>
        <div>
          <Helmet>
            <title>Skuchain Inc</title>
          </Helmet>
          {/* <ThemeLayout> */}
            <AuthCheck
              renderOnSuccess={() => <Dashboard/>}
              loginComponent={LoginFormContainer}
              loginPath="/login"
            />
          {/* </ThemeLayout> */}
        </div>
      </Router>
    );
  }
}

export default App;
