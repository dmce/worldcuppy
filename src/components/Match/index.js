import React from 'react';
import PropTypes from 'prop-types';

const Match = props => {
  const { match } = props;

  return (
    <p>
      {match.id} - {match.date}
      <br />
      {match.homeTeam.name} v {match.awayTeam.name}
      <br />
      {match.duration} - {match.winner}
    </p>
  );
};

Match.propTypes = {
  match: PropTypes.object,
};

export default Match;
