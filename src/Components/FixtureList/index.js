import React from 'react';
import PropTypes from 'prop-types';
import PickHelper from '../../Helpers/pick';

import Fixture from '../Fixture';

import { withStyles } from '@material-ui/core/styles';

import { IconButton, Snackbar, Typography } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  root: theme.mixins.gutters({
    marginTop: 10,
    marginBottom: 10,
  }),
});

class FixtureList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      userPicks: props.userPicks,
    };

    this.addPick = this.addPick.bind(this);
    this.removePick = this.removePick.bind(this);
  }

  handleClose = event => {
    this.setState({ open: false });
  };

  addPick = (fixtureId, teamname, gameday, event) => {
    let { userPicks } = this.state;

    const pick = new PickHelper(null, fixtureId, teamname, gameday);

    // TODO remove nested
    PickHelper.delete(pick).then(() => {
      PickHelper.add(pick)
        .then(() => {
          userPicks = userPicks.filter(u => u.fixtureId !== fixtureId);
          userPicks.push(pick);
          this.setState({ userPicks });
        })
        .catch(error => {
          this.setState({
            open: true,
            vertical: 'bottom',
            horizontal: 'right',
            errorMessage: error.message,
          });
        });
    });
  };

  removePick = (fixtureId, teamname, gameday, event) => {
    let { userPicks } = this.state;

    const pick = new PickHelper(null, fixtureId, teamname, gameday);

    PickHelper.delete(pick)
      .then(() => {
        userPicks = userPicks.filter(u => u.fixtureId !== fixtureId);
        this.setState({ userPicks });
      })
      .catch(error => {
        this.setState({
          open: true,
          vertical: 'bottom',
          horizontal: 'right',
          errorMessage: error.message,
        });
      });
  };

  static getDerivedStateFromProps(props, state) {
    return {
      userPicks:
        state.userPicks && state.userPicks.length !== 0
          ? state.userPicks
          : props.userPicks,
    };
  }

  render() {
    const { classes, fixtures } = this.props;

    const { open, userPicks, errorMessage } = this.state;

    return (
      <React.Fragment>
        <Typography>
          Pick a result for every match. No team restrictions
        </Typography>
        <Typography>
          TEMP CHANGE: Picks must be made before 1400 for fixtures on that day.
          Login expires after 1 hour.
        </Typography>
        {fixtures &&
          fixtures.map(
            (fixture, index) => (
              <Fixture
                key={index}
                addPick={this.addPick}
                removePick={this.removePick}
                fixture={fixture}
                pick={userPicks.find(p => p.fixtureId === fixture.Id)}
                // homeTeamPick={userPicks.find(
                //   p => p.outcome === fixture.homeTeamName
                // )}
                // awayTeamPick={userPicks.find(
                //   p => p.outcome === fixture.awayTeamName
                // )}
              />
            ),
            this
          )}
        <Snackbar
          open={open}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{errorMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </React.Fragment>
    );
  }
}

FixtureList.propTypes = {
  fixtures: PropTypes.array,
  userPicks: PropTypes.array,
};

export default withStyles(styles)(FixtureList);
