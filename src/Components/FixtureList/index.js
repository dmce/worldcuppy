import React from 'react';
import PropTypes from 'prop-types';

import Fixture from '../Fixture/';

const FixtureList = props => {
  const { seasons } = props;
  return (
    <React.Fragment>
      <h1>Seasons</h1>
      {seasons.length === 0 && <React.Fragment>NO SEASONS</React.Fragment>}
      {seasons.map(season => (
        <li key={season.id}>
          <Fixture season={season} />
        </li>
      ))}
    </React.Fragment>
  );
};

FixtureList.propTypes = {
  seasons: PropTypes.array,
};

export default FixtureList;
