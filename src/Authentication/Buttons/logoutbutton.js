import React from 'react';
import { withRouter } from 'react-router-dom';

const LogoutButton = props =>
  props.auth.isAuthenticated() && (
    <p>
      <button
        color="inherit"
        onClick={() => {
          props.auth.logout();
          props.history.push('/login');
        }}
      >
        Logout
      </button>
    </p>
  );

export default withRouter(LogoutButton);
