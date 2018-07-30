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
        cache.writeQuery({
          query: GET_COMPETITION,
          variables: { apiId: fdCompetition.id },
          data: { competition: upsertCompetition },
        });
      }}
    >
      {(upsertCompetition, { loading, error }) => (
        <React.Fragment>
          <p>
            This will either{' '}
            <strong>create the competition, season and matches</strong> or{' '}
            <strong>update just the competiton</strong>
          </p>
          <p>
            it may be possible to do it all in one by doing create/upsert for
            seasons and matches
          </p>
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
                    seasons: {
                      create: [
                        {
                          apiId: fdCompetition.currentSeason.id,
                          startDate: fdCompetition.currentSeason.startDate,
                          endDate: fdCompetition.currentSeason.endDate,
                          currentMatchday:
                            fdCompetition.currentSeason.currentMatchday,
                          matches: fdMatches.matches,
                        },
                      ],
                    },
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
