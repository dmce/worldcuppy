import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

function Picks(props) {
  const { fixture } = props;
  return (
    <Button color="primary">
      {fixture.team} {fixture.picked}
    </Button>
  );
}

Picks.propTypes = {
  fixture: PropTypes.object.isRequired,
};

export default Picks;
