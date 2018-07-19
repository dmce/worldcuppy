import React from 'react';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';

import FootballDataMatchList from '../FootballDataMatchList';
import Competition from '../../Competition';

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
      apiId:{fdCompetition.currentSeason.id}
      <br />
      Last Updated: {fdCompetition.lastUpdated}
      <FootballDataMatchList competitionId={fdCompetition.id} />
      <Competition apiId={fdCompetition.id} />
    </React.Fragment>
  );
};

FootballfdCompetitionCompetition.propTypes = { id: PropTypes.number };

export default withApollo(FootballfdCompetitionCompetition);
