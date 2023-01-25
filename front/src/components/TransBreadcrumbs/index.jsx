import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  selectBreadcrumbs,
} from '../../reducers/breadcrumbsSlice';

function TransBreadcrumbs() {
  const breadcrumbs = useSelector(selectBreadcrumbs);

  return (
    <Breadcrumb>
      { breadcrumbs && breadcrumbs.map((item) => (
        <LinkContainer
          key={item.id}
          to={item.href}
        >
          <Breadcrumb.Item>
            {item.text}
          </Breadcrumb.Item>
        </LinkContainer>
      )) }
    </Breadcrumb>
  );
}

export default TransBreadcrumbs;
