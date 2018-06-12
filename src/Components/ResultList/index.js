import React from 'react';
import PropTypes from 'prop-types';

import Result from '../Result';

import { withStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';

const styles = theme => ({});

class ResultList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { fixtures, userPicks, defaultMessage } = this.props;

    return (
      <React.Fragment>
        {fixtures && fixtures.length > 0 ? (
          fixtures.map((fixture, index) => (
            <Result
              key={index}
              fixture={fixture}
              userPick={userPicks.find(p => p.fixtureId === fixture.Id)}
              showAllPicks={true}
            />
          ))
        ) : (
          <Typography color="textSecondary" variant="body1">
            {defaultMessage}
          </Typography>
        )}
      </React.Fragment>
    );
  }
}

ResultList.propTypes = {};

export default withStyles(styles)(ResultList);
