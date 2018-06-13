import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { Button, Grid, Paper, Typography } from '@material-ui/core';

const styles = theme => ({
  oddGameday: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: theme.palette.primary[50],
  }),
  evenGameday: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: theme.palette.primary[100],
  }),
  pickedGameday: {
    backgroundColor: theme.palette.primary[50],
  },
  button: {
    backgroundColor: theme.palette.primary[50],
    marginTop: '10px',
  },
  selectedButton: {},
  availableButton: {
    filter: 'brightness(0.8)',
    '&:hover': {
      filter: 'unset',
    },
  },
  disabledFilter: { filter: 'grayscale(100%)' },
  flagLeft: { paddingRight: 8 },
  flagRight: { paddingLeft: 8 },
});

class Fixture extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      homeTeamPick: {},
      awayTeamPick: {},
    };
  }

  render() {
    const {
      classes,
      fixture,
      pick,
      addPick,
      removePick,
      homeTeamPick,
      awayTeamPick,
    } = this.props;

    const homePicked = pick && pick.outcome === fixture.homeTeamName;
    const homeDisabled =
      homeTeamPick && homeTeamPick.gameday !== fixture.gameday;
    const awayPicked = pick && pick.outcome === fixture.awayTeamName;
    const awayDisabled =
      awayTeamPick && awayTeamPick.gameday !== fixture.gameday;

    return (
      <Paper
        key={fixture.Id}
        className={
          fixture.gameday % 2 === 0 ? classes.oddGameday : classes.evenGameday
        }
      >
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Typography color="textSecondary" variant="body1" align="left">
              Gameday <strong>{fixture.gameday}</strong>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="textSecondary" variant="body1" align="right">
              {fixture.date} {fixture.kickOff}
            </Typography>
          </Grid>
          <Grid item xs={false} sm={2} />
          <Grid
            item
            xs={6}
            sm={4}
            className={homeDisabled ? classes.disabledFilter : ''}
          >
            <Button
              onClick={
                homePicked
                  ? e =>
                      removePick(
                        fixture.Id,
                        fixture.homeTeamName,
                        fixture.gameday,
                        e
                      )
                  : e =>
                      addPick(
                        fixture.Id,
                        fixture.homeTeamName,
                        fixture.gameday,
                        e
                      )
              }
              disabled={homeDisabled}
              fullWidth={true}
              variant={homePicked ? 'raised' : 'flat'}
              color={homePicked ? 'primary' : 'default'}
              className={
                homePicked ? classes.selectedButton : classes.availableButton
              }
            >
              <img
                className={classes.flagLeft}
                src={`flags/sq/16/${fixture.homeTeamName}.png`}
                alt={`${fixture.homeTeamName} Flag`}
              />
              {fixture.homeTeamName}
            </Button>
          </Grid>

          <Grid
            item
            xs={6}
            sm={4}
            className={awayDisabled ? classes.disabledFilter : ''}
          >
            <Button
              onClick={
                awayPicked
                  ? e =>
                      removePick(
                        fixture.Id,
                        fixture.awayTeamName,
                        fixture.gameday,
                        e
                      )
                  : e =>
                      addPick(
                        fixture.Id,
                        fixture.awayTeamName,
                        fixture.gameday,
                        e
                      )
              }
              fullWidth={true}
              disabled={awayDisabled}
              variant={awayPicked ? 'raised' : 'flat'}
              color={awayPicked ? 'primary' : 'default'}
              className={
                awayPicked ? classes.selectedButton : classes.availableButton
              }
            >
              {fixture.awayTeamName}
              <img
                className={classes.flagRight}
                src={`flags/sq/16/${fixture.awayTeamName}.png`}
                alt={`${fixture.awayTeamName} Flag`}
              />
            </Button>
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
      </Paper>
    );
  }
}

Fixture.propTypes = {
  fixture: PropTypes.object,
  pick: PropTypes.object,
  addPick: PropTypes.func,
  removePick: PropTypes.func,
};

export default withStyles(styles)(Fixture);
