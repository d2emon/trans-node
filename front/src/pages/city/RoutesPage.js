import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';

function RoutesPage () {
    const {
        city,
    } = useLoaderData();

    const [transport, setTransport] = useState(city.transport);

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

    useEffect(() => {
        setTransport(city.transport);
    }, [city]);

    const filterRoutes = (name) => city.transport
        .map((item) => {
            const byName = () => item.routes
                .filter((item) => item.name.includes(name));
            
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
        const value = event.target.value;
        const transport = filterRoutes({ name: value });
        setTransport(transport);
    };

    const handleSwitchDisabled = (value) => {
        const value = event.target.value;
        const transport = filterRoutes({ disabled: value });
        setTransport(transport);
        console.log('DISABLED', value);
    };

    return <Container>
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
                <Container className='mb-3'>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Control
                                    placeholder='Фильтр по названию / номеру маршрута'
                                    onChange={handleFilterRoutes}
                                />
                            </Col>
                            <Col>
                                <Form.Check
                                    label='Показать отмененные маршруты'
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
                            className='mb-3'
                            justify
                        >
                            { tabs.map((tab) => (<Tab
                                key={tab.key}
                                eventKey={tab.key}
                                title={tab.title}
                            >
                                { transport.map((transport) => ((transport.routes.length > 0)
                                    ? <Container
                                        key={transport.slug}
                                    >
                                        <Card.Title>{ transport.name }</Card.Title>
                                        <Container>
                                            { transport.routes.map((route) => (<Button
                                                key={route.slug}
                                                className='mx-1'
                                                variant='light'
                                                href={route.links.main}
                                            >
                                                {route.name}
                                            </Button>)) }
                                        </Container>
                                    </Container>
                                    : null
                                )) }
                            </Tab>)) }
                        </Tabs>
                    </Card>
                </Container>
            </Col>
        </Row>
    </Container>;
};

export default RoutesPage;
