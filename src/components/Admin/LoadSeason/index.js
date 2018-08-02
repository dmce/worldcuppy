import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import { GET_SEASON } from '../../../queries/Seasons';
import CreateSeason from '../CreateSeason';
import UpdateSeason from '../UpdateSeason';

import Error from '../../Error';
import Loading from '../../Loading';

const LoadSeason = props => {
  const { fdSeason, hasCompetition } = props;

  return (
    <Query query={GET_SEASON} variables={{ apiId: fdSeason.id }}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return <Error error={error.message} />;

        const hasSeason = Boolean(data.season);
        return (
          <React.Fragment>
            <CreateSeason
              fdSeason={fdSeason}
              disable={!(!hasSeason && hasCompetition)}
            />
            <UpdateSeason
              fdSeason={fdSeason}
              disable={!(hasSeason && hasCompetition)}
            />
            SEASON
          </React.Fragment>
        );
      }}
    </Query>
  );
};

LoadSeason.propTypes = {
  fdSeason: PropTypes.object.isRequired,
  hasCompetition: PropTypes.bool.isRequired,
};

export default LoadSeason;
