import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function LocationName(props) {
  const {
    showLocationId,
    showPublicId,
    showTitle,
    location,
  } = props;

  return (
    <Card.Header>
      {showPublicId && <Card.Title>{location.publicId}</Card.Title>}
      {showLocationId && <Card.Title>{location.locationId}</Card.Title>}
      {showPublicId && location.isDeathRoom && <Card.Title>DEATH ROOM</Card.Title>}
      {showTitle && <Card.Title>{location.title}</Card.Title>}
    </Card.Header>
  );
}

LocationName.defaultProps = {
  location: null,
  showLocationId: false,
  showPublicId: false,
  showTitle: false,
};

LocationName.propTypes = {
  location: PropTypes.shape({
    isDeathRoom: PropTypes.bool,
    locationId: PropTypes.number,
    publicId: PropTypes.number,
    title: PropTypes.string,
  }),
  showLocationId: PropTypes.bool,
  showPublicId: PropTypes.bool,
  showTitle: PropTypes.bool,
};

export default LocationName;
