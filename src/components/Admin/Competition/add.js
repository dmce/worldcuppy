import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import { GET_FILTERED_COMPETITIONS } from '../../../queries/CompetitionsQuery';

import Error from '../../Error';
import Loading from '../../Loading';

const ADD_COMPETITION = gql`
  mutation AddCompetition($data: CompetitionCreateInput!) {
    createCompetition(data: $data) {
      id
      apiId
      name
      area
      seasons {
        id
        apiId
        startDate
        endDate
        currentMatchday
      }
    }
  }
`;

const AddCompetition = props => {
  const { competition, fd_competition } = props;

  return (
    <Mutation
      mutation={ADD_COMPETITION}
      update={(cache, { data: { createCompetition } }) => {
        const { competitions } = cache.readQuery({
          query: GET_FILTERED_COMPETITIONS,
          variables: { apiId: fd_competition.id },
        });
        cache.writeQuery({
          query: GET_FILTERED_COMPETITIONS,
          variables: { apiId: fd_competition.id },
          data: { competitions: competitions.concat([createCompetition]) },
        });
      }}
    >
      {(createCompetition, { loading, error, data }) => (
        <React.Fragment>
          <form
            onSubmit={e => {
              e.preventDefault();
              createCompetition({
                variables: {
                  data: {
                    apiId: fd_competition.id,
                    name: fd_competition.name,
                    area: fd_competition.area.name,
                    seasons: {
                      create: [
                        {
                          apiId: fd_competition.currentSeason.id,
                          startDate: fd_competition.currentSeason.startDate,
                          endDate: fd_competition.currentSeason.endDate,
                          currentMatchday:
                            fd_competition.currentSeason.currentMatchday,
                        },
                      ],
                    },
                  },
                },
              });
            }}
          >
            <button type="submit">ADD</button>
          </form>
          {loading && <Loading />}
          {error && <Error error={error.message} />}
        </React.Fragment>
      )}
    </Mutation>
  );
};

AddCompetition.propTypes = {
  competition: PropTypes.object,
  fd_competition: PropTypes.object,
};

export default AddCompetition;
