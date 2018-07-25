import React from 'react';
import PropTypes from 'prop-types';

import Season from '../Season';

import Empty from '../Empty';

const SeasonList = props => {
  const { seasons, currentSeasonId } = props;

  if (seasons.length === 0)
    return (
      <React.Fragment>
        <h3>Seasons from GQL</h3>
        <Empty />
      </React.Fragment>
    );

  return (
    <React.Fragment>
      <h1>Seasons from GQL</h1>
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
