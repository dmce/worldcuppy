import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import { GET_COMPETITIONS } from '../../../queries/CompetitionsQuery';

import Error from '../../Error';
import Loading from '../../Loading';

const ADD_COMPETITION = gql`
  mutation AddCompetition($data: CompetitionCreateInput!) {
    createCompetition(data: $data) {
      id
    }
  }
`;

const AddCompetition = props => {
  const { competition } = props;

  return (
    <Mutation
      mutation={ADD_COMPETITION}
      update={(cache, { data: { createCompetition } }) => {
        const { competitions } = cache.readQuery({
          query: GET_COMPETITIONS,
          variables: { apid: competition.apiId },
        });
        cache.writeQuery({
          query: GET_COMPETITIONS,
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
                    apiId: competition.id,
                    name: competition.name,
                    area: competition.area.name,
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
};

export default AddCompetition;
