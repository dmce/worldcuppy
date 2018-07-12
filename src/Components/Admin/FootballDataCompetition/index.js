import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Error from '../../Error';
import Loading from '../../Loading';

import Competition from '../Competition';

const QUERY = gql`
  query FootballDataCompetition($id: Int!) {
    fd_competition(id: $id) {
      id
      area {
        id
        name
      }
      name
      plan
      currentSeason {
        id
        startDate
        endDate
        currentMatchday
      }
      lastUpdated
    }
  }
`;

const FootballDataCompetition = ({ id }) => (
  <Query query={QUERY} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <Error error={error.message} />;

      return (
        <React.Fragment>
          <h1>Competition - FROM API</h1>
          Name: {data.fd_competition.name}
          <br />
          Id: {data.fd_competition.id}
          <br />
          Area: {data.fd_competition.area.name}
          <br />
          <h3>Current Season</h3>
          Id: {data.fd_competition.currentSeason.id}
          <br />
          Start Date: {data.fd_competition.currentSeason.startDate}
          <br />
          End Date: {data.fd_competition.currentSeason.endDate}
          <br />
          Current Matchday: {data.fd_competition.currentSeason.currentMatchday}
          <br />
          Last Updated: {data.fd_competition.lastUpdated}
          <br />
          <Competition
            id={data.fd_competition.id}
            currentSeasonId={data.fd_competition.currentSeason.id}
          />
        </React.Fragment>
      );
    }}
  </Query>
);

FootballDataCompetition.propTypes = { id: PropTypes.number };

export default FootballDataCompetition;
