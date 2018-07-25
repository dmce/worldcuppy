import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import Match from '../Match';

import Error from '../Error';
import Loading from '../Loading';
import Empty from '../Empty';

import { GET_MATCHES } from '../../queries/Matches';

const MatchList = ({ seasonApiId }) => (
  <Query query={GET_MATCHES} variables={{ apiId: seasonApiId }}>
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <Error error={error.message} />;
      if (data.matches.length === 0)
        return (
          <React.Fragment>
            <h3>Matchlist from GQL</h3>
            <Empty />
          </React.Fragment>
        );

      return (
        <React.Fragment>
          <h3>Matchlist from GQL</h3>
          {data.matches.map(match => <Match match={match} key={match.id} />)}
        </React.Fragment>
      );
    }}
  </Query>
);

MatchList.propTypes = {
  seasonApiId: PropTypes.number.isRequired,
};

export default MatchList;
