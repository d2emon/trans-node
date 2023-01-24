import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import App from '../../components/App';
import { selectCity, setBreadcrumbs } from '../../reducers/breadcrumbsSlice';

function MapPage() {
  const city = useSelector(selectCity);

  const dispatch = useDispatch();

  useEffect(() => {
    if (city) {
      dispatch(setBreadcrumbs([
        {
          id: city.slug,
          href: city.links.main,
          text: city.name,
        },
        {
          id: 'map',
          href: city.links.map,
          text: 'Карта',
        },
      ]));
    }
  }, [city]);

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
