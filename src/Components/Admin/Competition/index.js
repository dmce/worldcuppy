import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Error from '../../Error';
import Loading from '../../Loading';

import SeasonList from '../../SeasonList';
import FootballDataMatchList from '../FootballDataMatchList';

const QUERY = gql`
  query Competition($id: Int!) {
    competition(id: $id) {
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

const Competition = ({ id, currentSeasonId }) => (
  <Query query={QUERY} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <Error error={error.message} />;

      return (
        <React.Fragment>
          <h1>Competition - FROM GQL</h1>
          <button>Upsert</button>
          {!data.competition && (
            <React.Fragment>
              COMPETITION DOESNT EXIST IN GQL. UPSERT COMPETITION AND INSERT
              CURRENT SEASON &amp; FIXTURES IF IT HASNT STARTED
            </React.Fragment>
          )}
          {data.competition && (
            <React.Fragment>
              COMPETITION EXISTS IN GQL. UPSERT COMPETITON AND UPSERT CURRENT
              SEASON AND FIXTURES IF IT HASNT STARTED
              <SeasonList
                seasons={data.competition.seasons}
                currentSeasonId={currentSeasonId}
              />
              <FootballDataMatchList competitionId={id} />
            </React.Fragment>
          )}
        </React.Fragment>
      );
    }}
  </Query>
);

Competition.propTypes = {
  id: PropTypes.number,
  currentSeasonId: PropTypes.number,
};

export default Competition;
