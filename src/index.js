import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Auth from './Authentication/auth-service';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Raven from 'raven-js';

const auth = new Auth();

Raven.config(
  'https://e92c038f80e94b9c905340094b9a7c30@sentry.io/1223433'
).install();

const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_END,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App auth={auth} />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
