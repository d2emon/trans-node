import React, { useEffect } from 'react';
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
import { LinkContainer } from 'react-router-bootstrap';
import { selectCity, setBreadcrumbs } from '../../reducers/breadcrumbsSlice';
import {
  GROUP_ALL,
  GROUP_CITY,
  GROUP_COUNTRY,
  selectRoutes,
  setDisabledFilter,
  setGroupFilter,
  setNameFilter,
} from '../../reducers/routeSlice';

function RoutesPage() {
  const city = useSelector(selectCity);
  const transport = useSelector(selectRoutes);

  const dispatch = useDispatch();

  useEffect(() => {
    if (city) {
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

  const tabs = [
    {
      key: GROUP_ALL,
      title: 'Все',
    },
    {
      key: GROUP_CITY,
      title: 'Городские',
    },
    {
      key: GROUP_COUNTRY,
      title: 'Пригородные / Междугородные',
    },
  ];

  const handleAddNewRoute = () => {
    console.log('ADD NEW ROUTE');
  };

  const handleFilterRoutes = (event) => {
    const { value } = event.target;
    dispatch(setNameFilter(value));
  };

  const handleSwitchDisabled = (event) => {
    const { checked } = event.target;
    dispatch(setDisabledFilter(checked));
  };

  const handleSelectTab = (value) => {
    dispatch(setGroupFilter(value));
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
                onSelect={handleSelectTab}
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
                              <LinkContainer
                                key={route.id}
                                to={route.links.main}
                              >
                                <Button
                                  className="mx-1"
                                  variant={route.disabled ? 'dark' : 'light'}
                                >
                                  {route.name}
                                </Button>
                              </LinkContainer>
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
