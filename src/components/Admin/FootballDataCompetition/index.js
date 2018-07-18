import React from 'react';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';

import FootballDataMatchList from '../FootballDataMatchList';
import Competition from '../Competition';

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
      <h1>{fdCompetition.name}</h1>
      <p>DOES THIS COMPETITION EXIST IN GRAPHQL</p>
      <p>
        NO - LOAD COMPETITION, CURRENT SEASON AND FIXTURES<br />
        YES - DO NOTHING
      </p>
      <Competition fdCompetition={fdCompetition} />
      ID: {fdCompetition.id}
      <br />
      Area: {fdCompetition.area.name}
      <br />
      <h2>Current Season</h2>
      <p>DOES THE CURRENT SEASON EXIST IN GRAPHQL</p>
      <p>
        NO - LOAD CURRENT SEASON AND FIXTURES<br />
        YES - UPDATE FIXTURES
      </p>
      {fdCompetition.currentSeason.startDate} -
      {fdCompetition.currentSeason.endDate}
      <br />
      {fdCompetition.currentSeason.currentMatchday}
      <br />
      {fdCompetition.currentSeason.id}
      <br />
      Last Updated: {fdCompetition.lastUpdated}
      <h2>Fixtures</h2>
      <FootballDataMatchList competitionId={fdCompetition.id} />
    </React.Fragment>
  );
};

FootballfdCompetitionCompetition.propTypes = { id: PropTypes.number };

export default withApollo(FootballfdCompetitionCompetition);
