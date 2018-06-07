import React from 'react';

import { Avatar, Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
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

const Profile = props => {
  return (
    props.auth.isAuthenticated() && (
      <React.Fragment>
        <Avatar
          className={props.classes.avatar}
          alt={localStorage.getItem('name')}
          src={localStorage.getItem('picture')}
        />
        <Typography className={props.classes.profile}>
          {localStorage.getItem('name')}
        </Typography>
      </React.Fragment>
    )
  );
};

export default withStyles(styles)(Profile);
