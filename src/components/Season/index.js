import React from 'react';
import PropTypes from 'prop-types';
import MatchList from '../MatchList';

const Season = props => {
  const { season, current } = props;
  return (
    <div>
      <h2>Season from GQL</h2>
      Id: {season.apiId}
      <br />
      Start Date: {season.startDate}
      <br />
      End Date: {season.endDate}
      <br />
      Matchday: {season.currentMatchday}
      <p>Current Season?</p>
      {current && (
        <React.Fragment>
          <label>Current Season</label>
        </React.Fragment>
      )}
      <MatchList seasonApiId={season.apiId} />
    </div>
  );
};

Season.propTypes = {
  seasons: PropTypes.object,
};

export default Season;
