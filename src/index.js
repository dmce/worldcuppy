import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Auth from './Authentication/auth-service';
import { BrowserRouter as Router } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import lightGreen from '@material-ui/core/colors/lightGreen';

const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: grey,
  },
});

const auth = new Auth();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <App auth={auth} />
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
