import React from 'react';

const LoginButton = props =>
  !props.auth.isAuthenticated() && (
    <p>
      <button
        color="inherit"
        onClick={() => {
          props.auth.login();
        }}
      >
        Login
      </button>
    </p>
  );

export default LoginButton;
