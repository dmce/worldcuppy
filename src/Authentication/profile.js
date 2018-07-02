import React from 'react';

const Profile = props => {
  return (
    props.auth.isAuthenticated() && (
      <React.Fragment>
        <img
          height="100"
          alt={localStorage.getItem('name')}
          src={localStorage.getItem('picture')}
        />
        <p>{localStorage.getItem('name')}</p>
      </React.Fragment>
    )
  );
};

export default Profile;
