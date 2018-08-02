import React from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import { GET_SEASON, UPDATE_SEASON } from '../../../queries/Seasons';

import Error from '../../Error';
import Loading from '../../Loading';

const UpdateSeason = props => {
  const { fdSeason, disable } = props;

  return (
    <Mutation
      mutation={UPDATE_SEASON}
      update={(cache, { data: { updateSeason } }) => {
        cache.writeQuery({
          query: GET_SEASON,
          variables: { apiId: fdSeason.id },
          data: { Season: updateSeason },
        });
      }}
    >
      {(updateSeason, { loading, error }) => (
        <React.Fragment>
          <form
            onSubmit={e => {
              e.preventDefault();
              updateSeason({
                variables: {
                  data: {
                    apiId: fdSeason.id,
                    name: fdSeason.name,
                    area: fdSeason.area.name,
                  },
                  where: {
                    apiId: fdSeason.id,
                  },
                },
              });
            }}
          >
            <button type="submit" disabled={disable}>
              Update Season
            </button>
          </form>
          {loading && <Loading />}
          {error && <Error error={error.message} />}
        </React.Fragment>
      )}
    </Mutation>
  );
};

UpdateSeason.defaultProps = {
  disable: false,
};

UpdateSeason.propTypes = {
  fdSeason: PropTypes.object.isRequired,
  disable: PropTypes.bool,
};

export default UpdateSeason;
