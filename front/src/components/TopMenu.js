import React from 'react';
import {
    Container,
    Nav,
    Navbar,
} from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';

function TopMenu () {
    const city1 = {
        slug: 'nowhere',
    };

    const cityLinks = {
        main: `/${city1.slug}/`,
        map: `/${city1.slug}/map`,
        routes: `/${city1.slug}/routes`,
    }

    const {
        user,
    } = useLoaderData();

    return <Navbar>
        <Container>
            <Navbar.Brand href="/">Trans</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href={cityLinks.map}>Карта</Nav.Link>
                <Nav.Link href={cityLinks.routes}>Справочник</Nav.Link>
                <Nav.Link href="/info">Информация</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href={cityLinks.main}>Город</Nav.Link>
                <Nav.Link href={user.links.profile}>{user.name}</Nav.Link>
            </Nav>
        </Container>
    </Navbar>;
}

export default TopMenu;
