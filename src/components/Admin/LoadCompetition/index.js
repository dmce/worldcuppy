import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import LoadSeason from '../LoadSeason';

import { GET_COMPETITION } from '../../../queries/Competitions';
import CreateCompetition from '../CreateCompetition';
import UpdateCompetition from '../UpdateCompetition';

import Error from '../../Error';
import Loading from '../../Loading';

const LoadCompetition = props => {
  const { fdCompetition } = props;
  return (
    <Query query={GET_COMPETITION} variables={{ apiId: fdCompetition.id }}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return <Error error={error.message} />;

        const hasCompetition = Boolean(data.competition);

        return (
          <React.Fragment>
            <CreateCompetition
              fdCompetition={fdCompetition}
              disable={hasCompetition}
            />
            <UpdateCompetition
              fdCompetition={fdCompetition}
              disable={!hasCompetition}
            />
            <LoadSeason
              fdSeason={fdCompetition.currentSeason}
              hasCompetition={hasCompetition}
            />
          </React.Fragment>
        );
      }}
    </Query>
  );
};

LoadCompetition.propTypes = {
  fdCompetition: PropTypes.object.isRequired,
};

export default LoadCompetition;
