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
  Card,
  CardContent,
  Paper,
} from '@material-ui/core';

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
            <Card className={classes.card}>
              <CardContent>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Player</TableCell>
                      <TableCell>Picks</TableCell>
                      <TableCell>Points</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {scoreboardData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row._id.username}</TableCell>
                        <TableCell>{row.Picks}</TableCell>
                        <TableCell>{row.Points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
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
