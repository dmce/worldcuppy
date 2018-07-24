import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import Error from '../Error';
import Loading from '../Loading';
import Empty from '../Empty';

import { GET_MATCHES } from '../../queries/Matches';

const MatchList = ({ seasonApiId }) => (
  <Query query={GET_MATCHES} variables={{ apiId: seasonApiId }}>
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <Error error={error.message} />;
      if (!data.competition) return <Empty />;

      return (
        <React.Fragment>
          <h1>Competition in GQL</h1>
          <p>{data.competition.id}</p>
          {/* <SeasonList seasons={data.competition.seasons} /> */}
        </React.Fragment>
      );
    }}
  </Query>
);

MatchList.propTypes = {
  seasonApiId: PropTypes.number.isRequired,
};

export default MatchList;
