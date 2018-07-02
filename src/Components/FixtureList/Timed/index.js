import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
const Courses = () => (
  <Query
    query={gql`
      {
        fixtures(competitionId: 467) {
          id
          date
          homeTeamName
          awayTeamName
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return data.fixtures.map(fixture => (
        <div key={fixture.id}>
          <p>{`${fixture.date} - ${fixture.homeTeamName} v ${
            fixture.awayTeamName
          }`}</p>
        </div>
      ));
    }}
  </Query>
);
export default Courses;
