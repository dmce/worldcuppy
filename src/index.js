import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Auth from './Authentication/auth-service';
import { BrowserRouter as Router } from 'react-router-dom';

import Raven from 'raven-js';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import lightGreen from '@material-ui/core/colors/lightGreen';

const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: grey,
  },
  overrides: {
    MuiTableCell: {
      root: {
        padding: '4px 4px 4px 16px',
      },
    },
  },
});

const auth = new Auth();

Raven.config(
  'https://e92c038f80e94b9c905340094b9a7c30@sentry.io/1223433'
).install();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router>
      <App auth={auth} />
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
