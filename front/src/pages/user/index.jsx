import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import App from '../../components/App';
import { setBreadcrumbs, selectUser } from '../../reducers/breadcrumbsSlice';

function UserPage() {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBreadcrumbs([
      {
        id: user.slug,
        href: user.links.profile,
        text: user.name,
      },
    ]));
  }, []);

  return (
    <Container>
      <App />
    </Container>
  );
}

export default UserPage;
