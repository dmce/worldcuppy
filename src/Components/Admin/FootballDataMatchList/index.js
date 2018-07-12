import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Error from '../../Error';
import Loading from '../../Loading';
import FootballDataMatch from '../FootballDataMatch';

const QUERY = gql`
  query FootballDataMatches($competitionId: Int!) {
    fd_matches(competitionId: $competitionId) {
      count
      matches {
        id
        matchday
        status
        utcDate
        homeTeam {
          id
          name
        }
        awayTeam {
          id
          name
        }
        score {
          winner
          duration
        }
      }
    }
  }
`;

const FootballDataMatchList = ({ competitionId }) => (
  <Query query={QUERY} variables={{ competitionId }}>
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <Error error={error.message} />;
      return (
        <React.Fragment>
          <h1>Matches - FROM API</h1>
          <div>Count: {data.fd_matches.count}</div>
          {data.fd_matches.matches && (
            <ul>
              {data.fd_matches.matches.map(match => (
                <li key={match.id}>
                  <FootballDataMatch match={match} />
                </li>
              ))}
            </ul>
          )}
        </React.Fragment>
      );
    }}
  </Query>
);

FootballDataMatchList.propTypes = {
  competitionId: PropTypes.number,
};

export default FootballDataMatchList;
