import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Home from './home';
import Admin from './admin';
import ProtectedRoute from './authentication/protected-route';
import Login from './authentication/login';
import Callback from './components/Callback';

import LoginButton from './authentication/Buttons/loginbutton';
import LogoutButton from './authentication/Buttons/logoutbutton';
import Profile from './authentication/profile';

class App extends Component {
  handleAuthentication = ({ location, history }) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      this.props.auth.handleAuthentication(history);
    }
  };

  render() {
    const { classes } = this.props;
    const auth = this.props.auth;

    return (
      <React.Fragment>
        <h1>WorldCuppy</h1>
        <Profile auth={auth} />
        <LoginButton auth={auth} />
        <LogoutButton auth={auth} />

        <Dashboard />

        <Route
          path="/login"
          component={props => {
            return <Login auth={auth} {...props} />;
          }}
        />
        <ProtectedRoute path="/home" component={Home} auth={auth} />
        <ProtectedRoute path="/admin" component={Admin} auth={auth} />
        <Route
          path="/callback"
          render={props => {
            this.handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
      </React.Fragment>
    );
  }
}

export default App;
