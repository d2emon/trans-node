import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Outlet, useLoaderData } from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import TransBreadcrumbs from '../components/TransBreadcrumbs';
import { selectBreadcrumbs } from '../reducers/breadcrumbsSlice';
import { selectCity } from '../reducers/routeSlice';
import cityAPI from '../services/cityAPI';
import usersService from '../services/users';

export async function loader() {
  console.log('Main loader');
  const cities = await cityAPI.load();
  const users = await usersService.load();
  const user = null; // await usersService.bySlug('admin');

  return {
    cities,
    user,
    users,
  };
}

function MainPage() {
  const {
    cities,
    user,
  } = useLoaderData();

  const breadcrumbs = useSelector(selectBreadcrumbs);
  const city = useSelector(selectCity);

  return (
    <>
      <TopMenu
        cities={cities}
        city={city}
        user={user}
      />
      <Container>
        <TransBreadcrumbs breadcrumbs={breadcrumbs} />
        <Outlet />
      </Container>
    </>
  );
}

export default MainPage;
