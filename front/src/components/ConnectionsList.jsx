import React from 'react';
import {
  ListGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import DataCard from './DataCard';

function ConnectionsList(props) {
  const {
    connections,
  } = props;

  return (
    <DataCard
      className="my-2"
      title="Переходы"
    >
      <ListGroup variant="flush">
        { connections && connections.map((item) => (
          <ListGroup.Item key={item.id}>{ item.title }</ListGroup.Item>
        )) }
      </ListGroup>
    </DataCard>
  );
}

ConnectionsList.defaultProps = {
  connections: [],
};

ConnectionsList.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    locationId: PropTypes.string,
    title: PropTypes.string,
  })),
};

export default ConnectionsList;
