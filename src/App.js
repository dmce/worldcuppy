import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import Admin from './Admin';
import ProtectedRoute from './Authentication/protected-route';
import Login from './Authentication/login';
import Callback from './Components/Callback';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LogoutButton from './Authentication/Buttons/logoutbutton';
import LoginButton from './Authentication/Buttons/loginbutton';
import Profile from './Authentication/profile';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  avatar: {
    height: 30,
    width: 30,
  },
  profile: {
    ...theme.typography.button,
    padding: theme.spacing.unit,
    lineHeight: '1.4em',
  },
});

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
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              WorldCuppy
            </Typography>
            {/* <Link to="/home">Home</Link> */}
            {/* <Link to="/admin">Admin</Link> */}
            <Profile auth={auth} />
            <LoginButton auth={auth} />
            <LogoutButton auth={auth} />
          </Toolbar>
        </AppBar>
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

export default withStyles(styles)(App);
