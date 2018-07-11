import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Error from '../../Error';
import Loading from '../../Loading';

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
      if (error) return <Error />;

      return (
        <React.Fragment>
          <h1>{data.fd_competition.name}</h1>
          <p>{data.fd_competition.currentSeason.startDate}</p>
          <p>{data.fd_competition.currentSeason.endDate}</p>
          <p>{data.fd_competition.currentSeason.currentMatchday}</p>
          <p>CHECK IF IT EXSITS IN GRAPHQL (use component)</p>
          <button>Add</button>
        </React.Fragment>
      );
    }}
  </Query>
);

FootballDataCompetition.propTypes = { id: PropTypes.number };

export default FootballDataCompetition;
