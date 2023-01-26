import React, { useEffect, useState } from 'react';
import {
  Card,
  CardGroup,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import App from '../../components/App';
import { selectCity, setBreadcrumbs } from '../../reducers/breadcrumbsSlice';
import {
  fetchRoute,
  fetchRoutes,
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
    cityId,
    routeId,
    route,
  };
}

function RoutePage() {
  const city = useSelector(selectCity);
  // const transport = useSelector(selectRoutes);
  const [run, setRun] = useState('');
  const {
    cityId,
    routeId,
    route,
  } = useLoaderData();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(cityId, routeId, route);
    if (cityId) {
      dispatch(fetchRoutes(cityId));

      dispatch(fetchRoute(cityId, routeId));
    }
  }, [cityId, routeId, city]);

  useEffect(() => {
    console.log(city, route);
    if (!city || !route) {
      return;
    }

    setRun((route.runs.length > 0) ? route.runs[0].id : '');
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

  const handleRunSelect = (event) => {
    const { value } = event.target;
    setRun(value);
  };

  const handleRunClick = (value) => () => {
    setRun(value);
  };

  return (
    <Container>
      <Row>
        <Col md={3}>
          <App />
        </Col>

        <Col>
          <Container className="mb-3">
            { route && (
            <Card>
              <Card.Body>
                <Form>
                  <Row>
                    <Col>
                      <Form.Select
                        value={run}
                        onChange={handleRunSelect}
                      >
                        { route.runs.map((item) => (
                          <option
                            key={item.id}
                            value={item.id}
                          >
                            { item.title }
                          </option>
                        )) }
                      </Form.Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <App />
                    </Col>
                  </Row>
                </Form>

                <Card.Title>Рейсы:</Card.Title>
                <ListGroup>
                  { route.runs && route.runs.map((item) => (
                    <ListGroup.Item
                      key={item.id}
                      active={item.id === run}
                      onClick={handleRunClick(item.id)}
                    >
                      { item.title }
                    </ListGroup.Item>
                  )) }
                </ListGroup>

                <Card.Title>Даты и дни работы:</Card.Title>
                <Card.Text>{ route.days }</Card.Text>

                <Card.Title>Расписание:</Card.Title>
                <Card.Text>{ route.schedule }</Card.Text>

                <Card.Title>Город:</Card.Title>
                <Card.Text>{ route.cityId }</Card.Text>

                <Card.Title>Вид и номер маршрута:</Card.Title>
                <Card.Text>{ route.title }</Card.Text>

                <Card.Title>Стоимость проезда:</Card.Title>
                <Card.Text>{ route.cost }</Card.Text>

                <Card.Title>Маршрут следования:</Card.Title>
                <Card.Text>{ route.route }</Card.Text>

                <Card.Title>Компания перевозчик:</Card.Title>
                <Card.Text>{ route.driver }</Card.Text>

                <Card.Title>Дополнительная информация:</Card.Title>
                <Card.Text>{ route.info }</Card.Text>

                <Card.Title>Техническая информация:</Card.Title>
                <CardGroup>
                  { route.runs.map((item) => (
                    <Card>
                      <Card.Body>
                        <Card.Subtitle>{ item.title }</Card.Subtitle>
                        <Card.Text>
                          Длительность:
                          {' '}
                          { item.length }
                        </Card.Text>
                        <Card.Text>
                          Остановок:
                          {' '}
                          { item.stops }
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </CardGroup>
              </Card.Body>
            </Card>
            ) }
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default RoutePage;
