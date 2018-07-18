import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import Error from '../../Error';
import Loading from '../../Loading';

import SeasonList from '../../SeasonList';
import AddCompetition from '../Competition/add';
import { GET_FILTERED_COMPETITIONS } from '../../../queries/CompetitionsQuery';

const Competition = ({ fdCompetition }) => (
  <Query
    query={GET_FILTERED_COMPETITIONS}
    variables={{ apiId: fdCompetition.id }}
  >
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <Error error={error.message} />;
      return (
        <React.Fragment>
          <AddCompetition
            fd_competition={fdCompetition}
            competition={data.competitions[0]}
          />
        </React.Fragment>
      );
    }}
  </Query>
);

Competition.propTypes = {
  fdCompetition: PropTypes.object,
};

export default Competition;
