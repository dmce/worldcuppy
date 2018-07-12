import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Auth from './authentication/auth-service';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Raven from 'raven-js';

const auth = new Auth();

Raven.config(
  'https://e92c038f80e94b9c905340094b9a7c30@sentry.io/1223433'
).install();

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.REACT_APP_APOLLO_END }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App auth={auth} />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
