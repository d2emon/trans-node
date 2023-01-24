import React from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';
import {
  Navigate,
  Outlet,
  useLoaderData,
  useParams,
} from 'react-router-dom';
import citiesService from '../../services/cities';

export async function loader({ params, request }) {
  // const cities = await citiesService.load();

  const {
    cityId,
  } = params;

  const city = await citiesService.bySlug(cityId);

  console.log(request);
  console.log(city);

  return {
    city,
    // cities,
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

  console.log(city);

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item href={city.links.main}>{city.name}</Breadcrumb.Item>
        <Breadcrumb.Item href={city.links.map}>Карта</Breadcrumb.Item>
      </Breadcrumb>

      <Outlet />
    </Container>
  );
}

export default City;
