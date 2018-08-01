import React from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import {
  GET_COMPETITION,
  CREATE_COMPETITION,
} from '../../../queries/Competitions';

import Error from '../../Error';
import Loading from '../../Loading';

const CreateMatches = props => {
  const { fdCompetition, fdMatches } = props;

  let matches = [];

  fdMatches.forEach(fdMatch => {
    matches.push(Object.assign({}, fdMatch));
  });

  matches.forEach(match => {
    Object.defineProperty(
      match,
      'apiId',
      Object.getOwnPropertyDescriptor(match, 'id')
    );
    match['winner'] = match.score.winner;
    match['homeTeam'] = match.homeTeam.name;
    match['awayTeam'] = match.awayTeam.name;

    delete match['score'];
    delete match['id'];
    delete match['__typename'];
  });

  return (
    <Mutation
      mutation={CREATE_COMPETITION}
      update={(cache, { data: { createCompetition } }) => {
        cache.writeQuery({
          query: GET_COMPETITION,
          variables: { apiId: fdCompetition.id },
          data: { competition: createCompetition },
        });
      }}
    >
      {(createCompetition, { loading, error }) => (
        <React.Fragment>
          <p>
            This will either <strong>create the competition, season</strong> or{' '}
            <strong>update just the competiton</strong>
          </p>
          <p>
            it may be possible to do it all in one by doing create/upsert for
            seasons and matches
          </p>
          <form
            onSubmit={e => {
              e.preventDefault();
              createCompetition({
                variables: {
                  data: {
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
                          matches: { create: matches },
                        },
                      ],
                    },
                  },
                },
              });
            }}
          >
            <button type="submit">Create Competition</button>
          </form>
          {loading && <Loading />}
          {error && <Error error={error.message} />}
        </React.Fragment>
      )}
    </Mutation>
  );
};

CreateMatches.propTypes = {
  fdCompetition: PropTypes.object.isRequired,
};

export default CreateMatches;
