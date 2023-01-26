import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
  Navigate,
  Outlet,
  useLoaderData,
  useParams,
} from 'react-router-dom';
import { setCity } from '../../reducers/breadcrumbsSlice';
import cityAPI from '../../services/cityAPI';

export async function loader({ params }) {
  const {
    cityId,
  } = params;

  console.log('City loader');
  const cities = await cityAPI.load();
  const city = await cityAPI.bySlug(cityId);

  return {
    cities,
    city,
  };
}

export function CityRedirect() {
  const {
    cityId,
  } = useParams();

  return <Navigate to={`/${cityId}/routes`} replace />;
}

function City() {
  const {
    city,
  } = useLoaderData();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCity(city));
  }, []);

  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default City;
