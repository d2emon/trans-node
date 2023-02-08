/* eslint-disable react/no-danger */
import React, { useMemo } from 'react';
import {
  Card, Nav, Navbar,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import DbNavigator from './DbNavigator';

function DataCard(props) {
  const {
    children,

    className,
    hasAddButton,
    hasDeleteButton,
    hasEditButton,
    subtitle,
    title,

    onAddItem,
    onDeleteItem,
    onEditItem,
  } = props;

  const hasButtons = useMemo(
    () => (hasAddButton || hasEditButton || hasDeleteButton),
    [
      hasAddButton,
      hasDeleteButton,
      hasEditButton,
    ],
  );

  return (
    <Card className={className}>
      <Card.Header>
        { subtitle && <Card.Subtitle>{ subtitle }</Card.Subtitle> }
        { title && <Card.Title>{ title }</Card.Title> }
        { hasButtons && (
          <Navbar>
            <Nav className="me-auto">
              { hasAddButton && <Nav.Link onClick={onAddItem}>Добавить</Nav.Link> }
              { hasEditButton && <Nav.Link onClick={onEditItem}>Редактировать</Nav.Link> }
              { hasDeleteButton && <Nav.Link onClick={onDeleteItem}>Удалить</Nav.Link> }
            </Nav>
          </Navbar>
        ) }
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
  hasAddButton: false,
  hasDeleteButton: false,
  hasEditButton: false,
  subtitle: null,
  title: null,

  onAddItem: null,
  onDeleteItem: null,
  onEditItem: null,
};

DataCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hasAddButton: PropTypes.bool,
  hasDeleteButton: PropTypes.bool,
  hasEditButton: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string,

  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
};

export default DataCard;
