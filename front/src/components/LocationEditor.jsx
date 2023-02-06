import React, { useCallback, useState } from 'react';
import {
  Card, Form, Nav, Navbar,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

function LocationEditor(props) {
  const {
    locationId,
    title,
    description,
    connections,
    onCancel,
    onSave,
  } = props;

  const [locationTitle, setLocationTitle] = useState(title);
  const [locationDescription, setLocationDescription] = useState(description);

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  const handleSave = useCallback(() => {
    console.log({
      id: locationId,
      connections,
      description: locationDescription,
      title: locationTitle,
    });
    if (onSave) {
      onSave({
        id: locationId,
        connections,
        description: locationDescription,
        title: locationTitle,
      });
    }
  }, [onSave, locationId, connections, locationDescription, locationTitle]);

  const handleChangeDescription = useCallback((e) => {
    setLocationDescription(e.target.value);
  }, []);

  const handleChangeTitle = useCallback((e) => {
    setLocationTitle(e.target.value);
  }, []);

  return (
    <Card>
      <Card.Header>
        <Card.Subtitle>{ locationId }</Card.Subtitle>
      </Card.Header>

      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="locationTitle">
            <Form.Label>Название</Form.Label>
            <Form.Control
              placeholder="Название локации"
              value={locationTitle}
              onChange={handleChangeTitle}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="locationDescription">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Описание локации"
              rows={3}
              value={locationDescription}
              onChange={handleChangeDescription}
            />
          </Form.Group>

        </Form>
      </Card.Body>

      <Card.Footer>
        <Navbar>
          <Nav className="me-auto">
            <Nav.Link onClick={handleSave}>Сохранить</Nav.Link>
            <Nav.Link onClick={handleCancel}>Отменить</Nav.Link>
          </Nav>
        </Navbar>
      </Card.Footer>
    </Card>
  );
}

LocationEditor.defaultProps = {
  connections: null,
  description: null,
  locationId: null,
  title: null,
  onCancel: null,
  onSave: null,
};

LocationEditor.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.node,
  locationId: PropTypes.string,
  title: PropTypes.string,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
};

export default LocationEditor;
