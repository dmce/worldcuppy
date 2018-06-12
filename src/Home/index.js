import React, { Component } from 'react';
import MatchList from '../Components/MatchList/';
import Scoreboard from '../Components/Scoreboard';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={8}>
        <Grid item xs={12} md={4}>
          <Scoreboard />
        </Grid>
        <Grid item xs={12} md={8}>
          <MatchList />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Home);
