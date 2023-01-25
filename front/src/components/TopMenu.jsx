import React from 'react';
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

function TopMenu(props) {
  const {
    cities,
    city,
    user,
  } = props;

  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">Trans</Navbar.Brand>
        <Nav className="me-auto">
          { city && (
            <>
              <Nav.Link href={city.links.map}>Карта</Nav.Link>
              <Nav.Link href={city.links.routes}>Справочник</Nav.Link>
            </>
          ) }
          <Nav.Link href="/info">Информация</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title={city ? city.name : 'Город'}>
            { cities.map((item) => (
              <NavDropdown.Item
                key={item.id}
                href={item.links.main}
              >
                {item.name}
              </NavDropdown.Item>
            )) }
          </NavDropdown>
          {
            user
              ? <Nav.Link href={user.links.profile}>{user.name}</Nav.Link>
              : <Nav.Link href="/login">Войти</Nav.Link>
          }
        </Nav>
      </Container>
    </Navbar>
  );
}

TopMenu.defaultProps = {
  cities: [],
  city: null,
  user: null,
};

const cityPropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  slug: PropTypes.string,
  links: PropTypes.shape({
    main: PropTypes.string,
    map: PropTypes.string,
    routes: PropTypes.string,
  }),
});

TopMenu.propTypes = {
  cities: PropTypes.arrayOf(cityPropType),
  city: cityPropType,
  user: PropTypes.shape({
    name: PropTypes.string,
    links: PropTypes.shape({
      profile: PropTypes.string,
    }),
  }),
};

export default TopMenu;
