import React, { Component } from 'react';
import TimedFixtureList from '../Components/FixtureList/Timed';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '1280px',
    margin: '0 auto',
  },
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={8}>
        <Grid item xs={12} lg={4}>
          <TimedFixtureList />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Home);
