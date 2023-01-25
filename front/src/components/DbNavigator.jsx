import React from 'react';
import {
  Nav,
  Navbar,
  Pagination,
} from 'react-bootstrap';

function DbNavigator() {
  return (
    <>
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>

      <Navbar>
        <Nav className="me-auto">
          <Nav.Link href="/">+</Nav.Link>
          <Nav.Link href="/">-</Nav.Link>
          <Nav.Link href="/">Править</Nav.Link>
        </Nav>
      </Navbar>

      <Navbar>
        <Nav>
          <Nav.Link href="/">Сохранить</Nav.Link>
          <Nav.Link href="/">Отменить</Nav.Link>
          <Nav.Link href="/">Обновить</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default DbNavigator;
