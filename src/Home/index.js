import React, { Component } from 'react';
import MatchList from '../MatchList/';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing.unit * 1,
    padding: theme.spacing.unit * 2,
  },
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container className={classes.root} spacing={8}>
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <MatchList />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Typography variant="headline">Table</Typography>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Home);
