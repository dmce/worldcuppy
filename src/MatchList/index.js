import React from 'react';

import FixtureHelper from '../Helpers/fixture';
import PickHelper from '../Helpers/pick';
import Result from '../Result';
import FixtureList from '../FixtureList';

import { withStyles } from '@material-ui/core/styles';

import { IconButton, Snackbar, Typography } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({});

class MatchList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fixturesTimed: [],
      fixturesInPlay: [],
      fixturesFinished: [],
      fixturesScheduled: [],
      userPicks: [],
      open: false,
    };
  }

  handleClose = event => {
    this.setState({ open: false });
  };

  processFixtures = fixtures => {
    let fixturesTimed = [];
    let fixturesInPlay = [];
    let fixturesFinished = [];
    let fixturesScheduled = [];
    let activeGameday = 0;

    fixtures.forEach((f, i) => {
      const fixture = new FixtureHelper(
        f.homeTeamName,
        f.awayTeamName,
        f.status,
        f.date,
        f.matchday,
        f._links.self.href
      );

      // TODO: REMOVE THIS
      // if (i === 0) {
      //   fixture.status = 'FINISHED';
      //   fixture.goals(2, 1);
      // }

      // TODO: END

      if (fixture.status === 'IN_PLAY') activeGameday = fixture.gameday;
      if (fixture.gameday === activeGameday && fixture.status === 'TIMED')
        fixture.status = 'GAMEDAY_ACTIVE';

      switch (fixture.status) {
        case 'FINISHED':
          //fixture.goals(f.result.goalsHomeTeam, f.result.goalsAwayTeam);
          fixturesFinished.push(fixture);
          break;
        case 'IN_PLAY':
        case 'GAMEDAY_ACTIVE':
        case 'GAMEDAY_FINISHED':
          fixture.goals(f.result.goalsHomeTeam, f.result.goalsAwayTeam);
          fixturesInPlay.push(fixture);
          break;
        case 'TIMED':
          fixturesTimed.push(fixture);
          break;
        default:
          fixturesScheduled.push(fixture);
          break;
      }
    });

    return { fixturesFinished, fixturesInPlay, fixturesTimed };
  };

  processPicks = picksData => {
    let userPicks = [];
    picksData.picks.forEach((u, i) => {
      userPicks.push(new PickHelper(u._id, u.fixtureId, u.outcome, u.gameday));
    });

    return { userPicks };
  };

  async componentDidMount() {
    const fixtureData = await FixtureHelper.getAll(467);
    const pickData = await PickHelper.getByUser();

    const {
      fixturesTimed,
      fixturesInPlay,
      fixturesFinished,
    } = this.processFixtures(fixtureData.fixtures);

    const { userPicks } = this.processPicks(JSON.parse(pickData));

    this.setState({
      fixturesTimed,
      fixturesInPlay,
      fixturesFinished,
      userPicks,
    });
  }

  render() {
    const {
      fixturesTimed,
      fixturesInPlay,
      fixturesFinished,
      userPicks,
      open,
    } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        {fixturesInPlay.length > 0 && (
          <Typography variant="display3">Current Gameday</Typography>
        )}
        {fixturesInPlay.map((fixture, index) => (
          <Result
            key={index}
            fixture={fixture}
            userPick={userPicks.find(p => p.fixtureId === fixture.Id)}
            showAllPicks={true}
          />
        ))}

        {fixturesTimed.length > 0 && (
          <Typography variant="display3">Upcoming</Typography>
        )}
        <FixtureList fixtures={fixturesTimed} userPicks={userPicks} />

        {fixturesFinished.length > 0 && (
          <Typography variant="display3">Finished</Typography>
        )}
        {fixturesFinished.map((fixture, index) => (
          <Result
            key={index}
            fixture={fixture}
            userPick={userPicks.find(p => p.fixtureId === fixture.Id)}
            showAllPicks={true}
          />
        ))}

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
          message={
            <span id="message-id">
              Unable to process request. Please try again
            </span>
          }
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

export default withStyles(styles)(MatchList);
