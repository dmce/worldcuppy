import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Auth from './Authentication/auth-service';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

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
        padding: '8px 8px 28px 16px',
        '@media (max-width: 600px)': {
          padding: '0 0 0 6px',
        },
      },
    },
  },
});

const auth = new Auth();

Raven.config(
  'https://e92c038f80e94b9c905340094b9a7c30@sentry.io/1223433'
).install();

const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_END,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <App auth={auth} />
      </Router>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
