import React, { useCallback, useState } from 'react';
import {
  Button,
  Card, Col, Container, Form, Nav, Navbar, Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import DataCard from './DataCard';

function LocationEditor(props) {
  const {
    locationId,
    locations,
    title,
    description,
    connections,
    onCancel,
    onSave,
  } = props;

  const [locationTitle, setLocationTitle] = useState(title);
  const [locationDescription, setLocationDescription] = useState(description);
  const [locationConnections, setLocationConnections] = useState(connections);

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  const handleSave = useCallback(() => {
    console.log({
      id: locationId,
      connections: locationConnections,
      description: locationDescription,
      title: locationTitle,
    });
    if (onSave) {
      onSave({
        id: locationId,
        connections: locationConnections,
        description: locationDescription,
        title: locationTitle,
      });
    }
  }, [
    locationId,
    locationConnections,
    locationDescription,
    locationTitle,
    onSave,
  ]);

  const handleChangeDescription = useCallback((e) => {
    setLocationDescription(e.target.value);
  }, []);

  const handleChangeTitle = useCallback((e) => {
    setLocationTitle(e.target.value);
  }, []);

  const handleAddConnection = useCallback(() => {
    setLocationConnections([
      ...locationConnections,
      {
        id: `${locationConnections.length + 1}`,
        locationId: null,
        title: null,
      },
    ]);
  }, [locationConnections]);

  const handleChangeConnection = useCallback((id) => (e) => {
    const { value } = e.target;
    const location = locations.find((item) => (item.id === value));

    const values = locationConnections.map((item) => {
      if (item.id !== id) {
        return item;
      }

      return {
        id,
        locationId: location.id,
        title: location.title,
      };
    });

    setLocationConnections(values);
  }, [locationConnections, locations]);

  const handleDeleteConnection = useCallback((id) => () => {
    const values = locationConnections.filter((item) => (item.id !== id));
    setLocationConnections(values);
  }, [locationConnections, locations]);

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

          <DataCard
            title="Переходы"
            hasAddButton
            onAddItem={handleAddConnection}
          >
            <Container className="mb-2">
              { locationConnections.map((connection) => (
                <Row
                  key={connection.id}
                  className="my-2"
                >
                  <Col>
                    <Form.Select
                      value={connection.locationId}
                      onChange={handleChangeConnection(connection.id)}
                    >
                      <option>Выберите локацию</option>
                      { locations.map((location) => (
                        <option
                          key={location.id}
                          value={location.id}
                        >
                          {location.title}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={4}>
                    <Button
                      variant="primary"
                      onClick={handleDeleteConnection(connection.id)}
                    >
                      Удалить
                    </Button>
                  </Col>
                </Row>
              ))}
            </Container>
          </DataCard>

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
  locations: [],
  title: null,
  onCancel: null,
  onSave: null,
};

LocationEditor.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    locationId: PropTypes.string,
    title: PropTypes.string,
  })),
  description: PropTypes.node,
  locationId: PropTypes.string,
  locations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  })),
  title: PropTypes.string,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
};

export default LocationEditor;
