import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import App from '../../components/App';

function MapPage() {
  return (
    <Container>
      <Row>
        <Col md={3}>
          <App />
        </Col>
        <Col>
          <App />
        </Col>
      </Row>
    </Container>
  );
}

export default MapPage;
