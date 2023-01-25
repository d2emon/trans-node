import React from 'react';
import {
  Card,
  ListGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import DbNavigator from './DbNavigator';

function ConnectionsList(props) {
  const {
    connections,
  } = props;

  return (
    <Card
      className="my-2"
    >
      <Card.Header>
        <Card.Title>Переходы</Card.Title>
      </Card.Header>

      <ListGroup>
        { connections && connections.map((item) => (
          <ListGroup.Item key={item}>{ item }</ListGroup.Item>
        )) }
      </ListGroup>

      <Card.Footer>
        <DbNavigator />
      </Card.Footer>
    </Card>
  );
}

ConnectionsList.defaultProps = {
  connections: [],
};

ConnectionsList.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.string),
};

export default ConnectionsList;
