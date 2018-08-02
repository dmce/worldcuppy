import React from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import {
  GET_COMPETITION,
  CREATE_COMPETITION,
} from '../../../queries/Competitions';

import { GET_SEASON } from '../../../queries/Seasons';

import Error from '../../Error';
import Loading from '../../Loading';

const CreateCompetition = props => {
  const { fdCompetition, disable } = props;

  return (
    <Mutation
      mutation={CREATE_COMPETITION}
      update={(cache, { data: { createCompetition } }) => {
        cache.writeQuery({
          query: GET_COMPETITION,
          variables: { apiId: fdCompetition.id },
          data: {
            competition: createCompetition,
          },
        });
        console.log(fdCompetition);
        cache.writeQuery({
          query: GET_SEASON,
          variables: { apiId: fdCompetition.currentSeason.id },
          data: {
            season: createCompetition.seasons[0],
          },
        });
      }}
    >
      {(createCompetition, { loading, error }) => (
        <React.Fragment>
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
                        },
                      ],
                    },
                  },
                },
              });
            }}
          >
            <button type="submit" disabled={disable}>
              Create Competition
            </button>
          </form>
          {loading && <Loading />}
          {error && <Error error={error.message} />}
        </React.Fragment>
      )}
    </Mutation>
  );
};

CreateCompetition.defaultProps = {
  disable: false,
};

CreateCompetition.propTypes = {
  fdCompetition: PropTypes.object.isRequired,
  disable: PropTypes.bool,
};

export default CreateCompetition;
