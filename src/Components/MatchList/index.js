import React from 'react';
import format from 'date-fns/format';

import FixtureHelper from '../../Helpers/fixture';
import PickHelper from '../../Helpers/pick';
import ResultList from '../ResultList';
import FixtureList from '../FixtureList';

import { withStyles } from '@material-ui/core/styles';

import {
  CircularProgress,
  Fade,
  IconButton,
  Snackbar,
  Typography,
  Paper,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 1,
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.secondary[100],
  },
});

class MatchList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      isLoading: true,
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
      //   fixture.goals(4, 3);
      // }

      // if (i === 1) {
      //   fixture.status = 'IN_PLAY';
      //   fixture.goals(1, 0);
      // }

      // if (i === 2) {
      //   fixture.status = 'IN_PLAY';
      //   fixture.goals(0, 3);
      // }

      // TODO: END

      //if (fixture.status === 'IN_PLAY') activeGameday = fixture.gameday;
      //if (fixture.gameday === activeGameday && fixture.status === 'TIMED')
      //  fixture.status = 'GAMEDAY_ACTIVE';

      if (fixture.date === format(new Date(), 'ddd Do MMMM')){
      fixture.status = 'GAMEDAY_ACTIVE';}

      switch (fixture.status) {
        case 'FINISHED':
          fixture.goals(f.result.goalsHomeTeam, f.result.goalsAwayTeam);
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
      userPicks.push(
        new PickHelper(
          u._id,
          u.fixtureId,
          u.outcome,
          u.gameday,
          u.points,
          u.resolved,
          u.user,
          u.username
        )
      );
    });

    return { userPicks };
  };

  async componentDidMount() {
    try {
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
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        open: true,
        vertical: 'bottom',
        horizontal: 'right',
        errorMessage: `Unable to get scoreboard details: ${error.message}`,
        isLoading: false,
      });
    }
  }

  render() {
    const {
      fixturesTimed,
      fixturesInPlay,
      fixturesFinished,
      userPicks,
      open,
      isLoading,
    } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Paper className={classes.paper}>
          <Typography variant="display2">Current Gameday</Typography>
          {isLoading ? (
            <Fade
              in={isLoading}
              style={{
                transitionDelay: isLoading ? '800ms' : '0ms',
              }}
              unmountOnExit
            >
              <CircularProgress />
            </Fade>
          ) : (
            <ResultList
              fixtures={fixturesInPlay}
              userPicks={userPicks}
              showAllPicks={true}
              defaultMessage="There are no in-play matches"
            />
          )}
        </Paper>

        <Paper className={classes.paper}>
          <Typography variant="display2">Upcoming</Typography>
          {isLoading ? (
            <Fade
              in={isLoading}
              style={{
                transitionDelay: isLoading ? '800ms' : '0ms',
              }}
              unmountOnExit
            >
              <CircularProgress />
            </Fade>
          ) : (
            <FixtureList fixtures={fixturesTimed} userPicks={userPicks} />
          )}
        </Paper>

        <Paper className={classes.paper}>
          <Typography variant="display2">Finished</Typography>
          {isLoading ? (
            <Fade
              in={isLoading}
              style={{
                transitionDelay: isLoading ? '800ms' : '0ms',
              }}
              unmountOnExit
            >
              <CircularProgress />
            </Fade>
          ) : (
            <ResultList
              fixtures={fixturesFinished}
              userPicks={userPicks}
              showAllPicks={true}
              defaultMessage="There are no finished matches"
            />
          )}
        </Paper>

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
