import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import Error from '../../Error';
import Loading from '../../Loading';
import FootballDataMatch from '../FootballDataMatch';

import { GET_FD_MATCHES } from '../../../queries/FootballDataMatches';

const FootballDataMatchList = ({ competitionId }) => (
  <Query query={GET_FD_MATCHES} variables={{ competitionId }}>
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <Error error={error.message} />;

      return (
        <React.Fragment>
          <h1>Matches from API</h1>
          {!data.fd_matches && (
            <React.Fragment>No Matches from API</React.Fragment>
          )}

          {data.fd_matches && (
            <React.Fragment>
              <div>Count: {data.fd_matches.count}</div>

              {data.fd_matches.matches && (
                <React.Fragment>
                  <ul>
                    {data.fd_matches.matches.map(match => (
                      <li key={match.id}>
                        <FootballDataMatch match={match} />
                      </li>
                    ))}
                  </ul>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      );
    }}
  </Query>
);

FootballDataMatchList.propTypes = {
  competitionId: PropTypes.number.isRequired,
};

export default FootballDataMatchList;
