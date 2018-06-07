import React from 'react';
import PropTypes from 'prop-types';
import PickHelper from '../Helpers/pick';

import Fixture from '../Fixture';

import { withStyles } from '@material-ui/core/styles';

import { IconButton, Snackbar, Typography } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  table: {
    border: 1,
    width: '100%',
    borderStyle: 'solid',
    borderColor: theme.palette.grey[300],
  },
});

class FixtureList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.addPick = this.addPick.bind(this);
    this.removePick = this.removePick.bind(this);
  }

  handleClose = event => {
    this.setState({ open: false });
  };

  addPick = (fixtureId, teamname, gameday, event) => {
    let { userPicks, pickedTeams } = this.state;

    const pick = new PickHelper(null, fixtureId, teamname, gameday);

    // TODO remove nested
    PickHelper.delete(pick).then(() => {
      PickHelper.add(pick)
        .then(() => {
          userPicks = userPicks.filter(u => u.gameday !== gameday);
          userPicks.push(pick);
          pickedTeams = userPicks.map(p => {
            return { gameday: p.gameday, team: p.outcome };
          });
          this.setState({ userPicks, pickedTeams });
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

  removePick = (gameday, event) => {
    let { userPicks, pickedTeams } = this.state;

    const pick = new PickHelper(null, null, null, gameday);

    PickHelper.delete(pick)
      .then(() => {
        userPicks = userPicks.filter(u => u.gameday !== gameday);
        pickedTeams = userPicks.map(p => {
          return { gameday: p.gameday, team: p.outcome };
        });
        this.setState({ userPicks, pickedTeams });
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

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      userPicks: nextProps.userPicks,
      pickedTeams: nextProps.userPicks.map(p => {
        return { gameday: p.gameday, team: p.outcome };
      }),
    };
  }

  render() {
    const { classes, fixtures } = this.props;

    const { open, userPicks, pickedTeams, errorMessage } = this.state;

    return (
      <React.Fragment>
        <Typography>
          Azure Functions perform slowly. To be investigated and fetch feedback
          needed
        </Typography>
        <Typography>
          Pick one team from each gameday. You cannot pick the same team more
          than once.
        </Typography>
        {fixtures.map(
          (fixture, index) => (
            <Fixture
              key={index}
              addPick={this.addPick}
              removePick={this.removePick}
              fixture={fixture}
              pick={userPicks.find(p => p.fixtureId === fixture.Id)}
              pickedTeams={pickedTeams}
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
