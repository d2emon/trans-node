import React, { useEffect, useState } from 'react';
import {
  Card,
  CardGroup,
  Col,
  Form,
  ListGroup,
  Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import App from './App';

function RouteCard(props) {
  const {
    city,
    route,
  } = props;

  const [run, setRun] = useState('');

  useEffect(() => {
    console.log(city, route);
    if (!route) {
      return;
    }

    setRun((route.runs.length > 0) ? route.runs[0].id : '');
  }, [route]);

  const handleRunSelect = (event) => {
    const { value } = event.target;
    setRun(value);
  };

  const handleRunClick = (value) => () => {
    setRun(value);
  };

  return route
    ? (
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
              <Card key={item.id}>
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
    )
    : null;
}

RouteCard.defaultProps = {
  city: null,
  route: null,
};

RouteCard.propTypes = {
  city: PropTypes.shape({
    slug: PropTypes.string,
    name: PropTypes.string,
    links: PropTypes.shape({
      main: PropTypes.string,
      routes: PropTypes.string,
    }),
  }),
  route: PropTypes.shape({
    runs: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      length: PropTypes.string,
      stop: PropTypes.string,
      title: PropTypes.string,
    })),
    slug: PropTypes.string,
    title: PropTypes.string,
    days: PropTypes.string,
    schedule: PropTypes.string,
    cityId: PropTypes.string,
    cost: PropTypes.string,
    route: PropTypes.string,
    driver: PropTypes.string,
    info: PropTypes.string,
    links: PropTypes.shape({
      main: PropTypes.string,
    }),
  }),
};

export default RouteCard;
