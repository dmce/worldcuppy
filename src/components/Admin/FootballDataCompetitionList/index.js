import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Error from '../../Error';
import Loading from '../../Loading';

const QUERY = gql`
  query FootballDataCompetitions {
    fd_competitions {
      count
      competitions {
        id
        name
        plan
      }
    }
  }
`;

const FootballDataCompetitionList = props => (
  <Query query={QUERY}>
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <Error error={error.message} />;

      return (
        <React.Fragment>
          <h1>Competitions - FROM API</h1>
          <strong>FROM API</strong>
          <div>Count: {data.fd_competitions.count}</div>
          <ul>
            {data.fd_competitions.competitions
              .filter(c => c.plan === props.plan)
              .map(c => (
                <li key={c.id}>
                  {c.name} - {c.plan}
                  {c.plan === 'TIER_ONE' && (
                    <button
                      data-competitionid={c.id}
                      onClick={props.getCompetitionId}
                    >
                      Load
                    </button>
                  )}
                </li>
              ))}
          </ul>
        </React.Fragment>
      );
    }}
  </Query>
);

FootballDataCompetitionList.propTypes = {
  plan: PropTypes.string,
  getCompetitionId: PropTypes.func,
};

FootballDataCompetitionList.defaultProps = { plan: 'TIER_ONE' };

export default FootballDataCompetitionList;
