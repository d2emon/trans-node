import React from 'react';
import {
  ListGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import DataCard from './DataCard';

function TransportList(props) {
  const {
    items,
  } = props;

  return (
    <DataCard title="Маршруты">
      <ListGroup variant="flush">
        { items && items.map((item) => (
          <ListGroup.Item key={item}>{ item }</ListGroup.Item>
        )) }
      </ListGroup>
    </DataCard>
  );
}

TransportList.defaultProps = {
  items: null,
};

TransportList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
};

export default TransportList;
