import React from 'react';
import {
  Pagination,
} from 'react-bootstrap';

function DbNavigator() {
  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
}

export default DbNavigator;
