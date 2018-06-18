import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
const Courses = () => (
  <Query
    query={gql`
      {
        picks {
          id
          user
          outcome
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return data.picks.map(({ id, user, outcome }) => (
        <div key={id}>
          <p>{`${outcome} by ${user}`}</p>
        </div>
      ));
    }}
  </Query>
);
export default Courses;
