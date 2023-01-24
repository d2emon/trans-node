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
import citiesService from '../../services/cities';

export async function loader({ params }) {
  const {
    cityId,
  } = params;

  const cities = await citiesService.load();
  const city = await citiesService.bySlug(cityId);

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
