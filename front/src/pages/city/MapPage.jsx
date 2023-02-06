import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ConnectionsList from '../../components/ConnectionsList';
import Location from '../../components/Location';
import TransportList from '../../components/TransportList';
import { selectCity, setBreadcrumbs } from '../../reducers/breadcrumbsSlice';

function MapPage() {
  const city = useSelector(selectCity);
  const [location, setLocation] = useState({
    id: '1',
    title: 'Название',
    description: `
    <p>Описание</p>
    <p>Описание</p>
    <p>Описание</p>
    `,
    connections: [
      'Вариант 1',
      'Вариант 2',
      'Вариант 3',
    ],
  });

  const dispatch = useDispatch();

  const handleSaveLocation = useCallback((data) => {
    setLocation(data);
  }, []);

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
        <Col>
          <Location
            connections={location.connections}
            description={location.description}
            locationId={location.id}
            title={location.title}
            onSave={handleSaveLocation}
          />
        </Col>
        <Col>
          <Row>
            <Col md="6">
              <TransportList
                items={[
                  'Вариант 1',
                  'Вариант 2',
                  'Вариант 3',
                ]}
              />
            </Col>
            <Col md="6">
              <TransportList
                items={[
                  'Вариант 1',
                  'Вариант 2',
                  'Вариант 3',
                ]}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <ConnectionsList
                connections={[
                  'Вариант 1',
                  'Вариант 2',
                  'Вариант 3',
                ]}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default MapPage;
