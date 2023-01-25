import React from 'react';
import {
  Card,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import DbNavigator from './DbNavigator';
import ConnectionsList from './ConnectionsList';

function Location(props) {
  const {
    locationId,
    title,
    description,
    connections,
  } = props;

  return (
    <Card>
      <Card.Header>
        <Card.Title>{ locationId }</Card.Title>
        <Card.Title>{ title }</Card.Title>
      </Card.Header>

      <Card.Body>
        { description }

        <ConnectionsList connections={connections} />
      </Card.Body>

      <Card.Footer>
        <DbNavigator />
      </Card.Footer>
    </Card>
  );
}

Location.defaultProps = {
  connections: null,
  description: null,
  locationId: null,
  title: null,
};

Location.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.node,
  locationId: PropTypes.string,
  title: PropTypes.string,
};

export default Location;
