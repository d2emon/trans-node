import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
  selectBreadcrumbs,
} from '../../reducers/breadcrumbsSlice';

function TransBreadcrumbs() {
  const breadcrumbs = useSelector(selectBreadcrumbs);

  return (
    <Breadcrumb>
      { breadcrumbs && breadcrumbs.map((item) => (
        <Breadcrumb.Item
          key={item.id}
          href={item.href}
        >
          {item.text}
        </Breadcrumb.Item>
      )) }
    </Breadcrumb>
  );
}

export default TransBreadcrumbs;
