import React from 'react';
import PropTypes from 'prop-types';

import Season from '../Season';

const SeasonList = props => {
  const { seasons, currentSeasonId } = props;
  return (
    <React.Fragment>
      <h1>Seasons</h1>
      {seasons.length === 0 && <React.Fragment>NO SEASONS</React.Fragment>}
      <ul>
        {seasons.map(season => (
          <li key={season.id}>
            <Season
              season={season}
              current={season.apiId === currentSeasonId}
            />
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

SeasonList.propTypes = {
  seasons: PropTypes.array,
};

export default SeasonList;
