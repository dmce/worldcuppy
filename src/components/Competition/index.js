import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import Error from '../Error';
import Loading from '../Loading';
import Empty from '../Empty';

import SeasonList from '../SeasonList';
import { GET_COMPETITION } from '../../queries/Competitions';

const Competition = ({ apiId }) => (
  <Query query={GET_COMPETITION} variables={{ apiId }}>
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <Error error={error.message} />;
      if (!data.competition) return <Empty />;

      return (
        <React.Fragment>
          <h1>Competition in GQL</h1>
          <p>
            {data.competition.id}
            <br />
            {data.competition.name}
          </p>

          <SeasonList seasons={data.competition.seasons} />
        </React.Fragment>
      );
    }}
  </Query>
);

Competition.propTypes = {
  apiId: PropTypes.number,
};

export default Competition;
