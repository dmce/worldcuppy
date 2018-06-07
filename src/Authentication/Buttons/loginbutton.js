import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core/';

const styles = theme => ({});

const LoginButton = props =>
  !props.auth.isAuthenticated() && (
    <p>
      <Button
        color="inherit"
        onClick={() => {
          props.auth.login();
        }}
      >
        Login
      </Button>
    </p>
  );

export default withStyles(styles)(LoginButton);
