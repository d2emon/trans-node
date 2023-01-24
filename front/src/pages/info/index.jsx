import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import App from '../../components/App';
import { setBreadcrumbs } from '../../reducers/breadcrumbsSlice';

function InfoPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBreadcrumbs([
      {
        id: 'info',
        href: '/info',
        text: 'Информация',
      },
    ]));
  }, []);

  return (
    <Container>
      <App />
    </Container>
  );
}

export default InfoPage;
