/* eslint-disable react/no-danger */
import React, { useCallback, useState } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ConnectionsList from './ConnectionsList';
import LocationEditor from './LocationEditor';
import DataCard from './DataCard';

function Location(props) {
  const {
    connections,
    description,
    locationId,
    title,
    onSave,
  } = props;

  const [isEditing, setIsEditing] = useState(false);

  const handleAddLocation = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleDeleteLocation = useCallback(() => {
    console.log('DELETE LOCATION');
  }, []);

  const handleEditLocation = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleEditSave = useCallback((result) => {
    console.log('save', result);
    if (onSave) {
      onSave(result);
    }
    setIsEditing(false);
  }, []);

  if (isEditing) {
    return (
      <LocationEditor
        connections={connections}
        description={description}
        locationId={locationId}
        title={title}
        onCancel={handleEditCancel}
        onSave={handleEditSave}
      />
    );
  }

  return (
    <DataCard
      subtitle={locationId}
      title={title}
      onAddItem={handleAddLocation}
      onDeleteItem={handleDeleteLocation}
      onEditItem={handleEditLocation}
    >
      <Card.Body>
        <div dangerouslySetInnerHTML={{ __html: description }} />

        <ConnectionsList connections={connections} />
      </Card.Body>
    </DataCard>
  );
}

Location.defaultProps = {
  connections: null,
  description: null,
  locationId: null,
  title: null,
  onSave: null,
};

Location.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.node,
  locationId: PropTypes.string,
  title: PropTypes.string,
  onSave: PropTypes.func,
};

export default Location;
