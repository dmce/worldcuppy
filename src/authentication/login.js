import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = {
    redirectToPreviousRoute: false,
  };

  login = () => {
    this.props.auth.login(() => {
      this.setState({ redirectToPreviousRoute: true });
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToPreviousRoute } = this.state;

    if (redirectToPreviousRoute) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>This page should be nicer. Login in the top right</p>
        {/* <button onClick={this.login.bind(this)}>Log in</button> */}
      </div>
    );
  }
}

export default Login;
