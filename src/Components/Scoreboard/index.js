import React from 'react';
import ScoreboardHelper from '../..//Helpers/scoreboard';

import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  CircularProgress,
  Fade,
  Paper,
} from '@material-ui/core';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  p: {
    padding: 10,
  },
  card: theme.mixins.gutters({
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: theme.palette.primary[50],
  }),
  paper: {
    marginTop: theme.spacing.unit * 1,
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.secondary[100],
  },
  table: {
    '& tbody tr:last-child': {
      backgroundColor: red[50],
    },
    '& tbody tr:nth-child(1)': {
      backgroundColor: theme.palette.primary[50],
    },
    '& tbody tr:nth-child(2)': {
      backgroundColor: yellow[50],
    },
  },
});

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      hasError: false,
    };
  }

  async componentDidMount() {
    try {
      const scoreboardData = await ScoreboardHelper.get();
      const parsedScoreboardData = JSON.parse(scoreboardData);

      this.setState({
        scoreboardData: parsedScoreboardData.scoreboard,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        vertical: 'bottom',
        horizontal: 'right',
        isLoading: false,
        hasError: true,
      });
    }
  }

  render() {
    const { scoreboardData, isLoading, hasError } = this.state;
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <Typography variant="display2">Scoreboard</Typography>
        <Typography>
          +3 for win, +1 for draw (90 mins), +1 for win AET
        </Typography>
        {isLoading && (
          <Fade
            in={isLoading}
            style={{
              transitionDelay: isLoading ? '800ms' : '0ms',
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
        )}
        {hasError && (
          <React.Fragment>
            <Typography color="textSecondary" variant="body1">
              Error: Unable to display scoreboard. Issue has been logged
            </Typography>
          </React.Fragment>
        )}
        {!hasError &&
          !isLoading &&
          scoreboardData &&
          scoreboardData.length > 0 && (
            <Paper className={classes.paperTable}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Player</TableCell>
                    <TableCell>Picks (Finished / Total)</TableCell>
                    <TableCell>Wins</TableCell>
                    <TableCell>Draws (Win Bonus)</TableCell>
                    <TableCell>Points</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scoreboardData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row._id.username}</TableCell>
                      <TableCell>
                        {row.PicksFinished} / {row.PicksTotal}
                      </TableCell>
                      <TableCell>{row.PicksWins}</TableCell>
                      <TableCell>
                        {row.PicksDraws} / {row.PicksBonus}
                      </TableCell>
                      <TableCell>{row.Points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}
        {!hasError &&
          !isLoading &&
          scoreboardData &&
          scoreboardData.length === 0 && (
            <Typography color="textSecondary" variant="body1">
              Scoreboards still to be calculated
            </Typography>
          )}
      </Paper>
    );
  }
}

export default withStyles(styles)(Scoreboard);
