import React from 'react';
import PropTypes from 'prop-types';

const FootballDataMatch = props => {
  const { match } = props;
  return (
    <React.Fragment>
      {match.id} - {match.utcDate} - {match.status}
      <br />
      {match.homeTeam.name} v {match.awayTeam.name}
      <br />
      {match.score.duration} - {match.score.winner}
    </React.Fragment>
  );
};

FootballDataMatch.propTypes = {
  match: PropTypes.object,
};

export default FootballDataMatch;
