import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import { useLoaderData } from 'react-router-dom';
import App from '../../App';

function MapPage () {
    return <Container>
        <Row>
            <Col md={3}>
                <App />
            </Col>
            <Col>
                <App />
            </Col>
        </Row>
    </Container>;
};

export default MapPage;
