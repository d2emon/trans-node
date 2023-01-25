import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import App from '../components/App';
import { setBreadcrumbs } from '../reducers/breadcrumbsSlice';

function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBreadcrumbs([]));
  }, []);

  return (
    <Container>
      <App />
    </Container>
  );
}

export default LandingPage;
