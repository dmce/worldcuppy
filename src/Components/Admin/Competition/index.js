import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Error from '../../Error';
import Loading from '../../Loading';

import SeasonList from '../../SeasonList';

const QUERY = gql`
  query Competitions($apiId: Int!) {
    competitions(where: { apiId: $apiId }) {
      id
      name
      seasons {
        id
        apiId
        startDate
        endDate
        currentMatchday
      }
    }
  }
`;

const Competition = ({ apiId, currentSeasonId }) => (
  <Query query={QUERY} variables={{ apiId }}>
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <Error error={error.message} />;

      return (
        <React.Fragment>
          <h1>Competition - FROM GQL</h1>
          <button>Upsert</button>
          {data.competitions.length === 0 && (
            <React.Fragment>
              COMPETITION DOESNT EXIST IN GQL. UPSERT COMPETITION AND INSERT
              CURRENT SEASON &amp; FIXTURES IF IT HASNT STARTED
            </React.Fragment>
          )}

          {data.competitions.length > 0 && (
            <React.Fragment>
              COMPETITION EXISTS IN GQL. UPSERT COMPETITON AND UPSERT CURRENT
              SEASON AND FIXTURES IF IT HASNT STARTED
              {data.competitions.map(competition => (
                <SeasonList
                  key={competition.id}
                  seasons={competition.seasons}
                  currentSeasonId={currentSeasonId}
                />
              ))}
            </React.Fragment>
          )}
        </React.Fragment>
      );
    }}
  </Query>
);

Competition.propTypes = {
  apiId: PropTypes.number,
  currentSeasonId: PropTypes.number,
};

export default Competition;
