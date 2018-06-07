import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, auth: Auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated() === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default ProtectedRoute;
