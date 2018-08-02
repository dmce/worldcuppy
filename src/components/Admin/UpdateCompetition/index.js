import React from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import {
  GET_COMPETITION,
  UPDATE_COMPETITION,
} from '../../../queries/Competitions';

import Error from '../../Error';
import Loading from '../../Loading';

const UpdateCompetition = props => {
  const { fdCompetition, disable } = props;

  return (
    <Mutation
      mutation={UPDATE_COMPETITION}
      update={(cache, { data: { updateCompetition } }) => {
        cache.writeQuery({
          query: GET_COMPETITION,
          variables: { apiId: fdCompetition.id },
          data: { competition: updateCompetition },
        });
      }}
    >
      {(updateCompetition, { loading, error }) => (
        <React.Fragment>
          <form
            onSubmit={e => {
              e.preventDefault();
              updateCompetition({
                variables: {
                  data: {
                    apiId: fdCompetition.id,
                    name: fdCompetition.name,
                    area: fdCompetition.area.name,
                  },
                  where: {
                    apiId: fdCompetition.id,
                  },
                },
              });
            }}
          >
            <button type="submit" disabled={disable}>
              Update Competition
            </button>
          </form>
          {loading && <Loading />}
          {error && <Error error={error.message} />}
        </React.Fragment>
      )}
    </Mutation>
  );
};

UpdateCompetition.defaultProps = {
  disable: false,
};

UpdateCompetition.propTypes = {
  fdCompetition: PropTypes.object.isRequired,
  disable: PropTypes.bool,
};

export default UpdateCompetition;
