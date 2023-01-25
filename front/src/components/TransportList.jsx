import React from 'react';
import {
  Card,
  ListGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import DbNavigator from './DbNavigator';

function TransportList(props) {
  const {
    items,
  } = props;

  return (
    <Card>
      <Card.Header>
        <Card.Title>Маршруты</Card.Title>
      </Card.Header>

      <ListGroup>
        { items && items.map((item) => (
          <ListGroup.Item key={item}>{ item }</ListGroup.Item>
        )) }
      </ListGroup>

      <Card.Footer>
        <DbNavigator />
      </Card.Footer>
    </Card>
  );
}

TransportList.defaultProps = {
  items: null,
};

TransportList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
};

export default TransportList;
