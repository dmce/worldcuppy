import React from 'react';
import PropTypes from 'prop-types';

const Season = props => {
  const { season, current } = props;
  return (
    <React.Fragment>
      {season.apiId} - {season.startDate} - {season.endDate} -{' '}
      {season.currentMatchday}
      {current && (
        <React.Fragment>
          <button>Upsert Fixtures</button>
          <label>Current Season</label>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

Season.propTypes = {
  seasons: PropTypes.object,
};

export default Season;
