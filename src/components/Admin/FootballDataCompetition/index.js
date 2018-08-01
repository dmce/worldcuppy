import React from 'react';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';

import Competition from '../../Competition';
import LoadCompetition from '../LoadCompetition';

const FootballfdCompetitionCompetition = props => {
  const fdCompetition = props.client.readFragment({
    id: `fdCompetition:${props.id}`,
    fragment: gql`
      fragment fdCompetition on fdCompetitions {
        id
        name
        area {
          name
        }
        currentSeason {
          id
          startDate
          endDate
          currentMatchday
        }
        lastUpdated
      }
    `,
  });

  return (
    <React.Fragment>
      <h1>Competition from API</h1>
      <h2>{fdCompetition.name}</h2>
      apiId: {fdCompetition.id}
      <br />
      Area: {fdCompetition.area.name}
      <br />
      <h1>Current Season from API</h1>
      Start: {fdCompetition.currentSeason.startDate}
      <br />
      End: {fdCompetition.currentSeason.endDate}
      <br />
      Current Matchday:{' '}
      {fdCompetition.currentSeason.currentMatchday
        ? fdCompetition.currentSeason.currentMatchday
        : 'Not Started'}
      <br />
      apiId: {fdCompetition.currentSeason.id}
      <br />
      Last Updated: {fdCompetition.lastUpdated}
      <div
        style={{
          position: 'absolute',
          top: '1em',
          left: '50%',
        }}
      >
        <LoadCompetition fdCompetition={fdCompetition} />
        <Competition apiId={fdCompetition.id} />
      </div>
    </React.Fragment>
  );
};

FootballfdCompetitionCompetition.propTypes = { id: PropTypes.number };

export default withApollo(FootballfdCompetitionCompetition);
