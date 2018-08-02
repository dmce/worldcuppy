import React from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import { GET_SEASON, CREATE_SEASON } from '../../../queries/Seasons';

import Error from '../../Error';
import Loading from '../../Loading';

const CreateSeason = props => {
  const { fdSeason, disable } = props;

  return (
    <Mutation
      mutation={CREATE_SEASON}
      update={(cache, { data: { CreateSeason } }) => {
        cache.writeQuery({
          query: GET_SEASON,
          variables: { apiId: fdSeason.id },
          data: { competition: CreateSeason },
        });
      }}
    >
      {(CreateSeason, { loading, error }) => (
        <React.Fragment>
          <form
            onSubmit={e => {
              e.preventDefault();
              CreateSeason({
                variables: {
                  data: {
                    seasons: {
                      apiId: fdSeason.id,
                      startDate: fdSeason.startDate,
                      endDate: fdSeason.endDate,
                      currentMatchday: fdSeason.currentMatchday,
                    },
                  },
                },
              });
            }}
          >
            <button type="submit" disabled={disable}>
              Create Season
            </button>
          </form>
          {loading && <Loading />}
          {error && <Error error={error.message} />}
        </React.Fragment>
      )}
    </Mutation>
  );
};

CreateSeason.defaultProps = {
  disable: false,
};

CreateSeason.propTypes = {
  fdSeason: PropTypes.object.isRequired,
  disable: PropTypes.bool,
};

export default CreateSeason;
