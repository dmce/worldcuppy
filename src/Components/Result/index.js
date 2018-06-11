import React from 'react';
import PropTypes from 'prop-types';
import Pick from '../../Helpers/pick';

import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
} from '@material-ui/core';

import Timelapse from '@material-ui/icons/Timelapse';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary[100],
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
  chip: {
    margin: theme.spacing.unit / 4,
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

  async componentDidMount() {
    const { showAllPicks, fixture } = this.props;

    let pickData;
    if (showAllPicks) {
      pickData = await Pick.getByFixtureId(fixture.Id);
      pickData = JSON.parse(pickData);
    }

    this.setState({ allPicks: pickData.picks });
  }

  render() {
    const { fixture, userPick, classes, key, inPlay } = this.props;
    const { allPicks } = this.state;

    return (
      <Card>
        {fixture ? (
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
                      className={classes.chip}
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
                  {userPick.resolved ? userPick.points : '-'}
                </Typography>
              </Grid>
              {allPicks && (
                <Grid item xs={12}>
                  {allPicks.map(p => (
                    <Chip
                      key={p._id}
                      label={p.username}
                      classes={{
                        root: classes.root,
                        avatar: classes.avatar,
                        label: classes.label,
                      }}
                      className={classes.chip}
                      avatar={<Avatar src={`flags/sq/16/${p.outcome}.png`} />}
                    />
                  ))}
                </Grid>
              )}
            </Grid>
          </CardContent>
        ) : (
          <CardContent>RED</CardContent>
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
