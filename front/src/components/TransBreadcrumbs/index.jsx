import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';

function TransBreadcrumbs(props) {
  const { breadcrumbs } = props;

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

TransBreadcrumbs.defaultProps = {
  breadcrumbs: [],
};

TransBreadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    href: PropTypes.string,
    text: PropTypes.string,
  })),
};

export default TransBreadcrumbs;
