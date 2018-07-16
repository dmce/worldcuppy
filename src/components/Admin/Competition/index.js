import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import Error from '../../Error';
import Loading from '../../Loading';

import SeasonList from '../../SeasonList';
import AddCompetition from '../Competition/add';
import { GET_COMPETITIONS } from '../../../queries/CompetitionsQuery';

const Competition = ({ fd_competition }) => (
  <Query query={GET_COMPETITIONS} variables={{ apiId: fd_competition.id }}>
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <Error error={error.message} />;

      return (
        <React.Fragment>
          <h1>Competition - FROM GQL</h1>
          {data.competitions.length === 0 && (
            <React.Fragment>
              COMPETITION DOESNT EXIST IN GQL. UPSERT COMPETITION AND INSERT
              CURRENT SEASON &amp; FIXTURES IF IT HASNT STARTED
              <AddCompetition competition={fd_competition} />
            </React.Fragment>
          )}

          {data.competitions.length > 0 && (
            <React.Fragment>
              COMPETITION EXISTS IN GQL. UPSERT COMPETITON AND UPSERT CURRENT
              SEASON AND FIXTURES IF IT HASNT STARTED
              {data.competitions.map(competition => (
                <SeasonList
                  key={competition.id}
                  seasons={competition.seasons}
                  currentSeasonId={fd_competition.currentSeason.id}
                />
              ))}
              <AddCompetition competition={fd_competition} />
            </React.Fragment>
          )}
        </React.Fragment>
      );
    }}
  </Query>
);

Competition.propTypes = {
  fd_competition: PropTypes.object,
};

export default Competition;
