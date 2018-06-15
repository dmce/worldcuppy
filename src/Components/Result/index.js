import React from 'react';
import PropTypes from 'prop-types';
import PickHelper from '../../Helpers/pick';

import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
} from '@material-ui/core';

import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';

import {
  Timelapse,
  Schedule,
  AlarmOff,
  ThumbUp,
  ThumbDown,
  ThumbsUpDown,
} from '@material-ui/icons/';

const styles = theme => ({
  root: {
    backgroundColor: 'transparent',
    margin: theme.spacing.unit / 4,
    borderRadius: 8,
    height: 24,
    padding: 4,
  },
  flexGrid: {
    display: 'flex',
    alignItems: 'center',
  },
  fixtureData: {
    fontSize: 'xx-large',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  userPicks: {
    marginTop: '20px',
  },
  picked: {
    filter: 'unset',
  },
  notPicked: {
    filter: 'brightness(0.8)',
  },
  label: {
    paddingLeft: 8,
    paddingRight: 4,
    fontWeight: 'lighter',
  },
  avatar: {
    width: 16,
    height: 16,
  },
  winChip: {
    backgroundColor: theme.palette.primary[50],
    color: theme.palette.secondary[800],
  },
  drawChip: {
    backgroundColor: yellow[50],
    color: theme.palette.secondary[800],
  },
  lossChip: {
    backgroundColor: red[50],
    color: theme.palette.secondary[800],
  },
  flag: {
    paddingRight: 8,
  },
  winIcon: {
    color: theme.palette.primary[200],
    fontSize: 30,
  },
  drawIcon: {
    color: yellow[200],
    fontSize: 30,
  },
  lossIcon: {
    color: red[200],
    fontSize: 30,
  },
});

class Result extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allPicks: [],
    };
  }

  processPicks = (picksData, outcome) => {
    let userPicks = [];
    picksData.picks.forEach((u, i) => {
      const p = new PickHelper(
        u._id,
        u.fixtureId,
        u.outcome,
        u.gameday,
        u.points,
        u.resolved,
        u.user,
        u.username
      );
      p.inPlayPoints(outcome);
      userPicks.push(p);
    });

    return { userPicks };
  };

  async componentDidMount() {
    const { showAllPicks, fixture } = this.props;

    let pickData;
    if (showAllPicks) {
      pickData = await PickHelper.getByFixtureId(fixture.Id);
      pickData = this.processPicks(
        JSON.parse(pickData),
        fixture.outcome.result
      );
    }

    this.setState({ allPicks: pickData.userPicks });
  }

  render() {
    const { fixture, userPick, classes, key } = this.props;
    const { allPicks } = this.state;

    userPick && userPick.inPlayPoints(fixture.outcome.result);

    return (
      <Card>
        {fixture && (
          <CardContent>
            <Grid container key={key}>
              <Grid item xs={6} sm={6} md={2}>
                <Typography
                  color="textSecondary"
                  variant="display1"
                  align="center"
                >
                  {fixture.kickOff}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="caption"
                  align="center"
                >
                  {fixture.date}
                </Typography>
                {fixture.status === 'IN_PLAY' && (
                  <Typography
                    color="textSecondary"
                    variant="caption"
                    align="center"
                  >
                    <Timelapse color="primary" />
                  </Typography>
                )}
                {(fixture.status === 'FINISHED' || fixture.status === 'GAMEDAY_FINISHED') && (
                  <Typography
                    color="textSecondary"
                    variant="caption"
                    align="center"
                  >
                    <AlarmOff color="secondary" />
                  </Typography>
                )}
                {fixture.status === 'GAMEDAY_ACTIVE' && (
                  <Typography
                    color="textSecondary"
                    variant="caption"
                    align="center"
                  >
                    <Schedule color="secondary" />
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6} sm={6} md={2}>
                {userPick && (
                  <React.Fragment>
                    <Typography align="center">
                      {userPick.points === 3 && (
                        <ThumbUp className={classes.winIcon}>WIN</ThumbUp>
                      )}
                      {userPick.points === 1 && (
                        <ThumbsUpDown className={classes.drawIcon} />
                      )}
                      {userPick.points === 0 && (
                        <ThumbDown className={classes.lossIcon} />
                      )}
                    </Typography>
                    <Typography align="center" component="span">
                      <Chip
                        label={userPick.outcome}
                        classes={{
                          root: classes.root,
                          avatar: classes.avatar,
                          label: classes.label,
                        }}
                        avatar={
                          <Avatar src={`flags/sq/16/${userPick.outcome}.png`} />
                        }
                      />
                    </Typography>
                  </React.Fragment>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Grid container>
                  <Grid item xs={11} className={classes.flexGrid}>
                    <img
                      className={classes.flag}
                      src={`flags/sq/48/${fixture.homeTeamName}.png`}
                      alt={`${fixture.homeTeamName} Flag`}
                    />
                    <Typography className={classes.fixtureData}>
                      {fixture.homeTeamName}
                    </Typography>
                  </Grid>
                  <Grid item xs={1} className={classes.flexGrid}>
                    <Typography align="right" className={classes.fixtureData}>
                      {fixture.outcome.homeGoals}
                    </Typography>
                  </Grid>
                  <Grid item xs={11} className={classes.flexGrid}>
                    <img
                      className={classes.flag}
                      src={`flags/sq/48/${fixture.awayTeamName}.png`}
                      alt={`${fixture.awayTeamName} Flag`}
                    />

                    <Typography className={classes.fixtureData}>
                      {fixture.awayTeamName}
                    </Typography>
                  </Grid>
                  <Grid item xs={1} className={classes.flexGrid}>
                    <Typography align="right" className={classes.fixtureData}>
                      {fixture.outcome.awayGoals}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              {allPicks && (
                <Grid item xs={12} className={classes.userPicks}>
                  {allPicks.map(p => (
                    <Chip
                      key={p.Id}
                      label={`${p.username} - ${p.points}`}
                      classes={{
                        root: classes.root,
                        avatar: classes.avatar,
                        label: classes.label,
                      }}
                      className={`${p.points === 3 &&
                        classes.winChip} ${p.points === 1 &&
                        classes.drawChip} ${p.points === 0 &&
                        classes.lossChip}`}
                      avatar={<Avatar src={`flags/sq/16/${p.outcome}.png`} />}
                    />
                  ))}
                </Grid>
              )}
            </Grid>
          </CardContent>
        )}
      </Card>
    );
  }
}

Result.propTypes = {
  fixture: PropTypes.object,
  userPick: PropTypes.object,
};

export default withStyles(styles)(Result);
