import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  Navigate,
  Outlet,
  // useLoaderData,
  useParams,
} from 'react-router-dom';
import { setCity } from '../../reducers/breadcrumbsSlice';
import { fetchCity, selectCity } from '../../reducers/routeSlice';

export function CityRedirect() {
  const {
    cityId,
  } = useParams();

  return <Navigate to={`/${cityId}/routes`} replace />;
}

function City() {
  const dispatch = useDispatch();

  const {
    cityId,
  } = useParams();

  const city = useSelector(selectCity);

  useEffect(() => {
    // TODO: Make it running once
    dispatch(fetchCity(cityId));
  }, [cityId, dispatch]);

  useEffect(() => {
    dispatch(setCity(city));
  }, [city, dispatch]);

  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default City;
