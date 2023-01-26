import React from 'react';
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
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
        <LinkContainer to="/">
          <Navbar.Brand>Trans</Navbar.Brand>
        </LinkContainer>
        <Nav className="me-auto">
          { city && (
            <>
              <LinkContainer to={city.links.map}>
                <Nav.Link>Карта</Nav.Link>
              </LinkContainer>
              <LinkContainer to={city.links.routes}>
                <Nav.Link>Справочник</Nav.Link>
              </LinkContainer>
            </>
          ) }
          <LinkContainer to="/info">
            <Nav.Link>Информация</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav>
          <NavDropdown title={city ? city.name : 'Город'}>
            { cities.map((item) => (
              <LinkContainer
                key={item.id}
                to={item.links.map}
              >
                <NavDropdown.Item>
                  {item.name}
                </NavDropdown.Item>
              </LinkContainer>
            )) }
          </NavDropdown>
          {
            user
              ? (
                <LinkContainer to={user.links.profile}>
                  <Nav.Link>{user.name}</Nav.Link>
                </LinkContainer>
              )
              : (
                <LinkContainer to="/login">
                  <Nav.Link>Войти</Nav.Link>
                </LinkContainer>
              )
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
