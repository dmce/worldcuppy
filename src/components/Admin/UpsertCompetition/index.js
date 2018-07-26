import React from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import {
  GET_COMPETITION,
  UPSERT_COMPETITION,
} from '../../../queries/Competitions';

import Error from '../../Error';
import Loading from '../../Loading';

const UpsertCompetition = props => {
  const { fdCompetition, fdMatches } = props;

  return (
    <Mutation
      mutation={UPSERT_COMPETITION}
      update={(cache, { data: { upsertCompetition } }) => {
        // const { competition } = cache.readQuery({
        //   query: GET_COMPETITION,
        //   variables: { apiId: fdCompetition.id },
        // });
        cache.writeQuery({
          query: GET_COMPETITION,
          // variables: { apiId: fdCompetition.id },
          data: { competition: upsertCompetition },
        });
      }}
    >
      {(upsertCompetition, { loading, error }) => (
        <React.Fragment>
          <form
            onSubmit={e => {
              e.preventDefault();
              upsertCompetition({
                variables: {
                  where: { apiId: fdCompetition.id },
                  create: {
                    apiId: fdCompetition.id,
                    name: fdCompetition.name,
                    area: fdCompetition.area.name,
                    seasons: null,
                  },
                  update: {
                    apiId: fdCompetition.id,
                    name: fdCompetition.name,
                    area: fdCompetition.area.name,
                    seasons: null,
                  },
                },
              });
            }}
          >
            <button type="submit">Upsert Competition</button>
          </form>
          {loading && <Loading />}
          {error && <Error error={error.message} />}
        </React.Fragment>
      )}
    </Mutation>
  );
};

UpsertCompetition.propTypes = {
  fdMatches: PropTypes.array.isRequired,
  fdCompetition: PropTypes.object.isRequired,
};

export default UpsertCompetition;
