import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { login } from './authApi';
import * as authActions from './authActions';
import AuthModal from './AuthModal';
import LoginForm from './LoginForm';

class LoginFormContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: '',
      remember: false,
      errors: null,
      isModalOpen: false,
      redirectToReferrer: false,
      authHeader: ''
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    if (this.props.isLoggedIn) this.props.history.push('/');
  }

  onChange(event) {
    const target = event.target;
    if (target.name === 'remember') {
      target.value = Boolean(target.checked);
    }
    this.setState({
      [target.name]: target.value
    });
  }

  async doAuth(loginData) {
    try {
      console.log('doAuth');
      console.log({loginData});
      const userData = await login(loginData);
      console.log({userData});
      const { setAuth } = this.props;
      if (userData) {
        const authHeader = userData.token;
        const mnemonic = localStorage.getItem('mnemonic');
        console.log({mnemonic});
        if (!mnemonic) {
          this.setState({
            authHeader,
            isModalOpen: true
          });
        } else {
          setAuth(authHeader);
          this.setState({
            redirectToReferrer: true
          });
        }
      } else {
        this.setState({
          errors: 'Please try again.'
        });
      }
    } catch (errors) {
      const loginError =
        errors.response && errors.response.data && errors.response.data.error
          ? errors.response.data.error
          : 'please try again.';
      this.setState({
        errors: loginError
      });
    }
  }

  handleSubmit() {
    const { setAuth } = this.props;
    const { authHeader } = this.state;
    setAuth(authHeader);
    this.setState({
      isModalOpen: false,
      redirectToReferrer: true
    });
  }

  handleLogin(event) {
    event.preventDefault();
    const { username, password } = this.state;
    const isValid = this.validateLogin();
    if (!isValid) {
      return;
    }

    const data = {
      username,
      password
    };

    this.doAuth(data);
  }

  validateLogin() {
    const isValid = true;
    const { username, password } = this.state;
    const errors = [];

    if (!username) {
      errors.push('username');
    }

    if (!password) {
      errors.push('password');
    }

    if (errors.length > 0) {
      this.setState({
        errors: `Field(s) ${errors.join(' ')} require completion`
      });
      return !isValid;
    }
    return isValid;
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { isModalOpen, redirectToReferrer, authHeader, errors } = this.state;
    if (isModalOpen && authHeader) {
      console.log('launch modal');
      return (
        <AuthModal handleSubmit={this.handleSubmit} authHeader={authHeader} />
      );
    }

    if (redirectToReferrer) {
      console.log("Redirect: " + from);
      return <Redirect to={from} />;
    }

    return (
      <LoginForm
        errors={errors}
        onChange={this.onChange}
        onLogin={this.handleLogin}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  setAuth: authHeader => dispatch(authActions.setAuth({ authHeader }))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);
