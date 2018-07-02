import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Dashboard from './Components/Dashboard';
import Home from './Home';
import Admin from './Admin';
import ProtectedRoute from './Authentication/protected-route';
import Login from './Authentication/login';
import Callback from './Components/Callback';

import LoginButton from './Authentication/Buttons/loginbutton';
import LogoutButton from './Authentication/Buttons/logoutbutton';
import Profile from './Authentication/profile';

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
