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

import Timelapse from '@material-ui/icons/Timelapse';

const styles = theme => ({
  root: {
    backgroundColor: red[50],
    margin: theme.spacing.unit / 4,
    borderRadius: 8,
    height: 24,
    padding: 4,
  },
  fixtureData: {
    fontSize: 'xx-large',
    fontWeight: 'lighter',
    display: 'inline',
    verticalAlign: 'top',
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
    backgroundColor: theme.palette.primary[100],
  },
  drawChip: {
    backgroundColor: yellow[50],
  },
  flag: {
    paddingRight: 8,
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
            <Grid container key={key} spacing={24}>
              <Grid item xs={3}>
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
                {fixture.status === 'IN_PLAY' ? (
                  <Typography
                    color="textSecondary"
                    variant="caption"
                    align="center"
                  >
                    <Timelapse color="primary" />
                  </Typography>
                ) : (
                  ''
                )}
              </Grid>
              <Grid item xs={7}>
                <Grid container alignItems="stretch">
                  <Grid item xs={10}>
                    <img
                      className={classes.flag}
                      src={`flags/sq/48/${fixture.homeTeamName}.png`}
                      alt={`${fixture.homeTeamName} Flag`}
                    />
                    <Typography
                      component="span"
                      className={classes.fixtureData}
                    >
                      {fixture.homeTeamName}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography
                      component="span"
                      className={classes.fixtureData}
                    >
                      {fixture.outcome.homeGoals}
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <img
                      className={classes.flag}
                      src={`flags/sq/48/${fixture.awayTeamName}.png`}
                      alt={`${fixture.awayTeamName} Flag`}
                    />

                    <Typography
                      component="span"
                      className={classes.fixtureData}
                    >
                      {fixture.awayTeamName}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography
                      component="span"
                      className={classes.fixtureData}
                    >
                      {fixture.outcome.awayGoals}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <Typography align="center" component="span">
                  {userPick && (
                    <Chip
                      label={userPick.outcome}
                      classes={{
                        root: classes.root,
                        avatar: classes.avatar,
                        label: classes.label,
                      }}
                      className={`${userPick.points === 3 &&
                        classes.winChip} ${userPick.points === 1 &&
                        classes.drawChip}`}
                      avatar={
                        <Avatar src={`flags/sq/16/${userPick.outcome}.png`} />
                      }
                    />
                  )}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="display3"
                  align="center"
                >
                  {userPick && userPick.points}
                </Typography>
              </Grid>
              {allPicks && (
                <Grid item xs={12}>
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
                        classes.winChip} ${p.points === 1 && classes.drawChip}`}
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
