import React, { useEffect } from 'react';
import {
  Button,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useParams } from 'react-router-dom';
import RouteCard from '../../components/RouteCard';
import { selectCity, setBreadcrumbs } from '../../reducers/breadcrumbsSlice';
import {
  fetchRoute,
} from '../../reducers/routeSlice';
import routeAPI from '../../services/cityAPI/routeAPI';

export async function loader({ params }) {
  const {
    cityId,
    routeId,
  } = params;

  console.log('Route loader');
  const route = await routeAPI.bySlug(cityId, routeId);

  return {
    route,
  };
}

function RoutePage() {
  const dispatch = useDispatch();

  const {
    route,
  } = useLoaderData();

  const {
    cityId,
    routeId,
  } = useParams();

  const city = useSelector(selectCity);

  useEffect(() => {
    console.log(cityId, routeId);
    if (cityId && routeId) {
      dispatch(fetchRoute(cityId, routeId));
    }
  }, [cityId, routeId]);

  useEffect(() => {
    console.log(city, route);
    if (!city || !route) {
      return;
    }

    dispatch(setBreadcrumbs([
      {
        id: city.slug,
        href: city.links ? city.links.main : '',
        text: city.name,
      },
      {
        id: 'routes',
        href: city.links ? city.links.routes : '',
        text: 'Справочник',
      },
      {
        id: route.slug,
        href: route.links ? route.links.main : '',
        text: route.title,
      },
    ]));
  }, [city, route]);

  return (
    <Container>
      <Row>
        <Col md={3}>
          <div className="d-grid gap-2">
            <Button
              variant="primary"
            >
              Кнопка
            </Button>
          </div>
        </Col>

        <Col>
          <Container className="mb-3">
            { route && (
              <RouteCard
                city={city}
                route={route}
              />
            ) }
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default RoutePage;
