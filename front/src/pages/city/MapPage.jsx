import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ConnectionsList from '../../components/ConnectionsList';
import Location from '../../components/Location';
import TransportList from '../../components/TransportList';
import { selectCity, setBreadcrumbs } from '../../reducers/breadcrumbsSlice';
import {
  fetchLocation,
  selectIsLoading,
  selectLocation,
  updateLocation,
} from '../../reducers/locationSlice';

function MapPage() {
  const dispatch = useDispatch();

  const city = useSelector(selectCity);
  const isLoading = useSelector(selectIsLoading);
  const locationData = useSelector(selectLocation);

  const [locationId, setLocationId] = useState(null);
  const [connections, setConnections] = useState(null);
  const [description, setDescription] = useState(null);
  const [title, setTitle] = useState(null);

  const handleSaveLocation = useCallback((data) => {
    dispatch(updateLocation({
      locationId: data.id,
      data,
    }));
  }, [dispatch]);

  useEffect(() => {
    setLocationId(locationData.locationId);
    setConnections(locationData.connections);
    setDescription(locationData.description);
    setTitle(locationData.title);
  }, [locationData]);

  useEffect(() => {
    if (!city) {
      return;
    }

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

    dispatch(fetchLocation({ cityId: city.slug, locationId: '1' }));
  }, [dispatch, city]);

  return (
    <Container>
      <Row>
        <Col>
          {
            isLoading
              ? <h1>Loading...</h1>
              : (
                <Location
                  connections={connections}
                  description={description}
                  locationId={locationId}
                  title={title}
                  onSave={handleSaveLocation}
                />
              )
          }
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
