import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectCity, setBreadcrumbs } from '../../reducers/breadcrumbsSlice';
import { fetchRoutes, selectRoutes } from '../../reducers/routeSlice';

function RoutesPage() {
  const city = useSelector(selectCity);
  const routes = useSelector(selectRoutes);

  const dispatch = useDispatch();

  const [transport, setTransport] = useState(city && city.transport);

  useEffect(() => {
    if (city) {
      dispatch(fetchRoutes(city ? city.id : null));

      setTransport(city.transport);

      dispatch(setBreadcrumbs([
        {
          id: city.slug,
          href: city.links ? city.links.main : '/',
          text: city.name,
        },
        {
          id: 'routes',
          href: city.links ? city.links.routes : '/',
          text: 'Справочник',
        },
      ]));
    }
  }, [city]);

  useEffect(() => {
    console.log(routes);
  }, [routes]);

  const tabs = [
    {
      key: 'all',
      title: 'Все',
    },
    {
      key: 'city',
      title: 'Городские',
    },
    {
      key: 'country',
      title: 'Пригородные / Междугородные',
    },
  ];

  const filterRoutes = (name) => city.transport
    .map((item) => {
      const byName = () => item.routes
        .filter((route) => route.name.includes(name));

      console.log(item);
      return ({
        ...item,
        routes: byName(),
      });
    });

  const handleAddNewRoute = () => {
    console.log('ADD NEW ROUTE');
  };

  const handleFilterRoutes = (event) => {
    const { value } = event.target;
    const newTransport = filterRoutes({ name: value });
    setTransport(newTransport);
  };

  const handleSwitchDisabled = (event) => {
    const { value } = event.target;
    const newTransport = filterRoutes({ disabled: value });
    setTransport(newTransport);
    console.log('DISABLED', value);
  };

  return (
    <Container>
      <Row>
        <Col md={3}>
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              onClick={handleAddNewRoute}
            >
              Добавить новый маршрут
            </Button>
          </div>
        </Col>

        <Col>
          <Container className="mb-3">
            <Form>
              <Row>
                <Col>
                  <Form.Control
                    placeholder="Фильтр по названию / номеру маршрута"
                    onChange={handleFilterRoutes}
                  />
                </Col>
                <Col>
                  <Form.Check
                    label="Показать отмененные маршруты"
                    onChange={handleSwitchDisabled}
                  />
                </Col>
              </Row>
            </Form>
          </Container>

          <Container>
            <Card>
              <Tabs
                defaultActiveKey="all"
                className="mb-3"
                justify
              >
                { tabs.map((tab) => (
                  <Tab
                    key={tab.key}
                    eventKey={tab.key}
                    title={tab.title}
                  >
                    { transport && transport.map((item) => ((item.routes.length > 0)
                      ? (
                        <Container
                          key={item.slug}
                        >
                          <Card.Title>{ item.name }</Card.Title>
                          <Container>
                            { item.routes.map((route) => (
                              <Button
                                key={route.slug}
                                className="mx-1"
                                variant="light"
                                href={route.links.main}
                              >
                                {route.name}
                              </Button>
                            )) }
                          </Container>
                        </Container>
                      )
                      : null
                    )) }
                  </Tab>
                )) }
              </Tabs>
            </Card>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default RoutesPage;
