import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, useLoaderData } from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import TransBreadcrumbs from '../components/TransBreadcrumbs';
import citiesService from '../services/cities';
import usersService from '../services/users';

export async function loader({ params }) {
  const {
    cityId,
  } = params;

  const cities = await citiesService.load();
  const users = await usersService.load();

  const city = cityId ? await citiesService.bySlug(cityId) : null;
  const user = null; // await usersService.bySlug('admin');

  return {
    city,
    cities,
    user,
    users,
  };
}

function MainPage() {
  const {
    cities,
    city,
    user,
  } = useLoaderData();

  return (
    <>
      <TopMenu
        cities={cities}
        city={city}
        user={user}
      />
      <Container>
        <TransBreadcrumbs />
        <Outlet />
      </Container>
    </>
  );
}

export default MainPage;
