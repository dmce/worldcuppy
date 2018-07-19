import React from 'react';
import PropTypes from 'prop-types';

import Season from '../Season';

const SeasonList = props => {
  const { seasons, currentSeasonId } = props;
  return (
    <React.Fragment>
      <h1>Seasons from GQL</h1>
      {seasons.length === 0 && <React.Fragment>NO SEASONS</React.Fragment>}
      {seasons.map(season => (
        <Season
          season={season}
          current={season.apiId === currentSeasonId}
          key={season.id}
        />
      ))}
    </React.Fragment>
  );
};

SeasonList.propTypes = {
  seasons: PropTypes.array,
};

export default SeasonList;
