import React from 'react';

import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core/';

const styles = theme => ({});

const LogoutButton = props =>
  props.auth.isAuthenticated() && (
    <p>
      <Button
        color="inherit"
        onClick={() => {
          props.auth.logout();
          props.history.push('/login');
        }}
      >
        Logout
      </Button>
    </p>
  );

export default withRouter(withStyles(styles)(LogoutButton));
