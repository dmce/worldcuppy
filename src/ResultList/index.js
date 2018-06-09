import React from 'react';
import PropTypes from 'prop-types';

import Result from '../Result';

import { withStyles } from '@material-ui/core/styles';

import { Card, CardContent, Typography } from '@material-ui/core';

const styles = theme => ({
  card: theme.mixins.gutters({
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: theme.palette.primary[50],
  }),
});

class ResultList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, fixtures, userPicks, defaultMessage } = this.props;

    return (
      <React.Fragment>
        {fixtures.lenght > 0 ? (
          fixtures.map((fixture, index) => (
            <Result
              key={index}
              fixture={fixture}
              userPick={userPicks.find(p => p.fixtureId === fixture.Id)}
              showAllPicks={true}
              inPlay={true}
            />
          ))
        ) : (
          <Card className={classes.card}>
            <CardContent>
              <Typography color="textSecondary" variant="body1" align="center">
                {defaultMessage}
              </Typography>
            </CardContent>
          </Card>
        )}
      </React.Fragment>
    );
  }
}

ResultList.propTypes = {};

export default withStyles(styles)(ResultList);
