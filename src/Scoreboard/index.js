import React from 'react';
import ScoreboardHelper from '../Helpers/scoreboard';

import { withStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Snackbar,
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
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  p: {
    padding: 10,
  },
  card: theme.mixins.gutters({
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: theme.palette.primary[50],
  }),
});

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      isLoading: true,
    };
  }

  async componentDidMount() {
    const scoreboardData = JSON.parse(await ScoreboardHelper.get());

    const d = scoreboardData.scoreboard;

    this.setState({
      scoreboardData: d,
      open: false,
      isLoading: false,
    });
  }

  handleClose = event => {
    this.setState({ open: false });
  };

  render() {
    const { scoreboardData, open, isLoading } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="display2">Scoreboard</Typography>
        <Card className={classes.card}>
          <CardContent>
            {scoreboardData ? (
              scoreboardData.length > 0 ? (
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
              ) : (
                <Typography
                  color="textSecondary"
                  variant="body1"
                  align="center"
                >
                  No matches have finished
                </Typography>
              )
            ) : (
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
          </CardContent>
        </Card>
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

export default withStyles(styles)(Scoreboard);
