/* eslint-disable react/no-danger */
import React from 'react';
import {
  Card, Nav, Navbar,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import DbNavigator from './DbNavigator';

function DataCard(props) {
  const {
    children,

    className,
    subtitle,
    title,

    onAddItem,
    onDeleteItem,
    onEditItem,
  } = props;

  return (
    <Card className={className}>
      <Card.Header>
        { subtitle && <Card.Subtitle>{ subtitle }</Card.Subtitle> }
        { title && <Card.Title>{ title }</Card.Title> }
        <Navbar>
          <Nav className="me-auto">
            <Nav.Link onClick={onAddItem}>Добавить</Nav.Link>
            <Nav.Link onClick={onEditItem}>Редактировать</Nav.Link>
            <Nav.Link onClick={onDeleteItem}>Удалить</Nav.Link>
          </Nav>
        </Navbar>
      </Card.Header>

      { children }

      <Card.Footer>
        <DbNavigator />
      </Card.Footer>
    </Card>
  );
}

DataCard.defaultProps = {
  children: null,
  className: null,
  subtitle: null,
  title: null,

  onAddItem: null,
  onDeleteItem: null,
  onEditItem: null,
};

DataCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,

  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
};

export default DataCard;
