import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ConnectionsList from '../../components/ConnectionsList';
import Location from '../../components/Location';
import TransportList from '../../components/TransportList';
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
        <Col>
          <Location
            connections={[
              'Вариант 1',
              'Вариант 2',
              'Вариант 3',
            ]}
            description={(
              <>
                <p>Описание</p>
                <p>Описание</p>
                <p>Описание</p>
              </>
            )}
            locationId="1"
            title="Название"
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
